import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { t, isLangCode } from "@/lib/i18n";
import { getNationality } from "@/lib/nationality";
import { translateText } from "@/lib/translate";
import { PassportForm } from "./passport-form";

export default async function PassportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await db.rentalSession.findUnique({
    where: { id },
    include: { customer: true },
  });
  if (!session) notFound();

  const lang = isLangCode(session.lang) ? session.lang : "ja";
  const nationality = getNationality(session.customer.nationality);
  const guidance = await translateText(
    nationality.noteJa,
    lang,
    "Driving license and passport requirements for a foreign rental car customer in Japan",
  );

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 px-6 py-12">
      <div>
        <h1 className="text-2xl font-bold">{t(lang, "passportTitle")}</h1>
        <p className="mt-2 text-sm text-muted">
          {t(lang, "passportDesc")}
        </p>
      </div>
      <div className="flex flex-col gap-2 card text-sm">
        <span className="text-lg">
          {nationality.flag} {nationality.labelJa}
        </span>
        <p className="whitespace-pre-wrap leading-relaxed">{guidance}</p>
      </div>
      <PassportForm sessionId={session.id} lang={lang} />
    </div>
  );
}
