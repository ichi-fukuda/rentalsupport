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
        <p className="mt-2 text-sm text-muted">
          {t("accidentPageDesc")}
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-3 card">
        {messages.length === 0 && (
          <p className="text-sm text-muted">—</p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.role === "user"
                ? "self-end rounded-2xl rounded-br-sm bg-brand px-4 py-2 text-sm text-white"
                : "self-start whitespace-pre-wrap rounded-2xl rounded-bl-sm bg-surface-hover px-4 py-2 text-sm text-foreground"
            }
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <p className="text-sm text-muted">{t("accidentThinking")}</p>
        )}
      </div>

      {error && (
        <p className="error-box">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("accidentInputPlaceholder")}
          className="field-input flex-1"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="btn btn-primary"
        >
          {t("accidentSend")}
        </button>
      </form>
    </div>
  );
}
