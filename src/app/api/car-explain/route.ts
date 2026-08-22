import { NextRequest, NextResponse } from "next/server";
import { CLAUDE_MODEL, firstText, getAnthropicClient } from "@/lib/anthropic";
import { isLangCode, languageLabel, type LangCode } from "@/lib/i18n";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const vehicleId = body?.vehicleId;
  const langCode = body?.lang;
  const kind = body?.kind === "fuel" ? "fuel" : "controls";

  const vehicle = typeof vehicleId === "string" ? await db.vehicle.findUnique({ where: { id: vehicleId } }) : null;
  if (!vehicle) {
    return NextResponse.json({ error: "Unknown vehicleId" }, { status: 400 });
  }
  const lang: LangCode = isLangCode(langCode) ? langCode : "en";

  let client;
  try {
    client = getAnthropicClient();
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }

  const sourceText = kind === "fuel" ? vehicle.fuelGuideJa : vehicle.controlsJa;
  const system =
    kind === "fuel"
      ? "You are a multilingual assistant for a Japanese rental car company. " +
        "Explain how to refuel or charge the given vehicle to a foreign tourist who has never done this in Japan. " +
        "Be concrete and step-by-step. Do not invent details not implied by the source notes."
      : "You are a multilingual assistant for a Japanese rental car company. " +
        "Explain the driver's seat controls of the given vehicle to a foreign tourist who has never driven this model. " +
        "Organize the explanation as a clear bullet list grouped by control. " +
        "Do not invent details not implied by the source notes.";

  try {
    const response = await client.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 1500,
      system,
      messages: [
        {
          role: "user",
          content: `Vehicle: ${vehicle.name} (${vehicle.category}).\nTarget language: ${languageLabel(lang)} (${lang}). Respond entirely in this language.\n\nSource notes (Japanese):\n---\n${sourceText}\n---`,
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
