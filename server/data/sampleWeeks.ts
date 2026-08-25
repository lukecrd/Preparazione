export interface WolPartRaw {
  id: string;
  section: 'tesori' | 'ministero' | 'vita' | 'torre';
  title: string;
  duration: number; // minutes
  songNumber?: number;
  assignedScriptures: string[];
  themeScripture?: string;
  sourceText: string;
  wolUrl: string;
  type: 'talk' | 'gems' | 'reading' | 'conversation' | 'demonstration' | 'congregation_study' | 'watchtower' | 'custom';
  questions?: { question: string; paragraphNum?: number; sourceSnippet?: string }[];
  paragraphs?: { num?: number; text: string; question?: string }[];
}

export interface WolMeetingWeek {
  id: string;
  weekLabel: string;
  dateRange: string;
  bibleReading: string;
  openingSong: { number: number; title: string };
  middleSong: { number: number; title: string };
  concludingSong: { number: number; title: string };
  mwbWolUrl: string;
  watchtowerWolUrl: string;
  parts: WolPartRaw[];
  watchtowerStudy: {
    title: string;
    themeScripture: string;
    song: { number: number; title: string };
    concludingSong: { number: number; title: string };
    summary: string;
    wolUrl: string;
    paragraphs: { num: number; text: string; question: string }[];
  };
  isCurrent?: boolean;
}

export const SAMPLE_WOL_WEEKS: WolMeetingWeek[] = [
  {
    "id": "2026-W35",
    "weekLabel": "24-30 AGOSTO",
    "dateRange": "24-30 agosto",
    "bibleReading": "GEREMIA 29-30",
    "openingSong": {
      "number": 12,
      "title": "Cantico 12 e preghiera | Commenti introduttivi (1 min)"
    },
    "middleSong": {
      "number": 3,
      "title": "Cantico 3"
    },
    "concludingSong": {
      "number": 156,
      "title": "Commenti conclusivi (3 min) | Cantico 156 e preghiera"
    },
    "mwbWolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026248",
    "watchtowerWolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/2026444",
    "isCurrent": true,
    "parts": [
      {
        "id": "2026-W35-1",
        "section": "tesori",
        "title": "1. Geova disciplina i suoi servitori nella giusta misura",
        "duration": 10,
        "assignedScriptures": [
          "GEREMIA 29-30"
        ],
        "sourceText": "1. Geova disciplina i suoi servitori nella giusta misura\n\n\n(10 min)\n\nGli ebrei pentiti avrebbero cercato Geova con tutto il cuore (Ger 29:12, 13; jr 114 par. 3)\nGeova li avrebbe fatti tornare nel loro paese (Ger 29:14)\nNon li avrebbe sterminati, ma li avrebbe disciplinati “nella giusta misura” (Ger 30:11; Eb 12:6; jr 168 par. 2)\n\n\n\n\n\n\n\nRIFLETTI: Come dovremmo reagire quando veniamo disciplinati da Geova? (w22.11 21 par. 6).",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026248",
        "type": "talk"
      },
      {
        "id": "2026-W35-2",
        "section": "tesori",
        "title": "2. Gemme spirituali",
        "duration": 10,
        "assignedScriptures": [
          "GEREMIA 29-30",
          "\n\nGer 30:11"
        ],
        "sourceText": "(10 min)\n\nGer 30:11 — In che modo i genitori possono imitare Geova quando disciplinano i figli? (w14 1/7 12 parr. 1-4)\n\nLa tua risposta\n\n\n\nNella lettura biblica di questa settimana quali gemme spirituali avete trovato?\n\nLa tua risposta",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026248",
        "type": "gems",
        "questions": [
          {
            "question": "Ger 30:11 — In che modo i genitori possono imitare Geova quando disciplinano i figli? (w14 1/7 12 parr. 1-4)",
            "sourceSnippet": "Ger 30:11 — In che modo i genitori possono imitare Geova quando disciplinano i figli? (w14 1/7 12 parr. 1-4)"
          },
          {
            "question": "Nella lettura biblica di questa settimana quali gemme spirituali avete trovato?",
            "sourceSnippet": "Nella lettura biblica di questa settimana quali gemme spirituali avete trovato?"
          }
        ]
      },
      {
        "id": "2026-W35-3",
        "section": "tesori",
        "title": "3. Lettura biblica",
        "duration": 4,
        "assignedScriptures": [
          "GEREMIA 29-30",
          " Ger 30:1-11"
        ],
        "sourceText": "(4 min) Ger 30:1-11 (th lezione 2)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026248",
        "type": "reading"
      },
      {
        "id": "2026-W35-4",
        "section": "ministero",
        "title": "4. Iniziare una conversazione",
        "duration": 4,
        "assignedScriptures": [
          "GEREMIA 29-30"
        ],
        "sourceText": "(4 min) DI CASA IN CASA. Inizia una conversazione usando l’argomento scelto per la campagna di settembre e offri un corso biblico. (lmd lezione 3 punto 4)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026248",
        "type": "demonstration"
      },
      {
        "id": "2026-W35-5",
        "section": "ministero",
        "title": "5. Iniziare una conversazione",
        "duration": 3,
        "assignedScriptures": [
          "GEREMIA 29-30"
        ],
        "sourceText": "(3 min) TESTIMONIANZA PUBBLICA. Inizia una conversazione usando l’argomento scelto per la campagna di settembre. (lmd lezione 1 punto 5)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026248",
        "type": "demonstration"
      },
      {
        "id": "2026-W35-6",
        "section": "ministero",
        "title": "6. Discorso",
        "duration": 5,
        "assignedScriptures": [
          "GEREMIA 29-30",
          " Geremia 29:11"
        ],
        "sourceText": "(5 min) ijwbv articolo 6. Tema: Qual è il significato di Geremia 29:11? (th lezione 1)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026248",
        "type": "talk"
      },
      {
        "id": "2026-W35-7",
        "section": "vita",
        "title": "7. Geova dà speranza ai suoi servitori",
        "duration": 10,
        "assignedScriptures": [
          "GEREMIA 29-30",
          "Ger 29:10",
          "Pr 17:22"
        ],
        "sourceText": "(10 min) Trattazione.\n\nGeova promise agli ebrei che erano in esilio in Babilonia che un giorno avrebbero fatto ritorno nel loro paese (Ger 29:10). La triste situazione in cui si trovavano avrebbe avuto fine. Come nel caso di quegli ebrei, le promesse di Dio hanno effetti positivi sui di noi non solo quando si realizzano: ci danno anche una speranza che può aiutarci mentre attendiamo che quelle promesse diventino realtà.\n  La speranza produce effetti positivi sulla nostra salute (Pr 17:22)\n\n  La speranza può darci forza quando siamo scoraggiati (Pr 24:10)\n\n  La speranza può darci stabilità in un mondo instabile (Eb 6:19)\n\nFai vedere il VIDEO Pace universale, presto una realtà! | Non perdiamo mai la speranza. Poi chiedi:\n  Cosa possiamo imparare da questo video?\n\nLa tua risposta",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026248",
        "type": "talk"
      },
      {
        "id": "2026-W35-8",
        "section": "vita",
        "title": "8. Campagna speciale a settembre",
        "duration": 5,
        "assignedScriptures": [
          "GEREMIA 29-30"
        ],
        "sourceText": "(5 min) Discorso del sorvegliante del servizio. Genera entusiasmo per la campagna e spiega cosa è stato disposto a livello locale.",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026248",
        "type": "talk"
      },
      {
        "id": "2026-W35-9",
        "section": "vita",
        "title": "9. Studio biblico di congregazione",
        "duration": 30,
        "assignedScriptures": [
          "GEREMIA 29-30"
        ],
        "sourceText": "(30 min) wcg cap. 5",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026248",
        "type": "congregation_study"
      }
    ],
    "watchtowerStudy": {
      "title": "Il gruppo di servizio: una disposizione da sfruttare al massimo",
      "themeScripture": "“Loderò Geova con tutto il cuore in mezzo ai giusti radunati e nella congregazione” (SAL. 111:1)",
      "song": {
        "number": 65,
        "title": "CANTICO 65 Avanziamo!"
      },
      "concludingSong": {
        "number": 61,
        "title": "CANTICO 61 Testimoni, avanti!"
      },
      "summary": "Articolo di studio della Torre di Guardia per la settimana del 24-30 AGOSTO.",
      "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/2026444",
      "paragraphs": [
        {
          "num": 3,
          "text": "3. Cosa vedremo in questo articolo?",
          "question": "Domanda paragrafo 3"
        },
        {
          "num": 4,
          "text": "4. (a) Qual è la principale responsabilità del sorvegliante del gruppo di servizio? (b) In che modo il sorvegliante del gruppo si prende cura dei componenti del suo gruppo? (Vedi il riquadro “Suggerimenti per il sorvegliante del gruppo”.)",
          "question": "Domanda paragrafo 4"
        },
        {
          "num": 5,
          "text": "5. Quali difficoltà affrontano alcuni sorveglianti dei gruppi?",
          "question": "Domanda paragrafo 5"
        },
        {
          "num": 6,
          "text": "6. Perché se i gruppi di servizio sono piccoli i sorveglianti dei gruppi riescono meglio a prendersi cura di ciascun componente?",
          "question": "Domanda paragrafo 6"
        },
        {
          "num": 7,
          "text": "7. In una congregazione in cui ci sono pochi anziani, cosa può fare un sorvegliante del gruppo per prendersi cura di tutti i componenti del suo gruppo? (1 Pietro 5:2; vedi anche l’immagine).",
          "question": "Domanda paragrafo 7"
        },
        {
          "num": 8,
          "text": "8. Cosa possiamo fare per contribuire al buon funzionamento del nostro gruppo di servizio? (Romani 1:12).",
          "question": "Domanda paragrafo 8"
        },
        {
          "num": 9,
          "text": "9. Come possiamo contribuire a un’atmosfera affettuosa e calorosa nel nostro gruppo di servizio? (Romani 12:13).",
          "question": "Domanda paragrafo 9"
        },
        {
          "num": 10,
          "text": "10. Cosa potremmo fare se vogliamo migliorare in qualche aspetto del ministero? (Proverbi 1:5; 27:17; vedi anche l’immagine).",
          "question": "Domanda paragrafo 10"
        },
        {
          "num": 13,
          "text": "13. Quali benefìci riceviamo dal punto di vista emotivo quando sosteniamo il nostro gruppo di servizio? (Vedi anche l’immagine.)",
          "question": "Domanda paragrafo 13"
        },
        {
          "num": 14,
          "text": "14. Come ci è di aiuto il nostro gruppo di servizio in caso di disastri o emergenze?",
          "question": "Domanda paragrafo 14"
        },
        {
          "num": 15,
          "text": "15. Quale desiderio unisce tutti quelli che fanno parte dell’organizzazione di Geova?",
          "question": "Domanda paragrafo 15"
        }
      ]
    }
  },
  {
    "id": "2026-W36",
    "weekLabel": "31 AGOSTO – 6 SETTEMBRE",
    "dateRange": "31 agosto – 6 settembre",
    "bibleReading": "GEREMIA 31",
    "openingSong": {
      "number": 27,
      "title": "Cantico 27 e preghiera | Commenti introduttivi (1 min)"
    },
    "middleSong": {
      "number": 67,
      "title": "Cantico 67"
    },
    "concludingSong": {
      "number": 132,
      "title": "Commenti conclusivi (3 min) | Cantico 132 e preghiera"
    },
    "mwbWolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026249",
    "watchtowerWolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/2026445",
    "isCurrent": false,
    "parts": [
      {
        "id": "2026-W36-1",
        "section": "tesori",
        "title": "1. “Concluderò [...] un nuovo patto”",
        "duration": 10,
        "assignedScriptures": [
          "GEREMIA 31"
        ],
        "sourceText": "1. “Concluderò [...] un nuovo patto”\n\n\n(10 min)\n\nGeova promise di sostituire il patto della Legge mosaica con “un nuovo patto”, che avrebbe avuto effetti positivi molto più estesi e duraturi (Ger 31:31, 32; jr 169 par. 4)\nGeova avrebbe stretto il nuovo patto con l’Israele di Dio; quel patto avrebbe provveduto una base legale per il perdono dei peccati (Ger 31:33, 34; jr 172 par. 9)\nGli effetti positivi del nuovo patto si estendono anche ai cristiani che non sono parte dell’Israele di Dio (w10 15/3 27 par. 14; jr 177 par. 18)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026249",
        "type": "talk"
      },
      {
        "id": "2026-W36-2",
        "section": "tesori",
        "title": "2. Gemme spirituali",
        "duration": 10,
        "assignedScriptures": [
          "GEREMIA 31",
          "\n\nGer 31:15"
        ],
        "sourceText": "(10 min)\n\nGer 31:15 — Quali sono alcuni modi in cui viene spiegato l’adempimento di questa profezia? (it “Rama” n. 1 par. 3)\n\nLa tua risposta\n\n\n\nNella lettura biblica di questa settimana quali gemme spirituali avete trovato?\n\nLa tua risposta",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026249",
        "type": "gems",
        "questions": [
          {
            "question": "Ger 31:15 — Quali sono alcuni modi in cui viene spiegato l’adempimento di questa profezia? (it “Rama” n. 1 par. 3)",
            "sourceSnippet": "Ger 31:15 — Quali sono alcuni modi in cui viene spiegato l’adempimento di questa profezia? (it “Rama” n. 1 par. 3)"
          },
          {
            "question": "Nella lettura biblica di questa settimana quali gemme spirituali avete trovato?",
            "sourceSnippet": "Nella lettura biblica di questa settimana quali gemme spirituali avete trovato?"
          }
        ]
      },
      {
        "id": "2026-W36-3",
        "section": "tesori",
        "title": "3. Lettura biblica",
        "duration": 4,
        "assignedScriptures": [
          "GEREMIA 31",
          " Ger 31:1-11"
        ],
        "sourceText": "(4 min) Ger 31:1-11 (th lezione 12)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026249",
        "type": "reading"
      },
      {
        "id": "2026-W36-4",
        "section": "ministero",
        "title": "4. Iniziare una conversazione",
        "duration": 3,
        "assignedScriptures": [
          "GEREMIA 31"
        ],
        "sourceText": "(3 min) DI CASA IN CASA. Usa il metodo diretto per offrire un corso biblico. (lmd lezione 4 punto 3)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026249",
        "type": "demonstration"
      },
      {
        "id": "2026-W36-5",
        "section": "ministero",
        "title": "5. Iniziare una conversazione",
        "duration": 4,
        "assignedScriptures": [
          "GEREMIA 31"
        ],
        "sourceText": "(4 min) TESTIMONIANZA INFORMALE. Usa le informazioni contenute in ijwyp articolo 106 per aiutare un compagno di classe che sta male perché pensa che l’insegnante ce l’abbia con lui. (lmd lezione 3 punto 3)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026249",
        "type": "demonstration"
      },
      {
        "id": "2026-W36-6",
        "section": "ministero",
        "title": "6. Spiegare quello in cui si crede",
        "duration": 5,
        "assignedScriptures": [
          "GEREMIA 31"
        ],
        "sourceText": "(5 min) Discorso. ijwfq articolo 37. Tema: Perché i Testimoni di Geova mantengono la neutralità politica? (th lezione 14)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026249",
        "type": "talk"
      },
      {
        "id": "2026-W36-7",
        "section": "vita",
        "title": "7. Mostriamo flessibilità: usiamo jw.org",
        "duration": 15,
        "assignedScriptures": [
          "GEREMIA 31",
          "Gc 1:19"
        ],
        "sourceText": "(15 min) Trattazione.\n\nPer mostrare flessibilità nel ministero è importante che pensiamo in anticipo alle persone che potremmo incontrare e che ci prepariamo di conseguenza. A volte però potrebbe capitare che qualcuno sposti la conversazione su un argomento che non ci aspettavamo. Cosa può aiutarci in una situazione del genere?\nFai vedere l’estratto del VIDEO “Il ferro affila il ferro” | Fare buon uso di jw.org. Poi ragiona con l’uditorio sulla situazione che segue:\nStai predicando di casa in casa durante la campagna e trovi una persona che ti dice di aver smesso di credere in Dio. La persona ritiene che Dio l’abbia abbandonata quando ha dovuto affrontare una tragedia.\n  Come potresti mostrare empatia per la persona prima di darle testimonianza? (Gc 1:19)\n\nLa tua risposta\n\n\n\n  Quale passo biblico potresti leggerle? Come lo cercheresti su jw.org?\n\nLa tua risposta\n\n\n\n  Se sul momento non ti venisse in mente nessun versetto, quali parole scriveresti nella barra di ricerca per trovare informazioni utili?\n\nLa tua risposta\n\n\n\n  Se non avessi la possibilità di accedere a jw.org o a JW Library®, cosa faresti per aiutare la persona?\n\nLa tua risposta",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026249",
        "type": "talk"
      },
      {
        "id": "2026-W36-8",
        "section": "vita",
        "title": "8. Studio biblico di congregazione",
        "duration": 30,
        "assignedScriptures": [
          "GEREMIA 31"
        ],
        "sourceText": "(30 min) wcg cap. 6",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026249",
        "type": "congregation_study"
      }
    ],
    "watchtowerStudy": {
      "title": "Prestiamo attenzione al modo in cui ascoltiamo",
      "themeScripture": "“Prestate attenzione a come ascoltate” (LUCA 8:18)",
      "song": {
        "number": 89,
        "title": "CANTICO 89 Felice chi mette in pratica ciò che ode"
      },
      "concludingSong": {
        "number": 87,
        "title": "CANTICO 87 Venite, e sarete ristorati!"
      },
      "summary": "Articolo di studio della Torre di Guardia per la settimana del 31 AGOSTO – 6 SETTEMBRE.",
      "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/2026445",
      "paragraphs": [
        {
          "num": 3,
          "text": "3. Come ci parla Geova, e in che modo i suoi servitori fanno buon uso della sua Parola?",
          "question": "Domanda paragrafo 3"
        },
        {
          "num": 4,
          "text": "4. Che idea trasmettono i verbi “udire” e “ascoltare” nella Bibbia?",
          "question": "Domanda paragrafo 4"
        },
        {
          "num": 5,
          "text": "5. Cosa ci spinge a fare l’amore per Geova? (Giovanni 4:23, 24; 1 Giovanni 5:3).",
          "question": "Domanda paragrafo 5"
        },
        {
          "num": 6,
          "text": "6. In che modo alle adunanze ci viene insegnato ad aiutare altri?",
          "question": "Domanda paragrafo 6"
        },
        {
          "num": 7,
          "text": "7. Perché continuare ad ascoltare Geova è di vitale importanza?",
          "question": "Domanda paragrafo 7"
        },
        {
          "num": 8,
          "text": "8. Perché i fratelli che insegnano alle adunanze dovrebbero continuare a migliorare la loro capacità oratoria?",
          "question": "Domanda paragrafo 8"
        },
        {
          "num": 9,
          "text": "9. Perché è importante che un discorso sia facile da seguire?",
          "question": "Domanda paragrafo 9"
        },
        {
          "num": 10,
          "text": "10. Perché è importante lasciarsi coinvolgere dal materiale?",
          "question": "Domanda paragrafo 10"
        },
        {
          "num": 11,
          "text": "11. Perché nei discorsi è utile dare suggerimenti pratici e specifici? (1 Timoteo 4:13-16).",
          "question": "Domanda paragrafo 11"
        },
        {
          "num": 12,
          "text": "12. Perché è meglio parlare in modo naturale quando si pronuncia un discorso?",
          "question": "Domanda paragrafo 12"
        },
        {
          "num": 13,
          "text": "13. Perché chi insegna nella congregazione dovrebbe chiedere consigli a oratori più esperti? (Vedi anche l’immagine.)",
          "question": "Domanda paragrafo 13"
        },
        {
          "num": 14,
          "text": "14. Perché dovremmo coltivare lo stesso atteggiamento che aveva lo scrittore del Salmo 119? (Salmo 119:24, 111, 167).",
          "question": "Domanda paragrafo 14"
        },
        {
          "num": 15,
          "text": "15. Come possiamo continuare a essere grati per il cibo spirituale che riceviamo alle adunanze?",
          "question": "Domanda paragrafo 15"
        },
        {
          "num": 16,
          "text": "16. Cosa aiuta alcuni che servono Geova da tanto tempo a rimanere attenti alle adunanze? (Vedi anche il riquadro “Suggerimenti per stare attenti”.)",
          "question": "Domanda paragrafo 16"
        },
        {
          "num": 17,
          "text": "17. Cosa può aiutarci a rimanere attenti alle adunanze? (Vedi anche l’immagine.)",
          "question": "Domanda paragrafo 17"
        },
        {
          "num": 18,
          "text": "18. Perché dovremmo continuare ad ascoltare alle adunanze?",
          "question": "Domanda paragrafo 18"
        }
      ]
    }
  },
  {
    "id": "2026-W37",
    "weekLabel": "7-13 SETTEMBRE",
    "dateRange": "7-13 settembre",
    "bibleReading": "GEREMIA 32-33",
    "openingSong": {
      "number": 1,
      "title": "Cantico 1 e preghiera | Commenti introduttivi (1 min)"
    },
    "middleSong": {
      "number": 128,
      "title": "Cantico 128"
    },
    "concludingSong": {
      "number": 143,
      "title": "Commenti conclusivi (3 min) | Cantico 143 e preghiera"
    },
    "mwbWolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026252",
    "watchtowerWolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/2026482",
    "isCurrent": false,
    "parts": [
      {
        "id": "2026-W37-1",
        "section": "tesori",
        "title": "1. Riflettere sulle qualità di Geova rafforza la nostra fede",
        "duration": 10,
        "assignedScriptures": [
          "GEREMIA 32-33"
        ],
        "sourceText": "1. Riflettere sulle qualità di Geova rafforza la nostra fede\n\n\n(10 min)\n\nLa potenza di Geova ci convince che lui può aiutarci (Ger 32:17; wp19.1 6 par. 1–7 par. 1)\nL’amore leale di Geova ci dà la certezza che lui vuole aiutarci (Ger 32:18; w21.11 7 par. 18)\nIl senso di giustizia di Geova ci ricorda che lui vede le ingiustizie e farà qualcosa per correggere la situazione (Ger 32:19; w25.10 21 par. 15)\n\n\n\n\n\n\n\nUN’IDEA PER L’ADORAZIONE IN FAMIGLIA: Guardate il VIDEO Comprate un campo ad Anatot. Parlate di quello che Geova chiese di fare a Geremia, di come questo rafforzò la sua fede e di come può rafforzare anche la nostra (Ger 32:6-8).",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026252",
        "type": "talk"
      },
      {
        "id": "2026-W37-2",
        "section": "tesori",
        "title": "2. Gemme spirituali",
        "duration": 10,
        "assignedScriptures": [
          "GEREMIA 32-33",
          "\n\nGer 33:23"
        ],
        "sourceText": "(10 min)\n\nGer 33:23, 24 — A cosa corrispondono “le due famiglie” di cui si parla qui? (w07 15/3 11 par. 4)\n\nLa tua risposta\n\n\n\nNella lettura biblica di questa settimana quali gemme spirituali avete trovato?\n\nLa tua risposta",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026252",
        "type": "gems",
        "questions": [
          {
            "question": "Ger 33:23, 24 — A cosa corrispondono “le due famiglie” di cui si parla qui? (w07 15/3 11 par. 4)",
            "sourceSnippet": "Ger 33:23, 24 — A cosa corrispondono “le due famiglie” di cui si parla qui? (w07 15/3 11 par. 4)"
          },
          {
            "question": "Nella lettura biblica di questa settimana quali gemme spirituali avete trovato?",
            "sourceSnippet": "Nella lettura biblica di questa settimana quali gemme spirituali avete trovato?"
          }
        ]
      },
      {
        "id": "2026-W37-3",
        "section": "tesori",
        "title": "3. Lettura biblica",
        "duration": 4,
        "assignedScriptures": [
          "GEREMIA 32-33",
          " Ger 32:6-18"
        ],
        "sourceText": "(4 min) Ger 32:6-18 (th lezione 2)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026252",
        "type": "reading"
      },
      {
        "id": "2026-W37-4",
        "section": "ministero",
        "title": "4. Iniziare una conversazione",
        "duration": 3,
        "assignedScriptures": [
          "GEREMIA 32-33"
        ],
        "sourceText": "(3 min) DI CASA IN CASA. Offri un corso biblico. (lmd lezione 4 punto 3)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026252",
        "type": "demonstration"
      },
      {
        "id": "2026-W37-5",
        "section": "ministero",
        "title": "5. Iniziare una conversazione",
        "duration": 4,
        "assignedScriptures": [
          "GEREMIA 32-33"
        ],
        "sourceText": "(4 min) TESTIMONIANZA INFORMALE. Offri un corso biblico. (lmd lezione 4 punto 4)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026252",
        "type": "demonstration"
      },
      {
        "id": "2026-W37-6",
        "section": "ministero",
        "title": "6. Coltivare l’interesse",
        "duration": 5,
        "assignedScriptures": [
          "GEREMIA 32-33"
        ],
        "sourceText": "(5 min) DI CASA IN CASA. Offri un corso biblico. (lmd lezione 8 punto 3)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026252",
        "type": "demonstration"
      },
      {
        "id": "2026-W37-7",
        "section": "vita",
        "title": "7. ‘Sferriamo i nostri colpi’ in modo efficace durante la campagna",
        "duration": 15,
        "assignedScriptures": [
          "GEREMIA 32-33",
          "1Co 9:26"
        ],
        "sourceText": "(15 min) Trattazione.\n\nVorresti iniziare uno studio biblico questo mese? Seguendo alcuni semplici suggerimenti, puoi avere più probabilità di iniziarne uno (1Co 9:26). Pensa a quello che abbiamo imparato da un aggiornamento dal Corpo Direttivo che è stato pubblicato durante la campagna per iniziare studi biblici del 2024.\n\nFai vedere l’estratto del VIDEO Aggiornamento dal Corpo Direttivo n. 6 (2024). Poi chiedi:\n  Cosa avete imparato dalle belle esperienze che sono state raccontate nel video?\n\nLa tua risposta\n\n\n\n  Perché dovreste prendervi il tempo per partecipare al ministero di casa in casa durante la campagna?\n\nLa tua risposta\n\n\n\n  Cos’è il metodo diretto, e perché dà spesso buoni risultati?\n\nLa tua risposta\n\n\n\n  Come potete usare al meglio il vostro tempo nel ministero?\n\nLa tua risposta\n\n\n\n\nFai riferimento all’articolo “Una domanda semplice che chiunque può fare” (w25.02 30-31). Poi chiedi:\n  Cosa avete imparato dall’esperienza di Mary?\n\nLa tua risposta\n\n\n\n\n\nFai un elenco di persone che conosci a cui vorresti offrire un corso biblico.\n\nLa tua risposta",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026252",
        "type": "talk"
      },
      {
        "id": "2026-W37-8",
        "section": "vita",
        "title": "8. Studio biblico di congregazione",
        "duration": 30,
        "assignedScriptures": [
          "GEREMIA 32-33"
        ],
        "sourceText": "(30 min) wcg cap. 7",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026252",
        "type": "congregation_study"
      }
    ],
    "watchtowerStudy": {
      "title": "Impariamo dai gabaoniti",
      "themeScripture": "“Gli abitanti di Gabaon avevano fatto pace con gli israeliti ed erano rimasti in mezzo a loro” (GIOS. 10:1)",
      "song": {
        "number": 88,
        "title": "CANTICO 88 Fammi conoscere le tue vie"
      },
      "concludingSong": {
        "number": 148,
        "title": "CANTICO 148 Geova è il nostro liberatore"
      },
      "summary": "Articolo di studio della Torre di Guardia per la settimana del 7-13 SETTEMBRE.",
      "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/2026482",
      "paragraphs": [
        {
          "num": 3,
          "text": "3. (a) Chi erano i gabaoniti? (b) Perché cercarono di fare un accordo di pace con gli israeliti?",
          "question": "Domanda paragrafo 3"
        },
        {
          "num": 4,
          "text": "4. (a) Come si legge in Giosuè 9:8-13, cosa fecero i gabaoniti per ingannare gli israeliti e convincerli a fare un patto di pace? (Vedi anche l’immagine.) (b) Cosa successe quando il loro inganno fu scoperto?",
          "question": "Domanda paragrafo 4"
        },
        {
          "num": 5,
          "text": "5. In quali modi i gabaoniti mostrarono fede in Geova?",
          "question": "Domanda paragrafo 5"
        },
        {
          "num": 6,
          "text": "6. Cosa impariamo riguardo a Geova dal modo in cui trattò i gabaoniti?",
          "question": "Domanda paragrafo 6"
        },
        {
          "num": 7,
          "text": "7. Come possiamo imitare la fede e l’umiltà dei gabaoniti? (Vedi anche l’immagine.)",
          "question": "Domanda paragrafo 7"
        },
        {
          "num": 8,
          "text": "8. Quale crimine commise il re Saul contro i gabaoniti?",
          "question": "Domanda paragrafo 8"
        },
        {
          "num": 9,
          "text": "9. Quando fu affrontata la questione dell’ingiustizia contro i gabaoniti?",
          "question": "Domanda paragrafo 9"
        },
        {
          "num": 10,
          "text": "10. Come si legge in 2 Samuele 21:3-6, in che modo i gabaoniti mostrarono rispetto per la Legge di Dio?",
          "question": "Domanda paragrafo 10"
        },
        {
          "num": 11,
          "text": "11. Cosa impariamo riguardo a Geova da questo episodio?",
          "question": "Domanda paragrafo 11"
        },
        {
          "num": 12,
          "text": "12. Come possiamo imitare i gabaoniti se siamo vittima di un’ingiustizia?",
          "question": "Domanda paragrafo 12"
        },
        {
          "num": 13,
          "text": "13. Chi erano i “netinei”, e cosa fecero una volta finito l’esilio in Babilonia?",
          "question": "Domanda paragrafo 13"
        },
        {
          "num": 14,
          "text": "14. In che modo i gabaoniti dimostrarono la loro lealtà a Geova? (1 Cronache 9:2 e nota in calce).",
          "question": "Domanda paragrafo 14"
        },
        {
          "num": 15,
          "text": "15. Cosa impariamo riguardo a Geova da questo episodio?",
          "question": "Domanda paragrafo 15"
        },
        {
          "num": 16,
          "text": "16. Come possiamo imitare i gabaoniti nella nostra adorazione?",
          "question": "Domanda paragrafo 16"
        },
        {
          "num": 17,
          "text": "17. Cosa abbiamo imparato riesaminando la storia dei gabaoniti?",
          "question": "Domanda paragrafo 17"
        }
      ]
    }
  },
  {
    "id": "2026-W38",
    "weekLabel": "14-20 SETTEMBRE",
    "dateRange": "14-20 settembre",
    "bibleReading": "GEREMIA 34-35",
    "openingSong": {
      "number": 161,
      "title": "Cantico 161 e preghiera | Commenti introduttivi (1 min)"
    },
    "middleSong": {
      "number": 121,
      "title": "Cantico 121"
    },
    "concludingSong": {
      "number": 28,
      "title": "Commenti conclusivi (3 min) | Cantico 28 e preghiera"
    },
    "mwbWolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026253",
    "watchtowerWolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/2026483",
    "isCurrent": false,
    "parts": [
      {
        "id": "2026-W38-1",
        "section": "tesori",
        "title": "1. Geova ricompensa chi è ubbidiente",
        "duration": 10,
        "assignedScriptures": [
          "GEREMIA 34-35"
        ],
        "sourceText": "1. Geova ricompensa chi è ubbidiente\n\n\n(10 min)\n\nMolti ebrei ubbidivano a Geova solo quando avevano bisogno del suo aiuto (Ger 34:8-11; jr 49-50 parr. 13-14)\nI recabiti si attennero strettamente al comando di Gionadab (Ger 35:5, 6; jr 76-77 parr. 17-18)\nGeova ricompensò i recabiti perché furono ubbidienti (Ger 35:18, 19; it “Recabiti” parr. 4-5)\n\nCHIEDITI: “Sono deciso a ubbidire a Geova anche quando penso di potergli disubbidire senza pagarne le conseguenze?”",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026253",
        "type": "talk"
      },
      {
        "id": "2026-W38-2",
        "section": "tesori",
        "title": "2. Gemme spirituali",
        "duration": 10,
        "assignedScriptures": [
          "GEREMIA 34-35",
          "\n\nGer 34:7"
        ],
        "sourceText": "(10 min)\n\nGer 34:7 — Quali prove archeologiche confermano che gli avvenimenti descritti in questo versetto si sono verificati veramente? (it “Archeologia” parr. 27-28)\n\nLa tua risposta\n\n\n\nNella lettura biblica di questa settimana quali gemme spirituali avete trovato?\n\nLa tua risposta",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026253",
        "type": "gems",
        "questions": [
          {
            "question": "Ger 34:7 — Quali prove archeologiche confermano che gli avvenimenti descritti in questo versetto si sono verificati veramente? (it “Archeologia” parr. 27-28)",
            "sourceSnippet": "Ger 34:7 — Quali prove archeologiche confermano che gli avvenimenti descritti in questo versetto si sono verificati veramente? (it “Archeologia” parr. 27-28)"
          },
          {
            "question": "Nella lettura biblica di questa settimana quali gemme spirituali avete trovato?",
            "sourceSnippet": "Nella lettura biblica di questa settimana quali gemme spirituali avete trovato?"
          }
        ]
      },
      {
        "id": "2026-W38-3",
        "section": "tesori",
        "title": "3. Lettura biblica",
        "duration": 4,
        "assignedScriptures": [
          "GEREMIA 34-35",
          " Ger 35:1-14"
        ],
        "sourceText": "(4 min) Ger 35:1-14 (th lezione 5)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026253",
        "type": "reading"
      },
      {
        "id": "2026-W38-4",
        "section": "ministero",
        "title": "4. Iniziare una conversazione",
        "duration": 2,
        "assignedScriptures": [
          "GEREMIA 34-35"
        ],
        "sourceText": "(2 min) DI CASA IN CASA. Offri un corso biblico. (lmd lezione 3 punto 3)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026253",
        "type": "demonstration"
      },
      {
        "id": "2026-W38-5",
        "section": "ministero",
        "title": "5. Iniziare una conversazione",
        "duration": 2,
        "assignedScriptures": [
          "GEREMIA 34-35"
        ],
        "sourceText": "(2 min) DI CASA IN CASA. Offri un corso biblico. Presenta un video del Kit dell’insegnante e parlane con la persona. (lmd lezione 3 punto 5)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026253",
        "type": "demonstration"
      },
      {
        "id": "2026-W38-6",
        "section": "ministero",
        "title": "6. Coltivare l’interesse",
        "duration": 3,
        "assignedScriptures": [
          "GEREMIA 34-35"
        ],
        "sourceText": "(3 min) TESTIMONIANZA INFORMALE. Offri un corso biblico a una persona che in precedenza aveva parlato di un fatto di attualità che la preoccupava. (lmd lezione 7 punto 4)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026253",
        "type": "demonstration"
      },
      {
        "id": "2026-W38-7",
        "section": "ministero",
        "title": "7. Fare discepoli",
        "duration": 4,
        "assignedScriptures": [
          "GEREMIA 34-35"
        ],
        "sourceText": "(4 min) Parla della campagna per iniziare corsi biblici con una persona che studia la Bibbia con te. Chiedile se conosce qualcuno che potrebbe essere interessato a studiare la Bibbia. (th lezione 11)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026253",
        "type": "conversation"
      },
      {
        "id": "2026-W38-8",
        "section": "vita",
        "title": "8. L’autocontrollo ci aiuta a ubbidire",
        "duration": 6,
        "assignedScriptures": [
          "GEREMIA 34-35"
        ],
        "sourceText": "(6 min) Trattazione.\n\nI pensieri negativi possono indebolire la nostra determinazione a fare ciò che è giusto. Quindi è molto importante fare del nostro meglio per tenerli sotto controllo. Ma come possiamo riuscirci?\n\nFai vedere il VIDEO Ricerchiamo ciò che rafforza la lealtà. La padronanza di sé. Poi chiedi:\n  In che modo questo video ci aiuta a capire come vincere i pensieri negativi?\n\nLa tua risposta",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026253",
        "type": "talk"
      },
      {
        "id": "2026-W38-9",
        "section": "vita",
        "title": "9. Risultati raggiunti dall’organizzazione di settembre",
        "duration": 9,
        "assignedScriptures": [
          "GEREMIA 34-35"
        ],
        "sourceText": "(9 min) Trattazione.\n\nFai vedere il VIDEO. Poi fai le domande che compaiono alla fine del video.\n\nLa tua risposta",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026253",
        "type": "talk"
      },
      {
        "id": "2026-W38-10",
        "section": "vita",
        "title": "10. Studio biblico di congregazione",
        "duration": 30,
        "assignedScriptures": [
          "GEREMIA 34-35"
        ],
        "sourceText": "(30 min) wcg cap. 8",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026253",
        "type": "congregation_study"
      }
    ],
    "watchtowerStudy": {
      "title": "Conforto dal libro di Isaia",
      "themeScripture": "Questo è ciò che Geova dice: “Come una madre consola il figlio, così io continuerò a consolare voi” (ISA. 66:12, 13)",
      "song": {
        "number": 41,
        "title": "CANTICO 41 O Dio, ascolta la mia preghiera"
      },
      "concludingSong": {
        "number": 3,
        "title": "CANTICO 3 Tu sei la nostra fiducia, forza e speranza"
      },
      "summary": "Articolo di studio della Torre di Guardia per la settimana del 14-20 SETTEMBRE.",
      "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/2026483",
      "paragraphs": [
        {
          "num": 3,
          "text": "3. Cosa vedremo in questo articolo?",
          "question": "Domanda paragrafo 3"
        },
        {
          "num": 4,
          "text": "4. Come può influire su di noi un cambiamento improvviso?",
          "question": "Domanda paragrafo 4"
        },
        {
          "num": 5,
          "text": "5. Quale certezza ci dà Geova in Isaia 42:16? (Vedi anche l’immagine.)",
          "question": "Domanda paragrafo 5"
        },
        {
          "num": 6,
          "text": "6. Se le nostre circostanze cambiano inaspettatamente, di cosa possiamo essere sicuri?",
          "question": "Domanda paragrafo 6"
        },
        {
          "num": 7,
          "text": "7. Che tipo di combattimento potrebbero avere alcuni a motivo di errori commessi in passato?",
          "question": "Domanda paragrafo 7"
        },
        {
          "num": 10,
          "text": "10. Quale rassicurazione troviamo in Isaia 38:17?",
          "question": "Domanda paragrafo 10"
        },
        {
          "num": 11,
          "text": "11. A prescindere da quello che abbiamo fatto in passato, cosa conta davvero per Geova? (Vedi anche l’immagine.)",
          "question": "Domanda paragrafo 11"
        },
        {
          "num": 12,
          "text": "12. Come potremmo sentirci quando muore qualcuno che amiamo?",
          "question": "Domanda paragrafo 12"
        },
        {
          "num": 13,
          "text": "13. Quale promessa ci fa Geova in Isaia 25:8?",
          "question": "Domanda paragrafo 13"
        },
        {
          "num": 14,
          "text": "14. Cosa provate riflettendo sulla speranza della risurrezione? (Isaia 26:19; vedi anche l’immagine).",
          "question": "Domanda paragrafo 14"
        },
        {
          "num": 15,
          "text": "15. In che modo la promessa della risurrezione ci aiuta ad affrontare il dolore?",
          "question": "Domanda paragrafo 15"
        },
        {
          "num": 16,
          "text": "16. Quale versetto vi ha confortato particolarmente in una situazione difficile?",
          "question": "Domanda paragrafo 16"
        }
      ]
    }
  },
  {
    "id": "2026-W39",
    "weekLabel": "21-27 SETTEMBRE",
    "dateRange": "21-27 settembre",
    "bibleReading": "GEREMIA 36-37",
    "openingSong": {
      "number": 74,
      "title": "Cantico 74 e preghiera | Commenti introduttivi (1 min)"
    },
    "middleSong": {
      "number": 142,
      "title": "Cantico 142"
    },
    "concludingSong": {
      "number": 134,
      "title": "Commenti conclusivi (3 min) | Cantico 134 e preghiera"
    },
    "mwbWolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026254",
    "watchtowerWolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/2026484",
    "isCurrent": false,
    "parts": [
      {
        "id": "2026-W39-1",
        "section": "tesori",
        "title": "1. Geova aiuta quelli che sono leali al suo Regno",
        "duration": 10,
        "assignedScriptures": [
          "GEREMIA 36-37"
        ],
        "sourceText": "1. Geova aiuta quelli che sono leali al suo Regno\n\n\n(10 min)\n\nGeremia proclamò un messaggio impopolare in un periodo in cui in Giuda c’erano controversie politiche (Ger 37:6-10; jr 27 par. 22)\nGeremia fu perseguitato perché alcuni pensarono che stesse passando dalla parte del nemico (Ger 37:13-15; jr 28 par. 23)\nGeova aiutò Geremia mentre era imprigionato (Ger 37:21; w08 15/10 11 par. 18)\n\nCHIEDITI: “In che modo l’esempio di Geremia e di altri servitori di Dio mi aiuta a essere leale al Regno in periodi di instabilità politica?”\n\n\n\n\n\nLe storie di tanti fratelli e sorelle dei nostri giorni dimostrano che Geova continua a prendersi cura di quelli che sono perseguitati a motivo della loro posizione neutrale",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026254",
        "type": "talk"
      },
      {
        "id": "2026-W39-2",
        "section": "tesori",
        "title": "2. Gemme spirituali",
        "duration": 10,
        "assignedScriptures": [
          "GEREMIA 36-37",
          "\n\nGer 36:30"
        ],
        "sourceText": "(10 min)\n\nGer 36:30 — Come si avverò questa profezia riguardante Ioiachim? (it “Ioiachim” n. 1 par. 8)\n\nLa tua risposta\n\n\n\nNella lettura biblica di questa settimana quali gemme spirituali avete trovato?\n\nLa tua risposta",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026254",
        "type": "gems",
        "questions": [
          {
            "question": "Ger 36:30 — Come si avverò questa profezia riguardante Ioiachim? (it “Ioiachim” n. 1 par. 8)",
            "sourceSnippet": "Ger 36:30 — Come si avverò questa profezia riguardante Ioiachim? (it “Ioiachim” n. 1 par. 8)"
          },
          {
            "question": "Nella lettura biblica di questa settimana quali gemme spirituali avete trovato?",
            "sourceSnippet": "Nella lettura biblica di questa settimana quali gemme spirituali avete trovato?"
          }
        ]
      },
      {
        "id": "2026-W39-3",
        "section": "tesori",
        "title": "3. Lettura biblica",
        "duration": 4,
        "assignedScriptures": [
          "GEREMIA 36-37",
          " Ger 36:1-13"
        ],
        "sourceText": "(4 min) Ger 36:1-13 (th lezione 10)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026254",
        "type": "reading"
      },
      {
        "id": "2026-W39-4",
        "section": "ministero",
        "title": "4. Iniziare una conversazione",
        "duration": 3,
        "assignedScriptures": [
          "GEREMIA 36-37"
        ],
        "sourceText": "(3 min) TESTIMONIANZA PUBBLICA. Offri un corso biblico a una persona che viene da un contesto non cristiano. (lmd lezione 5 punto 5)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026254",
        "type": "demonstration"
      },
      {
        "id": "2026-W39-5",
        "section": "ministero",
        "title": "5. Coltivare l’interesse",
        "duration": 4,
        "assignedScriptures": [
          "GEREMIA 36-37"
        ],
        "sourceText": "(4 min) DI CASA IN CASA. Offri un corso biblico a una persona che l’ultima volta aveva accettato un volantino. (lmd lezione 9 punto 4)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026254",
        "type": "demonstration"
      },
      {
        "id": "2026-W39-6",
        "section": "ministero",
        "title": "6. Cosa direste?",
        "duration": 6,
        "assignedScriptures": [
          "GEREMIA 36-37"
        ],
        "sourceText": "(6 min) Trattazione. DI CASA IN CASA. Esamina brevemente lmd lezione 2 punto 5. Poi chiedi:\n\nUna persona dice che è preoccupata per l’aumento del costo della vita. Cosa direste per mostrare che capite la sua preoccupazione?\n\nLa tua risposta\n\n\n\nDi quale verità biblica potreste parlare?\n\nLa tua risposta",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026254",
        "type": "demonstration"
      },
      {
        "id": "2026-W39-7",
        "section": "vita",
        "title": "7. Rimaniamo neutrali nel nostro cuore",
        "duration": 15,
        "assignedScriptures": [
          "GEREMIA 36-37",
          "Pr 4:23",
          "\n\n\n\n\nLeggi Luca 4:5"
        ],
        "sourceText": "(15 min) Trattazione.\n\nDato che il mondo diventa ogni giorno più diviso, ci aspettiamo che la nostra neutralità venga messa sempre più alla prova. Per essere neutrali in quello che facciamo, dobbiamo assicurarci di essere neutrali nel nostro cuore (Pr 4:23).\n  Nella nostra zona, quali situazioni potrebbero mettere alla prova la nostra neutralità?\n\nLa tua risposta\n\n\n\n  Perché a volte potrebbe essere difficile rimanere neutrali?\n\nLa tua risposta\n\n\n\n\nLeggi Luca 4:5, 6. Poi chiedi:\n  In che modo questi versetti ci aiutano a rimanere neutrali?\n\nLa tua risposta\n\n\n\n  Quali versetti possiamo usare per spiegare perché abbiamo deciso di rimanere neutrali?\n\nLa tua risposta\n\n\n\n\nFai vedere il VIDEO Lezioni utili dalla Torre di Guardia | Rimaniamo neutrali in un mondo diviso. Poi chiedi:\n  Quali aspetti menzionati in questo video possono aiutarci a rimanere neutrali nel nostro cuore?\n\nLa tua risposta\n\n\n\n  In base all’articolo di studio a cui si fa riferimento nel video, quali quattro fattori possono aiutarci a rimanere neutrali? (w16.04 27-31)\n\nLa tua risposta",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026254",
        "type": "talk"
      },
      {
        "id": "2026-W39-8",
        "section": "vita",
        "title": "8. Studio biblico di congregazione",
        "duration": 30,
        "assignedScriptures": [
          "GEREMIA 36-37"
        ],
        "sourceText": "(30 min) wcg cap. 9",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026254",
        "type": "congregation_study"
      }
    ],
    "watchtowerStudy": {
      "title": "Conosciamo Geova sempre meglio",
      "themeScripture": "“Conosci l’Iddio di tuo padre e servilo con cuore completo” (1 CRON. 28:9)",
      "song": {
        "number": 12,
        "title": "CANTICO 12 Grande Dio, Geova"
      },
      "concludingSong": {
        "number": 28,
        "title": "CANTICO 28 Vogliamo essere amici di Geova"
      },
      "summary": "Articolo di studio della Torre di Guardia per la settimana del 21-27 SETTEMBRE.",
      "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/2026484",
      "paragraphs": [
        {
          "num": 1,
          "text": "1. Come ci sentiamo quando pensiamo alla conoscenza di Geova, alla sua sapienza e alle cose che ha fatto?",
          "question": "Domanda paragrafo 1"
        },
        {
          "num": 2,
          "text": "2. Cosa dimostra che è possibile conoscere Geova?",
          "question": "Domanda paragrafo 2"
        },
        {
          "num": 3,
          "text": "3. Cosa vedremo in questo articolo?",
          "question": "Domanda paragrafo 3"
        },
        {
          "num": 4,
          "text": "4. Cosa comporta conoscere Geova?",
          "question": "Domanda paragrafo 4"
        },
        {
          "num": 5,
          "text": "5. Cosa impariamo dal re Giosia in relazione a cosa significa conoscere Geova?",
          "question": "Domanda paragrafo 5"
        },
        {
          "num": 6,
          "text": "6. In base a Salmo 9:10, come influisce su di noi il fatto di conoscere Geova?",
          "question": "Domanda paragrafo 6"
        },
        {
          "num": 7,
          "text": "7. Cosa potrebbe succedere se serviamo Geova già da molti anni?",
          "question": "Domanda paragrafo 7"
        },
        {
          "num": 8,
          "text": "8. In che modo conoscere meglio Geova influisce sulla nostra amicizia con lui? (Salmo 73:24-28).",
          "question": "Domanda paragrafo 8"
        },
        {
          "num": 9,
          "text": "9. In che modo ‘tenere conto’ di Geova influisce sulle nostre decisioni? Fate un esempio.",
          "question": "Domanda paragrafo 9"
        },
        {
          "num": 10,
          "text": "10. Cosa riusciremo a fare man mano che conosciamo Geova?",
          "question": "Domanda paragrafo 10"
        },
        {
          "num": 11,
          "text": "11. Come avete conosciuto Geova?",
          "question": "Domanda paragrafo 11"
        },
        {
          "num": 14,
          "text": "14. Perché dovremmo riflettere attentamente sulla creazione?",
          "question": "Domanda paragrafo 14"
        },
        {
          "num": 15,
          "text": "15. Cosa ha fatto Patrick per conoscere meglio Geova, e come potete fare qualcosa di simile? (Vedi anche l’immagine.)",
          "question": "Domanda paragrafo 15"
        },
        {
          "num": 16,
          "text": "16. Cosa aiutò Maria, la madre di Gesù, a conoscere meglio Geova, e come possiamo imitarla? (Vedi anche l’immagine.)",
          "question": "Domanda paragrafo 16"
        }
      ]
    }
  },
  {
    "id": "2026-W40",
    "weekLabel": "28 SETTEMBRE – 4 OTTOBRE",
    "dateRange": "28 settembre – 4 ottobre",
    "bibleReading": "GEREMIA 38-39",
    "openingSong": {
      "number": 102,
      "title": "Cantico 102 e preghiera | Commenti introduttivi (1 min)"
    },
    "middleSong": {
      "number": 90,
      "title": "Cantico 90"
    },
    "concludingSong": {
      "number": 56,
      "title": "Commenti conclusivi (3 min) | Cantico 56 e preghiera"
    },
    "mwbWolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026255",
    "watchtowerWolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/2026485",
    "isCurrent": false,
    "parts": [
      {
        "id": "2026-W40-2",
        "section": "tesori",
        "title": "2. Gemme spirituali",
        "duration": 10,
        "assignedScriptures": [
          "GEREMIA 38-39",
          "\n\nGer 39:6"
        ],
        "sourceText": "(10 min)\n\nGer 39:6, 7 — Quale decisione sbagliata prese il re Sedechia, e quale lezione possono trarre i capifamiglia da questo episodio? (jr 92 par. 1)\n\nLa tua risposta\n\n\n\nNella lettura biblica di questa settimana quali gemme spirituali avete trovato?\n\nLa tua risposta",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026255",
        "type": "gems",
        "questions": [
          {
            "question": "Ger 39:6, 7 — Quale decisione sbagliata prese il re Sedechia, e quale lezione possono trarre i capifamiglia da questo episodio? (jr 92 par. 1)",
            "sourceSnippet": "Ger 39:6, 7 — Quale decisione sbagliata prese il re Sedechia, e quale lezione possono trarre i capifamiglia da questo episodio? (jr 92 par. 1)"
          },
          {
            "question": "Nella lettura biblica di questa settimana quali gemme spirituali avete trovato?",
            "sourceSnippet": "Nella lettura biblica di questa settimana quali gemme spirituali avete trovato?"
          }
        ]
      },
      {
        "id": "2026-W40-3",
        "section": "tesori",
        "title": "3. Lettura biblica",
        "duration": 4,
        "assignedScriptures": [
          "GEREMIA 38-39",
          " Ger 38:1-13"
        ],
        "sourceText": "(4 min) Ger 38:1-13 (th lezione 12)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026255",
        "type": "reading"
      },
      {
        "id": "2026-W40-4",
        "section": "ministero",
        "title": "4. Iniziare una conversazione",
        "duration": 3,
        "assignedScriptures": [
          "GEREMIA 38-39"
        ],
        "sourceText": "(3 min) TESTIMONIANZA INFORMALE. Offri un corso biblico a una persona che è preoccupata per gli eventi climatici estremi. (lmd lezione 9 punto 3)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026255",
        "type": "demonstration"
      },
      {
        "id": "2026-W40-5",
        "section": "ministero",
        "title": "5. Coltivare l’interesse",
        "duration": 4,
        "assignedScriptures": [
          "GEREMIA 38-39"
        ],
        "sourceText": "(4 min) TESTIMONIANZA INFORMALE. Offri un corso biblico a un genitore. (lmd lezione 9 punto 5)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026255",
        "type": "demonstration"
      },
      {
        "id": "2026-W40-6",
        "section": "ministero",
        "title": "6. Cosa direste?",
        "duration": 6,
        "assignedScriptures": [
          "GEREMIA 38-39"
        ],
        "sourceText": "(6 min) Trattazione. DI CASA IN CASA. Esamina brevemente lmd lezione 1 punto 4. Fai riferimento all’immagine e poi chiedi:\n\nIn base a quello che si vede nell’immagine, quale domanda potreste fare per iniziare una conversazione?\n\nLa tua risposta\n\n\n\nDi quale verità biblica potreste parlare?\n\nLa tua risposta",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026255",
        "type": "demonstration"
      },
      {
        "id": "2026-W40-7",
        "section": "vita",
        "title": "7. “Chi mi ha toccato?”",
        "duration": 15,
        "assignedScriptures": [
          "GEREMIA 38-39"
        ],
        "sourceText": "(15 min) Trattazione.\n\nFai vedere il VIDEO. Poi chiedi:\n  Come possiamo permettere agli altri di avere un’influenza positiva su di noi?\n\nLa tua risposta\n\n\n\n  Come possiamo “toccare” la vita degli altri?\n\nLa tua risposta",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026255",
        "type": "talk"
      },
      {
        "id": "2026-W40-8",
        "section": "vita",
        "title": "8. Studio biblico di congregazione",
        "duration": 30,
        "assignedScriptures": [
          "GEREMIA 38-39"
        ],
        "sourceText": "(30 min) wcg cap. 10",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026255",
        "type": "congregation_study"
      }
    ],
    "watchtowerStudy": {
      "title": "Aiutiamo altri a conoscere Geova",
      "themeScripture": "“Questo significa vita eterna: che conoscano te, il solo vero Dio” (GIOV. 17:3)",
      "song": {
        "number": 79,
        "title": "CANTICO 79 Siano resi fermi nella verità"
      },
      "concludingSong": {
        "number": 84,
        "title": "CANTICO 84 Mete per lodare Dio"
      },
      "summary": "Articolo di studio della Torre di Guardia per la settimana del 28 SETTEMBRE – 4 OTTOBRE.",
      "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/2026485",
      "paragraphs": [
        {
          "num": 1,
          "text": "1. Cosa provate quando uno studente della Bibbia fa progressi?",
          "question": "Domanda paragrafo 1"
        },
        {
          "num": 2,
          "text": "2. Qual è la volontà di Geova per chi studia la Bibbia? (1 Timoteo 2:3, 4).",
          "question": "Domanda paragrafo 2"
        },
        {
          "num": 3,
          "text": "3. A quali domande risponderemo in questo articolo?",
          "question": "Domanda paragrafo 3"
        },
        {
          "num": 4,
          "text": "4. In base a Marco 12:30, qual è il nostro principale obiettivo quando conduciamo uno studio biblico?",
          "question": "Domanda paragrafo 4"
        },
        {
          "num": 5,
          "text": "5. Cosa si sentirà spinto a fare uno studente della Bibbia che ama Geova?",
          "question": "Domanda paragrafo 5"
        },
        {
          "num": 6,
          "text": "6. Perché conoscere bene Geova aiuta uno studente quando deve prendere decisioni? Fate un esempio.",
          "question": "Domanda paragrafo 6"
        },
        {
          "num": 7,
          "text": "7. In che modo conoscere bene Geova aiutò Giuseppe a prendere una decisione saggia?",
          "question": "Domanda paragrafo 7"
        },
        {
          "num": 8,
          "text": "8. Come possiamo usare il libro Puoi vivere felice per sempre per aiutare uno studente a conoscere Geova?",
          "question": "Domanda paragrafo 8"
        },
        {
          "num": 11,
          "text": "11. Come possiamo aiutare il nostro studente a considerare quello che impara dalla Bibbia come un dono di Geova?",
          "question": "Domanda paragrafo 11"
        },
        {
          "num": 14,
          "text": "14. Come possiamo aiutare uno studente che fa fatica ad andare d’accordo con qualcuno in congregazione?",
          "question": "Domanda paragrafo 14"
        },
        {
          "num": 17,
          "text": "17. Cosa vogliamo che facciano gli studenti oltre a imparare delle nozioni?",
          "question": "Domanda paragrafo 17"
        },
        {
          "num": 18,
          "text": "18. Quali ricompense ha chi conosce Geova?",
          "question": "Domanda paragrafo 18"
        }
      ]
    }
  },
  {
    "id": "2026-W41",
    "weekLabel": "5-11 OTTOBRE",
    "dateRange": "5-11 ottobre",
    "bibleReading": "GEREMIA 40-41",
    "openingSong": {
      "number": 33,
      "title": "Cantico 33 e preghiera | Commenti introduttivi (1 min)"
    },
    "middleSong": {
      "number": 17,
      "title": "Cantico 17"
    },
    "concludingSong": {
      "number": 38,
      "title": "Commenti conclusivi (3 min) | Cantico 38 e preghiera"
    },
    "mwbWolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026256",
    "watchtowerWolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/2026520",
    "isCurrent": false,
    "parts": [
      {
        "id": "2026-W41-1",
        "section": "tesori",
        "title": "1. Il giusto punto di vista su come Geova ci protegge",
        "duration": 10,
        "assignedScriptures": [
          "GEREMIA 40-41"
        ],
        "sourceText": "1. Il giusto punto di vista su come Geova ci protegge\n\n\n(10 min)\n\nGeova salvò Geremia (Ger 40:2-4; jr 189 par. 16)\nGhedalia era un uomo che temeva Geova, eppure Geova non lo salvò (Ger 41:1, 2; it “Ghedalia” n. 4)\nNon possiamo aspettarci che Geova ci liberi sempre da prove, malattie e morte in modo miracoloso (cl 72-73 parr. 13-14)\n\nRIFLETTI: In che modo Geova ci protegge a livello individuale? (Pr 4:5, 6; 1Ts 5:14).\n\n\n\n\n\nLa congregazione è un mezzo che Geova usa per proteggerci durante le prove",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026256",
        "type": "talk"
      },
      {
        "id": "2026-W41-2",
        "section": "tesori",
        "title": "2. Gemme spirituali",
        "duration": 10,
        "assignedScriptures": [
          "GEREMIA 40-41",
          "\n\nGer 40:12",
          " Deuteronomio 8:6-8"
        ],
        "sourceText": "(10 min)\n\nGer 40:12 — In che modo questo versetto conferma che Geova aveva dato al suo popolo il buon paese descritto in Deuteronomio 8:6-8? (w06 15/6 16 par. 4)\n\nLa tua risposta\n\n\n\nNella lettura biblica di questa settimana quali gemme spirituali avete trovato?\n\nLa tua risposta",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026256",
        "type": "gems",
        "questions": [
          {
            "question": "Ger 40:12 — In che modo questo versetto conferma che Geova aveva dato al suo popolo il buon paese descritto in Deuteronomio 8:6-8? (w06 15/6 16 par. 4)",
            "sourceSnippet": "Ger 40:12 — In che modo questo versetto conferma che Geova aveva dato al suo popolo il buon paese descritto in Deuteronomio 8:6-8? (w06 15/6 16 par. 4)"
          },
          {
            "question": "Nella lettura biblica di questa settimana quali gemme spirituali avete trovato?",
            "sourceSnippet": "Nella lettura biblica di questa settimana quali gemme spirituali avete trovato?"
          }
        ]
      },
      {
        "id": "2026-W41-3",
        "section": "tesori",
        "title": "3. Lettura biblica",
        "duration": 4,
        "assignedScriptures": [
          "GEREMIA 40-41",
          " Ger 40:1-10"
        ],
        "sourceText": "(4 min) Ger 40:1-10 (th lezione 2)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026256",
        "type": "reading"
      },
      {
        "id": "2026-W41-4",
        "section": "ministero",
        "title": "4. Iniziare una conversazione",
        "duration": 2,
        "assignedScriptures": [
          "GEREMIA 40-41"
        ],
        "sourceText": "(2 min) DI CASA IN CASA. (lmd lezione 2 punto 3)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026256",
        "type": "demonstration"
      },
      {
        "id": "2026-W41-5",
        "section": "ministero",
        "title": "5. Iniziare una conversazione",
        "duration": 2,
        "assignedScriptures": [
          "GEREMIA 40-41"
        ],
        "sourceText": "(2 min) TESTIMONIANZA INFORMALE. (lmd lezione 2 punto 5)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026256",
        "type": "demonstration"
      },
      {
        "id": "2026-W41-6",
        "section": "ministero",
        "title": "6. Iniziare una conversazione",
        "duration": 4,
        "assignedScriptures": [
          "GEREMIA 40-41"
        ],
        "sourceText": "(4 min) TESTIMONIANZA PUBBLICA. Una persona sta guardando l’espositore. (lmd lezione 5 punto 3)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026256",
        "type": "demonstration"
      },
      {
        "id": "2026-W41-7",
        "section": "ministero",
        "title": "7. Spiegare quello in cui si crede",
        "duration": 3,
        "assignedScriptures": [
          "GEREMIA 40-41"
        ],
        "sourceText": "(3 min) Dimostrazione. ijwbq articolo 103. Tema: Chi è Geova? (th lezione 17)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026256",
        "type": "talk"
      },
      {
        "id": "2026-W41-8",
        "section": "vita",
        "title": "8. Geova è il difensore delle vedove",
        "duration": 15,
        "assignedScriptures": [
          "GEREMIA 40-41",
          "Sl 68:5",
          "Gc 1:27"
        ],
        "sourceText": "(15 min) Trattazione.\n\nIl re Davide disse che Geova era il “difensore delle vedove” (Sl 68:5). Molti esempi contenuti nella Bibbia dimostrano che lui si prende cura di loro.\n  Utilizzando gli strumenti di ricerca disponibili nella tua lingua, trova uno o due racconti biblici che riguardano delle vedove. Cosa ti insegnano questi racconti sul modo in cui Geova considera le vedove e se ne prende cura?\n\nLa tua risposta\n\n\n\n\nSe sei vedova, puoi essere sicura che Geova capisce i tuoi bisogni e sentimenti più profondi. Ti proteggerà e ti aiuterà, come ha fatto per molti altri nel passato e continua a fare anche oggi.\n\nFai vedere il VIDEO Ritrovare la gioia e uno scopo dopo la perdita del coniuge. Poi chiedi:\n  Cosa avete imparato da questo video sul modo in cui Geova si prende cura delle vedove?\n\nLa tua risposta\n\n\n\n\nPrendersi cura delle vedove, onorandole e aiutandole, è un aspetto importante della nostra adorazione (Gc 1:27; approfondimento a 1Tm 5:3 “Abbi considerazione”, nwtsty).\n  Come possiamo mostrare onore alle vedove?\n\nLa tua risposta",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026256",
        "type": "talk"
      },
      {
        "id": "2026-W41-9",
        "section": "vita",
        "title": "9. Studio biblico di congregazione",
        "duration": 30,
        "assignedScriptures": [
          "GEREMIA 40-41"
        ],
        "sourceText": "(30 min) wcg cap. 11",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026256",
        "type": "congregation_study"
      }
    ],
    "watchtowerStudy": {
      "title": "Contrastiamo le tattiche di Satana confidando in Geova e in Gesù",
      "themeScripture": "“Opponetevi al Diavolo, e lui fuggirà da voi” (GIAC. 4:7)",
      "song": {
        "number": 55,
        "title": "CANTICO 55 Non temete!"
      },
      "concludingSong": {
        "number": 150,
        "title": "CANTICO 150 Cercate Geova per essere salvati"
      },
      "summary": "Articolo di studio della Torre di Guardia per la settimana del 5-11 OTTOBRE.",
      "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/2026520",
      "paragraphs": [
        {
          "num": 1,
          "text": "1. Quale tattica usa Satana per cercare di infrangere l’integrità dei servitori di Dio?",
          "question": "Domanda paragrafo 1"
        },
        {
          "num": 2,
          "text": "2. Perché è importante avere fiducia in Geova Dio e in Gesù Cristo?",
          "question": "Domanda paragrafo 2"
        },
        {
          "num": 3,
          "text": "3. In che modo Satana indebolì la fiducia che Eva aveva in Geova?",
          "question": "Domanda paragrafo 3"
        },
        {
          "num": 4,
          "text": "4. Ai giorni di Giobbe, in che modo Satana diede un’idea distorta di Geova?",
          "question": "Domanda paragrafo 4"
        },
        {
          "num": 5,
          "text": "5. In che modo Satana cercò di impedire alle persone di seguire Gesù? (Matteo 11:19).",
          "question": "Domanda paragrafo 5"
        },
        {
          "num": 8,
          "text": "8. In che modo Satana si serve della falsa religione per diffondere bugie su Geova e su Gesù?",
          "question": "Domanda paragrafo 8"
        },
        {
          "num": 9,
          "text": "9. In che modo Satana si è servito della falsa religione per impedire alle persone di conoscere Geova? (Geremia 23:26, 27).",
          "question": "Domanda paragrafo 9"
        },
        {
          "num": 10,
          "text": "10. Perché un cristiano potrebbe arrivare a prendersela con Geova?",
          "question": "Domanda paragrafo 10"
        },
        {
          "num": 11,
          "text": "11. In che modo Satana fa nascere dubbi riguardo alle norme di Geova? (Vedi anche l’immagine.)",
          "question": "Domanda paragrafo 11"
        },
        {
          "num": 12,
          "text": "12. Perché dovremmo evitare la propaganda di Satana?",
          "question": "Domanda paragrafo 12"
        },
        {
          "num": 13,
          "text": "13. Cosa impariamo da Shannon?",
          "question": "Domanda paragrafo 13"
        },
        {
          "num": 14,
          "text": "14. Come possiamo resistere ai tentativi di Satana di indebolire la nostra fede? (Vedi anche l’immagine.)",
          "question": "Domanda paragrafo 14"
        },
        {
          "num": 15,
          "text": "15. Come possiamo rafforzare la nostra fiducia nel fatto che Geova e Gesù sono al nostro fianco?",
          "question": "Domanda paragrafo 15"
        },
        {
          "num": 16,
          "text": "16. Perché ci fa bene pensare al modo in cui Geova ha aiutato noi e altri? (Salmo 118:5, 6).",
          "question": "Domanda paragrafo 16"
        },
        {
          "num": 17,
          "text": "17. In base a Giovanni 10:29, cosa assicura Gesù a tutti quelli che rimangono stretti a lui e a suo Padre?",
          "question": "Domanda paragrafo 17"
        },
        {
          "num": 18,
          "text": "18. Cosa vedremo nel prossimo articolo?",
          "question": "Domanda paragrafo 18"
        }
      ]
    }
  },
  {
    "id": "2026-W42",
    "weekLabel": "12-18 OTTOBRE",
    "dateRange": "12-18 ottobre",
    "bibleReading": "GEREMIA 42-44",
    "openingSong": {
      "number": 103,
      "title": "Cantico 103 e preghiera | Commenti introduttivi (1 min)"
    },
    "middleSong": {
      "number": 47,
      "title": "Cantico 47"
    },
    "concludingSong": {
      "number": 129,
      "title": "Commenti conclusivi (3 min) | Cantico 129 e preghiera"
    },
    "mwbWolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026257",
    "watchtowerWolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/2026521",
    "isCurrent": false,
    "parts": [
      {
        "id": "2026-W42-1",
        "section": "tesori",
        "title": "1. Chiesero consiglio, ma poi non ascoltarono",
        "duration": 10,
        "assignedScriptures": [
          "GEREMIA 42-44"
        ],
        "sourceText": "1. Chiesero consiglio, ma poi non ascoltarono\n\n\n(10 min)\n\nPrima di fuggire in Egitto, Ioanan e il popolo chiesero a Geremia di pregare Geova per avere la Sua guida (Ger 42:1-3; it “Ioanan” n. 5)\nLa risposta di Geova fu chiara: dovevano restare in Giuda, e non andare in Egitto (Ger 42:9, 10, 19)\nIl popolo non ubbidì a Geova (Ger 43:4-7)\n\nCHIEDITI: “Quando ricevo un consiglio basato sulla Bibbia, lo seguo anche se non è quello che vorrei sentirmi dire?” (w25.07 5 par. 14).\n\n\n\n\n\nUna sorella più grande mostra a una sorella più giovane dei consigli basati sulla Bibbia riguardo al frequentare qualcuno",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026257",
        "type": "talk"
      },
      {
        "id": "2026-W42-2",
        "section": "tesori",
        "title": "2. Gemme spirituali",
        "duration": 10,
        "assignedScriptures": [
          "GEREMIA 42-44",
          "\n\nGer 44:18"
        ],
        "sourceText": "(10 min)\n\nGer 44:18 — Perché non era giusto che gli israeliti dicessero che stavano soffrendo per il fatto che avevano smesso di “offrire sacrifici alla Regina del Cielo”? (it “Ostinazione” par. 4)\n\nLa tua risposta\n\n\n\nNella lettura biblica di questa settimana quali gemme spirituali avete trovato?\n\nLa tua risposta",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026257",
        "type": "gems",
        "questions": [
          {
            "question": "Ger 44:18 — Perché non era giusto che gli israeliti dicessero che stavano soffrendo per il fatto che avevano smesso di “offrire sacrifici alla Regina del Cielo”? (it “Ostinazione” par. 4)",
            "sourceSnippet": "Ger 44:18 — Perché non era giusto che gli israeliti dicessero che stavano soffrendo per il fatto che avevano smesso di “offrire sacrifici alla Regina del Cielo”? (it “Ostinazione” par. 4)"
          },
          {
            "question": "Nella lettura biblica di questa settimana quali gemme spirituali avete trovato?",
            "sourceSnippet": "Nella lettura biblica di questa settimana quali gemme spirituali avete trovato?"
          }
        ]
      },
      {
        "id": "2026-W42-3",
        "section": "tesori",
        "title": "3. Lettura biblica",
        "duration": 4,
        "assignedScriptures": [
          "GEREMIA 42-44",
          " Ger 43:1-13"
        ],
        "sourceText": "(4 min) Ger 43:1-13 (th lezione 11)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026257",
        "type": "reading"
      },
      {
        "id": "2026-W42-4",
        "section": "ministero",
        "title": "4. Iniziare una conversazione",
        "duration": 3,
        "assignedScriptures": [
          "GEREMIA 42-44"
        ],
        "sourceText": "(3 min) TESTIMONIANZA INFORMALE. (lmd lezione 1 punto 5)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026257",
        "type": "demonstration"
      },
      {
        "id": "2026-W42-5",
        "section": "ministero",
        "title": "5. Coltivare l’interesse",
        "duration": 4,
        "assignedScriptures": [
          "GEREMIA 42-44"
        ],
        "sourceText": "(4 min) DI CASA IN CASA. Parla di una delle verità bibliche riportate nell’appendice A dell’opuscolo Ama le persone. (lmd lezione 7 punto 4)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026257",
        "type": "demonstration"
      },
      {
        "id": "2026-W42-6",
        "section": "ministero",
        "title": "6. Cosa direste?",
        "duration": 6,
        "assignedScriptures": [
          "GEREMIA 42-44"
        ],
        "sourceText": "(6 min) Trattazione. TESTIMONIANZA INFORMALE. Esamina brevemente lmd lezione 2 punto 3. Fai riferimento all’immagine e poi chiedi:\n\nUn uomo sta leggendo la Bibbia o un altro testo religioso. Cosa potreste dire per iniziare una conversazione?\n\nLa tua risposta\n\n\n\nChe domande potreste fare per capire a quali verità bibliche potrebbe essere interessato?\n\nLa tua risposta\n\n\n\nDi quale verità biblica potreste parlare?\n\nLa tua risposta",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026257",
        "type": "demonstration"
      },
      {
        "id": "2026-W42-7",
        "section": "vita",
        "title": "7. Bisogni locali",
        "duration": 15,
        "assignedScriptures": [
          "GEREMIA 42-44"
        ],
        "sourceText": "(15 min)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026257",
        "type": "talk"
      },
      {
        "id": "2026-W42-8",
        "section": "vita",
        "title": "8. Studio biblico di congregazione",
        "duration": 30,
        "assignedScriptures": [
          "GEREMIA 42-44"
        ],
        "sourceText": "(30 min) wcg cap. 12",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026257",
        "type": "congregation_study"
      }
    ],
    "watchtowerStudy": {
      "title": "Possiamo vincere la battaglia!",
      "themeScripture": "Non abbiamo una lotta contro sangue e carne, ma contro le malvagie forze spirituali che sono nei luoghi celesti (EFES. 6:12)",
      "song": {
        "number": 129,
        "title": "CANTICO 129 Continueremo a perseverare"
      },
      "concludingSong": {
        "number": 149,
        "title": "CANTICO 149 Un canto di vittoria"
      },
      "summary": "Articolo di studio della Torre di Guardia per la settimana del 12-18 OTTOBRE.",
      "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/2026521",
      "paragraphs": [
        {
          "num": 1,
          "text": "1. Contro chi dobbiamo combattere tutti noi? (Efesini 6:11, 12).",
          "question": "Domanda paragrafo 1"
        },
        {
          "num": 2,
          "text": "2. Cosa vedremo in questo articolo?",
          "question": "Domanda paragrafo 2"
        },
        {
          "num": 3,
          "text": "3. In che modo Satana cerca di dividerci?",
          "question": "Domanda paragrafo 3"
        },
        {
          "num": 4,
          "text": "4. Perché il re Saul iniziò a odiare Davide? (Vedi anche l’immagine.)",
          "question": "Domanda paragrafo 4"
        },
        {
          "num": 5,
          "text": "5. Perché il Diavolo vuole che diventiamo gelosi e invidiosi dei nostri fratelli? (Giacomo 3:14-16).",
          "question": "Domanda paragrafo 5"
        },
        {
          "num": 6,
          "text": "6. Cosa impariamo dall’esempio di Gionatan? (Vedi anche l’immagine.)",
          "question": "Domanda paragrafo 6"
        },
        {
          "num": 7,
          "text": "7. Come possiamo evitare di dare al Diavolo l’opportunità di infrangere la nostra unità? (Efesini 4:25-27).",
          "question": "Domanda paragrafo 7"
        },
        {
          "num": 8,
          "text": "8. Come dovremmo reagire quando un compagno di fede dice o fa qualcosa che ci ferisce?",
          "question": "Domanda paragrafo 8"
        },
        {
          "num": 9,
          "text": "9. Qual è un altro mezzo che Satana usa per cercare di scoraggiarci?",
          "question": "Domanda paragrafo 9"
        },
        {
          "num": 10,
          "text": "10. Come reagì Isacco davanti a delle ingiustizie?",
          "question": "Domanda paragrafo 10"
        },
        {
          "num": 11,
          "text": "11. Come reagì Gesù davanti alle difficoltà che affrontò?",
          "question": "Domanda paragrafo 11"
        },
        {
          "num": 12,
          "text": "12. In base a Matteo 5:43, 44, come dovremmo trattare chi ci fa opposizione o ci perseguita?",
          "question": "Domanda paragrafo 12"
        },
        {
          "num": 13,
          "text": "13. Perché dovremmo rispettare i governi anche se si oppongono a noi? (Vedi anche l’immagine.)",
          "question": "Domanda paragrafo 13"
        },
        {
          "num": 14,
          "text": "14. Cosa dovremmo ricordare riguardo a quelli che si oppongono ai servitori di Dio?",
          "question": "Domanda paragrafo 14"
        },
        {
          "num": 15,
          "text": "15. Perché non è realistico cercare di correggere tutte le ingiustizie che vediamo o subiamo?",
          "question": "Domanda paragrafo 15"
        },
        {
          "num": 16,
          "text": "16. Cosa ci aiuterà a vincere la battaglia contro le malvagie forze spirituali? (Vedi anche le immagini.)",
          "question": "Domanda paragrafo 16"
        },
        {
          "num": 17,
          "text": "17. Cosa dovremmo essere decisi a fare?",
          "question": "Domanda paragrafo 17"
        }
      ]
    }
  },
  {
    "id": "2026-W43",
    "weekLabel": "19-25 OTTOBRE",
    "dateRange": "19-25 ottobre",
    "bibleReading": "GEREMIA 45-46",
    "openingSong": {
      "number": 21,
      "title": "Cantico 21 e preghiera | Commenti introduttivi (1 min)"
    },
    "middleSong": {
      "number": 117,
      "title": "Cantico 117"
    },
    "concludingSong": {
      "number": 87,
      "title": "Commenti conclusivi (3 min) | Cantico 87 e preghiera"
    },
    "mwbWolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026258",
    "watchtowerWolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/2026522",
    "isCurrent": false,
    "parts": [
      {
        "id": "2026-W43-1",
        "section": "tesori",
        "title": "1. La speranza è essenziale per sapersi accontentare",
        "duration": 10,
        "assignedScriptures": [
          "GEREMIA 45-46"
        ],
        "sourceText": "1. La speranza è essenziale per sapersi accontentare\n\n\n(10 min)\n\nA quanto pare Baruc iniziò a essere insoddisfatto della sua situazione (Ger 45:3; w25.07 22-23 parr. 8-9)\nSe diventiamo insoddisfatti, potremmo perdere la gioia e prendere decisioni sbagliate (w25.07 20 par. 2)\nGeova aiutò Baruc a cambiare il suo modo di pensare dandogli una speranza (Ger 45:5; w25.07 24 parr. 13-14)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026258",
        "type": "talk"
      },
      {
        "id": "2026-W43-2",
        "section": "tesori",
        "title": "2. Gemme spirituali",
        "duration": 10,
        "assignedScriptures": [
          "GEREMIA 45-46",
          "\n\nGer 46:22"
        ],
        "sourceText": "(10 min)\n\nGer 46:22 — Perché Geova disse che il suono dell’Egitto sarebbe stato “come quello di un serpente che striscia”? (it “Voce” par. 16)\n\nLa tua risposta\n\n\n\nNella lettura biblica di questa settimana quali gemme spirituali avete trovato?\n\nLa tua risposta",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026258",
        "type": "gems",
        "questions": [
          {
            "question": "Ger 46:22 — Perché Geova disse che il suono dell’Egitto sarebbe stato “come quello di un serpente che striscia”? (it “Voce” par. 16)",
            "sourceSnippet": "Ger 46:22 — Perché Geova disse che il suono dell’Egitto sarebbe stato “come quello di un serpente che striscia”? (it “Voce” par. 16)"
          },
          {
            "question": "Nella lettura biblica di questa settimana quali gemme spirituali avete trovato?",
            "sourceSnippet": "Nella lettura biblica di questa settimana quali gemme spirituali avete trovato?"
          }
        ]
      },
      {
        "id": "2026-W43-3",
        "section": "tesori",
        "title": "3. Lettura biblica",
        "duration": 4,
        "assignedScriptures": [
          "GEREMIA 45-46",
          " Ger 46:13-24"
        ],
        "sourceText": "(4 min) Ger 46:13-24 (th lezione 10)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026258",
        "type": "reading"
      },
      {
        "id": "2026-W43-4",
        "section": "ministero",
        "title": "4. Iniziare una conversazione",
        "duration": 3,
        "assignedScriptures": [
          "GEREMIA 45-46"
        ],
        "sourceText": "(3 min) TESTIMONIANZA INFORMALE. Inizia una conversazione con una persona che sembra felice. (lmd lezione 2 punto 3)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026258",
        "type": "demonstration"
      },
      {
        "id": "2026-W43-5",
        "section": "ministero",
        "title": "5. Iniziare una conversazione",
        "duration": 2,
        "assignedScriptures": [
          "GEREMIA 45-46"
        ],
        "sourceText": "(2 min) DI CASA IN CASA. La persona è arrabbiata. (lmd lezione 4 punto 5)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026258",
        "type": "demonstration"
      },
      {
        "id": "2026-W43-6",
        "section": "ministero",
        "title": "6. Iniziare una conversazione",
        "duration": 2,
        "assignedScriptures": [
          "GEREMIA 45-46"
        ],
        "sourceText": "(2 min) DI CASA IN CASA. La persona sembra triste. (lmd lezione 2 punto 4)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026258",
        "type": "demonstration"
      },
      {
        "id": "2026-W43-7",
        "section": "ministero",
        "title": "7. Discorso",
        "duration": 4,
        "assignedScriptures": [
          "GEREMIA 45-46"
        ],
        "sourceText": "(4 min) lmd appendice A punto 20. Tema: Gesù non è l’Iddio Onnipotente. (th lezione 7)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026258",
        "type": "talk"
      },
      {
        "id": "2026-W43-8",
        "section": "vita",
        "title": "8. ‘Condividete con gli altri quello che avete’",
        "duration": 15,
        "assignedScriptures": [
          "GEREMIA 45-46",
          "Ef 4:28",
          "1Tm 6:17"
        ],
        "sourceText": "(15 min) Trattazione.\n\nNelle sue lettere l’apostolo Paolo sottolineò spesso l’importanza di condividere. I suoi consigli erano appropriati per l’epoca, e lo sono ancora oggi (Ef 4:28; 1Tm 6:17, 18).\nLeggi Ebrei 13:16. Non molto tempo dopo aver ricevuto i consigli di Paolo, i cristiani della Giudea dovettero fuggire verso i monti, abbandonando casa, lavoro e molti dei loro beni. A quel tempo probabilmente era molto importante che tutti i cristiani condividessero quello che avevano.\n\nQuali benefìci avrebbero avuto i cristiani mettendo in pratica i consigli di Paolo?\n\nLa tua risposta\n\n\n\n  Pensando a quello che accadrà in futuro, perché è saggio da parte nostra imparare a condividere già ora?\n\nLa tua risposta\n\n\n\n\nLeggi 2 Corinti 8:2-4. (Approfondimento a 2Co 8:2, nwtsty)\n  Cosa possiamo imparare dai cristiani della Macedonia?\n\nLa tua risposta\n\n\n\n  Oltre alle cose materiali, cos’altro possiamo condividere con gli altri?\n\nLa tua risposta\n\n\n\n\nFai vedere il VIDEO Sii gentile e altruista della serie Diventa amico di Geova, e poi chiedi:\n  Che esempio ci dà Geova riguardo al condividere?\n\nLa tua risposta",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026258",
        "type": "talk"
      },
      {
        "id": "2026-W43-9",
        "section": "vita",
        "title": "9. Studio biblico di congregazione",
        "duration": 30,
        "assignedScriptures": [
          "GEREMIA 45-46"
        ],
        "sourceText": "(30 min) wcg cap. 13",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026258",
        "type": "congregation_study"
      }
    ],
    "watchtowerStudy": {
      "title": "Un’esortazione in nome dell’amore",
      "themeScripture": "“Preferisco esortarti in nome dell’amore” (FILEM. 9)",
      "song": {
        "number": 106,
        "title": "CANTICO 106 Coltiviamo la qualità dell’amore"
      },
      "concludingSong": {
        "number": 154,
        "title": "CANTICO 154 Amore senza fine"
      },
      "summary": "Articolo di studio della Torre di Guardia per la settimana del 19-25 OTTOBRE.",
      "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/2026522",
      "paragraphs": [
        {
          "num": 1,
          "text": "1. Che responsabilità abbiamo tutti noi?",
          "question": "Domanda paragrafo 1"
        },
        {
          "num": 2,
          "text": "2. Riassumete l’episodio che coinvolse Filemone e Onesimo (Filemone 8, 9, 17).",
          "question": "Domanda paragrafo 2"
        },
        {
          "num": 3,
          "text": "3. Perché Paolo poteva essere preoccupato nel rimandare Onesimo da Filemone? (Vedi anche l’immagine.)",
          "question": "Domanda paragrafo 3"
        },
        {
          "num": 6,
          "text": "6. Perché lodare gli altri è importante?",
          "question": "Domanda paragrafo 6"
        },
        {
          "num": 7,
          "text": "7. Perché dovremmo stare attenti al modo in cui parliamo degli altri? (Filemone 10-12).",
          "question": "Domanda paragrafo 7"
        },
        {
          "num": 8,
          "text": "8. Cosa può aiutarci a pensare e parlare bene dei nostri compagni di fede? (Vedi anche le immagini.)",
          "question": "Domanda paragrafo 8"
        },
        {
          "num": 9,
          "text": "9. Perché il tono positivo della lettera di Paolo è particolarmente significativo?",
          "question": "Domanda paragrafo 9"
        },
        {
          "num": 10,
          "text": "10. Cosa possiamo imparare dall’esempio di Onesimo?",
          "question": "Domanda paragrafo 10"
        },
        {
          "num": 11,
          "text": "11. Cosa possiamo fare per ristabilire la pace se abbiamo offeso qualcuno? (Vedi anche le immagini.)",
          "question": "Domanda paragrafo 11"
        },
        {
          "num": 12,
          "text": "12. Perché Paolo era sicuro che Filemone avrebbe perdonato Onesimo?",
          "question": "Domanda paragrafo 12"
        },
        {
          "num": 13,
          "text": "13. Perché l’amore è essenziale per mantenere la pace? (Colossesi 3:14).",
          "question": "Domanda paragrafo 13"
        },
        {
          "num": 14,
          "text": "14. Perché possiamo dire che Filemone era ospitale?",
          "question": "Domanda paragrafo 14"
        },
        {
          "num": 15,
          "text": "15. Perché mostrare ospitalità rafforza il nostro amore per gli altri? (Vedi anche le immagini.)",
          "question": "Domanda paragrafo 15"
        },
        {
          "num": 16,
          "text": "16. In che modo Filemone potrebbe aver applicato il consiglio di Paolo riportato in Colossesi 3:13?",
          "question": "Domanda paragrafo 16"
        },
        {
          "num": 17,
          "text": "17. In che senso dovremmo ‘continuare a sopportarci gli uni gli altri’?",
          "question": "Domanda paragrafo 17"
        },
        {
          "num": 18,
          "text": "18. Cosa siete decisi a fare?",
          "question": "Domanda paragrafo 18"
        }
      ]
    }
  },
  {
    "id": "2026-W44",
    "weekLabel": "26 OTTOBRE – 1º NOVEMBRE",
    "dateRange": "26 ottobre – 1º novembre",
    "bibleReading": "GEREMIA 47-48",
    "openingSong": {
      "number": 125,
      "title": "Cantico 125 e preghiera | Commenti introduttivi (1 min)"
    },
    "middleSong": {
      "number": 158,
      "title": "Cantico 158"
    },
    "concludingSong": {
      "number": 54,
      "title": "Commenti conclusivi (3 min) | Cantico 54 e preghiera"
    },
    "mwbWolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026259",
    "watchtowerWolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/2026523",
    "isCurrent": false,
    "parts": [
      {
        "id": "2026-W44-1",
        "section": "tesori",
        "title": "1. Geova è un Giudice giusto e misericordioso",
        "duration": 10,
        "assignedScriptures": [
          "GEREMIA 47-48"
        ],
        "sourceText": "1. Geova è un Giudice giusto e misericordioso\n\n\n(10 min)\n\nGeremia predisse che Geova avrebbe punito Moab per il modo in cui aveva trattato Giuda (Ger 48:27, 29, 42; it “Moab” n. 2 par. 22)\nGeova non avrebbe provato piacere nel distruggere Moab (Ger 48:31, 36)\nGeova avrebbe mostrato misericordia ad alcuni moabiti (Ger 48:47; it “Moab” n. 2 par. 24)\n\nRIFLETTI: Pensando al fatto che Geova è molto misericordioso, cosa siamo spinti a fare? (w24.05 17 par. 10).\n\n\n\n\n\nAlcuni potrebbero decidere di schierarsi dalla parte di Geova anche dopo l’inizio della grande tribolazione",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026259",
        "type": "talk"
      },
      {
        "id": "2026-W44-2",
        "section": "tesori",
        "title": "2. Gemme spirituali",
        "duration": 10,
        "assignedScriptures": [
          "GEREMIA 47-48",
          "\n\nGer 48:6"
        ],
        "sourceText": "(10 min)\n\nGer 48:6 — In che senso i moabiti dovevano “divenire come un ginepro nel deserto”? (it “Ginepro” n. 2)\n\nLa tua risposta\n\n\n\nNella lettura biblica di questa settimana quali gemme spirituali avete trovato?\n\nLa tua risposta",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026259",
        "type": "gems",
        "questions": [
          {
            "question": "Ger 48:6 — In che senso i moabiti dovevano “divenire come un ginepro nel deserto”? (it “Ginepro” n. 2)",
            "sourceSnippet": "Ger 48:6 — In che senso i moabiti dovevano “divenire come un ginepro nel deserto”? (it “Ginepro” n. 2)"
          },
          {
            "question": "Nella lettura biblica di questa settimana quali gemme spirituali avete trovato?",
            "sourceSnippet": "Nella lettura biblica di questa settimana quali gemme spirituali avete trovato?"
          }
        ]
      },
      {
        "id": "2026-W44-3",
        "section": "tesori",
        "title": "3. Lettura biblica",
        "duration": 4,
        "assignedScriptures": [
          "GEREMIA 47-48",
          " Ger 48:1-13"
        ],
        "sourceText": "(4 min) Ger 48:1-13 (th lezione 11)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026259",
        "type": "reading"
      },
      {
        "id": "2026-W44-4",
        "section": "ministero",
        "title": "4. Iniziare una conversazione",
        "duration": 3,
        "assignedScriptures": [
          "GEREMIA 47-48"
        ],
        "sourceText": "(3 min) DI CASA IN CASA. (lmd lezione 5 punto 4)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026259",
        "type": "demonstration"
      },
      {
        "id": "2026-W44-5",
        "section": "ministero",
        "title": "5. Coltivare l’interesse",
        "duration": 4,
        "assignedScriptures": [
          "GEREMIA 47-48"
        ],
        "sourceText": "(4 min) TESTIMONIANZA INFORMALE. Parla di una delle verità bibliche riportate nell’appendice A dell’opuscolo Ama le persone. (lmd lezione 9 punto 5)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026259",
        "type": "demonstration"
      },
      {
        "id": "2026-W44-6",
        "section": "ministero",
        "title": "6. Fare discepoli",
        "duration": 5,
        "assignedScriptures": [
          "GEREMIA 47-48"
        ],
        "sourceText": "(5 min) Incoraggia una persona che studia la Bibbia con te a pregare più spesso. (th lezione 8)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026259",
        "type": "conversation"
      },
      {
        "id": "2026-W44-7",
        "section": "vita",
        "title": "7. Bisogni locali",
        "duration": 15,
        "assignedScriptures": [
          "GEREMIA 47-48"
        ],
        "sourceText": "(15 min)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026259",
        "type": "talk"
      },
      {
        "id": "2026-W44-8",
        "section": "vita",
        "title": "8. Studio biblico di congregazione",
        "duration": 30,
        "assignedScriptures": [
          "GEREMIA 47-48"
        ],
        "sourceText": "(30 min) wcg cap. 14",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026259",
        "type": "congregation_study"
      }
    ],
    "watchtowerStudy": {
      "title": "Apprezziamo il privilegio di rendere sacro servizio senza timore",
      "themeScripture": "Ha suscitato per noi un corno di salvezza per concederci il privilegio di rendergli sacro servizio senza timore (LUCA 1:69, 74)",
      "song": {
        "number": 62,
        "title": "CANTICO 62 Il nuovo canto"
      },
      "concludingSong": {
        "number": 159,
        "title": "CANTICO 159 Gloria a Geova!"
      },
      "summary": "Articolo di studio della Torre di Guardia per la settimana del 26 OTTOBRE – 1º NOVEMBRE.",
      "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/2026523",
      "paragraphs": [
        {
          "num": 1,
          "text": "1. Di cosa parlava la profezia di Zaccaria?",
          "question": "Domanda paragrafo 1"
        },
        {
          "num": 2,
          "text": "2. (a) In base a Luca 1:67-73, quale dono promise Dio ai suoi servitori? (b) Chi è il “potente salvatore” di cui si parla in Luca 1:69?",
          "question": "Domanda paragrafo 2"
        },
        {
          "num": 3,
          "text": "3. Da chi e da cosa avevano bisogno di essere salvati gli ebrei del I secolo?",
          "question": "Domanda paragrafo 3"
        },
        {
          "num": 4,
          "text": "4. Da chi e da cosa abbiamo bisogno di essere salvati oggi?",
          "question": "Domanda paragrafo 4"
        },
        {
          "num": 5,
          "text": "5. In quali modi Gesù ci salva dalla condanna del peccato?",
          "question": "Domanda paragrafo 5"
        },
        {
          "num": 6,
          "text": "6. Cosa farà Gesù come Re sul trono di Davide? (Vedi anche l’immagine.)",
          "question": "Domanda paragrafo 6"
        },
        {
          "num": 7,
          "text": "7. In base a Luca 1:74, 75, quale privilegio dà Geova ai suoi servitori?",
          "question": "Domanda paragrafo 7"
        },
        {
          "num": 8,
          "text": "8. Cosa non dobbiamo temere?",
          "question": "Domanda paragrafo 8"
        },
        {
          "num": 9,
          "text": "9. Contro quali sentimenti lottano alcuni cristiani?",
          "question": "Domanda paragrafo 9"
        },
        {
          "num": 12,
          "text": "12. In che modo Giovanni Battista preparò le vie di Geova? (Luca 1:76-79).",
          "question": "Domanda paragrafo 12"
        },
        {
          "num": 13,
          "text": "13. In che senso la venuta del Messia sarebbe stata come “un’alba” per il popolo di Dio?",
          "question": "Domanda paragrafo 13"
        },
        {
          "num": 14,
          "text": "14. Quale importante opera svolsero Gesù e i suoi discepoli? (Isaia 61:1, 2).",
          "question": "Domanda paragrafo 14"
        },
        {
          "num": 15,
          "text": "15. Perché oggi predicare è più importante che mai?",
          "question": "Domanda paragrafo 15"
        },
        {
          "num": 16,
          "text": "16. Cosa siete decisi a fare? (Vedi anche le immagini.)",
          "question": "Domanda paragrafo 16"
        }
      ]
    }
  },
  {
    "id": "2026-W45",
    "weekLabel": "2-8 NOVEMBRE",
    "dateRange": "2-8 novembre",
    "bibleReading": "GEREMIA 49-50",
    "openingSong": {
      "number": 1,
      "title": "Cantico 1 e preghiera | Commenti introduttivi (1 min)"
    },
    "middleSong": {
      "number": 44,
      "title": "Cantico 44"
    },
    "concludingSong": {
      "number": 33,
      "title": "Commenti conclusivi (3 min) | Cantico 33 e preghiera"
    },
    "mwbWolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026401",
    "watchtowerWolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/2026560",
    "isCurrent": false,
    "parts": [
      {
        "id": "2026-W45-1",
        "section": "tesori",
        "title": "1. Aiutiamo altri a trarre beneficio dalla misericordia di Geova",
        "duration": 10,
        "assignedScriptures": [
          "GEREMIA 49-50"
        ],
        "sourceText": "1. Aiutiamo altri a trarre beneficio dalla misericordia di Geova\n\n\n(10 min)\n\nGeova condannò giustamente Babilonia per i suoi gravi peccati e la sua arroganza (Ger 50:14, 29, 31; it “Presunzione” par. 10)\nGeova perdonò completamente gli israeliti che si erano pentiti (Ger 50:20)\nI cristiani si sforzano di imitare la misericordia di Geova proclamando la buona notizia e aiutando le persone a uscire dalla falsa religione (Ger 50:2, 8; w08 15/6 8-9 parr. 8-11)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026401",
        "type": "talk"
      },
      {
        "id": "2026-W45-2",
        "section": "tesori",
        "title": "2. Gemme spirituali",
        "duration": 10,
        "assignedScriptures": [
          "GEREMIA 49-50",
          "\n\nGer 50:24"
        ],
        "sourceText": "(10 min)\n\nGer 50:24 — In che modo Geova prese al “laccio” Babilonia? (it “Trappola” par. 3)\n\nLa tua risposta\n\n\n\nNella lettura biblica di questa settimana quali gemme spirituali avete trovato?\n\nLa tua risposta",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026401",
        "type": "gems",
        "questions": [
          {
            "question": "Ger 50:24 — In che modo Geova prese al “laccio” Babilonia? (it “Trappola” par. 3)",
            "sourceSnippet": "Ger 50:24 — In che modo Geova prese al “laccio” Babilonia? (it “Trappola” par. 3)"
          },
          {
            "question": "Nella lettura biblica di questa settimana quali gemme spirituali avete trovato?",
            "sourceSnippet": "Nella lettura biblica di questa settimana quali gemme spirituali avete trovato?"
          }
        ]
      },
      {
        "id": "2026-W45-3",
        "section": "tesori",
        "title": "3. Lettura biblica",
        "duration": 4,
        "assignedScriptures": [
          "GEREMIA 49-50",
          " Ger 50:24-40"
        ],
        "sourceText": "(4 min) Ger 50:24-40 (th lezione 11)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026401",
        "type": "reading"
      },
      {
        "id": "2026-W45-4",
        "section": "ministero",
        "title": "4. Iniziare una conversazione",
        "duration": 3,
        "assignedScriptures": [
          "GEREMIA 49-50"
        ],
        "sourceText": "(3 min) DI CASA IN CASA. Parla di una verità biblica, ad esempio una di quelle riportate nell’appendice A dell’opuscolo Ama le persone. (lmd lezione 1 punto 5)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026401",
        "type": "demonstration"
      },
      {
        "id": "2026-W45-5",
        "section": "ministero",
        "title": "5. Coltivare l’interesse",
        "duration": 4,
        "assignedScriptures": [
          "GEREMIA 49-50"
        ],
        "sourceText": "(4 min) DI CASA IN CASA. La persona si mostra interessata a un argomento diverso da quello che tu avevi in mente di trattare. (lmd lezione 9 punto 3)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026401",
        "type": "demonstration"
      },
      {
        "id": "2026-W45-6",
        "section": "ministero",
        "title": "6. Fare discepoli",
        "duration": 5,
        "assignedScriptures": [
          "GEREMIA 49-50"
        ],
        "sourceText": "(5 min) lff lezione 20 punto 4 (lmd lezione 11 punto 4)",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026401",
        "type": "conversation"
      },
      {
        "id": "2026-W45-7",
        "section": "vita",
        "title": "7. Non dimentichiamo mai quello che Geova ricorda",
        "duration": 15,
        "assignedScriptures": [
          "GEREMIA 49-50"
        ],
        "sourceText": "(15 min) Trattazione.\n\nFai vedere il VIDEO. Poi chiedi:\n  Quali lezioni avete imparato?\n\nLa tua risposta",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026401",
        "type": "talk"
      },
      {
        "id": "2026-W45-8",
        "section": "vita",
        "title": "8. Studio biblico di congregazione",
        "duration": 30,
        "assignedScriptures": [
          "GEREMIA 49-50"
        ],
        "sourceText": "(30 min) wcg cap. 15",
        "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/202026401",
        "type": "congregation_study"
      }
    ],
    "watchtowerStudy": {
      "title": "Confidiamo in Geova per avere protezione",
      "themeScripture": "Hai detto: “Geova è il mio rifugio” (SAL. 91:9)",
      "song": {
        "number": 3,
        "title": "CANTICO 3 Tu sei la nostra fiducia, forza e speranza"
      },
      "concludingSong": {
        "number": 8,
        "title": "CANTICO 8 Geova è il nostro rifugio"
      },
      "summary": "Articolo di studio della Torre di Guardia per la settimana del 2-8 NOVEMBRE.",
      "wolUrl": "https://wol.jw.org/it/wol/d/r6/lp-i/2026560",
      "paragraphs": [
        {
          "num": 3,
          "text": "3. Cosa vedremo in questo articolo?",
          "question": "Domanda paragrafo 3"
        },
        {
          "num": 4,
          "text": "4. In che modo i primi versetti del Salmo 91 ci garantiscono la protezione di Geova? (Salmo 91:1, 2).",
          "question": "Domanda paragrafo 4"
        },
        {
          "num": 7,
          "text": "7. Quali tipi di protezione promette il Salmo 91?",
          "question": "Domanda paragrafo 7"
        },
        {
          "num": 10,
          "text": "10. Quale fiducia abbiamo?",
          "question": "Domanda paragrafo 10"
        },
        {
          "num": 11,
          "text": "11. In che modo Geova ci protegge spiritualmente?",
          "question": "Domanda paragrafo 11"
        },
        {
          "num": 14,
          "text": "14. In che modo lo spirito santo può proteggerci?",
          "question": "Domanda paragrafo 14"
        },
        {
          "num": 15,
          "text": "15. In che modo l’organizzazione di Geova ci protegge spiritualmente? (Vedi anche le immagini.)",
          "question": "Domanda paragrafo 15"
        },
        {
          "num": 16,
          "text": "16. Quali prove Geova ha permesso che alcuni suoi servitori affrontassero, e di cosa possiamo essere sicuri?",
          "question": "Domanda paragrafo 16"
        },
        {
          "num": 17,
          "text": "17. Per quale motivo non ci aspettiamo che Geova oggi ci protegga da qualsiasi danno fisico?",
          "question": "Domanda paragrafo 17"
        },
        {
          "num": 18,
          "text": "18. Come ci proteggerà Geova in futuro?",
          "question": "Domanda paragrafo 18"
        }
      ]
    }
  }
];

export function generateUpcomingWeeks(count = 10, baseDate = new Date()): WolMeetingWeek[] {
  return SAMPLE_WOL_WEEKS;
}

export function createDynamicCurrentWeek(date = new Date()): WolMeetingWeek {
  return SAMPLE_WOL_WEEKS[0];
}
