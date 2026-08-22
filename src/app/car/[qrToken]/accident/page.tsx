import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { t, isLangCode } from "@/lib/i18n";
import { AccidentChat } from "./accident-chat";

export default async function CarAccidentPage({
  params,
}: {
  params: Promise<{ qrToken: string }>;
}) {
  const { qrToken } = await params;
  const vehicle = await db.vehicle.findUnique({ where: { qrToken } });
  if (!vehicle) notFound();

  const activeSession = await db.rentalSession.findFirst({
    where: { vehicleId: vehicle.id, status: { in: ["READY_FOR_KEY", "IN_PROGRESS"] } },
    orderBy: { createdAt: "desc" },
  });
  const lang = activeSession && isLangCode(activeSession.lang) ? activeSession.lang : "ja";

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-12">
      <div>
        <h1 className="text-2xl font-bold">{t(lang, "accidentPageTitle")}</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {t(lang, "accidentPageDesc")}
        </p>
      </div>
      <AccidentChat
        vehicleId={vehicle.id}
        rentalSessionId={activeSession?.id}
        lang={lang}
      />
    </div>
  );
}
