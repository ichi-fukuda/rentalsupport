import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { t, isLangCode } from "@/lib/i18n";
import { DamageForm } from "./damage-form";

export default async function DamagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await db.rentalSession.findUnique({ where: { id } });
  if (!session) notFound();

  const lang = isLangCode(session.lang) ? session.lang : "ja";

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 px-6 py-12">
      <div>
        <h1 className="text-2xl font-bold">{t(lang, "storeDamageTitle")}</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {t(lang, "storeDamageDesc")}
        </p>
      </div>
      <DamageForm sessionId={session.id} lang={lang} />
    </div>
  );
}
