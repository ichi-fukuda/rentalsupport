import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { t, isLangCode } from "@/lib/i18n";

export default async function ReturnDonePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await db.rentalSession.findUnique({ where: { id } });
  if (!session) notFound();

  const lang = isLangCode(session.lang) ? session.lang : "ja";

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center gap-4 px-6 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl dark:bg-green-950">
        ✓
      </div>
      <h1 className="text-2xl font-bold">{t(lang, "returnDoneTitle")}</h1>
      <p className="text-muted">{t(lang, "returnDoneMessage")}</p>
    </div>
  );
}
