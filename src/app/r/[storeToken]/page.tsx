import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";

export default async function StoreLandingPage({
  params,
}: {
  params: Promise<{ storeToken: string }>;
}) {
  const { storeToken } = await params;
  const host = await db.host.findUnique({ where: { storeToken } });
  if (!host) notFound();

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-6 py-12">
      <div>
        <p className="text-sm text-muted">{host.shopName}</p>
        <h1 className="text-2xl font-bold">Rent a car / この店舗でレンタカーを借りる</h1>
      </div>
      <p className="text-sm text-muted">
        Please log in with the email address you gave the shop in advance.
        <br />
        店舗に事前にお伝えいただいたメールアドレスでログインしてください。
      </p>
      <Link
        href={`/r/${storeToken}/login`}
        className="btn btn-primary self-start"
      >
        Log in / ログイン
      </Link>
    </div>
  );
}
