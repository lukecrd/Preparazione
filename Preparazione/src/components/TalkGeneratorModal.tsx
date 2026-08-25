import React, { useState, useEffect } from "react";
import { MeetingPart, TalkOutline, DialogueLine } from "../types";
import { generateTalkOutline } from "../services/api";
import { 
  X, 
  Mic, 
  Clock, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  Copy, 
  Check, 
  Bookmark, 
  Printer, 
  BookOpen, 
  AlertCircle, 
  ExternalLink,
  Users,
  UserCheck,
  User,
  MessageSquare,
  HelpCircle,
  Lightbulb,
  Volume2,
  Square,
  FileText
} from "lucide-react";

interface TalkGeneratorModalProps {
  part: MeetingPart | null;
  weekLabel: string;
  isOpen: boolean;
  onClose: () => void;
  onSaveTalk: (part: MeetingPart, outline: TalkOutline) => void;
  existingOutline?: TalkOutline | null;
}

export const TalkGeneratorModal: React.FC<TalkGeneratorModalProps> = ({
  part,
  weekLabel,
  isOpen,
  onClose,
  onSaveTalk,
  existingOutline,
}) => {
  if (!isOpen || !part) return null;

  const isMinistryDialogue = part.section === "ministero" && !part.title.toLowerCase().includes("discorso");

  const [durationMinutes, setDurationMinutes] = useState<number>(part.duration || (isMinistryDialogue ? 4 : 10));
  const [audienceType, setAudienceType] = useState<string>(
    isMinistryDialogue ? "Di casa in casa" : "Congregazione locale"
  );
  const [personalFocus, setPersonalFocus] = useState<string>(
    isMinistryDialogue 
      ? "Seguire fedelmente la traccia con naturalezza ed empatia"
      : "Applicazione pratica e calore spirituale"
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [outline, setOutline] = useState<TalkOutline | null>(existingOutline || null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"dialogue" | "outline">(isMinistryDialogue ? "dialogue" : "outline");

  // Rehearsal timer state
  const [isRehearsing, setIsRehearsing] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Audio Speech state
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const [isSpeakingAll, setIsSpeakingAll] = useState<boolean>(false);

  useEffect(() => {
    if (existingOutline) {
      setOutline(existingOutline);
      setDurationMinutes(existingOutline.totalMinutes);
      setActiveTab(existingOutline.isDialogue ? "dialogue" : "outline");
    } else {
      setDurationMinutes(part.duration || (isMinistryDialogue ? 4 : 10));
      setOutline(null);
      setActiveTab(isMinistryDialogue ? "dialogue" : "outline");
    }
    setError(null);
    setIsRehearsing(false);
    setTimerSeconds(0);
    setIsTimerRunning(false);
    stopAudio();
  }, [part, existingOutline, isMinistryDialogue]);

  // Timer countdown / countup
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!isTimerRunning && timerSeconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const stopAudio = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingIndex(null);
    setIsSpeakingAll(false);
  };

  const handleSpeakLine = (text: string, index: number) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (speakingIndex === index) {
      stopAudio();
      return;
    }
    stopAudio();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "it-IT";
    utterance.rate = 0.95;
    utterance.onend = () => setSpeakingIndex(null);
    utterance.onerror = () => setSpeakingIndex(null);
    setSpeakingIndex(index);
    window.speechSynthesis.speak(utterance);
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const targetSeconds = (outline?.totalMinutes || durationMinutes) * 60;
  const isTimeOver = timerSeconds > targetSeconds;
  const isTimeNear = timerSeconds > targetSeconds * 0.85 && !isTimeOver;

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    stopAudio();
    try {
      const result = await generateTalkOutline({
        partTitle: part.title,
        section: part.section,
        durationMinutes,
        sourceText: part.sourceText,
        assignedScriptures: part.assignedScriptures,
        audienceType,
        personalFocus,
      });
      setOutline(result);
      setActiveTab(result.isDialogue ? "dialogue" : "outline");
    } catch (err: any) {
      setError(err.message || "Impossibile generare la preparazione. Riprova.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!outline) return;

    if (outline.isDialogue && outline.dialogue) {
      const d = outline.dialogue;
      const scriptText = d.dialogueLines
        .map(
          (line) =>
            `[${line.speakerName}] ${line.stageDirection ? `(${line.stageDirection}) ` : ""}\n"${line.dialogueText}"`
        )
        .join("\n\n");

      const textToCopy = `DIMOSTRAZIONE A DUE PERSONE: ${outline.title} (${outline.totalMinutes} min)
TRACCIA & SCENARIO:
- Scenario: ${d.setting}
- Interlocutore: ${d.householderProfile} (Persona NON Testimone di Geova)
- Domanda iniziale dalla traccia: ${d.initialQuestion}
- Scrittura da leggere: ${d.scriptureToRead}
- Domanda in sospeso per la visita ulteriore: ${d.pendingQuestion}

COPIONE DEL DIALOGO:
${scriptText}

CONSIGLI PER GLI STUDENTI:
${d.studentTips.map((t) => `- ${t}`).join("\n")}

FONTI WOL.JW.ORG:
${outline.wolSources.map((w) => `- ${w.title} (${w.publication}): ${w.citation}`).join("\n")}`;

      navigator.clipboard.writeText(textToCopy);
    } else {
      const textToCopy = `DISCORSO: ${outline.title} (${outline.totalMinutes} min)
Scrittura tematica: ${outline.themeScripture}

INTRODUZIONE (${outline.introduction.timeAllocated}):
- ${outline.introduction.hookQuestionOrIllustration}
- Obiettivo: ${outline.introduction.purposeStatement}
- Suggerimento: ${outline.introduction.speakerTip}

CORPO DEL DISCORSO:
${outline.sections
  .map(
    (s, i) => `Punto ${i + 1} (${s.timeAllocated}) - ${s.pointTitle}
• Spiegazione: ${s.explanation}
• Scrittura: ${s.scriptureReference} (${s.scriptureApplication})
• Illustrazione: ${s.illustration || "N/A"}
• Note oratore: ${s.speakerNotes}`
  )
  .join("\n\n")}

CONCLUSIONE (${outline.conclusion.timeAllocated}):
- Sintesi: ${outline.conclusion.summary}
- Esortazione: ${outline.conclusion.motivationalCallToAction}
${outline.conclusion.finalThoughtOrScripture ? `- Pensiero finale: ${outline.conclusion.finalThoughtOrScripture}` : ""}

FONTI WOL.JW.ORG:
${outline.wolSources.map((w) => `- ${w.title} (${w.publication}): ${w.citation}`).join("\n")}`;

      navigator.clipboard.writeText(textToCopy);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSave = () => {
    if (!outline) return;
    onSaveTalk(part, outline);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white ${isMinistryDialogue ? "bg-amber-600" : "bg-blue-600"}`}>
              {isMinistryDialogue ? <Users className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold tracking-tight text-white">
                  {isMinistryDialogue 
                    ? "Dimostrazione Ministero (Dialogo a Due)" 
                    : "Generatore Discorso a Tempo"}
                </h2>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
                  isMinistryDialogue 
                    ? "bg-amber-500/20 text-amber-300 border-amber-400/30" 
                    : "bg-blue-500/20 text-blue-300 border-blue-400/30"
                }`}>
                  {durationMinutes} Minuti
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate max-w-md">
                {part.title} &bull; {weekLabel}
              </p>
            </div>
          </div>

          <button
            id="close-talk-modal-btn"
            onClick={() => {
              stopAudio();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Official Track Notice for Ministry Dialogue */}
          {isMinistryDialogue && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3 text-xs text-amber-900">
              <Users className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-amber-950">
                  Struttura a due persone conforme alle linee guida teocratiche:
                </p>
                <p className="text-amber-800 leading-relaxed">
                  Questa parte viene preparata come una conversazione naturale tra il <strong>Proclamatore (Testimone di Geova)</strong> e un <strong>Interlocutore (Persona che non è Testimone di Geova)</strong> seguendo scrupolosamente la traccia della Guida per l'adunanza.
                </p>
              </div>
            </div>
          )}

          {/* Controls Bar (Time, Audience/Setting, Focus) */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Duration selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>Tempo stabilito (Minuti)</span>
                </label>
                <div className="flex items-center gap-1.5">
                  {[2, 3, 4, 5, 10, 15].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setDurationMinutes(mins)}
                      className={`flex-1 py-1.5 px-1 rounded-lg text-xs font-bold transition ${
                        durationMinutes === mins
                          ? (isMinistryDialogue ? "bg-amber-600 text-white shadow-sm" : "bg-blue-600 text-white shadow-sm")
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>
              </div>

              {/* Scenario / Audience selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {isMinistryDialogue ? "Ambientazione / Scenario" : "Tipo di Uditorio"}
                </label>
                {isMinistryDialogue ? (
                  <select
                    value={audienceType}
                    onChange={(e) => setAudienceType(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 font-medium text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="Di casa in casa">Di casa in casa (Territorio locale)</option>
                    <option value="Testimonianza informale">Testimonianza informale (Vicino / conoscente)</option>
                    <option value="Posto di lavoro o scuola">Sul posto di lavoro o a scuola</option>
                    <option value="Predicazione pubblica / Territorio commerciale">Predicazione pubblica / Espositore mobile</option>
                  </select>
                ) : (
                  <select
                    value={audienceType}
                    onChange={(e) => setAudienceType(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 font-medium text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Congregazione locale">Congregazione locale</option>
                    <option value="Giovani e famiglie">Giovani e famiglie</option>
                    <option value="Nuovi e persone interessate">Nuovi e persone interessate</option>
                    <option value="Scuola di ministero / Esercitazione">Esercitazione per studenti</option>
                  </select>
                )}
              </div>

              {/* Personal Focus / Interlocutore Attitude */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {isMinistryDialogue ? "Profilo Persona non TG & Focus" : "Focus Teocratico"}
                </label>
                {isMinistryDialogue ? (
                  <select
                    value={personalFocus}
                    onChange={(e) => setPersonalFocus(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 font-medium text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="Seguire fedelmente la traccia con naturalezza ed empatia">Seguire la traccia con naturalezza ed empatia</option>
                    <option value="Persona cordiale ma preoccupata per il futuro del mondo">Persona cordiale ma preoccupata per il futuro</option>
                    <option value="Persona occupata ma disposta a una breve riflessione">Persona occupata (conversazione concisa)</option>
                    <option value="Persona credente di altra religione">Persona credente con opinioni personali</option>
                  </select>
                ) : (
                  <select
                    value={personalFocus}
                    onChange={(e) => setPersonalFocus(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 font-medium text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Applicazione pratica e calore spirituale">Applicazione pratica e calore</option>
                    <option value="Analisi scritturale approfondita">Analisi scritturale e contesto</option>
                    <option value="Incoraggiamento ed empatia">Incoraggiamento e conforto</option>
                    <option value="Efficacia nel ministero di campo">Efficacia nel ministero</option>
                  </select>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Basato fedelmente sulla traccia ufficiale e <strong>wol.jw.org</strong></span>
              </div>

              <button
                id="generate-talk-submit-btn"
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-white font-bold text-xs shadow-sm transition ${
                  isMinistryDialogue
                    ? "bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400"
                    : "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400"
                }`}
              >
                <Sparkles className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
                <span>
                  {isGenerating 
                    ? "Elaborazione con IA in corso..." 
                    : outline 
                      ? (isMinistryDialogue ? "Rigenera Dimostrazione" : "Rigenera Schema")
                      : (isMinistryDialogue ? "Prepara Dimostrazione a 2" : "Crea Schema Discorso")}
                </span>
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Outline / Dialogue Display */}
          {outline ? (
            <div className="space-y-6">
              
              {/* Toolbar & Rehearsal Timer Bar */}
              <div className="bg-slate-900 text-white p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <button
                    id="toggle-rehearsal-mode-btn"
                    onClick={() => setIsRehearsing(!isRehearsing)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      isRehearsing ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isRehearsing ? "Modalità Esercitazione Attiva" : "Esercitati con Cronometro"}</span>
                  </button>

                  {/* Rehearsal timer */}
                  <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span
                      className={`font-mono text-sm font-bold ${
                        isTimeOver ? "text-rose-400 animate-pulse" : isTimeNear ? "text-amber-400" : "text-emerald-400"
                      }`}
                    >
                      {formatTimer(timerSeconds)} / {outline.totalMinutes}:00
                    </span>
                    <button
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className="p-1 rounded hover:bg-slate-700 text-slate-300 transition"
                      title={isTimerRunning ? "Pausa cronometro" : "Avvia cronometro"}
                    >
                      {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => {
                        setIsTimerRunning(false);
                        setTimerSeconds(0);
                      }}
                      className="p-1 rounded hover:bg-slate-700 text-slate-300 transition"
                      title="Azzera cronometro"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Actions: Copy, Save, Print */}
                <div className="flex items-center gap-2">
                  <button
                    id="copy-talk-btn"
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copiato!" : "Copia tutto"}</span>
                  </button>

                  <button
                    id="save-talk-btn"
                    onClick={handleSave}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{savedSuccess ? "Salvato!" : "Salva"}</span>
                  </button>

                  <button
                    id="print-talk-btn"
                    onClick={handlePrint}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
                    title="Stampa schema / copione"
                  >
                    <Printer className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* View Switcher if dialogue is available */}
              {outline.isDialogue && outline.dialogue && (
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <button
                    onClick={() => setActiveTab("dialogue")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                      activeTab === "dialogue"
                        ? "bg-amber-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Copione del Dialogo a 2 (Battute & Scena)</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("outline")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                      activeTab === "outline"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Schema Strutturato & Punti Chiave</span>
                  </button>
                </div>
              )}

              {/* DIALOGUE VIEW (2 People: Proclaimer TG + Interlocutor Non TG) */}
              {outline.isDialogue && outline.dialogue && activeTab === "dialogue" && (
                <div className="border border-slate-200 rounded-2xl p-6 bg-white space-y-6 print:border-none print:p-0">
                  
                  {/* Title & Official Track Header */}
                  <div className="border-b border-slate-200 pb-4">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                        Dimostrazione Efficaci nel Ministero ({outline.totalMinutes} minuti)
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        Tempo consigliato: {outline.totalMinutes} minuti
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      {outline.title}
                    </h3>
                  </div>

                  {/* Track Overview Box (Traccia Ufficiale) */}
                  <div className="bg-amber-50/60 rounded-xl p-4 border border-amber-200/80 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-amber-700" />
                      <span>Traccia Assegnata & Elementi della Visita</span>
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="bg-white p-3 rounded-lg border border-amber-200/60 space-y-1">
                        <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wide text-amber-900">
                          📍 Ambientazione / Scenario:
                        </span>
                        <p className="text-slate-700">{outline.dialogue.setting}</p>
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-amber-200/60 space-y-1">
                        <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wide text-amber-900">
                          👤 Interlocutore (Persona NON Testimone):
                        </span>
                        <p className="text-slate-700">{outline.dialogue.householderProfile}</p>
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-amber-200/60 space-y-1">
                        <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wide text-amber-900">
                          ❓ Domanda iniziale (Traccia):
                        </span>
                        <p className="text-slate-700 font-medium">{outline.dialogue.initialQuestion}</p>
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-amber-200/60 space-y-1">
                        <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wide text-amber-900">
                          📖 Scrittura da leggere e considerare:
                        </span>
                        <p className="text-blue-900 font-bold">{outline.dialogue.scriptureToRead}</p>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-amber-200/60 text-xs">
                      <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wide text-amber-900 mb-0.5">
                        🔄 Domanda lasciata in sospeso per la visita successiva:
                      </span>
                      <p className="text-slate-800 font-semibold">{outline.dialogue.pendingQuestion}</p>
                    </div>
                  </div>

                  {/* Full Script (Battuta per Battuta) */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-blue-600" />
                        <span>Svolgimento del Dialogo (Battuta per Battuta)</span>
                      </h4>
                      <span className="text-[11px] text-slate-500 italic">
                        Clicca sull'icona audio per ascoltare la dizione
                      </span>
                    </div>

                    <div className="space-y-3.5">
                      {outline.dialogue.dialogueLines.map((line, idx) => {
                        const isProclaimer = line.speakerRole === "proclaimer";

                        return (
                          <div
                            key={idx}
                            className={`p-4 rounded-xl border transition-all ${
                              isProclaimer
                                ? "bg-blue-50/40 border-blue-200/80 ml-0 mr-4 sm:mr-10"
                                : "bg-amber-50/40 border-amber-200/80 ml-4 sm:ml-10 mr-0"
                            }`}
                          >
                            {/* Speaker Header */}
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {isProclaimer ? (
                                  <div className="w-6 h-6 rounded-full bg-blue-700 text-white flex items-center justify-center">
                                    <UserCheck className="w-3.5 h-3.5" />
                                  </div>
                                ) : (
                                  <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center">
                                    <User className="w-3.5 h-3.5" />
                                  </div>
                                )}
                                <span className={`text-xs font-bold ${isProclaimer ? "text-blue-950" : "text-amber-950"}`}>
                                  {line.speakerName}
                                </span>
                              </div>

                              <button
                                onClick={() => handleSpeakLine(line.dialogueText, idx)}
                                className="p-1 rounded-md text-slate-400 hover:text-blue-700 hover:bg-slate-100 transition"
                                title="Ascolta questa battuta"
                              >
                                {speakingIndex === idx ? (
                                  <Square className="w-3.5 h-3.5 text-rose-600 fill-current animate-pulse" />
                                ) : (
                                  <Volume2 className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>

                            {/* Dialogue Text */}
                            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                              "{line.dialogueText}"
                            </p>

                            {/* Stage Direction */}
                            {line.stageDirection && (
                              <div className="mt-2 text-[11px] text-slate-500 italic bg-white/80 px-2.5 py-1 rounded-md border border-slate-200/60 inline-flex items-center gap-1.5">
                                <span className="font-semibold text-slate-600">Note di scena:</span>
                                <span>{line.stageDirection}</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tips for Students */}
                  {outline.dialogue.studentTips && outline.dialogue.studentTips.length > 0 && (
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        <span>Consigli Pratici per l'Esercitazione Teocratica</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {outline.dialogue.studentTips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-amber-600 font-bold shrink-0">&bull;</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Sources from wol.jw.org */}
                  {outline.wolSources && outline.wolSources.length > 0 && (
                    <div className="border-t border-slate-200 pt-4">
                      <h5 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                        <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                        <span>Fonti e Riferimenti Watchtower ONLINE LIBRARY:</span>
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {outline.wolSources.map((src, i) => (
                          <div
                            key={i}
                            className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs"
                          >
                            <span className="font-bold text-slate-900 block">{src.title}</span>
                            <span className="text-slate-500 text-[11px] block">{src.publication} &bull; {src.citation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STANDARD TALK / OUTLINE VIEW */}
              {(!outline.isDialogue || activeTab === "outline") && (
                <div className="border border-slate-200 rounded-2xl p-6 bg-white space-y-6 print:border-none print:p-0">
                  
                  {/* Title & Theme Scripture */}
                  <div className="border-b border-slate-200 pb-4">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                        Schema Strutturato ({outline.totalMinutes} minuti)
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        Milestones: Intro {outline.timingMilestones?.introTime} &bull; Corpo {outline.timingMilestones?.bodyTime} &bull; Concl. {outline.timingMilestones?.conclusionTime}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      {outline.title}
                    </h3>
                    <p className="text-sm font-semibold text-blue-900 mt-1 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Scrittura tematica: {outline.themeScripture}</span>
                    </p>
                  </div>

                  {/* Introduction Section */}
                  <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                        <span>Introduzione</span>
                      </h4>
                      <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                        Tempo: {outline.introduction.timeAllocated}
                      </span>
                    </div>
                    <p className="text-sm text-slate-800 leading-relaxed font-medium">
                      {outline.introduction.hookQuestionOrIllustration}
                    </p>
                    <p className="text-xs text-slate-600">
                      <strong>Obiettivo:</strong> {outline.introduction.purposeStatement}
                    </p>
                    <div className="text-[11px] text-teal-800 bg-teal-50/70 p-2 rounded-lg border border-teal-100 italic">
                      💡 <strong>Consiglio per l'esposizione:</strong> {outline.introduction.speakerTip}
                    </div>
                  </div>

                  {/* Body Sections */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Punti Chiave ({outline.sections.length} Punti)
                    </h4>

                    {outline.sections.map((section, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm space-y-3"
                      >
                        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <h5 className="font-bold text-slate-900 text-sm">
                              {section.pointTitle}
                            </h5>
                          </div>
                          <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                            {section.timeAllocated}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {section.explanation}
                        </p>

                        {/* Scripture & Application */}
                        <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100/80 space-y-1.5">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                            <span>Scrittura: {section.scriptureReference}</span>
                          </div>
                          <p className="text-xs text-slate-700 italic pl-5">
                            {section.scriptureApplication}
                          </p>
                        </div>

                        {/* Illustration if present */}
                        {section.illustration && (
                          <div className="text-xs text-amber-900 bg-amber-50/60 p-2.5 rounded-lg border border-amber-100">
                            🎯 <strong>Illustrazione / Esempio pratico:</strong> {section.illustration}
                          </div>
                        )}

                        {/* Speaker Notes */}
                        <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200/60">
                          🎙️ <strong>Note di esposizione:</strong> {section.speakerNotes}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Conclusion Section */}
                  <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                        <span>Conclusione</span>
                      </h4>
                      <span className="text-xs font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        Tempo: {outline.conclusion.timeAllocated}
                      </span>
                    </div>
                    <p className="text-sm text-slate-800 leading-relaxed font-medium">
                      {outline.conclusion.summary}
                    </p>
                    <p className="text-xs font-bold text-rose-900 bg-rose-50 p-2 rounded-lg border border-rose-100">
                      🚀 <strong>Esortazione finale:</strong> {outline.conclusion.motivationalCallToAction}
                    </p>
                    {outline.conclusion.finalThoughtOrScripture && (
                      <p className="text-xs text-slate-600 italic">
                        Pensiero conclusivo: {outline.conclusion.finalThoughtOrScripture}
                      </p>
                    )}
                  </div>

                  {/* Sources from wol.jw.org */}
                  {outline.wolSources && outline.wolSources.length > 0 && (
                    <div className="border-t border-slate-200 pt-4">
                      <h5 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                        <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                        <span>Fonti e Riferimenti Watchtower ONLINE LIBRARY:</span>
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {outline.wolSources.map((src, i) => (
                          <div
                            key={i}
                            className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs"
                          >
                            <span className="font-bold text-slate-900 block">{src.title}</span>
                            <span className="text-slate-500 text-[11px] block">{src.publication} &bull; {src.citation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-2xl">
              {isMinistryDialogue ? (
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              ) : (
                <Mic className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              )}
              <h3 className="text-base font-bold text-slate-800 mb-1">
                {isMinistryDialogue ? "Nessuna dimostrazione generata ancora" : "Nessuno schema generato ancora"}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                {isMinistryDialogue 
                  ? "Seleziona lo scenario e clicca su 'Prepara Dimostrazione a 2' per generare il dialogo realistico tra il Proclamatore (TG) e l'Interlocutore (non TG) seguendo la traccia."
                  : "Seleziona i minuti stabiliti dal programma e clicca su 'Crea Schema Discorso' per elaborare l'intervento con l'IA."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
