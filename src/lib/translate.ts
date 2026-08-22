import { CLAUDE_MODEL, firstText, getAnthropicClient } from "@/lib/anthropic";
import { languageLabel, type LangCode } from "@/lib/i18n";

/** Translates short text server-side. Returns the original text if lang is "ja" or text is empty. */
export async function translateText(
  text: string,
  lang: LangCode,
  context?: string,
): Promise<string> {
  if (!text.trim() || lang === "ja") return text;

  const client = getAnthropicClient();
  const response = await client.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 1500,
    system:
      "You translate short pieces of text for a Japanese rental car company's foreign customers. " +
      "Translate naturally and clearly, preserving structure (bullet points, line breaks). " +
      "Do not add commentary, only output the translation." +
      (context ? ` Context: ${context}` : ""),
    messages: [
      {
        role: "user",
        content: `Translate the following text into ${languageLabel(lang)} (${lang}):\n---\n${text}\n---`,
      },
    ],
  });

  return firstText(response.content) || text;
}
