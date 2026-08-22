import { NextRequest, NextResponse } from "next/server";
import { CLAUDE_MODEL, firstText, getAnthropicClient } from "@/lib/anthropic";
import { isLangCode, languageLabel, type LangCode } from "@/lib/i18n";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const manualText = body?.manualText;
  const langCode = body?.lang;

  if (typeof manualText !== "string" || manualText.trim().length === 0) {
    return NextResponse.json({ error: "manualText is required" }, { status: 400 });
  }
  const lang: LangCode = isLangCode(langCode) ? langCode : "en";

  let client;
  try {
    client = getAnthropicClient();
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }

  try {
    const response = await client.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 2000,
      system:
        "You are a multilingual assistant for a Japanese rental car company. " +
        "You are given a rental manual (often written in Japanese, sometimes informal or poorly organized). " +
        "Read it carefully, identify the key operational points a foreign customer needs to know " +
        "(pickup/return procedure, fuel policy, insurance, important warnings, contact info if present), " +
        "and rewrite it as a short, clear, friendly guide organized with headings and bullet points. " +
        "Avoid jargon. Do not invent information that is not in the source text.",
      messages: [
        {
          role: "user",
          content: `Target language: ${languageLabel(lang)} (${lang}). Respond entirely in this language.\n\nRental manual:\n---\n${manualText}\n---`,
        },
      ],
    });

    const explanation = firstText(response.content);
    return NextResponse.json({ explanation });
  } catch (err) {
    return NextResponse.json(
      { error: `AI request failed: ${(err as Error).message}` },
      { status: 502 },
    );
  }
}
