import React from "react";
import { BookOpen, Search, Link2, BookmarkCheck, RefreshCw } from "lucide-react";
import { MeetingWeek } from "../types";
import { isWeekCurrent } from "../utils/dateUtils";

interface HeaderProps {
  weeks: MeetingWeek[];
  selectedWeekId: string;
  onSelectWeek: (weekId: string) => void;
  onOpenLiveUrlModal: () => void;
  onOpenSavedDrawer: () => void;
  onOpenSearchModal: () => void;
  savedCount: number;
  isLoading: boolean;
  onRefresh: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  weeks,
  selectedWeekId,
  onSelectWeek,
  onOpenLiveUrlModal,
  onOpenSavedDrawer,
  onOpenSearchModal,
  savedCount,
  isLoading,
  onRefresh,
}) => {
  return (
    <header
      id="main-header"
      className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-700 rounded-md flex items-center justify-center text-white font-black italic shadow-sm shadow-blue-200">
              W
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 flex items-center">
                <span>WOL</span>
                <span className="text-blue-700 font-black">Prep</span>
                <span className="hidden lg:inline text-slate-400 font-normal ml-2 text-xs">
                  | Assistente Organizzazione Adunanze
                </span>
              </h1>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                  wol.jw.org &bull; Dati Ufficiali
                </span>
              </div>
            </div>
          </div>

          {/* Week Selector Dropdown */}
          <div className="hidden md:flex items-center space-x-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 pl-2">
              Settimana:
            </span>
            <select
              id="week-select-dropdown"
              value={selectedWeekId}
              onChange={(e) => onSelectWeek(e.target.value)}
              className="bg-white text-xs font-bold text-slate-800 py-1.5 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-700 cursor-pointer shadow-xs max-w-[340px]"
            >
              {weeks.map((w, idx) => {
                const current = isWeekCurrent(w) || idx === 0;
                const prefix = current 
                  ? "📍 [In corso] " 
                  : idx === 1 
                  ? "🗓️ [Prossima] " 
                  : `🗓️ [+${idx} sett.] `;
                return (
                  <option key={w.id} value={w.id}>
                    {prefix}{w.weekLabel} — {w.bibleReading}
                  </option>
                );
              })}
            </select>

            <button
              id="refresh-weeks-btn"
              onClick={onRefresh}
              disabled={isLoading}
              title="Sincronizza con WOL"
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-blue-700" : ""}`} />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <div className="hidden xl:flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>Connesso a wol.jw.org</span>
            </div>

            <button
              id="search-wol-btn"
              onClick={onOpenSearchModal}
              className="flex items-center space-x-1.5 px-3 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition"
              title="Cerca nella biblioteca wol.jw.org"
            >
              <Search className="w-3.5 h-3.5 text-blue-700" />
              <span className="hidden sm:inline">Cerca</span>
            </button>

            <button
              id="load-custom-url-btn"
              onClick={onOpenLiveUrlModal}
              className="flex items-center space-x-1.5 px-3 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition"
              title="Carica link specifico da wol.jw.org"
            >
              <Link2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">URL WOL</span>
            </button>

            <button
              id="saved-preps-btn"
              onClick={onOpenSavedDrawer}
              className="relative flex items-center space-x-1.5 px-4 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition shadow-md shadow-slate-200"
            >
              <BookmarkCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Appunti</span>
              {savedCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-blue-700 text-white text-[10px] font-black rounded-full">
                  {savedCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Week Selector */}
        <div className="md:hidden py-2.5 border-t border-slate-100 flex items-center gap-2">
          <select
            id="week-select-mobile"
            value={selectedWeekId}
            onChange={(e) => onSelectWeek(e.target.value)}
            className="w-full bg-slate-50 text-xs font-bold text-slate-800 py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-700"
          >
            {weeks.map((w, idx) => {
              const current = isWeekCurrent(w) || idx === 0;
              const prefix = current 
                ? "📍 [In corso] " 
                : idx === 1 
                ? "🗓️ [Prossima] " 
                : `🗓️ [+${idx} sett.] `;
              return (
                <option key={w.id} value={w.id}>
                  {prefix}{w.weekLabel} — {w.bibleReading}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </header>
  );
};
