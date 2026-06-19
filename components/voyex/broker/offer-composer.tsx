"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatUsd } from "@/lib/mock-data";

export function BrokerOfferComposer({
  budgetMin,
  budgetMax,
  client,
}: {
  budgetMin: number;
  budgetMax: number;
  client: string;
}) {
  const mid = Math.round((budgetMin + budgetMax) / 2 / 500) * 500;
  const [price, setPrice] = useState(mid);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <Card>
        <div className="px-6 py-5 flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-[var(--color-ok)] mt-0.5 shrink-0" />
          <div>
            <div className="text-sm font-medium text-white">
              Offer sent to {client}
            </div>
            <div className="text-sm text-[var(--color-fg-2)] mt-1">
              Your all-in offer of{" "}
              <span className="font-mono text-[var(--color-accent)]">
                {formatUsd(price)}
              </span>{" "}
              is now in the traveller&apos;s comparison. You&apos;ll be notified
              when they respond.
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="px-6 py-5">
        <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)] mb-3">
          Respond to the traveller
        </div>
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <div className="text-xs text-[var(--color-fg-3)] mb-1">
              Your all-in price
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-2xl text-[var(--color-accent)]">$</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                step={500}
                className="font-mono text-2xl bg-[var(--color-bg)] border border-[var(--color-border)] rounded-sm px-3 py-1 w-44 text-[var(--color-accent)] focus:outline-none focus:border-[var(--color-accent)]"
              />
            </div>
            <div className="text-[11px] text-[var(--color-fg-3)] font-mono mt-1">
              Traveller budget {formatUsd(budgetMin)} – {formatUsd(budgetMax)}
            </div>
          </div>
          <Button onClick={() => setSent(true)} className="gap-2">
            Send all-in offer
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
