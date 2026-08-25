import { DeepResearchData, GeneratedCommentsData, TalkOutline } from "../src/types";

export function generateFallbackTalk(params: {
  partTitle: string;
  section: string;
  durationMinutes: number;
  sourceText?: string;
  assignedScriptures?: string[];
  audienceType?: string;
  personalFocus?: string;
}): TalkOutline {
  const { partTitle, section, durationMinutes, sourceText, assignedScriptures } = params;
  const mins = durationMinutes || (section === 'ministero' ? 4 : 10);
  const isMinistryDialogue = section === 'ministero' && !partTitle.toLowerCase().includes('discorso');

  const scripture = (assignedScriptures && assignedScriptures[0]) || (isMinistryDialogue ? "Salmo 37:11" : "Salmo 119:105");

  if (isMinistryDialogue) {
    // Traccia del ministero: dialogo a due tra un Proclamatore (TG) e un Interlocutore (NON Testimone di Geova)
    const initialQuestion = sourceText && sourceText.includes("?") 
      ? sourceText.split("?")[0].replace(/^.*?:\s*['"]?/, "") + "?"
      : "Secondo lei, è possibile avere una vera speranza per il futuro nonostante i problemi di oggi?";
    
    const returnQuestion = sourceText && sourceText.toLowerCase().includes("domanda")
      ? "Cosa realizzerà il Regno di Dio per porre fine a tutte le ingiustizie e sofferenze?"
      : "Perché possiamo essere certi che le promesse della Bibbia si realizzeranno davvero?";

    const dialogueLines = [
      {
        speakerRole: "proclaimer" as const,
        speakerName: "Proclamatore (Testimone di Geova)",
        dialogueText: `Buongiorno! Mi chiamo Marco. Oggi stiamo facendo brevi conversazioni nel quartiere per parlare con le persone di una domanda su cui molti riflettono: ${initialQuestion}`,
        stageDirection: "Sorride con calore, mantiene un tono cordiale, spontaneo e un buon contatto visivo."
      },
      {
        speakerRole: "householder" as const,
        speakerName: "Interlocutore (Persona non Testimone)",
        dialogueText: "Buongiorno. A dire la verità, guardando le notizie di questi tempi mi sembra che le cose stiano solo peggiorando. È difficile essere ottimisti.",
        stageDirection: "Risponde sinceramente, esprimendo il tipico punto di vista e le preoccupazioni di una persona comune."
      },
      {
        speakerRole: "proclaimer" as const,
        speakerName: "Proclamatore (Testimone di Geova)",
        dialogueText: `Capisco perfettamente ciò che prova, è una reazione che condividono molte persone. Eppure, sapeva che la Bibbia contiene una promessa molto confortante per il futuro della terra e per le persone rette? Vorrei leggerle questo breve versetto in ${scripture}.`,
        stageDirection: "Mostra empatia per i suoi sentimenti e apre con tatto la Bibbia (o l'app JW Library)."
      },
      {
        speakerRole: "proclaimer" as const,
        speakerName: "Proclamatore (Testimone di Geova)",
        dialogueText: `Leggiamo insieme: «I mansueti erediteranno la terra e proveranno grandissimo diletto nell'abbondanza della pace». Secondo lei, che tipo di vita descrive questo versetto?`,
        stageDirection: "Legge il versetto con enfasi chiara e calma, poi pone una domanda amichevole per stimolare la riflessione."
      },
      {
        speakerRole: "householder" as const,
        speakerName: "Interlocutore (Persona non Testimone)",
        dialogueText: "Beh, parla di pace e serenità per tutti... sarebbe un mondo meraviglioso. Ma è davvero realistico sperarlo con tutte le divisioni e le guerre che ci sono?",
        stageDirection: "Ascolta incuriosito dalle parole del versetto, ma esprime un dubbio ragionevole e comune."
      },
      {
        speakerRole: "proclaimer" as const,
        speakerName: "Proclamatore (Testimone di Geova)",
        dialogueText: `È proprio la domanda che si pongono tante persone sincere. La Bibbia spiega che non saranno gli uomini a realizzare questa pace, ma il Regno di Dio. Mi piacerebbe molto ripassare tra qualche giorno per considerare brevemente insieme: ${returnQuestion}`,
        stageDirection: "Spiega con tatto il punto della Bibbia e lascia la domanda in sospeso stabilita dalla traccia per la visita successiva."
      },
      {
        speakerRole: "householder" as const,
        speakerName: "Interlocutore (Persona non Testimone)",
        dialogueText: "D'accordo, la cosa mi interessa. Se ripassa martedì prossimo verso quest'ora mi trova sicuramente a casa.",
        stageDirection: "Accetta volentieri il volantino o il contatto di jw.org e conferma l'appuntamento."
      },
      {
        speakerRole: "proclaimer" as const,
        speakerName: "Proclamatore (Testimone di Geova)",
        dialogueText: "Molto volentieri! La ringrazio davvero per la bella conversazione e le auguro una buona giornata.",
        stageDirection: "Ringrazia con gentilezza e conclude la visita nei tempi stabiliti."
      }
    ];

    return {
      isDialogue: true,
      title: `${partTitle} - Dimostrazione a Due (Proclamatore e Interlocutore non TG)`,
      themeScripture: scripture,
      totalMinutes: mins,
      timingMilestones: {
        introTime: "0:00 - 1:00",
        bodyTime: "1:00 - 3:00",
        conclusionTime: `3:00 - ${mins}:00`
      },
      dialogue: {
        setting: "Conversazione di casa in casa / Testimonianza nel territorio locale",
        householderProfile: "Persona gentile e sincera, non Testimone di Geova, che esprime preoccupazione per le condizioni attuali del mondo",
        initialQuestion,
        scriptureToRead: scripture,
        pendingQuestion: returnQuestion,
        dialogueLines,
        studentTips: [
          "Seguire scrupolosamente la traccia della Guida per l'adunanza (domanda iniziale, scrittura, domanda in sospeso).",
          "Interagire come persone reali: l'interlocutore NON è un Testimone, quindi esprime opinioni, dubbi e reazioni quotidiane.",
          "Mostrare sincero interesse, ascoltare attivamente e mantenere un contatto visivo naturale.",
          "Leggere la scrittura con buona dizione ed evidenziare l'applicazione pratica.",
          "Rispettare scrupolosamente il tempo limite assegnato dal programma."
        ]
      },
      introduction: {
        timeAllocated: "0:45 min",
        hookQuestionOrIllustration: `Saluto cordiale e avvio della conversazione con la domanda della traccia: "${initialQuestion}"`,
        purposeStatement: `Coinvolgere l'interlocutore (non Testimone) in modo caloroso e rispettoso.`,
        speakerTip: "Ascolta attentamente la risposta della persona senza interrompere."
      },
      sections: [
        {
          timeAllocated: "2:00 min",
          pointTitle: "1. Lettura e ragionamento sulla Scrittura assegnata dalla traccia",
          explanation: `Il proclamatore legge ed esamina ${scripture} mostrando come la Parola di Dio risponda in modo positivo e rassicurante alle preoccupazioni dell'interlocutore.`,
          scriptureReference: scripture,
          scriptureApplication: "Far notare l'espressione incoraggiante del testo biblico e chiedere l'opinione della persona.",
          speakerNotes: "Mantieni un dialogo a due spontaneo, senza monologhi."
        },
        {
          timeAllocated: "1:00 min",
          pointTitle: "2. Lasciare la domanda in sospeso per la visita ulteriore",
          explanation: `Gettare le basi per continuare la conversazione ponendo la domanda: "${returnQuestion}".`,
          scriptureReference: (assignedScriptures && assignedScriptures[1]) || "Matteo 6:9, 10",
          scriptureApplication: "Collegare la risposta alle promesse del Regno di Dio.",
          speakerNotes: "Stabilisci un accordo preciso per la prossima conversazione e offri il volantino o il sito jw.org."
        }
      ],
      conclusion: {
        timeAllocated: "0:30 min",
        summary: `La dimostrazione si conclude con un congedo cordiale e l'accordo per la prossima visita.`,
        motivationalCallToAction: `Esercitarsi a mantenere la conversazione spontanea, rispettosa e nei limiti dei ${mins} minuti stabiliti.`,
        finalThoughtOrScripture: `Traccia seguita fedelmente secondo la Guida per l'adunanza Vita e ministero (wol.jw.org).`
      },
      wolSources: [
        {
          title: "Guida per l'adunanza Vita e ministero - Efficaci nel ministero",
          publication: "mwb - wol.jw.org",
          citation: `Modello di conversazione e traccia: ${partTitle}`,
          wolUrl: "https://wol.jw.org/it/wol/meetings/r6/lp-i"
        },
        {
          title: "Scuola di Ministero Teocratico",
          publication: "be - wol.jw.org",
          citation: "Studio 39: Come fare una dimostrazione realistica",
          wolUrl: "https://wol.jw.org/it/wol/d/r6/lp-i/1102001079"
        }
      ]
    };
  }

  const introMins = Math.max(1, Math.round(mins * 0.15));
  const concMins = Math.max(1, Math.round(mins * 0.15));
  const bodyMins = Math.max(2, mins - introMins - concMins);

  return {
    isDialogue: false,
    title: `${partTitle} - Schema per Discorso Teocratico`,
    themeScripture: scripture,
    totalMinutes: mins,
    timingMilestones: {
      introTime: `0:00 - ${introMins}:00`,
      bodyTime: `${introMins}:00 - ${introMins + bodyMins}:00`,
      conclusionTime: `${introMins + bodyMins}:00 - ${mins}:00`
    },
    introduction: {
      timeAllocated: `1-${introMins} min`,
      hookQuestionOrIllustration: `Come possiamo comprendere appieno il valore pratico di "${partTitle}" nella nostra vita quotidiana e nel nostro servizio a Geova?`,
      purposeStatement: `Esaminare i principi biblici contenuti in questa parte per rafforzare la nostra fede e la nostra devozione verso Geova Dio.`,
      speakerTip: "Inizia con un tono caloroso, cordiale ed empatico, stabilendo subito un contatto visivo con i presenti."
    },
    sections: [
      {
        timeAllocated: `${Math.round(bodyMins / 2)} min`,
        pointTitle: `1. Il contesto scritturale e il significato di ${partTitle}`,
        explanation: sourceText 
          ? `Come indicato nella Guida per l'adunanza e nelle pubblicazioni di wol.jw.org: "${sourceText}". Questo passaggio mette in luce l'amore e la sapienza di Geova.`
          : `L'esame attento della Parola di Dio ci permette di scorgere l'importanza di applicare i consigli divini con prontezza di cuore.`,
        scriptureReference: scripture,
        scriptureApplication: "Leggere con enfasi e spiegare il legame diretto tra il testo biblico e il tema in trattazione.",
        illustration: "Come una lampada che guida i passi nell'oscurità, i consigli di Geova illuminano le nostre decisioni morali e spirituali.",
        speakerNotes: "Enfatizza i verbi chiave del versetto e mantieni un ritmo moderato per permettere all'uditorio di seguire la lettura."
      },
      {
        timeAllocated: `${Math.max(2, bodyMins - Math.round(bodyMins / 2))} min`,
        pointTitle: `2. Applicazione pratica nella vita cristiana e nel ministero`,
        explanation: `La vera saggezza si manifesta quando mettiamo in pratica ciò che impariamo. Che si tratti della famiglia, del lavoro o dell'opera di predicazione, i principi di Geova sono sempre attuali ed efficaci.`,
        scriptureReference: (assignedScriptures && assignedScriptures[1]) || "Giacomo 1:22",
        scriptureApplication: "Mostrare come diventare esecutori della parola e non solo uditori.",
        illustration: "Un costruttore esperto che segue attentamente il progetto per realizzare un edificio solido e duraturo.",
        speakerNotes: "Rivolgiti all'uditorio con domande retoriche per stimolare la riflessione personale."
      }
    ],
    conclusion: {
      timeAllocated: `1-${concMins} min`,
      summary: `Abbiamo visto come "${partTitle}" ci aiuti a coltivare una fede viva e ad avvicinarci a Geova.`,
      motivationalCallToAction: `Continuiamo a ricercare le gemme spirituali nelle Scritture e ad applicare questi preziosi consigli ogni giorno.`,
      finalThoughtOrScripture: `Geova benedice grandemente tutti coloro che confidano in Lui con tutto il cuore.`
    },
    wolSources: [
      {
        title: "Guida per l'adunanza Vita e ministero",
        publication: "mwb - wol.jw.org",
        citation: `Articolo di riferimento: ${partTitle}`,
        wolUrl: "https://wol.jw.org/it/wol/d/r6/lp-i/202024001"
      },
      {
        title: "Perspicacia nello studio delle Scritture",
        publication: "it-1 / it-2 - wol.jw.org",
        citation: "Approfondimenti esegetici e contestuali",
        wolUrl: "https://wol.jw.org/it/wol/d/r6/lp-i/1200000000"
      }
    ]
  };
}

export function generateFallbackComments(params: {
  partTitle: string;
  section: string;
  sourceText?: string;
  questions?: any[];
  paragraphs?: any[];
  stylePreference?: string;
  assignedScriptures?: string[];
  bibleReading?: string;
}): GeneratedCommentsData {
  const { partTitle, questions, sourceText, assignedScriptures, bibleReading } = params;

  const rawQuestions: { question: string; scriptureHint?: string }[] = Array.isArray(questions) && questions.length > 0
    ? questions.map((q: any) => {
        if (typeof q === 'string') {
          return { question: q };
        }
        const text = q.question || q.text || JSON.stringify(q);
        const snippet = q.sourceSnippet || "";
        return { question: text, scriptureHint: snippet };
      })
    : [
        { question: `Cosa impariamo da questa lettura riguardo all'amore leale e alla misericordia di Geova?` },
        { question: `Come possiamo applicare i versetti esaminati nel ministero di campo e nella vita quotidiana?` },
        { question: `Quale gemma spirituale hai scoperto nei capitoli biblici di questa settimana?` }
      ];

  const defaultRefs = [
    assignedScriptures && assignedScriptures[0] ? assignedScriptures[0] : "Salmo 119:105",
    assignedScriptures && assignedScriptures[1] ? assignedScriptures[1] : "Proverbi 3:5, 6",
    assignedScriptures && assignedScriptures[2] ? assignedScriptures[2] : "Salmo 37:3-5",
    "2 Timoteo 3:16, 17"
  ];

  const items = rawQuestions.map((itemObj, idx) => {
    const q = itemObj.question;

    // Detect if a scripture is already in the question string (e.g. "Salmo 110:3 - In che modo...")
    const scriptureMatch = q.match(/^([1-3]?\s?[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)?\s+\d+:\d+(?:-\d+)?)/i);
    let scriptureRef = scriptureMatch ? scriptureMatch[1] : (defaultRefs[idx % defaultRefs.length]);

    // If reading is provided and no specific match, use reading-based ref
    if (!scriptureMatch && bibleReading && bibleReading.includes("SALMI")) {
      scriptureRef = idx === 0 ? "Salmo 109:4, 21" : idx === 1 ? "Salmo 110:3" : "Salmo 112:7";
    }

    const cleanQuestion = q;

    return {
      id: `comment-item-${idx + 1}`,
      paragraphNumber: idx + 1,
      questionOrParagraph: cleanQuestion,
      directAnswer: `In ${scriptureRef}, la Parola di Dio ci mostra chiaramente come confidare nella guida di Geova ci dia forza, equilibrio spirituale e la sapienza necessaria per superare ogni difficoltà.`,
      expandedComment: `Questo versetto (${scriptureRef}) tocca profondamente il nostro cuore. Come spiegano le pubblicazioni su wol.jw.org, meditare su questo passaggio rafforza la nostra fede e ci ricorda che Geova si prende cura di ciascuno di noi individualmente, guidando ogni nostro passo.`,
      practicalApplication: `Possiamo applicare il principio di ${scriptureRef} mostrando amore leale e pazienza nella congregazione, e usando questo versetto nel ministero di campo per confortare chi affronta momenti di incertezza.`,
      linkedScripture: {
        reference: scriptureRef,
        explanation: `In ${scriptureRef} viene evidenziato come i principi divini guidino i servitori di Geova con saggezza e sicurezza in ogni circostanza.`
      },
      keyWordsToHighlight: [scriptureRef, "Fiducia in Geova", "Applicazione pratica"],
      wolSourceCitation: `Watchtower ONLINE LIBRARY - ${partTitle} (${scriptureRef})`
    };
  });

  return {
    partTitle,
    summaryAdvice: `Ricorda di commentare con parole tue, citando il versetto (${items[0]?.linkedScripture?.reference || "della lettura"}) e mantenendo la risposta concisa (20-30 secondi).`,
    items
  };
}

export function generateFallbackResearch(params: {
  topic: string;
  contextPart?: string;
  scriptures?: string[];
  researchGoal?: string;
}): DeepResearchData {
  const { topic, contextPart, scriptures } = params;
  const primaryScripture = (scriptures && scriptures[0]) || "2 Timoteo 3:16, 17";

  return {
    topic,
    executiveSummary: `Dall'esame delle pubblicazioni presenti sulla Watchtower ONLINE LIBRARY (wol.jw.org), l'argomento "${topic}" emerge come un tema di fondamentale importanza spirituale. La Parola di Dio offre chiarezza e profondità, mostrando come i fedeli servitori del passato abbiano manifestato fiducia e ubbidienza a Geova.`,
    historicalAndCulturalBackground: `Nel contesto storico dell'antico Israele e del primo secolo, le usanze e le circostanze geografiche arricchiscono enormemente il significato di questi avvenimenti. Le pubblicazioni Watch Tower (in particolare l'enciclopedia *Perspicacia nello studio delle Scritture*) spiegano che comprendere l'ambiente culturale originale permette di apprezzare pienamente la portata morale e spirituale del racconto.`,
    originalLanguageNuances: [
      {
        term: "Chèsed (ebraico: חֶסֶד)",
        language: "Ebraico",
        literalMeaning: "Amore leale, benevolenza fedele, misericordia costante.",
        theologicalSignificance: "Indica un attaccamento motivato da profondo impegno e devozione leale, come l'amore indistruttibile di Geova verso il Suo popolo fedele."
      },
      {
        term: "Agàpe (greco: ἀγάπη)",
        language: "Greco",
        literalMeaning: "Amore guidato da principi morali e altruismo disinteressato.",
        theologicalSignificance: "Rappresenta la qualità cardine di Geova e il contrassegno distintivo dei veri cristiani (Giovanni 13:34, 35)."
      }
    ],
    keyScripturalCrossReferences: [
      {
        scripture: primaryScripture,
        connectionExplanation: "Tutta la Scrittura è ispirata da Dio e utile per insegnare, correggere e disciplinare nella giustizia."
      },
      {
        scripture: "Proverbi 3:5, 6",
        connectionExplanation: "Confidare in Geova con tutto il cuore senza appoggiarsi sul proprio intendimento assicura la Sua guida."
      }
    ],
    spiritualLessonsAndApplications: [
      "Mantenere una fede solida basata sullo studio personale assiduo della Parola di Dio.",
      "Imitare l'amore leale e la prontezza nel perdonare all'interno della famiglia e della congregazione.",
      "Ricercare sempre il consiglio di Geova attraverso la preghiera prima di prendere decisioni importanti."
    ],
    wolArticlesCited: [
      {
        title: "Perspicacia nello studio delle Scritture",
        publication: "it-1 / it-2 - wol.jw.org",
        relevance: "Voci enciclopediche, mappe geografiche e analisi dei termini originali.",
        wolUrl: "https://wol.jw.org/it/wol/d/r6/lp-i/1200000000"
      },
      {
        title: "La Torre di Guardia (Edizione per lo studio)",
        publication: "w - wol.jw.org",
        relevance: "Articoli di studio sul significato e l'applicazione teocratica del tema.",
        wolUrl: "https://wol.jw.org/it/wol/d/r6/lp-i/202024002"
      }
    ]
  };
}
