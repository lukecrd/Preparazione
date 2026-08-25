import { DeepResearchData, GeneratedCommentsData, MeetingWeek, TalkOutline } from "../types";

export async function fetchMeetingWeeks(customUrl?: string): Promise<MeetingWeek[]> {
  try {
    const url = customUrl ? `/api/wol/weeks?url=${encodeURIComponent(customUrl)}` : "/api/wol/weeks";
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.weeks || [];
  } catch (err) {
    console.error("fetchMeetingWeeks error:", err);
    throw err;
  }
}

export async function fetchWolPageContent(wolUrl: string): Promise<{ title: string; content: string; paragraphs: string[]; questions: string[] }> {
  const res = await fetch("/api/wol/fetch-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: wolUrl }),
  });
  if (!res.ok) throw new Error("Impossibile recuperare il contenuto da wol.jw.org");
  return res.json();
}

export async function searchWolLibrary(query: string): Promise<{ title: string; publication: string; wolUrl: string; snippet: string }[]> {
  const res = await fetch("/api/wol/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) throw new Error("Errore durante la ricerca su wol.jw.org");
  const data = await res.json();
  return data.results || [];
}

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = 25000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error("La richiesta ha impiegato troppo tempo. Riprova tra qualche secondo.");
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function generateTalkOutline(payload: {
  partTitle: string;
  section: string;
  durationMinutes: number;
  sourceText?: string;
  assignedScriptures?: string[];
  audienceType?: string;
  personalFocus?: string;
}): Promise<TalkOutline> {
  const res = await fetchWithTimeout("/api/ai/generate-talk", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || "Errore nella generazione del discorso");
  }
  const data = await res.json();
  return data.outline;
}

export async function generateCommentsAndAnswers(payload: {
  partTitle: string;
  section: string;
  sourceText?: string;
  questions?: any[];
  paragraphs?: any[];
  stylePreference?: string;
  assignedScriptures?: string[];
  bibleReading?: string;
}): Promise<GeneratedCommentsData> {
  const res = await fetchWithTimeout("/api/ai/generate-comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || "Errore nella preparazione dei commenti");
  }
  const data = await res.json();
  return data.data;
}

export async function executeDeepResearch(payload: {
  topic: string;
  contextPart?: string;
  scriptures?: string[];
  researchGoal?: string;
}): Promise<DeepResearchData> {
  const res = await fetchWithTimeout("/api/ai/deep-research", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || "Errore nell'approfondimento");
  }
  const data = await res.json();
  return data.research;
}
