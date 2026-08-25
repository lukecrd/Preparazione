import React, { useState } from "react";
import { SavedPreparation } from "../types";
import { 
  X, 
  BookmarkCheck, 
  Trash2, 
  Copy, 
  Check, 
  Mic, 
  MessageSquareText, 
  Search, 
  Calendar,
  ExternalLink,
  BookOpen
} from "lucide-react";

interface SavedPreparationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedItems: SavedPreparation[];
  onDeleteItem: (id: string) => void;
  onOpenTalkModal: (prep: SavedPreparation) => void;
  onOpenCommentsModal: (prep: SavedPreparation) => void;
  onOpenResearchModal: (prep: SavedPreparation) => void;
}

export const SavedPreparationsDrawer: React.FC<SavedPreparationsDrawerProps> = ({
  isOpen,
  onClose,
  savedItems,
  onDeleteItem,
  onOpenTalkModal,
  onOpenCommentsModal,
  onOpenResearchModal,
}) => {
  if (!isOpen) return null;

  const [activeFilter, setActiveFilter] = useState<'all' | 'talk' | 'comments' | 'research'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredItems = savedItems.filter((it) => {
    if (activeFilter === 'all') return true;
    return it.type === activeFilter;
  });

  const handleCopyPrep = (item: SavedPreparation) => {
    let text = "";
    if (item.type === 'talk' && item.talkOutline) {
      text = `DISCORSO: ${item.talkOutline.title} (${item.talkOutline.totalMinutes} min)\nScrittura: ${item.talkOutline.themeScripture}\n\n${item.talkOutline.sections.map((s, i) => `Punto ${i + 1}: ${s.pointTitle}\n${s.explanation}`).join("\n\n")}`;
    } else if (item.type === 'comments' && item.commentsData) {
      text = item.commentsData.items.map((q) => `${q.questionOrParagraph}\nRisposta: ${q.directAnswer}\nCommento: ${q.expandedComment}`).join("\n\n");
    } else if (item.type === 'research' && item.researchData) {
      text = `APPROFONDIMENTO: ${item.researchData.topic}\n\n${item.researchData.executiveSummary}`;
    }

    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <BookmarkCheck className="w-6 h-6 text-blue-400" />
            <div>
              <h2 className="text-base font-bold text-white">I Miei Appunti & Preparazioni</h2>
              <p className="text-xs text-slate-400">
                {savedItems.length} elementi salvati in memoria locale
              </p>
            </div>
          </div>

          <button
            id="close-saved-drawer-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'all', label: 'Tutti', count: savedItems.length },
            { id: 'talk', label: 'Discorsi', count: savedItems.filter(i => i.type === 'talk').length },
            { id: 'comments', label: 'Commenti IA', count: savedItems.filter(i => i.type === 'comments').length },
            { id: 'research', label: 'Ricerche WOL', count: savedItems.filter(i => i.type === 'research').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                activeFilter === tab.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 px-4">
              <BookmarkCheck className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-slate-700">Nessuna preparazione salvata</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                Quando crei un discorso, generi risposte o fai una ricerca, clicca su "Salva" per ritrovarli qui.
              </p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isTalk = item.type === 'talk';
              const isComments = item.type === 'comments';
              const isResearch = item.type === 'research';

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:border-slate-300 transition space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isTalk
                          ? 'bg-blue-100 text-blue-800'
                          : isComments
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {isTalk ? 'Discorso a Tempo' : isComments ? 'Commenti & Risposte' : 'Ricerca WOL'}
                    </span>

                    <span className="text-[11px] text-slate-400">
                      {new Date(item.createdAt).toLocaleDateString("it-IT", { day: "2-digit", month: "short" })}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm leading-snug">
                    {item.partTitle}
                  </h4>

                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{item.weekLabel}</span>
                  </p>

                  {/* Snippet summary */}
                  {isTalk && item.talkOutline && (
                    <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
                      <strong>Scrittura:</strong> {item.talkOutline.themeScripture} ({item.talkOutline.totalMinutes} min)
                    </p>
                  )}
                  {isComments && item.commentsData && (
                    <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
                      {item.commentsData.items.length} domande / punti preparati
                    </p>
                  )}
                  {isResearch && item.researchData && (
                    <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-100 line-clamp-2">
                      {item.researchData.executiveSummary}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          if (isTalk) onOpenTalkModal(item);
                          else if (isComments) onOpenCommentsModal(item);
                          else if (isResearch) onOpenResearchModal(item);
                        }}
                        className="px-2.5 py-1 text-xs font-bold text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition"
                      >
                        Visualizza & Modifica
                      </button>

                      <button
                        onClick={() => handleCopyPrep(item)}
                        className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition"
                        title="Copia appunti"
                      >
                        {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="p-1 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded transition"
                      title="Elimina appunto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
