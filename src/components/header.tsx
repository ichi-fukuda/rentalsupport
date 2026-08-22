"use client";

import Link from "next/link";
import { Car, Globe } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { LANGUAGES, type LangCode } from "@/lib/i18n";

export function Header() {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-3.5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white">
            <Car className="h-4.5 w-4.5" strokeWidth={2.25} />
          </span>
          <span className="font-serif text-[1.05rem] font-semibold tracking-tight text-foreground">
            {t("siteTitle")}
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <Link href="/manual" className="text-foreground/75 transition-colors hover:text-foreground">
            {t("navManual")}
          </Link>
          <Link href="/vehicles" className="text-foreground/75 transition-colors hover:text-foreground">
            {t("navVehicles")}
          </Link>
          <Link href="/accident" className="text-foreground/75 transition-colors hover:text-foreground">
            {t("navAccident")}
          </Link>
          <Link
            href="/host/login"
            className="text-foreground/75 transition-colors hover:text-foreground"
          >
            {t("navHostLogin")}
          </Link>
          <div className="relative flex items-center">
            <Globe className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-muted" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as LangCode)}
              className="appearance-none rounded-full border border-border-strong bg-surface py-1.5 pr-3 pl-8 text-xs font-medium text-foreground transition-colors hover:bg-surface-hover"
              aria-label="Language"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>
        </nav>
      </div>
    </header>
  );
}
