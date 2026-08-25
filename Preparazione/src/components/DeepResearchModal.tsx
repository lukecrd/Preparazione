import React, { useState, useEffect } from "react";
import { DeepResearchData, MeetingPart } from "../types";
import { executeDeepResearch, searchWolLibrary } from "../services/api";
import {
  X,
  Search,
  Sparkles,
  Copy,
  Check,
  Bookmark,
  BookOpen,
  Globe,
  ExternalLink,
  History,
  Languages,
  ArrowRight,
  AlertCircle,
  Lightbulb,
  FileText,
} from "lucide-react";

interface DeepResearchModalProps {
  part: MeetingPart | null;
  weekLabel: string;
  isOpen: boolean;
  onClose: () => void;
  onSaveResearch: (part: MeetingPart, researchData: DeepResearchData) => void;
  onOpenWolLink: (url: string, title: string) => void;
  existingResearch?: DeepResearchData | null;
}

export const DeepResearchModal: React.FC<DeepResearchModalProps> = ({
  part,
  weekLabel,
  isOpen,
  onClose,
  onSaveResearch,
  onOpenWolLink,
  existingResearch,
}) => {
  if (!isOpen || !part) return null;

  const [topic, setTopic] = useState<string>(part.title);
  const [researchGoal, setResearchGoal] = useState<string>("Contesto storico, termini originali e riferimenti incrociati");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [research, setResearch] = useState<DeepResearchData | null>(existingResearch || null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (existingResearch) {
      setResearch(existingResearch);
      setTopic(existingResearch.topic);
    } else {
      setTopic(part.title);
      setResearch(null);
    }
    setError(null);
  }, [part, existingResearch]);

  // Suggested quick topics from assigned scriptures
  const suggestedTopics = [
    part.title,
    ...(part.assignedScriptures || []),
    "Amore leale (chèsed) di Geova",
    "Perspicacia e contesto storico",
  ].filter(Boolean);

  const handleResearch = async () => {
    if (!topic.trim()) return;
    setIsSearching(true);
    setError(null);
    try {
      const result = await executeDeepResearch({
        topic: topic.trim(),
        contextPart: `${part.title} (${part.section})`,
        scriptures: part.assignedScriptures,
        researchGoal,
      });
      setResearch(result);
    } catch (err: any) {
      setError(err.message || "Impossibile completare la ricerca. Riprova.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleCopy = () => {
    if (!research) return;
    const textToCopy = `APPROFONDIMENTO WOL: ${research.topic}
Fonte esclusiva: Watchtower ONLINE LIBRARY (wol.jw.org)

SINTESI:
${research.executiveSummary}

CONTESTO STORICO E CULTURALE:
${research.historicalAndCulturalBackground}

TERMINI IN LINGUA ORIGINALE:
${research.originalLanguageNuances.map((n) => `• ${n.term} (${n.language}): ${n.literalMeaning} - ${n.theologicalSignificance}`).join("\n")}

RIFERIMENTI INCROCIATI:
${research.keyScripturalCrossReferences.map((c) => `• ${c.scripture}: ${c.connectionExplanation}`).join("\n")}

LEZIONI E APPLICAZIONI SPIRITUALI:
${research.spiritualLessonsAndApplications.map((l) => `• ${l}`).join("\n")}

ARTICOLI CITATI SU WOL:
${research.wolArticlesCited.map((a) => `• ${a.title} (${a.publication}): ${a.relevance}`).join("\n")}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSave = () => {
    if (!research) return;
    onSaveResearch(part, research);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold tracking-tight text-white">
                  Approfondimento Tematico WOL
                </h2>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-400/30">
                  Esclusivo wol.jw.org
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate max-w-md">
                {part.title} &bull; {weekLabel}
              </p>
            </div>
          </div>

          <button
            id="close-research-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Search Controls */}
          <div className="bg-purple-50/60 p-4 rounded-xl border border-purple-100 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Argomento o versetto da approfondire:
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Es. Salmo 110:3, Davide e Saul, Timore di Geova..."
                  className="w-full text-xs sm:text-sm bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Obiettivo approfondimento:
                </label>
                <select
                  value={researchGoal}
                  onChange={(e) => setResearchGoal(e.target.value)}
                  className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 font-medium text-slate-800 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  <option value="Contesto storico, termini originali e riferimenti incrociati">Contesto storico e termini originali</option>
                  <option value="Spiegazione dottrinale e adempimento profetico">Spiegazione dottrinale e profezie</option>
                  <option value="Illustrazioni e aneddoti pratici">Illustrazioni ed esempi pratici</option>
                  <option value="Come spiegare questo punto nel ministero">Come spiegarlo nel ministero</option>
                </select>
              </div>
            </div>

            {/* Quick Topic Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-bold text-purple-900">Suggeriti per questa parte:</span>
              {suggestedTopics.map((sug, s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setTopic(sug)}
                  className="text-[11px] font-medium bg-white hover:bg-purple-100 text-purple-800 px-2 py-0.5 rounded-md border border-purple-200 transition"
                >
                  {sug}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-purple-200/60">
              <div className="text-[11px] text-purple-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                <span>Ricerca limitata esclusivamente al dominio <strong>wol.jw.org</strong></span>
              </div>

              <button
                id="execute-research-btn"
                onClick={handleResearch}
                disabled={isSearching || !topic.trim()}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-bold text-xs shadow-sm transition"
              >
                <Sparkles className={`w-4 h-4 ${isSearching ? "animate-spin" : ""}`} />
                <span>{isSearching ? "Consultazione biblioteca WOL..." : "Avvia Ricerca Approfondita"}</span>
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Research Results */}
          {research ? (
            <div className="space-y-6">
              
              {/* Action Toolbar */}
              <div className="flex items-center justify-between bg-slate-900 text-white p-3.5 rounded-xl">
                <div className="text-xs font-semibold text-slate-300">
                  Risultati della ricerca per: <strong className="text-purple-300">"{research.topic}"</strong>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    id="copy-research-btn"
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copiato!" : "Copia Tutto"}</span>
                  </button>

                  <button
                    id="save-research-btn"
                    onClick={handleSave}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{savedSuccess ? "Salvato nei tuoi appunti!" : "Salva"}</span>
                  </button>
                </div>
              </div>

              {/* 1. Executive Summary */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-800">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                  <span>Sintesi Teocratica e Dottrinale</span>
                </div>
                <p className="text-sm text-slate-800 leading-relaxed font-medium">
                  {research.executiveSummary}
                </p>
              </div>

              {/* 2. Historical & Cultural Context */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                  <History className="w-4 h-4 text-slate-600" />
                  <span>Contesto Storico, Culturale e Geografico (*Perspicacia*)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {research.historicalAndCulturalBackground}
                </p>
              </div>

              {/* 3. Original Language Nuances (Hebrew / Greek) */}
              {research.originalLanguageNuances && research.originalLanguageNuances.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-800">
                    <Languages className="w-4 h-4 text-blue-600" />
                    <span>Analisi dei Termini in Lingua Originale (Ebraico / Greco)</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {research.originalLanguageNuances.map((nuance, idx) => (
                      <div
                        key={idx}
                        className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-blue-950 text-sm">{nuance.term}</span>
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                            {nuance.language}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700">
                          <strong>Significato letterale:</strong> {nuance.literalMeaning}
                        </p>
                        <p className="text-xs text-slate-600 italic">
                          <strong>Significato teologico:</strong> {nuance.theologicalSignificance}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Cross References */}
              {research.keyScripturalCrossReferences && research.keyScripturalCrossReferences.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                    <ArrowRight className="w-4 h-4 text-emerald-600" />
                    <span>Riferimenti Incrociati e Scritture Collegate</span>
                  </div>
                  <div className="space-y-2">
                    {research.keyScripturalCrossReferences.map((cross, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-2.5 rounded-lg bg-emerald-50/40 border border-emerald-100 text-xs"
                      >
                        <span className="font-bold text-emerald-950 shrink-0 bg-emerald-100 px-2 py-0.5 rounded">
                          {cross.scripture}
                        </span>
                        <span className="text-slate-700 leading-relaxed">
                          {cross.connectionExplanation}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Spiritual Lessons */}
              {research.spiritualLessonsAndApplications && research.spiritualLessonsAndApplications.length > 0 && (
                <div className="bg-amber-50/40 rounded-2xl border border-amber-200/80 p-5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <span>Lezioni Spirituali e Meditazioni Personali</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-800">
                    {research.spiritualLessonsAndApplications.map((lesson, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 6. WOL Cited Articles with Direct Links */}
              {research.wolArticlesCited && research.wolArticlesCited.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                    <FileText className="w-4 h-4 text-slate-600" />
                    <span>Pubblicazioni e Articoli di Riferimento su wol.jw.org</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {research.wolArticlesCited.map((art, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-col justify-between"
                      >
                        <div>
                          <h6 className="font-bold text-slate-900 text-xs mb-0.5">{art.title}</h6>
                          <span className="text-[11px] font-medium text-purple-700 block mb-1">
                            {art.publication}
                          </span>
                          <p className="text-[11px] text-slate-600 line-clamp-2">
                            {art.relevance}
                          </p>
                        </div>
                        {art.wolUrl && (
                          <button
                            onClick={() => onOpenWolLink(art.wolUrl!, art.title)}
                            className="mt-2 text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 self-start"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Apri articolo su WOL</span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-2xl">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 mb-1">
                Approfondisci qualsiasi argomento
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                Inserisci un argomento o un versetto per consultare enciclopedie, *Perspicacia* e *Torre di Guardia* su wol.jw.org.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
