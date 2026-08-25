import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

export function getGemini(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

export async function generateContentWithRetry(options: {
  contents: string;
  config: any;
  model?: string;
  maxRetries?: number;
  timeoutMs?: number;
}): Promise<any> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured on server.");
  }

  const maxRetries = options.maxRetries ?? 2;
  const timeoutMs = options.timeoutMs ?? 10000;
  const model = options.model || "gemini-3.7-flash";
  const ai = getGemini();

  let lastError: any = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const generatePromise = ai.models.generateContent({
        model,
        contents: options.contents,
        config: options.config,
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Gemini API call timed out after " + timeoutMs + "ms")), timeoutMs)
      );

      const response = await Promise.race([generatePromise, timeoutPromise]);
      return response;
    } catch (err: any) {
      lastError = err;
      const status = err?.status || err?.code || (err?.message?.includes("503") ? 503 : null);
      const isTransient =
        status === 503 ||
        status === 429 ||
        status === "UNAVAILABLE" ||
        err?.message?.includes("timed out") ||
        err?.message?.includes("high demand") ||
        err?.message?.includes("overloaded");

      console.warn(`[Gemini API] Attempt ${attempt}/${maxRetries} failed:`, err?.message || err);

      if (isTransient && attempt < maxRetries) {
        const delayMs = 600;
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        continue;
      }

      break;
    }
  }

  throw lastError;
}
