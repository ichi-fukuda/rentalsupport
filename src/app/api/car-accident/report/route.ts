import { NextRequest, NextResponse } from "next/server";
import { CLAUDE_MODEL, firstText, getAnthropicClient } from "@/lib/anthropic";
import { isLangCode, type LangCode } from "@/lib/i18n";
import { db } from "@/lib/db";

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const vehicleId = body?.vehicleId;
  const rentalSessionId =
    typeof body?.rentalSessionId === "string" ? body.rentalSessionId : undefined;
  const messages = body?.messages;
  const langCode = body?.lang;

  const vehicle =
    typeof vehicleId === "string" ? await db.vehicle.findUnique({ where: { id: vehicleId } }) : null;
  if (!vehicle) {
    return NextResponse.json({ error: "Unknown vehicleId" }, { status: 400 });
  }
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "messages is required" }, { status: 400 });
  }
  const lang: LangCode = isLangCode(langCode) ? langCode : "en";

  const sanitized: ChatMessage[] = messages.filter(
    (m): m is ChatMessage =>
      m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string",
  );

  let client;
  try {
    client = getAnthropicClient();
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }

  try {
    const response = await client.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 1200,
      system:
        "あなたは日本のレンタカー店舗のスタッフ向けに、外国人利用者との事故ヒアリング内容を要約するアシスタントです。" +
        "以下の会話ログ（利用者の言語での対応記録）をもとに、店舗が保険会社に連絡する際に使える構造化レポートを日本語で作成してください。" +
        "次の項目を見出し付きで整理してください：状況の概要／相手方の有無と情報（あれば）／ケガの有無／車両の損傷／" +
        "場所・時間（記載があれば）／店舗が次に取るべき対応。記載のない項目は「不明」としてください。",
      messages: [
        {
          role: "user",
          content: `車両: ${vehicle.name}\n\n会話ログ:\n---\n${sanitized
            .map((m) => `${m.role === "user" ? "利用者" : "AI"}: ${m.content}`)
            .join("\n")}\n---`,
        },
      ],
    });

    const summary = firstText(response.content);

    const report = await db.accidentReport.create({
      data: {
        hostId: vehicle.hostId,
        vehicleId: vehicle.id,
        rentalSessionId,
        lang,
        transcript: JSON.stringify(sanitized),
        summary,
      },
    });

    return NextResponse.json({ summary, reportId: report.id });
  } catch (err) {
    return NextResponse.json(
      { error: `AI request failed: ${(err as Error).message}` },
      { status: 502 },
    );
  }
}
