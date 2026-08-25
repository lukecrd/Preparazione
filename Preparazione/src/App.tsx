import React, { useState, useEffect } from "react";
import { fetchMeetingWeeks } from "./services/api";
import { 
  MeetingWeek, 
  MeetingPart, 
  TalkOutline, 
  GeneratedCommentsData, 
  DeepResearchData, 
  SavedPreparation 
} from "./types";
import { findCurrentWeekId } from "./utils/dateUtils";
import { Header } from "./components/Header";
import { WeekOverview } from "./components/WeekOverview";
import { MeetingFilterTabs } from "./components/MeetingFilterTabs";
import { PartCard } from "./components/PartCard";
import { TalkGeneratorModal } from "./components/TalkGeneratorModal";
import { CommentsGeneratorModal } from "./components/CommentsGeneratorModal";
import { DeepResearchModal } from "./components/DeepResearchModal";
import { SavedPreparationsDrawer } from "./components/SavedPreparationsDrawer";
import { DirectWolViewerModal } from "./components/DirectWolViewerModal";
import { LiveWolUrlModal } from "./components/LiveWolUrlModal";
import { WolSearchModal } from "./components/WolSearchModal";
import { 
  BookOpen, 
  Sparkles, 
  Calendar, 
  AlertCircle, 
  Loader2, 
  ShieldCheck, 
  HelpCircle,
  Clock,
  Mic,
  MessageSquareText,
  Search
} from "lucide-react";

export default function App() {
  const [weeks, setWeeks] = useState<MeetingWeek[]>([]);
  const [selectedWeekId, setSelectedWeekId] = useState<string>("");
  const [currentFilter, setCurrentFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modals state
  const [activeTalkPart, setActiveTalkPart] = useState<MeetingPart | null>(null);
  const [activeCommentsPart, setActiveCommentsPart] = useState<MeetingPart | null>(null);
  const [activeResearchPart, setActiveResearchPart] = useState<MeetingPart | null>(null);
  
  // Custom loaded outlines or preps
  const [customTalkOutline, setCustomTalkOutline] = useState<TalkOutline | null>(null);
  const [customCommentsData, setCustomCommentsData] = useState<GeneratedCommentsData | null>(null);
  const [customResearchData, setCustomResearchData] = useState<DeepResearchData | null>(null);

  // Secondary Modals
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState<boolean>(false);
  const [isLiveUrlModalOpen, setIsLiveUrlModalOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [wolViewerTarget, setWolViewerTarget] = useState<{ url: string; title: string } | null>(null);

  // Local storage for saved preps
  const [savedPreparations, setSavedPreparations] = useState<SavedPreparation[]>(() => {
    try {
      const stored = localStorage.getItem("wol_saved_preparations");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("wol_saved_preparations", JSON.stringify(savedPreparations));
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  }, [savedPreparations]);

  const loadWeeksData = async (customUrl?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchMeetingWeeks(customUrl);
      setWeeks(data);
      if (data.length > 0) {
        // If a custom URL was provided, prioritize the new live loaded item (first item)
        // Otherwise, automatically pre-select the current week
        if (customUrl) {
          setSelectedWeekId(data[0].id);
        } else {
          const currentId = findCurrentWeekId(data);
          setSelectedWeekId(currentId || data[0].id);
        }
      }
    } catch (err: any) {
      setError("Impossibile caricare il programma adunanze. Verifica la connessione.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWeeksData();
  }, []);

  const selectedWeek = weeks.find((w) => w.id === selectedWeekId) || weeks[0];

  // Save Handlers
  const handleSaveTalk = (part: MeetingPart, outline: TalkOutline) => {
    const newPrep: SavedPreparation = {
      id: `prep-talk-${Date.now()}`,
      partId: part.id,
      weekId: selectedWeek?.id || "",
      partTitle: part.title,
      weekLabel: selectedWeek?.weekLabel || "Adunanza",
      type: "talk",
      createdAt: new Date().toISOString(),
      talkOutline: outline,
    };
    setSavedPreparations((prev) => [newPrep, ...prev.filter((p) => !(p.partId === part.id && p.type === "talk"))]);
  };

  const handleSaveComments = (part: MeetingPart, commentsData: GeneratedCommentsData) => {
    const newPrep: SavedPreparation = {
      id: `prep-comm-${Date.now()}`,
      partId: part.id,
      weekId: selectedWeek?.id || "",
      partTitle: part.title,
      weekLabel: selectedWeek?.weekLabel || "Adunanza",
      type: "comments",
      createdAt: new Date().toISOString(),
      commentsData,
    };
    setSavedPreparations((prev) => [newPrep, ...prev.filter((p) => !(p.partId === part.id && p.type === "comments"))]);
  };

  const handleSaveResearch = (part: MeetingPart, researchData: DeepResearchData) => {
    const newPrep: SavedPreparation = {
      id: `prep-res-${Date.now()}`,
      partId: part.id,
      weekId: selectedWeek?.id || "",
      partTitle: part.title,
      weekLabel: selectedWeek?.weekLabel || "Adunanza",
      type: "research",
      createdAt: new Date().toISOString(),
      researchData,
    };
    setSavedPreparations((prev) => [newPrep, ...prev.filter((p) => !(p.partId === part.id && p.type === "research"))]);
  };

  const handleDeleteSavedItem = (id: string) => {
    setSavedPreparations((prev) => prev.filter((p) => p.id !== id));
  };

  // Open from saved drawer
  const handleOpenSavedTalk = (prep: SavedPreparation) => {
    const matchedPart = selectedWeek?.parts.find((p) => p.id === prep.partId) || {
      id: prep.partId,
      section: "tesori" as const,
      title: prep.partTitle,
      duration: prep.talkOutline?.totalMinutes || 10,
      assignedScriptures: [],
      sourceText: "",
      wolUrl: "",
      type: "talk" as const,
    };
    setCustomTalkOutline(prep.talkOutline || null);
    setActiveTalkPart(matchedPart);
    setIsSavedDrawerOpen(false);
  };

  const handleOpenSavedComments = (prep: SavedPreparation) => {
    const matchedPart = selectedWeek?.parts.find((p) => p.id === prep.partId) || {
      id: prep.partId,
      section: "tesori" as const,
      title: prep.partTitle,
      duration: 10,
      assignedScriptures: [],
      sourceText: "",
      wolUrl: "",
      type: "gems" as const,
    };
    setCustomCommentsData(prep.commentsData || null);
    setActiveCommentsPart(matchedPart);
    setIsSavedDrawerOpen(false);
  };

  const handleOpenSavedResearch = (prep: SavedPreparation) => {
    const matchedPart = selectedWeek?.parts.find((p) => p.id === prep.partId) || {
      id: prep.partId,
      section: "tesori" as const,
      title: prep.partTitle,
      duration: 10,
      assignedScriptures: [],
      sourceText: "",
      wolUrl: "",
      type: "talk" as const,
    };
    setCustomResearchData(prep.researchData || null);
    setActiveResearchPart(matchedPart);
    setIsSavedDrawerOpen(false);
  };

  const handleOpenWolViewer = (url: string, title: string) => {
    setWolViewerTarget({ url, title });
  };

  // Filter parts
  const allParts = selectedWeek ? selectedWeek.parts : [];
  const filteredParts = allParts.filter((p) => {
    if (currentFilter === "all") return true;
    return p.section === currentFilter;
  });

  const filterCounts = {
    all: allParts.length,
    tesori: allParts.filter((p) => p.section === "tesori").length,
    ministero: allParts.filter((p) => p.section === "ministero").length,
    vita: allParts.filter((p) => p.section === "vita").length,
    torre: allParts.filter((p) => p.section === "torre").length,
  };

  const savedPartIds = new Set(savedPreparations.map((s) => s.partId));

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans antialiased selection:bg-blue-700 selection:text-white">
      {/* Top Navbar */}
      <Header
        weeks={weeks}
        selectedWeekId={selectedWeekId}
        onSelectWeek={(id) => setSelectedWeekId(id)}
        onOpenLiveUrlModal={() => setIsLiveUrlModalOpen(true)}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
        onOpenSearchModal={() => setIsSearchModalOpen(true)}
        savedCount={savedPreparations.length}
        isLoading={isLoading}
        onRefresh={() => loadWeeksData()}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {isLoading && weeks.length === 0 ? (
          <div className="text-center py-28 space-y-3">
            <Loader2 className="w-10 h-10 text-blue-700 animate-spin mx-auto" />
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-800">
              Connessione a Watchtower ONLINE LIBRARY (wol.jw.org)...
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Lettura del tab "Adunanze" e recupero delle parti del programma in lingua italiana.
            </p>
          </div>
        ) : error && weeks.length === 0 ? (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center max-w-lg mx-auto space-y-4 my-12 shadow-sm">
            <AlertCircle className="w-10 h-10 text-rose-600 mx-auto" />
            <h3 className="text-base font-bold text-rose-900">Errore di sincronizzazione</h3>
            <p className="text-xs text-rose-700">{error}</p>
            <button
              onClick={() => loadWeeksData()}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition"
            >
              Riprova connessione
            </button>
          </div>
        ) : selectedWeek ? (
          <div className="space-y-6">
            {/* Week Summary Banner */}
            <WeekOverview
              week={selectedWeek}
              onOpenWolLink={handleOpenWolViewer}
              savedPartsCount={allParts.filter((p) => savedPartIds.has(p.id)).length}
            />

            {/* Quick Teocratic Workflow Guide (Geometric Bento Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3.5 border-l-4 border-l-blue-700">
                <div className="w-9 h-9 rounded-xl bg-blue-700 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-blue-200">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 block mb-0.5">Fase 1</span>
                  <h4 className="font-bold text-slate-900 text-sm">Discorso a Tempo</h4>
                  <p className="text-slate-500 text-xs leading-relaxed mt-0.5">
                    Schema strutturato con minutaggio esatto, teleprompter e timer per la durata assegnata.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3.5 border-l-4 border-l-emerald-600">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-emerald-200">
                  <MessageSquareText className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 block mb-0.5">Fase 2</span>
                  <h4 className="font-bold text-slate-900 text-sm">Commenti & Risposte IA</h4>
                  <p className="text-slate-500 text-xs leading-relaxed mt-0.5">
                    Risposte rapide (20-30s), risposte estese e commenti per bambini basati su wol.jw.org.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3.5 border-l-4 border-l-purple-600">
                <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-purple-200">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 block mb-0.5">Fase 3</span>
                  <h4 className="font-bold text-slate-900 text-sm">Approfondimento WOL</h4>
                  <p className="text-slate-500 text-xs leading-relaxed mt-0.5">
                    Contesto storico, termini originali e riferimenti incrociati estratti solo dalla biblioteca.
                  </p>
                </div>
              </div>
            </div>

            {/* Filter Tabs Header */}
            <div className="flex items-center justify-between flex-wrap gap-2 pt-2">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block">
                  Programma Settimanale
                </span>
                <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>Parti dell'Adunanza</span>
                  <span className="text-xs font-black px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                    {filteredParts.length}
                  </span>
                </h2>
              </div>
            </div>

            <MeetingFilterTabs
              currentFilter={currentFilter}
              onSelectFilter={setCurrentFilter}
              counts={filterCounts}
            />

            {/* Meeting Parts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredParts.map((part) => (
                <PartCard
                  key={part.id}
                  part={part}
                  onOpenTalkModal={(p) => {
                    setCustomTalkOutline(null);
                    setActiveTalkPart(p);
                  }}
                  onOpenCommentsModal={(p) => {
                    setCustomCommentsData(null);
                    setActiveCommentsPart(p);
                  }}
                  onOpenResearchModal={(p) => {
                    setCustomResearchData(null);
                    setActiveResearchPart(p);
                  }}
                  onOpenWolViewer={handleOpenWolViewer}
                  isSaved={savedPartIds.has(part.id)}
                />
              ))}
            </div>
          </div>
        ) : null}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 text-slate-500 text-xs py-5 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-slate-700 font-medium">
              Fonte dati esclusiva: <strong className="text-slate-900">Watchtower ONLINE LIBRARY (wol.jw.org)</strong>
            </span>
          </div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Assistente di Studio Teocratico &bull; Adunanze Cristiane
          </p>
        </div>
      </footer>

      {/* MODALS */}
      <TalkGeneratorModal
        part={activeTalkPart}
        weekLabel={selectedWeek?.weekLabel || ""}
        isOpen={!!activeTalkPart}
        onClose={() => setActiveTalkPart(null)}
        onSaveTalk={handleSaveTalk}
        existingOutline={customTalkOutline}
      />

      <CommentsGeneratorModal
        part={activeCommentsPart}
        weekLabel={selectedWeek?.weekLabel || ""}
        bibleReading={selectedWeek?.bibleReading || ""}
        isOpen={!!activeCommentsPart}
        onClose={() => setActiveCommentsPart(null)}
        onSaveComments={handleSaveComments}
        existingComments={customCommentsData}
      />

      <DeepResearchModal
        part={activeResearchPart}
        weekLabel={selectedWeek?.weekLabel || ""}
        isOpen={!!activeResearchPart}
        onClose={() => setActiveResearchPart(null)}
        onSaveResearch={handleSaveResearch}
        onOpenWolLink={handleOpenWolViewer}
        existingResearch={customResearchData}
      />

      <SavedPreparationsDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedItems={savedPreparations}
        onDeleteItem={handleDeleteSavedItem}
        onOpenTalkModal={handleOpenSavedTalk}
        onOpenCommentsModal={handleOpenSavedComments}
        onOpenResearchModal={handleOpenSavedResearch}
      />

      <DirectWolViewerModal
        isOpen={!!wolViewerTarget}
        url={wolViewerTarget?.url || null}
        title={wolViewerTarget?.title || ""}
        onClose={() => setWolViewerTarget(null)}
      />

      <LiveWolUrlModal
        isOpen={isLiveUrlModalOpen}
        onClose={() => setIsLiveUrlModalOpen(false)}
        onLoadLiveUrl={loadWeeksData}
      />

      <WolSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onOpenWolLink={handleOpenWolViewer}
        onStartResearch={(q) => {
          const mockPart: MeetingPart = {
            id: `search-part-${Date.now()}`,
            section: "tesori",
            title: q,
            duration: 10,
            assignedScriptures: [],
            sourceText: `Ricerca su wol.jw.org: ${q}`,
            wolUrl: `https://wol.jw.org/it/wol/s/r6/lp-i?q=${encodeURIComponent(q)}`,
            type: "talk",
          };
          setCustomResearchData(null);
          setActiveResearchPart(mockPart);
        }}
      />
    </div>
  );
}
