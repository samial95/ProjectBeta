"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { formatUsd } from "@/lib/mock-data";
import type { Quote } from "@/types";

function DataRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-1.5">
      <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)] shrink-0">
        {label}
      </span>
      <span className="text-sm text-[var(--color-fg)] text-right">
        {value}
      </span>
    </div>
  );
}

export function QuoteCard({
  quote,
  index,
}: {
  quote: Quote;
  index: number;
}) {
  if (quote.status === "pending") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.08 }}
        className="border border-dashed border-[var(--color-border)] bg-[var(--color-surface)]/40 rounded-sm p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-[var(--color-info)]/40 animate-pulse" />
            <div>
              <div className="text-sm text-[var(--color-fg)] font-medium">
                {quote.operator}
              </div>
              <div className="text-xs text-[var(--color-fg-3)] mt-1">
                {quote.pendingNote}
              </div>
            </div>
          </div>
          <div className="font-mono text-xs text-[var(--color-fg-3)] uppercase tracking-wider">
            awaiting
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-2 w-3/4 bg-[var(--color-surface-2)] rounded animate-pulse" />
          <div className="h-2 w-1/2 bg-[var(--color-surface-2)] rounded animate-pulse" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={cn(
        "relative bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm",
        quote.recommended && "border-l-2 border-l-[var(--color-accent)]"
      )}
    >
      {quote.recommended && (
        <div className="absolute right-5 top-5">
          <Badge variant="gold" className="flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" />
            Recommended
          </Badge>
        </div>
      )}

      <div className="px-6 pt-6 pb-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm">
          <span className="text-[var(--color-fg)] font-medium">
            {quote.operator}
          </span>
          <span className="text-[var(--color-fg-3)]">·</span>
          <span className="font-mono text-xs text-[var(--color-fg-2)]">
            AOC {quote.aocId}
          </span>
          <span className="text-[var(--color-fg-3)]">
            ({quote.jurisdiction})
          </span>
          {quote.verified && (
            <span className="inline-flex items-center gap-1 text-[var(--color-ok)] text-xs ml-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Verified
            </span>
          )}
        </div>
      </div>

      <Separator />

      <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1">
        <DataRow
          label="Aircraft"
          value={
            <span>
              {quote.aircraft} ·{" "}
              <span className="font-mono text-[13px]">{quote.tail}</span>
            </span>
          }
        />
        <DataRow
          label="Build / hrs"
          value={
            <span className="font-mono text-[13px]">
              {quote.yearBuild} · {quote.hoursSinceNew.toLocaleString()} hrs SN
            </span>
          }
        />
        <DataRow
          label="Insurance"
          value={
            <span>
              {quote.insurance} ·{" "}
              <span className="text-[var(--color-fg-2)]">{quote.insurer}</span>{" "}
              <span className="text-[var(--color-fg-3)] text-xs">
                · valid {quote.insuranceExpiry}
              </span>
            </span>
          }
        />
        <DataRow label="Safety" value={quote.safety} />
      </div>

      <Separator />

      <div className="px-6 py-5 flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
            Price all-in
          </div>
          <div className="mt-1 flex items-baseline gap-3">
            <span className="font-mono text-3xl text-[var(--color-accent)] tracking-tight">
              {formatUsd(quote.price)}
            </span>
          </div>
          <div className="text-xs text-[var(--color-fg-3)] mt-1">
            {quote.safNote}
          </div>
        </div>

        <div className="text-right">
          <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
            Trust score
          </div>
          <div className="mt-1 flex items-baseline gap-1 justify-end">
            <span className="font-mono text-3xl text-[var(--color-fg)] tracking-tight">
              {quote.trustScore}
            </span>
            <span className="font-mono text-sm text-[var(--color-fg-3)]">
              /100
            </span>
          </div>
          {quote.trustNote && (
            <div className="text-xs text-[var(--color-fg-3)] mt-1 max-w-[260px]">
              {quote.trustNote}
            </div>
          )}
        </div>
      </div>

      <div className="px-6 pb-5 flex items-center justify-between gap-3 flex-wrap">
        <span className="text-[11px] text-[var(--color-fg-3)] font-mono">
          {quote.respondedAgo}
        </span>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            Request revision
          </Button>
          {quote.recommended ? (
            <Button asChild size="sm">
              <Link href="/checkout">Accept quote</Link>
            </Button>
          ) : (
            <Button variant="subtle" size="sm">
              Accept quote
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
