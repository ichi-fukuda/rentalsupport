"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";

type ChatMessage = { role: "user" | "assistant"; content: string };

export default function AccidentPage() {
  const { lang, t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/accident", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, lang }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? t("errorGeneric"));
      }
      setMessages([...nextMessages, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError((err as Error).message || t("errorGeneric"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-12">
      <div>
        <h1 className="text-2xl font-bold">{t("accidentPageTitle")}</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {t("accidentPageDesc")}
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-3 rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
        {messages.length === 0 && (
          <p className="text-sm text-zinc-400">—</p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.role === "user"
                ? "self-end rounded-2xl rounded-br-sm bg-foreground px-4 py-2 text-sm text-background"
                : "self-start whitespace-pre-wrap rounded-2xl rounded-bl-sm bg-zinc-100 px-4 py-2 text-sm dark:bg-zinc-800"
            }
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <p className="text-sm text-zinc-400">{t("accidentThinking")}</p>
        )}
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("accidentInputPlaceholder")}
          className="flex-1 rounded-full border border-black/15 bg-white px-4 py-2 text-sm dark:border-white/15 dark:bg-zinc-900"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-[#383838] disabled:opacity-50 dark:hover:bg-[#ccc]"
        >
          {t("accidentSend")}
        </button>
      </form>
    </div>
  );
}
