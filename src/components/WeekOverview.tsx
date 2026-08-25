import React from "react";
import { BookMarked, Music, Calendar, ExternalLink, Sparkles, Clock, CheckCircle2, Radio } from "lucide-react";
import { MeetingWeek } from "../types";
import { isWeekCurrent } from "../utils/dateUtils";

interface WeekOverviewProps {
  week: MeetingWeek;
  onOpenWolLink: (url: string, title: string) => void;
  savedPartsCount: number;
}

export const WeekOverview: React.FC<WeekOverviewProps> = ({ week, onOpenWolLink, savedPartsCount }) => {
  const totalMinutes = week.parts.reduce((acc, p) => acc + (p.duration || 0), 0);
  const isCurrent = isWeekCurrent(week);

  return (
    <div id="week-overview-card" className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
      <div className="bg-slate-900 p-5 sm:p-7 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-blue-700 text-white flex items-center gap-1 shadow-xs">
                <Calendar className="w-3 h-3" />
                {week.dateRange}
              </span>
              {isCurrent && (
                <span className="px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white flex items-center gap-1 shadow-xs animate-pulse">
                  <Radio className="w-3 h-3" />
                  Settimana in corso
                </span>
              )}
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Guida Adunanza Vita e Ministero
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <BookMarked className="w-8 h-8 text-blue-400 shrink-0" />
              <span>{week.bibleReading}</span>
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Programma ufficiale sincronizzato direttamente dalla{" "}
              <strong className="text-blue-300 font-bold">Watchtower ONLINE LIBRARY</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              id="view-mwb-wol-btn"
              onClick={() => onOpenWolLink(week.mwbWolUrl, `Programma Adunanza: ${week.weekLabel}`)}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition backdrop-blur-sm"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-300" />
              <span>Apri Guida WOL</span>
            </button>
            {week.watchtowerStudy && (
              <button
                id="view-wt-wol-btn"
                onClick={() => onOpenWolLink(week.watchtowerStudy!.wolUrl, `Studio Torre di Guardia: ${week.watchtowerStudy!.title}`)}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold bg-blue-700 hover:bg-blue-600 text-white rounded-xl transition shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Torre di Guardia WOL</span>
              </button>
            )}
          </div>
        </div>

        {/* Songs & Stats Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-slate-300 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
              <Music className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="truncate">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Cantici</span>
              <span className="font-bold text-white text-xs">N. {week.openingSong.number}, {week.middleSong.number}, {week.concludingSong.number}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-slate-300 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Durata Totale</span>
              <span className="font-bold text-white text-xs">~{totalMinutes} minuti</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-slate-300 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Parti Totali</span>
              <span className="font-bold text-white text-xs">{week.parts.length} parti</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-slate-300 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Completate</span>
              <span className="font-bold text-white text-xs">{savedPartsCount} preparate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
