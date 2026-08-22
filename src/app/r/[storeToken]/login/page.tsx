import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { LoginForm } from "./login-form";

export default async function CustomerLoginPage({
  params,
}: {
  params: Promise<{ storeToken: string }>;
}) {
  const { storeToken } = await params;
  const host = await db.host.findUnique({ where: { storeToken } });
  if (!host) notFound();

  return (
    <div className="mx-auto flex w-full max-w-sm flex-1 flex-col gap-6 px-6 py-12">
      <div>
        <p className="text-sm text-muted">{host.shopName}</p>
        <h1 className="text-2xl font-bold">Log in / ログイン</h1>
        <p className="mt-2 text-sm text-muted">
          Please log in with the email address you gave the shop in advance.
          <br />
          店舗に事前にお伝えいただいたメールアドレスでログインしてください。
        </p>
      </div>
      <LoginForm storeToken={storeToken} />
    </div>
  );
}
