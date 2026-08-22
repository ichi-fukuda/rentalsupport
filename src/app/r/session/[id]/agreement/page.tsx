import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { t, isLangCode } from "@/lib/i18n";
import { translateText } from "@/lib/translate";
import { agreeAction } from "./actions";

const DEFAULT_AGREEMENT_JA =
  "貸出期間中の交通違反・事故については借主の責任となります。返却時は借りた時と同じ状態・燃料量でご返却ください。" +
  "車内での喫煙・ペット同乗は禁止です。不明な点はスタッフまでお尋ねください。";

export default async function AgreementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await db.rentalSession.findUnique({
    where: { id },
    include: { host: true },
  });
  if (!session) notFound();

  const lang = isLangCode(session.lang) ? session.lang : "ja";
  const agreementJa = session.host.agreementText.trim() || DEFAULT_AGREEMENT_JA;
  const translated = await translateText(agreementJa, lang, "Rental car agreement terms");

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 px-6 py-12">
      <h1 className="text-2xl font-bold">{t(lang, "storeAgreementTitle")}</h1>
      <div className="whitespace-pre-wrap rounded-xl border border-black/10 bg-white p-5 text-sm dark:border-white/10 dark:bg-zinc-900">
        {translated}
      </div>
      <form action={agreeAction} className="flex flex-col gap-4">
        <input type="hidden" name="sessionId" value={session.id} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="agree" required />
          {t(lang, "storeAgreementCheckbox")}
        </label>
        <button
          type="submit"
          className="self-start rounded-full bg-foreground px-6 py-2 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        >
          {t(lang, "storeContinueButton")}
        </button>
      </form>
    </div>
  );
}
