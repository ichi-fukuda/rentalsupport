"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { isLangCode, t as translate, type LangCode } from "./i18n";

type LanguageContextValue = {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "rentacar-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("ja");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && isLangCode(stored)) {
      setLangState(stored);
    }
  }, []);

  const setLang = (next: LangCode) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t: (key: string) => translate(lang, key) }),
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
