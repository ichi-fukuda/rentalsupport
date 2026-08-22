"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { LANGUAGES, type LangCode } from "@/lib/i18n";

export function Header() {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-lg font-semibold">
          {t("siteTitle")}
        </Link>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <Link href="/manual" className="hover:underline">
            {t("navManual")}
          </Link>
          <Link href="/vehicles" className="hover:underline">
            {t("navVehicles")}
          </Link>
          <Link href="/accident" className="hover:underline">
            {t("navAccident")}
          </Link>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as LangCode)}
            className="rounded border border-black/20 bg-transparent px-2 py-1 dark:border-white/20"
            aria-label="Language"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </nav>
      </div>
    </header>
  );
}
