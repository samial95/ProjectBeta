"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Pencil, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatUsd } from "@/lib/mock-data";
import type { RfqDetail } from "@/lib/operator-data";

export function QuotePanel({ rfq }: { rfq: RfqDetail }) {
  const isOpen = rfq.status === "needs_quote";
  const midpoint = Math.round((rfq.budgetMin + rfq.budgetMax) / 2 / 500) * 500;

  const [price, setPrice] = useState(rfq.yourQuote ?? midpoint);
  const [submitted, setSubmitted] = useState(!isOpen);
  const [editing, setEditing] = useState(false);
  const [withdrawn, setWithdrawn] = useState(false);

  // ----- Needs quote: submit form -----
  if (!submitted) {
    return (
      <Card>
        <div className="px-6 pt-5 pb-3 text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
          Submit your quote
        </div>
        <Separator />
        <div className="px-6 py-5 space-y-4">
          <div className="text-xs text-[var(--color-fg-3)]">
            Enter your all-in price. The traveller compares it against other live
            offers and responds directly.
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-2xl text-[var(--color-accent)]">$</span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="font-mono text-2xl bg-[var(--color-bg)] border border-[var(--color-border)] rounded-sm px-3 py-1 w-44 text-[var(--color-accent)] focus:outline-none focus:border-[var(--color-accent)]"
              step={500}
            />
          </div>
          <div className="text-[11px] text-[var(--color-fg-3)] font-mono">
            Traveller budget {formatUsd(rfq.budgetMin)} – {formatUsd(rfq.budgetMax)}
          </div>
          <Button onClick={() => setSubmitted(true)} className="gap-2">
            Submit quote to traveller
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    );
  }

  if (withdrawn) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card>
          <div className="px-6 py-5">
            <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
              Quote withdrawn
            </div>
            <p className="text-sm text-[var(--color-fg-2)] mt-2">
              The traveller has been notified. You can submit a new quote until
              the travel date.
            </p>
            <div className="mt-4">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setWithdrawn(false);
                  setEditing(true);
                }}
              >
                Submit new quote
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <Card>
      <div className="px-6 pt-5 pb-3 flex items-center justify-between">
        <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
          Your submitted quote
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] text-[var(--color-ok)]">
          <CheckCircle2 className="h-3 w-3" />
          {rfq.responseSeconds != null
            ? `Sent ${rfq.responseSeconds}s after RFQ`
            : "Sent to the traveller"}
        </span>
      </div>

      <Separator />

      <div className="px-6 py-5">
        {editing ? (
          <div className="space-y-3">
            <div className="text-xs text-[var(--color-fg-3)]">
              Adjust your all-in price. The traveller will be notified instantly.
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-2xl text-[var(--color-accent)]">$</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="font-mono text-2xl bg-[var(--color-bg)] border border-[var(--color-border)] rounded-sm px-3 py-1 w-44 text-[var(--color-accent)] focus:outline-none focus:border-[var(--color-accent)]"
                step={500}
              />
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Button size="sm" onClick={() => setEditing(false)}>
                Save revision
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setPrice(rfq.yourQuote ?? midpoint);
                  setEditing(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <div className="font-mono text-3xl text-[var(--color-accent)] tracking-tight">
                {formatUsd(price)}
              </div>
              <div className="text-xs text-[var(--color-fg-3)] mt-1">
                All-in
                {rfq.yourAircraft ? ` · ${rfq.yourAircraft}` : ""}
                {rfq.safBlend != null ? ` · SAF ${rfq.safBlend}%` : ""}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
                Position
              </div>
              <div className="mt-1 font-mono text-3xl text-[var(--color-fg)] tracking-tight">
                {rfq.rank != null ? `#${rfq.rank}` : "Pending"}
              </div>
              {rfq.competitors != null && (
                <div className="text-[11px] text-[var(--color-fg-3)] mt-1">
                  {rfq.competitors} other{rfq.competitors === 1 ? "" : "s"}{" "}
                  responding
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {!editing && (
        <>
          <Separator />
          <div className="px-6 py-3 flex items-center justify-between gap-2 flex-wrap">
            <div className="text-[11px] text-[var(--color-fg-3)] font-mono">
              {rfq.expiresIn
                ? `Traveller decides in ${rfq.expiresIn}`
                : "Awaiting traveller decision"}
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setWithdrawn(true)}
                className="gap-1.5"
              >
                <X className="h-3.5 w-3.5" />
                Withdraw
              </Button>
              <Button size="sm" onClick={() => setEditing(true)} className="gap-1.5">
                <Pencil className="h-3.5 w-3.5" />
                Revise quote
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
