import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { t, isLangCode } from "@/lib/i18n";
import { translateText } from "@/lib/translate";
import { confirmFuelAction } from "./actions";

export default async function ReturnFuelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await db.rentalSession.findUnique({
    where: { id },
    include: { vehicle: true },
  });
  if (!session) notFound();

  const lang = isLangCode(session.lang) ? session.lang : "ja";
  const guide = await translateText(
    session.vehicle.fuelGuideJa,
    lang,
    "Fuel/charging instructions for returning a rental car",
  );

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 px-6 py-12">
      <div>
        <h1 className="text-2xl font-bold">{t(lang, "returnFuelTitle")}</h1>
        <p className="mt-2 text-sm text-muted">
          {t(lang, "returnFuelDesc")}
        </p>
      </div>
      <div className="whitespace-pre-wrap card text-sm">
        {guide}
      </div>
      <form action={confirmFuelAction}>
        <input type="hidden" name="sessionId" value={session.id} />
        <button
          type="submit"
          className="btn btn-primary"
        >
          {t(lang, "returnFuelConfirm")}
        </button>
      </form>
    </div>
  );
}
