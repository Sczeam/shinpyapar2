import axios from "axios";
import * as cheerio from "cheerio";

export async function fetchArticle(url: string): Promise<string> {
  try {
    const { data: html } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0", // Helps prevent blocks
      },
    });

    const $ = cheerio.load(html);

    const articleText =
      $("article").text() || $("main").text() || $("body").text();

    const cleanedText = articleText
      .replace(/\s+/g, " ")
      .replace(/(\n\s*)+/g, "\n")
      .trim();

    const maxLength = 5000;
    return cleanedText.slice(0, maxLength);
  } catch (err) {
    console.error("Article fetch error:", err);
    return "Failed to fetch article content.";
  }
}