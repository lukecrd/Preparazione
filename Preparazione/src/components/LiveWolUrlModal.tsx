import React, { useState } from "react";
import { X, Link2, Globe, Sparkles, Check, AlertCircle } from "lucide-react";

interface LiveWolUrlModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadLiveUrl: (url: string) => Promise<void>;
}

export const LiveWolUrlModal: React.FC<LiveWolUrlModalProps> = ({
  isOpen,
  onClose,
  onLoadLiveUrl,
}) => {
  if (!isOpen) return null;

  const [inputUrl, setInputUrl] = useState<string>("https://wol.jw.org/it/wol/meetings/r6/lp-i");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    if (!inputUrl.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await onLoadLiveUrl(inputUrl.trim());
      onClose();
    } catch (err: any) {
      setError(err.message || "Impossibile caricare il programma da questo URL.");
    } finally {
      setLoading(false);
    }
  };

  const sampleLinks = [
    { label: "Adunanza Settimana Corrente (WOL)", url: "https://wol.jw.org/it/wol/meetings/r6/lp-i" },
    { label: "Programma 2025 Settimana 10", url: "https://wol.jw.org/it/wol/meetings/r6/lp-i/2025/10" },
    { label: "Programma 2025 Settimana 11", url: "https://wol.jw.org/it/wol/meetings/r6/lp-i/2025/11" },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Link2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Carica Programma da WOL</h3>
              <p className="text-xs text-slate-400">Inserisci un link del programma adunanze da wol.jw.org</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              URL pagina "Adunanze" wol.jw.org:
            </label>
            <input
              type="url"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="https://wol.jw.org/it/wol/meetings/r6/lp-i/..."
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-mono text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Quick presets */}
          <div>
            <span className="text-[11px] font-bold text-slate-500 block mb-1.5">Esempi rapidi:</span>
            <div className="space-y-1">
              {sampleLinks.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setInputUrl(s.url)}
                  className="w-full text-left text-xs p-2 rounded-lg bg-slate-50 hover:bg-emerald-50 hover:text-emerald-900 border border-slate-200 transition flex items-center justify-between"
                >
                  <span className="font-semibold">{s.label}</span>
                  <span className="text-[10px] text-slate-400 truncate max-w-xs">{s.url}</span>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
            >
              Annulla
            </button>
            <button
              id="fetch-live-wol-btn"
              onClick={handleFetch}
              disabled={loading || !inputUrl.trim()}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-xl shadow-sm transition"
            >
              <Sparkles className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>{loading ? "Caricamento da WOL..." : "Connetti e Leggi"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
