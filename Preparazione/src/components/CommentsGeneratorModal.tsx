import React, { useState, useEffect } from "react";
import { CommentAnswerItem, GeneratedCommentsData, MeetingPart } from "../types";
import { generateCommentsAndAnswers } from "../services/api";
import {
  X,
  MessageSquareText,
  Sparkles,
  Copy,
  Check,
  Bookmark,
  Volume2,
  VolumeX,
  Edit3,
  BookOpen,
  HelpCircle,
  AlertCircle,
  Zap,
  Layers,
  Lightbulb,
} from "lucide-react";

interface CommentsGeneratorModalProps {
  part: MeetingPart | null;
  weekLabel: string;
  bibleReading?: string;
  isOpen: boolean;
  onClose: () => void;
  onSaveComments: (part: MeetingPart, commentsData: GeneratedCommentsData) => void;
  existingComments?: GeneratedCommentsData | null;
}

export const CommentsGeneratorModal: React.FC<CommentsGeneratorModalProps> = ({
  part,
  weekLabel,
  bibleReading,
  isOpen,
  onClose,
  onSaveComments,
  existingComments,
}) => {
  if (!isOpen || !part) return null;

  const [stylePreference, setStylePreference] = useState<string>("Tutte le opzioni (Diretta, Approfondita, Applicazione)");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [data, setData] = useState<GeneratedCommentsData | null>(existingComments || null);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [activeSpeechIndex, setActiveSpeechIndex] = useState<number | null>(null);
  const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);

  useEffect(() => {
    if (existingComments) {
      setData(existingComments);
    } else {
      setData(null);
    }
    setError(null);

    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [part, existingComments]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const result = await generateCommentsAndAnswers({
        partTitle: part.title,
        section: part.section,
        sourceText: part.sourceText,
        questions: part.questions || [],
        paragraphs: part.paragraphs || [],
        stylePreference,
        assignedScriptures: part.assignedScriptures || [],
        bibleReading: bibleReading || "",
      });
      setData(result);
    } catch (err: any) {
      setError(err.message || "Impossibile preparare i commenti. Riprova.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopySingle = (item: CommentAnswerItem, type: 'direct' | 'expanded' | 'practical' | 'scripture' | 'all', idKey: string) => {
    let text = "";
    const scriptureRef = item.linkedScripture?.reference ? ` (${item.linkedScripture.reference})` : "";
    
    if (type === 'direct') {
      text = item.linkedScripture?.reference 
        ? `${item.directAnswer} [${item.linkedScripture.reference}]` 
        : item.directAnswer;
    } else if (type === 'expanded') {
      text = item.linkedScripture?.reference 
        ? `${item.expandedComment}\n\nVersetto di riferimento: ${item.linkedScripture.reference}` 
        : item.expandedComment;
    } else if (type === 'practical') {
      text = item.linkedScripture?.reference 
        ? `${item.practicalApplication}\n\nPrincipio scritturale: ${item.linkedScripture.reference}` 
        : item.practicalApplication;
    } else if (type === 'scripture') {
      text = item.linkedScripture 
        ? `${item.linkedScripture.reference} - ${item.linkedScripture.explanation}` 
        : "";
    } else {
      text = `DOMANDA: ${item.questionOrParagraph}
${item.linkedScripture ? `VERSETTO DI RIFERIMENTO: ${item.linkedScripture.reference}\nSPIEGAZIONE SCRITTURALE: ${item.linkedScripture.explanation}\n` : ""}
RISPOSTA DIRETTA: ${item.directAnswer}

COMMENTO APPROFONDITO: ${item.expandedComment}

APPLICAZIONE PRATICA: ${item.practicalApplication}`;
    }

    navigator.clipboard.writeText(text);
    setCopiedId(idKey);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyAll = () => {
    if (!data) return;
    const textAll = data.items
      .map(
        (it, idx) => `[${idx + 1}] ${it.questionOrParagraph}
${it.linkedScripture ? `📖 Versetto di riferimento: ${it.linkedScripture.reference} (${it.linkedScripture.explanation})` : ""}
• Risposta diretta: ${it.directAnswer}
• Commento approfondito: ${it.expandedComment}
• Applicazione pratica: ${it.practicalApplication}`
      )
      .join("\n\n---\n\n");

    navigator.clipboard.writeText(textAll);
    setCopiedId("all");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (text: string, index: number) => {
    if (!("speechSynthesis" in window)) return;
    if (activeSpeechIndex === index) {
      window.speechSynthesis.cancel();
      setActiveSpeechIndex(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "it-IT";
    utterance.rate = 1.0;
    utterance.onend = () => setActiveSpeechIndex(null);
    utterance.onerror = () => setActiveSpeechIndex(null);
    window.speechSynthesis.speak(utterance);
    setActiveSpeechIndex(index);
  };

  const handleSave = () => {
    if (!data) return;
    onSaveComments(part, data);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
              <MessageSquareText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                <span>Preparazione Commenti e Risposte IA</span>
              </h2>
              <p className="text-xs text-slate-400 truncate max-w-md">
                {part.title} &bull; {weekLabel}
              </p>
            </div>
          </div>

          <button
            id="close-comments-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Controls */}
          <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Stile dei commenti desiderato:
                </label>
                <select
                  value={stylePreference}
                  onChange={(e) => setStylePreference(e.target.value)}
                  className="w-full sm:w-80 text-xs bg-white border border-slate-200 rounded-lg p-2 font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="Tutte le opzioni (Diretta, Approfondita, Applicazione)">Tutte le opzioni (Diretta, Approfondita, Applicazione)</option>
                  <option value="Risposte concise (20-30 secondi per la prima alzata di mano)">Risposte concise (20-30 sec, prima alzata di mano)</option>
                  <option value="Commenti con spiegazione scritturale dettagliata">Commenti con versetti collegati</option>
                  <option value="Focus su applicazione pratica personale e familiare">Focus su vita quotidiana e famiglia</option>
                </select>
              </div>

              <button
                id="generate-comments-submit-btn"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold text-xs shadow-sm transition"
              >
                <Sparkles className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
                <span>{isGenerating ? "Elaborazione risposte..." : (data ? "Rigenera Commenti" : "Genera Risposte Automatiche")}</span>
              </button>
            </div>

            <div className="text-[11px] text-emerald-800 flex items-center gap-1.5 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Le risposte sono formulate rigorosamente secondo i paragrafi e le pubblicazioni di <strong>wol.jw.org</strong></span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Results List */}
          {data ? (
            <div className="space-y-6">
              
              {/* Action Toolbar */}
              <div className="flex items-center justify-between bg-slate-900 text-white p-3.5 rounded-xl">
                <div className="text-xs font-semibold text-slate-300">
                  {data.items.length} Domande / Punti pronti per l'adunanza
                </div>
                <div className="flex items-center gap-2">
                  <button
                    id="copy-all-comments-btn"
                    onClick={handleCopyAll}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition"
                  >
                    {copiedId === "all" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === "all" ? "Tutto Copiato!" : "Copia Tutti"}</span>
                  </button>

                  <button
                    id="save-comments-btn"
                    onClick={handleSave}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{savedSuccess ? "Salvato nei tuoi appunti!" : "Salva"}</span>
                  </button>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-5">
                {data.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 hover:border-slate-300 transition"
                  >
                    {/* Question Banner */}
                    <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                      <div className="flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                          {idx + 1}
                        </span>
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-slate-900 leading-snug">
                            {item.questionOrParagraph}
                          </h4>
                          {item.linkedScripture?.reference && (
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-800 text-[11px] font-bold">
                              <BookOpen className="w-3 h-3 text-blue-600" />
                              <span>Versetto di riferimento: {item.linkedScripture.reference}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleSpeak(`${item.questionOrParagraph}. Versetto di riferimento: ${item.linkedScripture?.reference || ""}. Risposta diretta: ${item.directAnswer}. Commento: ${item.expandedComment}`, idx)}
                          className={`p-1.5 rounded-lg transition ${
                            activeSpeechIndex === idx ? "bg-emerald-100 text-emerald-700" : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                          }`}
                          title="Ascolta commento con sintesi vocale"
                        >
                          {activeSpeechIndex === idx ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>

                        <button
                          onClick={() => handleCopySingle(item, 'all', `item-${idx}`)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                          title="Copia domanda e tutte le risposte"
                        >
                          {copiedId === `item-${idx}` ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Keywords */}
                    {item.keyWordsToHighlight && item.keyWordsToHighlight.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Concetti chiave:</span>
                        {item.keyWordsToHighlight.map((kw, k) => (
                          <span
                            key={k}
                            className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* 3 Response Formats (Direct, Deep, Practical) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      
                      {/* Option 1: Risposta Diretta */}
                      <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 flex flex-col justify-between space-y-2">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1">
                              <Zap className="w-3 h-3 text-blue-600" />
                              <span>Risposta Diretta (20s)</span>
                            </span>
                            <button
                              onClick={() => handleCopySingle(item, 'direct', `direct-${idx}`)}
                              className="text-[11px] text-blue-600 hover:underline font-medium"
                            >
                              {copiedId === `direct-${idx}` ? "Copiato!" : "Copia"}
                            </button>
                          </div>
                          <p className="text-xs text-slate-800 leading-relaxed font-medium">
                            {item.directAnswer}
                          </p>
                        </div>
                        <span className="text-[10px] text-slate-400 italic block">Ideale per la prima risposta</span>
                      </div>

                      {/* Option 2: Commento Approfondito */}
                      <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 flex flex-col justify-between space-y-2">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
                              <Layers className="w-3 h-3 text-emerald-600" />
                              <span>Commento Approfondito</span>
                            </span>
                            <button
                              onClick={() => handleCopySingle(item, 'expanded', `exp-${idx}`)}
                              className="text-[11px] text-emerald-600 hover:underline font-medium"
                            >
                              {copiedId === `exp-${idx}` ? "Copiato!" : "Copia"}
                            </button>
                          </div>
                          <p className="text-xs text-slate-800 leading-relaxed">
                            {item.expandedComment}
                          </p>
                        </div>
                        <span className="text-[10px] text-slate-400 italic block">Spiega il motivo con ragionamento</span>
                      </div>

                      {/* Option 3: Applicazione Pratica */}
                      <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 flex flex-col justify-between space-y-2">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1">
                              <Lightbulb className="w-3 h-3 text-amber-600" />
                              <span>Applicazione Pratica</span>
                            </span>
                            <button
                              onClick={() => handleCopySingle(item, 'practical', `prac-${idx}`)}
                              className="text-[11px] text-amber-600 hover:underline font-medium"
                            >
                              {copiedId === `prac-${idx}` ? "Copiato!" : "Copia"}
                            </button>
                          </div>
                          <p className="text-xs text-slate-800 leading-relaxed">
                            {item.practicalApplication}
                          </p>
                        </div>
                        <span className="text-[10px] text-slate-400 italic block">Per il ministero o la famiglia</span>
                      </div>
                    </div>

                    {/* Linked Scripture */}
                    {item.linkedScripture && (
                      <div className="text-xs text-slate-700 bg-blue-50/80 p-3 rounded-xl border border-blue-200 flex items-start justify-between gap-3 shadow-2xs">
                        <div className="flex items-start gap-2.5">
                          <BookOpen className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-blue-950 text-xs flex items-center gap-1.5 mb-0.5">
                              <span>Versetto di riferimento:</span>
                              <span className="bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded font-mono text-[11px]">
                                {item.linkedScripture.reference}
                              </span>
                            </div>
                            <p className="text-xs text-slate-700 leading-relaxed">{item.linkedScripture.explanation}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleCopySingle(item, 'scripture', `scr-${idx}`)}
                          className="shrink-0 flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-blue-700 bg-white hover:bg-blue-100/50 border border-blue-200 rounded-lg transition"
                          title="Copia versetto e spiegazione"
                        >
                          {copiedId === `scr-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedId === `scr-${idx}` ? "Copiato!" : "Copia versetto"}</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-2xl">
              <MessageSquareText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 mb-1">
                Pronto a preparare i tuoi commenti
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                Clicca su "Genera Risposte Automatiche" per ottenere suggerimenti per ogni domanda basati su wol.jw.org.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
