import { NextRequest, NextResponse } from "next/server";
import { CLAUDE_MODEL, firstText, getAnthropicClient } from "@/lib/anthropic";
import { isLangCode, languageLabel, type LangCode } from "@/lib/i18n";

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const messages = body?.messages;
  const langCode = body?.lang;

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "messages is required" }, { status: 400 });
  }
  const lang: LangCode = isLangCode(langCode) ? langCode : "en";

  let client;
  try {
    client = getAnthropicClient();
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }

  const sanitized: ChatMessage[] = messages
    .filter(
      (m): m is ChatMessage =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string",
    )
    .slice(-20);

  try {
    const response = await client.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 1200,
      system:
        "You are an AI operator helping a foreign tourist who is renting a car in Japan and may have just been in a " +
        "traffic accident or similar emergency. Stay calm and reassuring. " +
        "Always first check whether anyone is injured; if so, tell them to call 119 (ambulance/fire) immediately. " +
        "For any traffic accident, however minor, tell them Japanese law requires calling the police at 110. " +
        "Then guide them step by step: move to safety, do not admit fault, take photos of the scene and both vehicles' " +
        "license plates, exchange information with the other driver, and contact the rental car company's emergency " +
        "support line as soon as possible. Ask clarifying questions if the situation is unclear. " +
        "Keep responses concise and use short numbered steps.",
      messages: [
        {
          role: "user",
          content: `Target language: ${languageLabel(lang)} (${lang}). Respond entirely in this language.`,
        },
        ...sanitized.map((m) => ({ role: m.role, content: m.content })),
      ],
    });

    const reply = firstText(response.content);
    return NextResponse.json({ reply });
  } catch (err) {
    return NextResponse.json(
      { error: `AI request failed: ${(err as Error).message}` },
      { status: 502 },
    );
  }
}
