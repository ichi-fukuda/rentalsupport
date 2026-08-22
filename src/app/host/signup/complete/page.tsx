import Link from "next/link";

export default async function SignupCompletePage({
  searchParams,
}: PageProps<"/host/signup/complete">) {
  const params = await searchParams;
  const shop = typeof params.shop === "string" ? params.shop : "";
  const email = typeof params.email === "string" ? params.email : "";

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 px-6 py-12">
      <h1 className="text-2xl font-bold">お申込みありがとうございます</h1>
      <div className="flex flex-col gap-2 rounded-xl border border-black/10 bg-white p-5 text-sm dark:border-white/10 dark:bg-zinc-900">
        <p>
          {shop && <>「{shop}」様のアカウントを作成しました。</>}
        </p>
        <p className="text-zinc-600 dark:text-zinc-400">
          本来はここでログイン用URLをメールでお送りしますが、このプロトタイプでは省略しています。
          以下のログイン画面から、登録したメールアドレスとパスワードでログインしてください。
        </p>
        {email && (
          <p>
            ログインID（メールアドレス）: <span className="font-mono">{email}</span>
          </p>
        )}
      </div>
      <Link
        href="/host/login"
        className="self-start rounded-full bg-foreground px-6 py-2 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
      >
        ログイン画面へ
      </Link>
    </div>
  );
}
