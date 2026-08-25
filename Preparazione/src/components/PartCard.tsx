import React from "react";
import { MeetingPart, SectionType } from "../types";
import { 
  Clock, 
  Mic, 
  MessageSquareText, 
  Search, 
  ExternalLink, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle,
  Users
} from "lucide-react";

interface PartCardProps {
  part: MeetingPart;
  onOpenTalkModal: (part: MeetingPart) => void;
  onOpenCommentsModal: (part: MeetingPart) => void;
  onOpenResearchModal: (part: MeetingPart) => void;
  onOpenWolViewer: (url: string, title: string) => void;
  isSaved?: boolean;
}

export const PartCard: React.FC<PartCardProps> = ({
  part,
  onOpenTalkModal,
  onOpenCommentsModal,
  onOpenResearchModal,
  onOpenWolViewer,
  isSaved,
}) => {
  const isMinistryDialogue = part.section === "ministero" && !part.title.toLowerCase().includes("discorso");

  const getSectionBadge = (section: SectionType) => {
    switch (section) {
      case "tesori":
        return {
          label: "Tesori della Parola di Dio",
          bg: "bg-indigo-50 text-indigo-700 border-indigo-200",
          accent: "border-l-indigo-500",
          textAccent: "text-indigo-600",
        };
      case "ministero":
        return {
          label: "Efficaci nel Ministero",
          bg: "bg-amber-50 text-amber-800 border-amber-200",
          accent: "border-l-amber-500",
          textAccent: "text-amber-600",
        };
      case "vita":
        return {
          label: "Vita Cristiana",
          bg: "bg-rose-50 text-rose-800 border-rose-200",
          accent: "border-l-rose-500",
          textAccent: "text-rose-600",
        };
      case "torre":
        return {
          label: "Studio Torre di Guardia",
          bg: "bg-blue-50 text-blue-800 border-blue-200",
          accent: "border-l-blue-600",
          textAccent: "text-blue-600",
        };
      default:
        return {
          label: "Parte dell'Adunanza",
          bg: "bg-slate-50 text-slate-700 border-slate-200",
          accent: "border-l-slate-400",
          textAccent: "text-slate-600",
        };
    }
  };

  const badge = getSectionBadge(part.section);

  return (
    <div
      id={`part-card-${part.id}`}
      className={`bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md transition-all overflow-hidden flex flex-col justify-between border-l-4 ${badge.accent}`}
    >
      <div className="p-5 sm:p-6">
        {/* Top bar with Section and Timing */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border ${badge.bg}`}>
            {badge.label}
          </span>
          <div className="flex items-center gap-1.5 text-xs font-black text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{part.duration} MIN</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug mb-2.5">
          {part.title}
        </h3>

        {/* Assigned Scriptures */}
        {part.assignedScriptures && part.assignedScriptures.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-blue-700 shrink-0" />
            {part.assignedScriptures.map((scr, idx) => (
              <span
                key={idx}
                className="text-[11px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/70"
              >
                {scr}
              </span>
            ))}
          </div>
        )}

        {/* Source Text / Context */}
        {part.sourceText && (
          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100 italic">
            "{part.sourceText}"
          </p>
        )}

        {/* Question badges if available */}
        {part.questions && part.questions.length > 0 && (
          <div className="mb-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-amber-500" />
              <span>{part.questions.length} domande / punti di analisi</span>
            </span>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="bg-slate-50/90 px-4 py-3.5 border-t border-slate-100 flex flex-col gap-2.5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* Action 1: Crea Discorso o Dimostrazione / Dialogo a due */}
          <button
            id={`create-talk-btn-${part.id}`}
            onClick={() => onOpenTalkModal(part)}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition shadow-sm ${
              isMinistryDialogue 
                ? "bg-amber-600 hover:bg-amber-700 text-white" 
                : "bg-blue-700 hover:bg-blue-800 text-white"
            }`}
            title={
              isMinistryDialogue
                ? `Prepara dimostrazione a due (Proclamatore TG e persona non TG) di ${part.duration} min seguendo la traccia`
                : `Crea discorso strutturato di ${part.duration} minuti`
            }
          >
            {isMinistryDialogue ? <Users className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
            <span>{isMinistryDialogue ? "Dialogo (2)" : "Discorso"}</span>
          </button>

          {/* Action 2: Prepara Commenti e Risposte con IA */}
          <button
            id={`prep-comments-btn-${part.id}`}
            onClick={() => onOpenCommentsModal(part)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-black uppercase tracking-wider rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-sm"
            title="Prepara risposte rapide, commenti approfonditi e applicazioni pratiche"
          >
            <MessageSquareText className="w-3.5 h-3.5" />
            <span>Commenti</span>
          </button>

          {/* Action 3: Approfondisci Argomento (Ricerca WOL) */}
          <button
            id={`deep-research-btn-${part.id}`}
            onClick={() => onOpenResearchModal(part)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-black uppercase tracking-wider rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition shadow-sm"
            title="Approfondisci con contesto storico, greco/ebraico e riferimenti WOL"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Ricerca</span>
          </button>
        </div>

        {/* Source link on wol.jw.org */}
        <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
          <button
            id={`wol-reader-link-${part.id}`}
            onClick={() => onOpenWolViewer(part.wolUrl, part.title)}
            className="inline-flex items-center gap-1 text-slate-600 hover:text-blue-700 font-bold hover:underline transition"
          >
            <ExternalLink className="w-3 h-3 text-slate-400" />
            <span>Fonte su wol.jw.org</span>
          </button>

          {isSaved && (
            <span className="flex items-center gap-1 text-emerald-600 font-bold text-[11px] uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Preparato</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
