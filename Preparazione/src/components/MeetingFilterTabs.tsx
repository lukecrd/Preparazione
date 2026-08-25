import React from "react";
import { Gem, Compass, HeartHandshake, BookOpenText, ListFilter } from "lucide-react";

interface MeetingFilterTabsProps {
  currentFilter: string;
  onSelectFilter: (filter: string) => void;
  counts: {
    all: number;
    tesori: number;
    ministero: number;
    vita: number;
    torre: number;
  };
}

export const MeetingFilterTabs: React.FC<MeetingFilterTabsProps> = ({
  currentFilter,
  onSelectFilter,
  counts,
}) => {
  const tabs = [
    { id: "all", label: "Tutte le parti", icon: ListFilter, count: counts.all },
    { id: "tesori", label: "Tesori della Parola", icon: Gem, count: counts.tesori },
    { id: "ministero", label: "Efficaci nel Ministero", icon: Compass, count: counts.ministero },
    { id: "vita", label: "Vita Cristiana", icon: HeartHandshake, count: counts.vita },
    { id: "torre", label: "Studio Torre di Guardia", icon: BookOpenText, count: counts.torre },
  ];

  return (
    <div id="filter-tabs-container" className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-thin">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentFilter === tab.id;
        return (
          <button
            key={tab.id}
            id={`filter-tab-${tab.id}`}
            onClick={() => onSelectFilter(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition whitespace-nowrap shrink-0 ${
              isActive
                ? "bg-slate-900 text-white shadow-sm shadow-slate-300"
                : "bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-slate-200"
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-black ${
                isActive ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-500"
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
