import { NextRequest, NextResponse } from "next/server";
import { isLangCode, type LangCode } from "@/lib/i18n";
import { translateText } from "@/lib/translate";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const text = body?.text;
  const langCode = body?.lang;
  const context = typeof body?.context === "string" ? body.context : undefined;

  if (typeof text !== "string") {
    return NextResponse.json({ translated: "" });
  }
  const lang: LangCode = isLangCode(langCode) ? langCode : "en";

  try {
    const translated = await translateText(text, lang, context);
    return NextResponse.json({ translated });
  } catch (err) {
    return NextResponse.json(
      { error: `AI request failed: ${(err as Error).message}` },
      { status: 502 },
    );
  }
}
