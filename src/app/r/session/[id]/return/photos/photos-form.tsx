"use client";

import { useActionState } from "react";
import { submitReturnPhotosAction, type FormState } from "./actions";
import { t, type LangCode } from "@/lib/i18n";

const initialState: FormState = {};

export function ReturnPhotosForm({
  sessionId,
  lang,
}: {
  sessionId: string;
  lang: LangCode;
}) {
  const [state, action, pending] = useActionState(submitReturnPhotosAction, initialState);

  return (
    <form action={action} className="flex flex-col gap-4">
      <input type="hidden" name="sessionId" value={sessionId} />
      <input
        type="file"
        name="files"
        accept="image/*"
        capture="environment"
        multiple
        required
        className="text-sm"
      />
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
        {pending ? t(lang, "storeUploading") : t(lang, "storeContinueButton")}
      </button>
    </form>
  );
}
