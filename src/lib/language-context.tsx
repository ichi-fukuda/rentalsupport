"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import { isLangCode, t as translate, type LangCode } from "./i18n";

type LanguageContextValue = {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "rentacar-lang";
const DEFAULT_LANG: LangCode = "ja";

type Listener = () => void;
const listeners = new Set<Listener>();

function getSnapshot(): LangCode {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored && isLangCode(stored) ? stored : DEFAULT_LANG;
}

function getServerSnapshot(): LangCode {
  return DEFAULT_LANG;
}

function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function setStoredLang(lang: LangCode): void {
  window.localStorage.setItem(STORAGE_KEY, lang);
  listeners.forEach((listener) => listener());
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang: setStoredLang,
      t: (key: string) => translate(lang, key),
    }),
    [lang],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
