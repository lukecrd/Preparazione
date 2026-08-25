import * as cheerio from "cheerio";
import { SAMPLE_WOL_WEEKS, WolMeetingWeek, WolPartRaw } from "./data/sampleWeeks";

const WOL_BASE = "https://wol.jw.org";
const WOL_ITALIAN_MEETINGS_URL = "https://wol.jw.org/it/wol/meetings/r6/lp-i";
const WOL_SEARCH_BASE = "https://wol.jw.org/it/wol/s/r6/lp-i";

export async function fetchLiveWolSchedule(weekParam?: string): Promise<WolMeetingWeek | null> {
  try {
    const targetUrl = weekParam
      ? (weekParam.startsWith("http") ? weekParam : `${WOL_ITALIAN_MEETINGS_URL}/${weekParam}`)
      : WOL_ITALIAN_MEETINGS_URL;

    console.log(`[WOL] Fetching live schedule from: ${targetUrl}`);
    const res = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      console.warn(`[WOL] Failed to fetch live schedule (${res.status} ${res.statusText})`);
      return null;
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    // If targetUrl was a meetings hub (or has a link to specific MWB page)
    let mwbUrl = "";
    let wtUrl = "";
    let wtCardTitle = "";

    $("a").each((i, el) => {
      const href = $(el).attr("href") || "";
      const txt = $(el).text().trim();
      if (href.includes("/d/r6/lp-i/202026") || (href.includes("/d/r6/lp-i/") && txt.toLowerCase().includes("guida"))) {
        if (!mwbUrl) mwbUrl = href.startsWith("http") ? href : `${WOL_BASE}${href}`;
      }
      if ($(el).parent().text().toLowerCase().includes("torre di guardia") || $(el).closest(".card, li, div").text().toLowerCase().includes("torre di guardia")) {
        if (!wtUrl && href.includes("/d/r6/lp-i/")) {
          wtUrl = href.startsWith("http") ? href : `${WOL_BASE}${href}`;
          wtCardTitle = txt.replace(/\s+/g, " ");
        }
      }
    });

    let $content = $;
    let actualMwbUrl = targetUrl;
    if (mwbUrl) {
      const mwbRes = await fetch(mwbUrl, {
        headers: { "User-Agent": "Mozilla/5.0", "Accept-Language": "it-IT" },
        signal: AbortSignal.timeout(8000),
      });
      if (mwbRes.ok) {
        const mwbHtml = await mwbRes.text();
        $content = cheerio.load(mwbHtml);
        actualMwbUrl = mwbUrl;
      }
    }

    const weekLabel = $content("h1, #p1").first().text().trim() || $("title").text().replace(/&mdash;.*$/, "").replace(/—.*$/, "").trim() || "Programma Adunanze";
    const bibleReading = $content("h2, #p2").first().text().trim() || "Lettura biblica";

    // Songs
    const songs: { number: number; title: string }[] = [];
    $content("h3, p").each((i, el) => {
      const txt = $content(el).text().trim();
      const match = txt.match(/Cantico\s*(\d+)/i);
      if (match) {
        songs.push({ number: parseInt(match[1], 10), title: txt });
      }
    });

    const openingSong = songs[0] || { number: 1, title: "Cantico d’apertura" };
    const middleSong = songs[1] || { number: 50, title: "Cantico intermedio" };
    const concludingSong = songs[songs.length - 1] || { number: 100, title: "Cantico conclusivo" };

    const parts: WolPartRaw[] = [];
    let currentSection: 'tesori' | 'ministero' | 'vita' | 'torre' = "tesori";

    $content("div.bodyTxt > *").each((i, el) => {
      const text = $content(el).text().trim();
      const lower = text.toLowerCase();

      if (lower.includes("tesori della parola di dio")) {
        currentSection = "tesori";
        return;
      }
      if (lower.includes("efficaci nel ministero")) {
        currentSection = "ministero";
        return;
      }
      if (lower.includes("vita cristiana")) {
        currentSection = "vita";
        return;
      }

      const partMatch = text.match(/^(\d+)\.\s+([^(\n]+)(?:\((\d+)\s*min\))?/i);
      if (partMatch) {
        const partNum = parseInt(partMatch[1], 10);
        const title = partMatch[2].trim();
        let duration = partMatch[3] ? parseInt(partMatch[3], 10) : 10;

        let bodyText = "";
        let nextEl = $content(el).next();
        while (nextEl.length && !nextEl.text().match(/^\d+\.\s+/) && !nextEl.text().toLowerCase().includes("efficaci nel") && !nextEl.text().toLowerCase().includes("vita cristiana") && !nextEl.text().toLowerCase().includes("commenti conclusivi")) {
          const t = nextEl.text().trim();
          if (t && !t.includes("Cantico")) {
            bodyText += (bodyText ? "\n\n" : "") + t;
          }
          nextEl = nextEl.next();
        }

        const durMatch = (text + " " + bodyText).match(/\((\d+)\s*min\)/i);
        if (durMatch) duration = parseInt(durMatch[1], 10);

        let type: WolPartRaw["type"] = "talk";
        if (title.toLowerCase().includes("gemme")) type = "gems";
        else if (title.toLowerCase().includes("lettura")) type = "reading";
        else if (currentSection === "ministero") {
          if (bodyText.toLowerCase().includes("discorso") || title.toLowerCase().includes("discorso") || title.toLowerCase().includes("spiegare")) {
            type = "talk";
          } else if (bodyText.toLowerCase().includes("dimostrazione") || bodyText.toLowerCase().includes("coltivare") || bodyText.toLowerCase().includes("discepoli") || bodyText.toLowerCase().includes("casa in casa") || bodyText.toLowerCase().includes("testimonianza")) {
            type = "demonstration";
          } else {
            type = "conversation";
          }
        } else if (title.toLowerCase().includes("studio biblico")) {
          type = "congregation_study";
        }

        let questions = undefined;
        if (type === "gems") {
          questions = [];
          const qMatches = bodyText.split(/\n+/).filter(line => line.includes("—") || line.includes("?"));
          for (const q of qMatches) {
            if (q.trim().length > 10) {
              questions.push({ question: q.trim(), sourceSnippet: q.trim() });
            }
          }
        }

        parts.push({
          id: `wol-${partNum}`,
          section: currentSection,
          title: `${partNum}. ${title}`,
          duration,
          assignedScriptures: [bibleReading],
          sourceText: bodyText || text,
          wolUrl: actualMwbUrl,
          type,
          questions
        });
      }
    });

    let wtObj = {
      title: wtCardTitle || "Studio Torre di Guardia",
      themeScripture: bibleReading,
      song: { number: 65, title: "Cantico dello studio" },
      concludingSong: { number: 61, title: "Cantico conclusivo" },
      summary: `Articolo di studio della Torre di Guardia per la settimana ${weekLabel}.`,
      wolUrl: wtUrl || targetUrl,
      paragraphs: [] as { num: number; text: string; question: string }[]
    };

    if (wtUrl) {
      try {
        const wtRes = await fetch(wtUrl, {
          headers: { "User-Agent": "Mozilla/5.0", "Accept-Language": "it-IT" },
          signal: AbortSignal.timeout(6000),
        });
        if (wtRes.ok) {
          const wtHtml = await wtRes.text();
          const $w = cheerio.load(wtHtml);
          const realWtTitle = $w("h1").first().text().trim();
          const realTheme = $w(".themeScrp, p.themeScrp, #p4").first().text().trim();
          if (realWtTitle) wtObj.title = realWtTitle;
          if (realTheme) wtObj.themeScripture = realTheme;

          const wtSongs: { number: number; title: string }[] = [];
          $w("p, h2, h3").each((i, el) => {
            const txt = $w(el).text().trim();
            const sm = txt.match(/Cantico\s*(\d+)/i);
            if (sm) wtSongs.push({ number: parseInt(sm[1], 10), title: txt });
          });
          if (wtSongs[0]) wtObj.song = wtSongs[0];
          if (wtSongs[1]) wtObj.concludingSong = wtSongs[1];

          $w("p[id^=p]").each((i, el) => {
            const pTxt = $w(el).text().trim();
            const qMatch = pTxt.match(/^(\d+)[-–\.]\s+(.*)/);
            if (qMatch) {
              wtObj.paragraphs.push({
                num: parseInt(qMatch[1], 10),
                text: pTxt,
                question: `Domanda paragrafo ${qMatch[1]}`
              });
            }
          });
        }
      } catch (e) {
        console.warn("WT parse err:", e);
      }
    }

    if (parts.length >= 3) {
      return {
        id: `wol-${Date.now()}`,
        weekLabel,
        dateRange: weekLabel.toLowerCase(),
        bibleReading,
        openingSong,
        middleSong,
        concludingSong,
        mwbWolUrl: actualMwbUrl,
        watchtowerWolUrl: wtUrl || actualMwbUrl,
        parts,
        watchtowerStudy: wtObj
      };
    }

    return null;
  } catch (err) {
    console.warn("[WOL] Error fetching live WOL schedule:", err);
    return null;
  }
}

export async function fetchWolArticleText(wolUrl: string): Promise<{ title: string; content: string; paragraphs: string[]; questions: string[] }> {
  try {
    const fullUrl = wolUrl.startsWith("http") ? wolUrl : `${WOL_BASE}${wolUrl}`;
    const res = await fetch(fullUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "it-IT,it;q=0.9",
      },
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) {
      throw new Error(`Status ${res.status}`);
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    // Clean up unnecessary navs and sidebars
    $("nav, header, footer, .navigation, #regionTop, .adSection, script, style").remove();

    const title = $("h1, #p1, .articleTitle").first().text().trim() || "Articolo da WOL";
    const paragraphs: string[] = [];
    const questions: string[] = [];

    $("p.p, p.sb, p.qu, .bodyTxt p, article p").each((_, el) => {
      const pText = $(el).text().trim();
      if (!pText) return;
      if ($(el).hasClass("qu") || pText.match(/^\d+\.\s+.*(\?|:)$/)) {
        questions.push(pText);
      } else {
        paragraphs.push(pText);
      }
    });

    const content = paragraphs.join("\n\n");
    return { title, content, paragraphs, questions };
  } catch (err) {
    console.warn(`[WOL] Could not fetch article from ${wolUrl}, using fallback context.`);
    return {
      title: "Contenuto Watchtower Online Library",
      content: "",
      paragraphs: [],
      questions: []
    };
  }
}

export async function searchWol(query: string): Promise<{ title: string; publication: string; wolUrl: string; snippet: string }[]> {
  try {
    const url = `${WOL_SEARCH_BASE}?q=${encodeURIComponent(query)}`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept-Language": "it-IT,it;q=0.9",
      },
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      return getFallbackSearchResults(query);
    }

    const html = await res.text();
    const $ = cheerio.load(html);
    const results: { title: string; publication: string; wolUrl: string; snippet: string }[] = [];

    $(".searchResult, .resultItem, li.result, article").slice(0, 8).each((_, el) => {
      const titleEl = $(el).find("h3 a, .title a, a.resultTitle").first();
      const title = titleEl.text().trim() || $(el).find("h3, strong").text().trim();
      const href = titleEl.attr("href") || $(el).find("a").attr("href");
      const pub = $(el).find(".pubTitle, .citation, .source, em").first().text().trim() || "WOL Biblioteca Online";
      const snippet = $(el).find(".snippet, p, .body").first().text().trim();

      if (title && href) {
        results.push({
          title,
          publication: pub,
          wolUrl: href.startsWith("http") ? href : `${WOL_BASE}${href}`,
          snippet: snippet || title
        });
      }
    });

    if (results.length > 0) return results;
    return getFallbackSearchResults(query);
  } catch (err) {
    return getFallbackSearchResults(query);
  }
}

function getFallbackSearchResults(query: string) {
  const q = query.toLowerCase();
  return [
    {
      title: `Approfondimento su "${query}" - Indice delle Pubblicazioni Watch Tower`,
      publication: "Guida alla ricerca per i Testimoni di Geova / Indice",
      wolUrl: `https://wol.jw.org/it/wol/s/r6/lp-i?q=${encodeURIComponent(query)}`,
      snippet: `Riferimenti scritturali, spiegazioni e articoli della Torre di Guardia e Svegliatevi! sull'argomento "${query}".`
    },
    {
      title: `Perspicacia nello studio delle Scritture - Riferimenti per ${query}`,
      publication: "Perspicacia nello studio delle Scritture (it-1 / it-2)",
      wolUrl: `https://wol.jw.org/it/wol/s/r6/lp-i?q=${encodeURIComponent(query)}`,
      snippet: `Trattazione enciclopedica approfondita dei termini biblici originali (ebraico e greco), contesto storico e applicazioni spirituali.`
    },
    {
      title: `Articoli della Torre di Guardia su ${query}`,
      publication: "La Torre di Guardia (Edizione per lo studio)",
      wolUrl: `https://wol.jw.org/it/wol/s/r6/lp-i?q=${encodeURIComponent(query)}`,
      snippet: `Punti chiave di meditazione, illustrazioni pratiche e applicazione per i proclamatori e le famiglie cristiane.`
    }
  ];
}
