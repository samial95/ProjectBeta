"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star,
  CheckCircle2,
  XCircle,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Users,
  Navigation,
  Wifi,
  Lock,
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={cn(
        "relative flex flex-col overflow-hidden rounded-xl border navy-panel panel-shadow backdrop-blur-sm",
        offer.recommended
          ? "border-[var(--color-accent)] gold-glow"
          : "border-[var(--color-border)]"
      )}
    >
      {/* Aircraft photo */}
      <div className="relative h-44 w-full">
        <Image
          src={offer.image}
          alt={offer.aircraft}
          fill
          sizes="(max-width: 768px) 100vw, 420px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,9,34,0.92)] via-transparent to-transparent" />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[rgba(20,9,34,0.7)] to-transparent" />
        {/* badges */}
        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
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
        {/* aircraft name */}
        <div className="absolute bottom-3 left-4 right-4">
          <div className="text-sm font-medium text-white drop-shadow truncate">
            {offer.aircraft}
          </div>
          <div className="text-[11px] text-white/70 truncate">
            {offer.operator}
          </div>
          <div className="mt-0.5 inline-flex items-center gap-1 text-[10px] text-[var(--color-ok)]">
            <ShieldCheck className="h-3 w-3" />
            {offer.verifiedType === "broker"
              ? "Verified broker"
              : "Verified operator"}
          </div>
        </div>
      </div>

      <div className="px-5 pt-4 pb-3">
        <div className="text-base text-white font-medium">{offer.broker}</div>
        <div className="mt-1 flex items-center gap-2 text-xs text-[var(--color-fg-3)]">
          <span className="inline-flex items-center gap-1 text-[var(--color-accent)]">
            <Star className="h-3 w-3 fill-current" />
            {offer.rating.toFixed(1)}
          </span>
          <span>·</span>
          <span>{offer.reviews} reviews</span>
        </div>
      </div>

      <Separator />

      {/* Key flight details */}
      <div className="grid grid-cols-3 gap-2 px-5 py-4">
        <Spec icon={Users} label={offer.specs.passengers} />
        <Spec icon={Navigation} label={offer.specs.range} />
        <Spec icon={Wifi} label={offer.specs.wifi} />
      </div>

      <Separator />

      <div className="px-5 py-4">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-2xl text-[var(--color-accent)] tracking-tight">
            {formatUsd(offer.price)}
          </span>
          <span className="text-[11px] text-[var(--color-fg-3)]">all-in</span>
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[var(--color-fg-3)]">
          <Lock className="h-3 w-3 text-[var(--color-ok)]" />
          Held securely in escrow until your trip is confirmed
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
              Select &amp; secure in escrow
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button asChild variant="ghost" size="md" className="w-full">
            <Link href={`/client/deposit?offer=${offer.id}`}>View &amp; select</Link>
          </Button>
        )}
        <div className="text-[10px] text-[var(--color-fg-3)] text-center mt-2">
          {offer.respondedAgo}
        </div>
      </div>
    </motion.div>
  );
}

function Spec({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <Icon className="h-4 w-4 text-[var(--color-accent)]" />
      <span className="text-[10px] leading-tight text-[var(--color-fg-2)]">
        {label}
      </span>
    </div>
  );
}
