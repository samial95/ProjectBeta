"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  CheckCircle2,
  XCircle,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { formatUsd } from "@/lib/mock-data";
import type { BrokerOffer } from "@/lib/customer-data";

function included(text: string) {
  return !/not included|not offered|on request|\(\+\$/i.test(text);
}

export function OfferCard({
  offer,
  index,
}: {
  offer: BrokerOffer;
  index: number;
}) {
  const deposit = Math.round((offer.price * offer.depositPct) / 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={cn(
        "relative flex flex-col rounded-xl border navy-panel panel-shadow backdrop-blur-sm",
        offer.recommended
          ? "border-[var(--color-accent)] gold-glow"
          : "border-[var(--color-border)]"
      )}
    >
      {/* top ribbon */}
      <div className="flex items-center gap-2 px-5 pt-5 flex-wrap min-h-[28px]">
        {offer.recommended && (
          <Badge variant="gold" className="flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" />
            Recommended
          </Badge>
        )}
        {offer.bestPrice && <Badge variant="ok">Best price</Badge>}
        {offer.fastestResponse && !offer.recommended && (
          <Badge variant="info">Fastest</Badge>
        )}
      </div>

      <div className="px-5 pt-3 pb-4">
        <div className="flex items-center justify-between gap-3">
          <div className="text-base text-white font-medium">{offer.broker}</div>
          {offer.verified && (
            <ShieldCheck className="h-4 w-4 text-[var(--color-ok)] shrink-0" />
          )}
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-[var(--color-fg-3)]">
          <span className="inline-flex items-center gap-1 text-[var(--color-accent)]">
            <Star className="h-3 w-3 fill-current" />
            {offer.rating.toFixed(1)}
          </span>
          <span>·</span>
          <span>{offer.reviews} reviews</span>
          <span>·</span>
          <span>{offer.brokerTier}</span>
        </div>
      </div>

      <Separator />

      <div className="px-5 py-4 space-y-1">
        <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
          Aircraft
        </div>
        <div className="text-sm text-white">{offer.aircraft}</div>
        <div className="text-xs text-[var(--color-fg-2)] mt-1">
          {offer.operator}
        </div>
        <div className="text-[11px] text-[var(--color-fg-3)]">
          {offer.operatorSafety}
        </div>
      </div>

      <Separator />

      <div className="px-5 py-4">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-2xl text-[var(--color-accent)] tracking-tight">
            {formatUsd(offer.price)}
          </span>
          <span className="text-[11px] text-[var(--color-fg-3)]">all-in</span>
        </div>
        <div className="text-[11px] text-[var(--color-fg-3)] mt-1">
          {offer.depositPct}% deposit ={" "}
          <span className="font-mono text-[var(--color-fg-2)]">
            {formatUsd(deposit)}
          </span>
        </div>
      </div>

      <Separator />

      <ul className="px-5 py-4 space-y-2 flex-1">
        {offer.inclusions.map((line) => {
          const ok = included(line);
          return (
            <li key={line} className="flex items-start gap-2 text-xs">
              {ok ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-[var(--color-ok)] mt-0.5 shrink-0" />
              ) : (
                <XCircle className="h-3.5 w-3.5 text-[var(--color-fg-3)] mt-0.5 shrink-0" />
              )}
              <span
                className={ok ? "text-[var(--color-fg-2)]" : "text-[var(--color-fg-3)]"}
              >
                {line}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="px-5 pb-3 text-[11px] text-[var(--color-fg-3)] italic">
        {offer.notes}
      </div>

      <div className="px-5 pb-5 pt-1">
        {offer.recommended ? (
          <Button asChild size="md" className="w-full gap-2">
            <Link href={`/client/deposit?offer=${offer.id}`}>
              Select &amp; pay deposit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button asChild variant="ghost" size="md" className="w-full">
            <Link href={`/client/deposit?offer=${offer.id}`}>Select offer</Link>
          </Button>
        )}
        <div className="text-[10px] text-[var(--color-fg-3)] text-center mt-2">
          {offer.respondedAgo}
        </div>
      </div>
    </motion.div>
  );
}
