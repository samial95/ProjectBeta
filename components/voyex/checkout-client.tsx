"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Leaf,
  CreditCard,
  Banknote,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { tripRequest, formatUsd } from "@/lib/mock-data";
import { VerificationList } from "@/components/voyex/verification-list";

const PAYMENT_METHODS = [
  { id: "wire", label: "Wire", icon: Banknote },
  { id: "card", label: "Card", icon: CreditCard },
  { id: "escrow", label: "Escrow account", icon: Wallet },
] as const;

type PaymentMethod = (typeof PAYMENT_METHODS)[number]["id"];

const TOTAL = 94500;
const SPLIT_A = 0.7;

export function CheckoutClient() {
  const [tripExpanded, setTripExpanded] = useState(false);
  const [payment, setPayment] = useState<PaymentMethod>("wire");
  const [split, setSplit] = useState(true);
  const [saf, setSaf] = useState(30);
  const [esg, setEsg] = useState(true);
  const [confirmed, setConfirmed] = useState(false);

  const safCost = Math.round((4200 / 30) * saf);
  const co2 = (12.1 - (12.1 - 8.4) * (saf / 30)).toFixed(1);
  const co2Pct = Math.min(100, (Number(co2) / 12.1) * 100);

  if (confirmed) {
    return <SuccessState />;
  }

  return (
    <div className="mx-auto max-w-[760px] px-6 py-12 space-y-8 pb-32">
      <div>
        <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-3)]">
          Confirm booking
        </div>
        <h1 className="font-serif text-[32px] leading-tight text-[var(--color-fg)] mt-1">
          Final review · {tripRequest.id}
        </h1>
      </div>

      <Card>
        <button
          type="button"
          onClick={() => setTripExpanded((v) => !v)}
          className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-[var(--color-surface-2)]/50 transition-colors"
        >
          <div className="text-sm text-[var(--color-fg)]">
            <span className="font-mono text-[13px]">
              DUBAI OMDW → LONDON EGGW
            </span>
            <span className="text-[var(--color-fg-3)]"> · </span>
            14 Mar 2026
            <span className="text-[var(--color-fg-3)]"> · </span>
            Global 7500
            <span className="text-[var(--color-fg-3)]"> · </span>
            Sovereign Jet Partners
            <span className="text-[var(--color-fg-3)]"> · </span>
            <span className="font-mono text-[var(--color-accent)]">
              {formatUsd(TOTAL)}
            </span>
          </div>
          {tripExpanded ? (
            <ChevronUp className="h-4 w-4 text-[var(--color-fg-3)]" />
          ) : (
            <ChevronDown className="h-4 w-4 text-[var(--color-fg-3)]" />
          )}
        </button>
        <AnimatePresence initial={false}>
          {tripExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-[var(--color-border)]"
            >
              <div className="px-6 py-5 grid grid-cols-2 gap-x-10 gap-y-3 text-sm text-[var(--color-fg-2)]">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
                    Passengers
                  </div>
                  <div className="mt-1">6 adults + 2 children</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
                    Catering
                  </div>
                  <div className="mt-1">Halal, no shellfish</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
                    Tail
                  </div>
                  <div className="mt-1 font-mono">A6-SJP · 2023 · 1,247 hrs SN</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
                    Ground
                  </div>
                  <div className="mt-1">LTN → Mayfair</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Pre-flight verification</CardTitle>
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[var(--color-ok)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-ok)] green-pulse" />
              Live
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <VerificationList />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment &amp; sustainability</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)] mb-2">
              Payment method
            </div>
            <div className="inline-flex border border-[var(--color-border)] rounded-sm overflow-hidden">
              {PAYMENT_METHODS.map((m) => {
                const Icon = m.icon;
                const active = payment === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPayment(m.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 text-sm transition-colors border-r border-[var(--color-border)] last:border-r-0",
                      active
                        ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                        : "text-[var(--color-fg-2)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-2)]"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 border border-[var(--color-border)] rounded-sm bg-[var(--color-bg)]">
            <CheckCircle2 className="h-4 w-4 text-[var(--color-ok)] mt-0.5 shrink-0" />
            <div className="text-sm text-[var(--color-fg-2)]">
              <span className="font-mono text-[var(--color-fg)]">
                $115,000
              </span>{" "}
              currently held in Voyex Escrow ·{" "}
              <span className="font-mono text-[var(--color-fg-3)]">
                ref VX-7-291
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-[var(--color-fg)]">
                Split payment
              </div>
              <Switch
                checked={split}
                onCheckedChange={setSplit}
                aria-label="Split payment"
              />
            </div>
            {split && (
              <div className="border border-[var(--color-border)] rounded-sm divide-y divide-[var(--color-border)]">
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="text-sm text-[var(--color-fg-2)]">
                    Westbourne Family Office{" "}
                    <span className="text-[var(--color-fg-3)]">· 70%</span>
                  </div>
                  <div className="font-mono text-sm text-[var(--color-fg)]">
                    {formatUsd(Math.round(TOTAL * SPLIT_A))}
                  </div>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="text-sm text-[var(--color-fg-2)]">
                    Westbourne Trust III{" "}
                    <span className="text-[var(--color-fg-3)]">· 30%</span>
                  </div>
                  <div className="font-mono text-sm text-[var(--color-fg)]">
                    {formatUsd(Math.round(TOTAL * (1 - SPLIT_A)))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2 mb-2 text-[var(--color-accent)]">
              <Leaf className="h-3.5 w-3.5" />
              <span className="text-[11px] uppercase tracking-[0.14em]">
                Sustainability
              </span>
            </div>

            <div className="mt-3">
              <div className="flex items-baseline justify-between">
                <div className="text-sm text-[var(--color-fg)]">SAF blend</div>
                <div className="font-mono text-sm text-[var(--color-accent)]">
                  {saf}%
                </div>
              </div>
              <div className="mt-3">
                <Slider
                  value={[saf]}
                  onValueChange={(v) => setSaf(v[0])}
                  min={0}
                  max={50}
                  step={5}
                />
                <div className="flex justify-between mt-1 font-mono text-[10px] text-[var(--color-fg-3)]">
                  <span>0%</span>
                  <span>50%</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-[var(--color-fg-3)]">
                Included: <span className="font-mono">{formatUsd(safCost)}</span>
              </div>
            </div>

            <div className="mt-5">
              <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)] mb-2">
                Emissions estimate
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xl text-[var(--color-fg)]">
                  {co2}
                </span>
                <span className="text-sm text-[var(--color-fg-2)]">
                  tonnes CO₂
                </span>
                <span className="text-xs text-[var(--color-fg-3)]">
                  vs 12.1 conventional
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full bg-[var(--color-surface-2)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--color-accent)] transition-all"
                  style={{ width: `${co2Pct}%` }}
                />
              </div>
              <div className="mt-2 text-xs text-[var(--color-fg-3)]">
                Book-and-claim certificate issued by 4AIR within 24hrs of
                departure.
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
              <div className="text-sm text-[var(--color-fg-2)]">
                Add to Westbourne quarterly ESG report
              </div>
              <Switch
                checked={esg}
                onCheckedChange={setEsg}
                aria-label="ESG report"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="fixed bottom-0 left-[240px] right-0 border-t border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur z-10">
        <div className="mx-auto max-w-[760px] px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="text-[11px] text-[var(--color-fg-3)] max-w-md">
            By confirming, you accept Voyex broker terms and the operator&apos;s
            conditions of carriage.
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="md">
              Save as draft
            </Button>
            <Button
              size="lg"
              onClick={() => setConfirmed(true)}
              className="font-mono tracking-tight"
            >
              Confirm booking · {formatUsd(TOTAL)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SuccessState() {
  const rows = [
    "Crew briefed",
    "Catering ordered (halal, Capt. confirmed)",
    "Ground transport dispatched (Mayfair pickup at LTN)",
    "Trip thread opened — first update at T-24hrs",
  ];

  return (
    <div className="mx-auto max-w-[640px] px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-ok)] flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-ok)] green-pulse" />
          Confirmed
        </div>
        <h1 className="mt-3 font-serif text-[34px] leading-tight text-[var(--color-fg)]">
          Booking confirmed ·{" "}
          <span className="font-mono text-[26px] text-[var(--color-accent)]">
            VYX-2026-0847
          </span>
        </h1>
      </motion.div>

      <div className="mt-10 border-t border-[var(--color-border)] divide-y divide-[var(--color-border)]">
        {rows.map((label, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.4 + i * 0.4 }}
            className="flex items-center gap-3 py-4"
          >
            <CheckCircle2 className="h-4 w-4 text-[var(--color-ok)]" />
            <span className="text-sm text-[var(--color-fg)]">{label}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 2 }}
        className="mt-10"
      >
        <Button asChild variant="ghost">
          <Link href="/trips">Return to trip dashboard</Link>
        </Button>
      </motion.div>
    </div>
  );
}
