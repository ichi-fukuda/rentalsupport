"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signupAction, type FormState } from "../actions";
import { HOST_OPTIONS } from "@/lib/host-options";

const initialState: FormState = {};

export default function HostSignupPage() {
  const [state, action, pending] = useActionState(signupAction, initialState);

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 px-6 py-12">
      <div>
        <h1 className="text-2xl font-bold">レンタカー店舗 新規申込み</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          契約台数とオプションを選んでお申込みください。申込み完了後、ログイン用URLをご案内します。
        </p>
      </div>

      <form action={action} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="shopName" className="text-sm font-medium">
            店舗名
          </label>
          <input
            id="shopName"
            name="shopName"
            required
            className="rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-zinc-900"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            メールアドレス（ログインID）
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-zinc-900"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium">
            パスワード（8文字以上）
          </label>
          <input
            id="password"
            name="password"
            type="password"
            minLength={8}
            required
            className="rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-zinc-900"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contractedVehicles" className="text-sm font-medium">
            契約台数
          </label>
          <input
            id="contractedVehicles"
            name="contractedVehicles"
            type="number"
            min={1}
            defaultValue={3}
            required
            className="w-32 rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-zinc-900"
          />
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium">オプション</legend>
          {HOST_OPTIONS.map((opt) => (
            <label key={opt.id} className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                name="options"
                value={opt.id}
                defaultChecked
                className="mt-1"
              />
              <span>
                <span className="font-medium">{opt.labelJa}</span>
                <br />
                <span className="text-zinc-500 dark:text-zinc-400">{opt.descJa}</span>
              </span>
            </label>
          ))}
        </fieldset>

        {state.error && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="self-start rounded-full bg-foreground px-6 py-2 text-sm font-medium text-background transition-colors hover:bg-[#383838] disabled:opacity-50 dark:hover:bg-[#ccc]"
        >
          {pending ? "送信中…" : "申し込む"}
        </button>
      </form>

      <p className="text-sm text-zinc-500">
        すでにアカウントをお持ちの方は{" "}
        <Link href="/host/login" className="underline">
          ログイン
        </Link>
      </p>
    </div>
  );
}
