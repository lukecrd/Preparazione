import React, { useState } from "react";
import { searchWolLibrary } from "../services/api";
import { X, Search, ExternalLink, BookOpen, Sparkles, Loader2, FileText } from "lucide-react";

interface WolSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWolLink: (url: string, title: string) => void;
  onStartResearch: (query: string) => void;
}

export const WolSearchModal: React.FC<WolSearchModalProps> = ({
  isOpen,
  onClose,
  onOpenWolLink,
  onStartResearch,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<{ title: string; publication: string; wolUrl: string; snippet: string }[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setHasSearched(true);
    try {
      const res = await searchWolLibrary(query.trim());
      setResults(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[88vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Cerca su Watchtower ONLINE LIBRARY</h3>
              <p className="text-xs text-slate-400">Ricerca diretta su wol.jw.org</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cerca versetto, argomento, o pubblicazione (es. Salmo 110, Amore leale, Chèsed)..."
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                autoFocus
              />
            </div>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>Cerca</span>
            </button>
          </form>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading ? (
            <div className="text-center py-16">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
              <p className="text-xs text-slate-500">Ricerca negli archivi wol.jw.org...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span>Trovati {results.length} risultati su wol.jw.org</span>
                <button
                  onClick={() => {
                    onClose();
                    onStartResearch(query);
                  }}
                  className="text-purple-600 hover:text-purple-800 font-bold flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Avvia Approfondimento IA su "{query}"</span>
                </button>
              </div>

              {results.map((res, i) => (
                <div
                  key={i}
                  className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-blue-900 leading-snug">
                      {res.title}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
                      {res.publication}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {res.snippet}
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={() => onOpenWolLink(res.wolUrl, res.title)}
                      className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Leggi su WOL</span>
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onStartResearch(res.title);
                      }}
                      className="text-[11px] font-semibold text-purple-600 hover:underline flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Approfondisci questo articolo</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : hasSearched ? (
            <div className="text-center py-16 text-xs text-slate-500">
              Nessun risultato trovato su wol.jw.org per "{query}". Prova con un altro termine biblico o riferimento scritturale.
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <p className="text-xs text-slate-500">Cerca versetti, temi o articoli per consultare le pubblicazioni online.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
