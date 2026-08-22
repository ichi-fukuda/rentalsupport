"use client";

import { useActionState } from "react";
import { submitDamageAction, type FormState } from "./actions";
import { t, type LangCode } from "@/lib/i18n";

const initialState: FormState = {};

export function DamageForm({ sessionId, lang }: { sessionId: string; lang: LangCode }) {
  const [state, action, pending] = useActionState(submitDamageAction, initialState);

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
        <p className="error-box">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="btn btn-primary self-start"
      >
        {pending ? t(lang, "storeUploading") : t(lang, "storeContinueButton")}
      </button>
    </form>
  );
}
