import { NextRequest, NextResponse } from "next/server";
import { generateSummary } from "@/lib/gemini";
import { fetchTranscript } from "@/lib/fetchTranscript";
import { fetchArticle } from "@/lib/fetchArticle";
import { db } from "@/lib/firebase";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { url } = await req.json();
  if (!url) return NextResponse.json({ error: "Missing URL" }, { status: 400 });
  
  try {
    const { userId } = getAuth(req);
    
    // Rate limiting for guests only
    if (!userId) {
      const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
      const today = new Date().toISOString().split("T")[0];
      const docRef = db.collection("guest_usage").doc(`${ip}_${today}`);
      const doc = await docRef.get();
      const count = doc.exists ? doc.data()?.count || 0 : 0;
      
      if (count >= 3) {
        return NextResponse.json(
          {
            error:
              "Free users are limited to 3 summaries per day. Please get Pro Plan for unlimited access.",
            limitReached: true
          },
          { status: 403 }
        );
      }
      await docRef.set({ count: count + 1, date: today }, { merge: true });
    }
    
    let content = "";
    const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
    
    if (isYouTube) {
      content = await fetchTranscript(url);
    } else {
      content = await fetchArticle(url);
    }
    
    if (!content || content.includes("not available")) {
      return NextResponse.json(
        { error: "Unable to extract content" },
        { status: 500 }
      );
    }
    
    const summary = await generateSummary(content, isYouTube);
    return NextResponse.json({ summary });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Something went wrong", details: String(err) },
      { status: 500 }
    );
  }
}