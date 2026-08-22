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
      <div className="flex flex-col gap-2 card text-sm">
        <p>
          {shop && <>「{shop}」様のアカウントを作成しました。</>}
        </p>
        <p className="text-muted">
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
        className="btn btn-primary self-start"
      >
        ログイン画面へ
      </Link>
    </div>
  );
}
