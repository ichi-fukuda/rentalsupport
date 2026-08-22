"use client";

import Link from "next/link";
import { FileText, Car, ShieldAlert, ArrowRight, Building2, LogIn } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

function DemoCard({
  href,
  icon: Icon,
  title,
  desc,
  goLabel,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  desc: string;
  goLabel: string;
}) {
  return (
    <Link href={href} className="card-hover group flex flex-col gap-4">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
        <Icon className="h-5 w-5" strokeWidth={2} />
      </span>
      <div className="flex flex-col gap-1.5">
        <h2 className="font-serif text-lg font-semibold text-foreground">{title}</h2>
        <p className="text-sm leading-relaxed text-muted">{desc}</p>
      </div>
      <span className="mt-auto flex items-center gap-1.5 text-sm font-medium text-brand">
        {goLabel}
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 15% 0%, var(--brand-soft) 0%, transparent 60%), radial-gradient(50% 45% at 100% 10%, var(--accent-soft) 0%, transparent 60%)",
          }}
        />
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-20 sm:py-28">
          <span className="eyebrow">Rental Car × AI</span>
          <h1 className="max-w-2xl font-serif text-4xl leading-[1.15] font-semibold tracking-tight text-foreground sm:text-5xl">
            {t("homeHeading")}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {t("homeSubheading")}
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link href="/host/signup" className="btn btn-primary">
              <Building2 className="h-4 w-4" />
              {t("hostSignupButton")}
            </Link>
            <Link href="/host/login" className="btn btn-outline">
              <LogIn className="h-4 w-4" />
              {t("hostLoginButton")}
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-6 py-16">
        {/* Host CTA */}
        <section className="card flex flex-col gap-5 border-brand/15 bg-brand-soft/40 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <span className="eyebrow">{t("hostCtaTitle")}</span>
            <p className="max-w-2xl text-sm leading-relaxed text-foreground/80">
              {t("hostCtaDesc")}
            </p>
          </div>
          <Link href="/host/signup" className="btn btn-accent shrink-0">
            {t("hostSignupButton")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        {/* Demo */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              {t("demoSectionTitle")}
            </h2>
            <p className="text-sm text-muted">{t("demoSectionDesc")}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <DemoCard
              href="/manual"
              icon={FileText}
              title={t("cardManualTitle")}
              desc={t("cardManualDesc")}
              goLabel={t("goButton")}
            />
            <DemoCard
              href="/vehicles"
              icon={Car}
              title={t("cardVehiclesTitle")}
              desc={t("cardVehiclesDesc")}
              goLabel={t("goButton")}
            />
            <DemoCard
              href="/accident"
              icon={ShieldAlert}
              title={t("cardAccidentTitle")}
              desc={t("cardAccidentDesc")}
              goLabel={t("goButton")}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
