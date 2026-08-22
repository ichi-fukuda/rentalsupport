import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { t, isLangCode } from "@/lib/i18n";
import { ExplainSection } from "./explain-section";

export default async function CarPage({
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

  if (activeSession && activeSession.status === "READY_FOR_KEY") {
    await db.rentalSession.update({
      where: { id: activeSession.id },
      data: { status: "IN_PROGRESS" },
    });
  }

  const lang = activeSession && isLangCode(activeSession.lang) ? activeSession.lang : "ja";

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 px-6 py-12">
      <div>
        <h1 className="text-2xl font-bold">{vehicle.name}</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{vehicle.category}</p>
      </div>

      <ExplainSection
        vehicleId={vehicle.id}
        kind="controls"
        heading={t(lang, "controlsHeading")}
        buttonLabel={t(lang, "vehicleExplainButton")}
        lang={lang}
      />
      <ExplainSection
        vehicleId={vehicle.id}
        kind="fuel"
        heading={t(lang, "fuelHeading")}
        buttonLabel={t(lang, "vehicleFuelButton")}
        lang={lang}
      />

      <div className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-5 dark:border-red-900 dark:bg-red-950">
        <Link
          href={`/car/${qrToken}/accident`}
          className="rounded-full bg-red-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-red-700"
        >
          {t(lang, "carAccidentButton")}
        </Link>
      </div>

      {activeSession && (
        <Link
          href={`/r/session/${activeSession.id}/return/fuel`}
          className="self-start rounded-full border border-black/15 px-5 py-2 text-sm font-medium hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
        >
          {t(lang, "carReturnButton")}
        </Link>
      )}
    </div>
  );
}
