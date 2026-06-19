"use client";

import { lazy, Suspense, useState } from "react";
import { MessageSquare, FileText, Loader2 } from "lucide-react";
import { ConciergeChat } from "@/components/voyex/client/concierge/concierge-chat";

// The quick form pulls in framer-motion, which the chat doesn't need. Load it
// only when the traveller actually switches to the form, so Ava's chat — the
// default — loads as lean as possible.
const RequestForm = lazy(() =>
  import("@/components/voyex/client/request-form").then((m) => ({
    default: m.RequestForm,
  }))
);

export function NewRequestExperience() {
  const [mode, setMode] = useState<"chat" | "form">("chat");

  if (mode === "form") {
    return (
      <div>
        <div className="mx-auto flex max-w-[680px] justify-end px-6 pt-8">
          <button
            type="button"
            onClick={() => setMode("chat")}
            className="inline-flex items-center gap-1.5 text-xs text-[var(--color-fg-3)] transition-colors hover:text-[var(--color-fg)]"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            Chat with the concierge instead
          </button>
        </div>
        <Suspense
          fallback={
            <div className="flex justify-center py-24">
              <Loader2 className="h-5 w-5 animate-spin text-[var(--color-fg-3)]" />
            </div>
          }
        >
          <RequestForm />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[680px] px-6 py-12">
      <div className="mb-6">
        <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
          New request
        </div>
        <h1 className="mt-1 font-serif text-[32px] leading-tight text-white">
          Let&apos;s plan your flight
        </h1>
        <p className="mt-2 text-sm text-[var(--color-fg-2)]">
          Tell our concierge what you need. Vetted brokers compete to give you
          their best offer.
        </p>
      </div>

      <ConciergeChat variant="page" />

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => setMode("form")}
          className="inline-flex items-center gap-1.5 text-xs text-[var(--color-fg-3)] transition-colors hover:text-[var(--color-fg)]"
        >
          <FileText className="h-3.5 w-3.5" />
          Prefer a quick form?
        </button>
      </div>
    </div>
  );
}
