import Anthropic from "@anthropic-ai/sdk";

let client: Anthropic | null = null;

/** Throws a descriptive error if ANTHROPIC_API_KEY is not configured. */
export function getAnthropicClient(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      "ANTHROPIC_API_KEY is not set. Add it to .env.local (see .env.local.example).",
    );
  }
  if (!client) {
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return client;
}

export const CLAUDE_MODEL = "claude-opus-4-8";

export function firstText(content: Anthropic.ContentBlock[]): string {
  const block = content.find((b) => b.type === "text");
  return block && block.type === "text" ? block.text : "";
}
