import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { generateContentWithRetry } from "./server/gemini";
import { generateUpcomingWeeks, createDynamicCurrentWeek } from "./server/data/sampleWeeks";
import { fetchLiveWolSchedule, fetchWolArticleText, searchWol } from "./server/wol";
import { generateFallbackTalk, generateFallbackComments, generateFallbackResearch } from "./server/fallbackGenerators";
import { Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API: Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// API: List available weeks (current week + subsequent weeks)
app.get("/api/wol/weeks", async (req, res) => {
  try {
    const upcomingWeeks = generateUpcomingWeeks(10);
    const customUrl = req.query.url as string | undefined;
    if (customUrl) {
      const live = await fetchLiveWolSchedule(customUrl);
      if (live) {
        return res.json({ weeks: [live, ...upcomingWeeks.filter(w => w.id !== live.id)] });
      }
    }

    return res.json({ weeks: upcomingWeeks });
  } catch (err: any) {
    console.error("Error in /api/wol/weeks:", err);
    const fallbackWeeks = generateUpcomingWeeks(10);
    res.json({ weeks: fallbackWeeks });
  }
});

// API: Get specific week
app.get("/api/wol/week/:id", async (req, res) => {
  const { id } = req.params;
  const allWeeks = generateUpcomingWeeks(12);
  const week = allWeeks.find((w) => w.id === id);
  if (week) {
    return res.json({ week });
  }
  return res.status(404).json({ error: "Settimana non trovata" });
});

// API: Fetch live WOL URL
app.post("/api/wol/fetch-url", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "URL obbligatorio" });
    }
    const data = await fetchWolArticleText(url);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Errore nel recupero della pagina WOL" });
  }
});

// API: Search on wol.jw.org
app.post("/api/wol/search", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Query obbligatoria" });
    const results = await searchWol(query);
    res.json({ results });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Errore nella ricerca WOL" });
  }
});

// SYSTEM INSTRUCTION FOR GEMINI (Strictly WOL grounded)
const WOL_SYSTEM_INSTRUCTION = `Sei un assistente per lo studio e la preparazione delle adunanze dei Testimoni di Geova basato ESCLUSIVAMENTE sulla Watchtower ONLINE LIBRARY (wol.jw.org).
Tutte le spiegazioni scritturali, i commenti, le linee guida per i discorsi, le risposte alle domande e i riferimenti devono attenersi fedelmente ed esclusivamente alle pubblicazioni ufficiali reperibili su wol.jw.org (Traduzione del Nuovo Mondo delle Sacre Scritture, La Torre di Guardia, Svegliatevi!, Guida per l'adunanza Vita cristiana e ministero, Perspicacia nello studio delle Scritture, ecc.).
Non usare fonti esterne, opinioni secolari o interpretazioni personali estranee al contesto biblico delle pubblicazioni Watch Tower.
Usa un linguaggio rispettoso, edificante, chiaro, caldo e teocratico in lingua italiana.`;

// API: Generate structured Talk Outline or Ministry Dialogue Demonstration
app.post("/api/ai/generate-talk", async (req, res) => {
  const { partTitle, section, durationMinutes, sourceText, assignedScriptures, audienceType, personalFocus } = req.body;
  const duration = parseInt(durationMinutes, 10) || (section === "ministero" ? 4 : 10);
  const isMinistryDialogue = section === "ministero" && !partTitle.toLowerCase().includes("discorso");

  try {
    let prompt = "";
    if (isMinistryDialogue) {
      prompt = `Crea una DIMOSTRAZIONE / DIALOGO TRA DUE PERSONE per la parte di "Efficaci nel Ministero":
- Titolo della parte: "${partTitle}"
- Sezione: Efficaci nel Ministero (Vita cristiana e ministero)
- Tempo stabilito: ${duration} minuti
- Scritture assegnate: ${JSON.stringify(assignedScriptures || [])}
- Traccia / Indicazioni ufficiali da wol.jw.org: "${sourceText || ""}"
- Tipo di uditorio/scenario: ${audienceType || "Conversazione di casa in casa"}
- Focus personale: ${personalFocus || "Naturalezza, tatto, seguire fedelmente la traccia"}

REGOLE TASSATIVE:
1. DIALOGO A DUE PERSONE:
   - Persona 1: "Proclamatore (Testimone di Geova)"
   - Persona 2: "Interlocutore (Persona NON testimone di Geova)" - es. padrone di casa, vicino, collega o passante. L'interlocutore NON è un Testimone, quindi esprime opinioni autentiche, dubbi comuni o preoccupazioni della vita reale.
2. SEGUIRE RIGOROSAMENTE LA TRACCIA della Guida per l'adunanza:
   - Avvio della conversazione con la domanda iniziale stabilita dalla traccia.
   - Lettura della Scrittura assegnata (${(assignedScriptures && assignedScriptures[0]) || "scrittura della traccia"}) e breve ragionamento logico.
   - Lasciare con tatto la domanda in sospeso per la visita ulteriore e accordarsi per la volta successiva.
3. DETTAGLI DI SCENA: Includi per ogni battuta le note di scena (tono di voce, gesti, quando aprire la Bibbia o mostrare jw.org).
4. Restituisci il campo "isDialogue": true con l'oggetto "dialogue" completo.

Restituisci SOLO un oggetto JSON conforme allo schema.`;
    } else {
      prompt = `Crea un discorso completo e dettagliato per la parte dell'adunanza:
- Titolo della parte: "${partTitle}"
- Sezione: ${section}
- Tempo stabilito dal programma: ${duration} minuti
- Scritture assegnate: ${JSON.stringify(assignedScriptures || [])}
- Testo/indicazioni da wol.jw.org: "${sourceText || ""}"
- Tipo di uditorio: ${audienceType || "Congregazione locale"}
- Eventuale focus personale: ${personalFocus || "Enfatizzare l'applicazione pratica e l'amore per Geova"}

STRUTTURA RICHIESTA:
1. Titolo accattivante e scrittura tematica principale.
2. Introduzione (circa il 10-15% del tempo totale) con una domanda iniziale o un'illustrazione per catturare l'attenzione.
3. Corpo del discorso diviso in 2-3 punti chiave proporzionati al tempo di ${duration} minuti. Per ciascun punto indica:
   - Minuti consigliati (es. "3-5 min")
   - Argomento principale
   - Scritture da leggere o citare con spiegazione del contesto
   - Illustrazione o applicazione pratica
   - Note per l'oratore (consigli su enfasi, tono, contatto visivo)
4. Conclusione (circa il 10-15% del tempo) con riassunto incisivo, versetto finale o esortazione motivante.
5. Fonti di riferimento e citazioni da wol.jw.org.

Restituisci SOLO un oggetto JSON valido conforme allo schema.`;
    }

    const response = await generateContentWithRetry({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction: WOL_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isDialogue: { type: Type.BOOLEAN },
            title: { type: Type.STRING },
            themeScripture: { type: Type.STRING },
            totalMinutes: { type: Type.INTEGER },
            timingMilestones: {
              type: Type.OBJECT,
              properties: {
                introTime: { type: Type.STRING },
                bodyTime: { type: Type.STRING },
                conclusionTime: { type: Type.STRING }
              },
              required: ["introTime", "bodyTime", "conclusionTime"]
            },
            dialogue: {
              type: Type.OBJECT,
              properties: {
                setting: { type: Type.STRING },
                householderProfile: { type: Type.STRING },
                initialQuestion: { type: Type.STRING },
                scriptureToRead: { type: Type.STRING },
                pendingQuestion: { type: Type.STRING },
                dialogueLines: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      speakerRole: { type: Type.STRING },
                      speakerName: { type: Type.STRING },
                      dialogueText: { type: Type.STRING },
                      stageDirection: { type: Type.STRING }
                    },
                    required: ["speakerRole", "speakerName", "dialogueText"]
                  }
                },
                studentTips: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              }
            },
            introduction: {
              type: Type.OBJECT,
              properties: {
                timeAllocated: { type: Type.STRING },
                hookQuestionOrIllustration: { type: Type.STRING },
                purposeStatement: { type: Type.STRING },
                speakerTip: { type: Type.STRING }
              },
              required: ["timeAllocated", "hookQuestionOrIllustration", "purposeStatement", "speakerTip"]
            },
            sections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  timeAllocated: { type: Type.STRING },
                  pointTitle: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                  scriptureReference: { type: Type.STRING },
                  scriptureApplication: { type: Type.STRING },
                  illustration: { type: Type.STRING },
                  speakerNotes: { type: Type.STRING }
                },
                required: ["timeAllocated", "pointTitle", "explanation", "scriptureReference", "scriptureApplication", "speakerNotes"]
              }
            },
            conclusion: {
              type: Type.OBJECT,
              properties: {
                timeAllocated: { type: Type.STRING },
                summary: { type: Type.STRING },
                motivationalCallToAction: { type: Type.STRING },
                finalThoughtOrScripture: { type: Type.STRING }
              },
              required: ["timeAllocated", "summary", "motivationalCallToAction"]
            },
            wolSources: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  publication: { type: Type.STRING },
                  citation: { type: Type.STRING },
                  wolUrl: { type: Type.STRING }
                },
                required: ["title", "publication", "citation"]
              }
            }
          },
          required: ["title", "themeScripture", "totalMinutes", "introduction", "sections", "conclusion", "wolSources"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({ success: true, outline: parsed });
  } catch (err: any) {
    console.warn("[AI generate-talk fallback activated due to API demand/error]:", err?.message || err);
    const fallbackOutline = generateFallbackTalk({
      partTitle: partTitle || "Parte dell'Adunanza",
      section: section || "Programma",
      durationMinutes: duration,
      sourceText,
      assignedScriptures,
      audienceType,
      personalFocus
    });
    return res.json({ success: true, outline: fallbackOutline, isFallback: true });
  }
});

// API: Generate Comments and Answers to Questions
app.post("/api/ai/generate-comments", async (req, res) => {
  const { partTitle, section, sourceText, questions, paragraphs, stylePreference, assignedScriptures, bibleReading } = req.body;

  try {
    const prompt = `Prepara commenti e risposte teocratiche automatiche per la parte dell'adunanza:
- Parte: "${partTitle}" (${section})
- Lettura Biblica settimanale: "${bibleReading || ""}"
- Scritture assegnate: ${JSON.stringify(assignedScriptures || [])}
- Materiale di riferimento da wol.jw.org: "${sourceText || ""}"
- Domande o paragrafi: ${JSON.stringify(questions || paragraphs || [])}
- Preferenza di stile: ${stylePreference || "Tutte le opzioni: risposta diretta (30s), commento approfondito (60s), e applicazione pratica"}

REGOLE CRUCIALI (PARTICOLARMENTE PER LE GEMME SPIRITUALI):
1. CITAZIONE SCRITTURALE OBBLIGATORIA:
   - In ciascuna risposta (in particolare per le Gemme Spirituali), DEVI citare esplicitamente il capitolo e versetto biblico di riferimento (es. "Salmo 110:3", "Salmo 112:7", "Proverbi 3:5, 6").
   - Nel testo di "directAnswer" e "expandedComment", menziona ed evidenzia sempre il versetto (es. «In Salmo 110:3, notiamo che...» o «Come insegna Proverbi 3:5...»).
   - Nel campo "linkedScripture", fornisci SEMPRE "reference" (es. "Salmo 110:3") e "explanation" dettagliata.
2. FEDELTÀ A WOL.JW.ORG:
   - Tutte le spiegazioni dottrinali ed esegetiche devono essere rigorosamente conformi alle pubblicazioni ufficiali di wol.jw.org.
3. FORMATO DELLE RISPOSTE:
   - "directAnswer": Risposta concisa, chiara e diretta (20-30 secondi) citando il versetto, ideale per la prima persona che alza la mano.
   - "expandedComment": Commento più articolato (45-60 secondi) che spiega il "perché", include il ragionamento biblico e l'applicazione teocratica del versetto.
   - "practicalApplication": Come questo versetto si applica nella vita quotidiana, nella famiglia o nel ministero di campo.
   - "keyWordsToHighlight": 2-3 parole chiave inclusa la scrittura di riferimento.

Restituisci SOLO un JSON valido.`;

    const response = await generateContentWithRetry({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction: WOL_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            partTitle: { type: Type.STRING },
            summaryAdvice: { type: Type.STRING },
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  questionOrParagraph: { type: Type.STRING },
                  paragraphNumber: { type: Type.INTEGER },
                  directAnswer: { type: Type.STRING },
                  expandedComment: { type: Type.STRING },
                  practicalApplication: { type: Type.STRING },
                  linkedScripture: {
                    type: Type.OBJECT,
                    properties: {
                      reference: { type: Type.STRING },
                      explanation: { type: Type.STRING }
                    },
                    required: ["reference", "explanation"]
                  },
                  keyWordsToHighlight: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  wolSourceCitation: { type: Type.STRING }
                },
                required: ["questionOrParagraph", "directAnswer", "expandedComment", "practicalApplication"]
              }
            }
          },
          required: ["partTitle", "items"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({ success: true, data: parsed });
  } catch (err: any) {
    console.warn("[AI generate-comments fallback activated due to API demand/error]:", err?.message || err);
    const fallbackComments = generateFallbackComments({
      partTitle: partTitle || "Parte dell'Adunanza",
      section: section || "Programma",
      sourceText,
      questions,
      paragraphs,
      stylePreference,
      assignedScriptures,
      bibleReading
    });
    return res.json({ success: true, data: fallbackComments, isFallback: true });
  }
});

// API: Deep Research strictly based on wol.jw.org
app.post("/api/ai/deep-research", async (req, res) => {
  const { topic, contextPart, scriptures, researchGoal } = req.body;

  try {
    // First search WOL for actual search result references
    const searchResults = await searchWol(topic);

    const prompt = `Esegui una ricerca biblica approfondita sull'argomento "${topic}" basandoti ESCLUSIVAMENTE sulle pubblicazioni disponibili sulla Watchtower ONLINE LIBRARY (wol.jw.org).

CONTESTO DELL'ADUNANZA:
- Parte di riferimento: "${contextPart || ""}"
- Scritture collegate: ${JSON.stringify(scriptures || [])}
- Obiettivo specifico della ricerca: "${researchGoal || "Approfondire il contesto storico, le lingue originali e l'applicazione teocratica"}"

RISULTATI DI RICERCA DA WOL.JW.ORG (Usa questi come basi primarie):
${JSON.stringify(searchResults)}

STRUTTURA DELL'APPROFONDIMENTO:
1. Sintesi teologica e dottrinale secondo le pubblicazioni Watch Tower.
2. Contesto storico, culturale e geografico (da *Perspicacia nello studio delle Scritture* o *La Torre di Guardia*).
3. Significato dei termini in lingua originale (ebraico o greco) spiegati nelle pubblicazioni JW.
4. Riferimenti incrociati e scritture parallele da considerare.
5. Punti pratici e meditazioni per la vita del cristiano.
6. Elenco puntuale degli articoli e volumi di riferimento su wol.jw.org.

Restituisci SOLO un JSON valido.`;

    const response = await generateContentWithRetry({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction: WOL_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topic: { type: Type.STRING },
            executiveSummary: { type: Type.STRING },
            historicalAndCulturalBackground: { type: Type.STRING },
            originalLanguageNuances: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  term: { type: Type.STRING },
                  language: { type: Type.STRING },
                  literalMeaning: { type: Type.STRING },
                  theologicalSignificance: { type: Type.STRING }
                },
                required: ["term", "language", "literalMeaning", "theologicalSignificance"]
              }
            },
            keyScripturalCrossReferences: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  scripture: { type: Type.STRING },
                  connectionExplanation: { type: Type.STRING }
                },
                required: ["scripture", "connectionExplanation"]
              }
            },
            spiritualLessonsAndApplications: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            wolArticlesCited: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  publication: { type: Type.STRING },
                  relevance: { type: Type.STRING },
                  wolUrl: { type: Type.STRING }
                },
                required: ["title", "publication", "relevance"]
              }
            }
          },
          required: [
            "topic",
            "executiveSummary",
            "historicalAndCulturalBackground",
            "originalLanguageNuances",
            "keyScripturalCrossReferences",
            "spiritualLessonsAndApplications",
            "wolArticlesCited"
          ]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({ success: true, research: parsed });
  } catch (err: any) {
    console.warn("[AI deep-research fallback activated due to API demand/error]:", err?.message || err);
    const fallbackResearch = generateFallbackResearch({
      topic: topic || "Approfondimento Biblico",
      contextPart,
      scriptures,
      researchGoal
    });
    return res.json({ success: true, research: fallbackResearch, isFallback: true });
  }
});

export { app };
export default app;

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Assistente Adunanze WOL running on http://localhost:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

