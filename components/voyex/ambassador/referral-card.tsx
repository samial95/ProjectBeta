"use client";

import { useState } from "react";
import { Copy, Check, QrCode } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function CopyField({
  label,
  value,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3">
      <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
        {label}
      </div>
      <div className="mt-1.5 flex items-center gap-3">
        <span className="min-w-0 flex-1 truncate font-mono text-sm text-[var(--color-fg)]">
          {value}
        </span>
        <button
          type="button"
          onClick={onCopy}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] transition-colors",
            copied
              ? "border-[var(--color-ok)] text-[var(--color-ok)]"
              : "border-[var(--color-accent-border)] text-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]"
          )}
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export function ReferralCard({ code, link }: { code: string; link: string }) {
  const [copied, setCopied] = useState<"code" | "link" | null>(null);

  function copy(which: "code" | "link", value: string) {
    try {
      navigator.clipboard?.writeText(value);
    } catch {
      /* clipboard unavailable in this context — no-op for the demo */
    }
    setCopied(which);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <Card className="gold-glow border-[var(--color-accent-border)]">
      <div className="px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Your referral
            </div>
            <p className="mt-1 text-sm text-[var(--color-fg-2)]">
              Share your code or link. You earn{" "}
              <span className="text-[var(--color-fg)]">1.5%</span> of every flight
              your travellers take — for life.
            </p>
          </div>
          <div className="hidden sm:flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)]">
            <QrCode className="h-8 w-8 text-[var(--color-fg-3)]" />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <CopyField
            label="Referral code"
            value={code}
            copied={copied === "code"}
            onCopy={() => copy("code", code)}
          />
          <CopyField
            label="Referral link"
            value={link}
            copied={copied === "link"}
            onCopy={() => copy("link", link)}
          />
        </div>
      </div>
    </Card>
  );
}
