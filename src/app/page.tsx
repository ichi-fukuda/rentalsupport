"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

function Card({
  href,
  title,
  desc,
  goLabel,
}: {
  href: string;
  title: string;
  desc: string;
  goLabel: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-3 rounded-xl border border-black/10 bg-white p-6 transition-colors hover:border-black/30 dark:border-white/10 dark:bg-zinc-900 dark:hover:border-white/30"
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="flex-1 text-sm text-zinc-600 dark:text-zinc-400">{desc}</p>
      <span className="text-sm font-medium underline">{goLabel} →</span>
    </Link>
  );
}

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-12">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight">{t("homeHeading")}</h1>
        <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
          {t("homeSubheading")}
        </p>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-zinc-900">
        <div>
          <h2 className="text-lg font-semibold">{t("hostCtaTitle")}</h2>
          <p className="mt-1 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            {t("hostCtaDesc")}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/host/signup"
            className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            {t("hostSignupButton")}
          </Link>
          <Link
            href="/host/login"
            className="rounded-full border border-black/15 px-5 py-2 text-sm font-medium hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
          >
            {t("hostLoginButton")}
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold">{t("demoSectionTitle")}</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {t("demoSectionDesc")}
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            href="/manual"
            title={t("cardManualTitle")}
            desc={t("cardManualDesc")}
            goLabel={t("goButton")}
          />
          <Card
            href="/vehicles"
            title={t("cardVehiclesTitle")}
            desc={t("cardVehiclesDesc")}
            goLabel={t("goButton")}
          />
          <Card
            href="/accident"
            title={t("cardAccidentTitle")}
            desc={t("cardAccidentDesc")}
            goLabel={t("goButton")}
          />
        </div>
      </div>
    </div>
  );
}
