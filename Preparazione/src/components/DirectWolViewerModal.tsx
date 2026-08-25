import React, { useState, useEffect } from "react";
import { fetchWolPageContent } from "../services/api";
import { X, ExternalLink, BookOpen, Loader2, AlertCircle } from "lucide-react";

interface DirectWolViewerModalProps {
  url: string | null;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export const DirectWolViewerModal: React.FC<DirectWolViewerModalProps> = ({
  url,
  title,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !url) return null;

  const [loading, setLoading] = useState<boolean>(true);
  const [articleData, setArticleData] = useState<{ title: string; content: string; paragraphs: string[]; questions: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchWolPageContent(url)
      .then((data) => {
        if (isMounted) {
          setArticleData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError("Impossibile caricare direttamente il testo. Puoi aprire il link direttamente su wol.jw.org.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-lg">
                {title}
              </h3>
              <span className="text-[11px] text-slate-400">Lettore integrato Watchtower ONLINE LIBRARY</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Apri su WOL</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {loading ? (
            <div className="text-center py-20">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
              <p className="text-xs text-slate-500 font-medium">Recupero contenuto da wol.jw.org in corso...</p>
            </div>
          ) : error ? (
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
              <h4 className="text-sm font-bold text-slate-800">Visualizzazione esterna consigliata</h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                La pagina richiesta può essere consultata direttamente con tutte le sue funzioni multimediali su wol.jw.org.
              </p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Apri pagina su wol.jw.org</span>
              </a>
            </div>
          ) : articleData ? (
            <div className="prose prose-slate max-w-none text-slate-800 text-sm leading-relaxed space-y-4">
              <h2 className="text-xl font-black text-slate-900 border-b border-slate-200 pb-2">
                {articleData.title || title}
              </h2>

              {articleData.paragraphs && articleData.paragraphs.length > 0 ? (
                articleData.paragraphs.map((p, i) => (
                  <p key={i} className="text-slate-700 leading-relaxed text-sm">
                    {p}
                  </p>
                ))
              ) : (
                <p className="text-slate-700">{articleData.content || "Nessun testo estratto."}</p>
              )}

              {articleData.questions && articleData.questions.length > 0 && (
                <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">Domande di studio nell'articolo:</h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {articleData.questions.map((q, qi) => (
                      <li key={qi} className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
