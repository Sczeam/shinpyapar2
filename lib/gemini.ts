// lib/gemini.ts
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables");
}

const ai = new GoogleGenAI({ apiKey });

export async function generateSummary(
  content: string,
  isYouTube: boolean
): Promise<string> {
  const contentType = isYouTube ? "YouTube video" : "article";

  const userInput = `
    I need a concise explanation of the following ${contentType}.
    
    CONTENT:
    ${content}
  `;

  const systemPrompt = `You are a very helpful and excellent assistant. You know basically know everything about everything. Your task is to explain the content in a clear and concise manner and make it easy to understand.
Focus on main points, key arguments, and conclusions.
Use bullet points. Mention if content is incomplete.
Never fabricate information. Always explain in Burmese language.`;
  const config = {
    responseMimeType: "text/plain",
    systemInstruction: [
      {
        text: systemPrompt,
      },
    ],
  };
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      config,
      contents: [
        {
          role: "user",
          parts: [{ text: userInput }],
        },
      ],
    });

    return response.text || "Summary not available.";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Failed to generate summary. Please try again later.";
  }
}
