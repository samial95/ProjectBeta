"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  Star,
  CheckCircle2,
  Lock,
  CreditCard,
  Plane,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { formatUsd } from "@/lib/mock-data";
import { brokerOffers, offerById, customerRequest } from "@/lib/customer-data";
import { ApplePaySheet } from "@/components/voyex/client/apple-pay-sheet";

type PayMethod = "apple" | "card";

export function DepositClient() {
  const params = useSearchParams();
  const offerId = params.get("offer") ?? brokerOffers[0].id;
  const offer = offerById(offerId) ?? brokerOffers[0];

  const [method, setMethod] = useState<PayMethod>("apple");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [paid, setPaid] = useState(false);
  const [cardProcessing, setCardProcessing] = useState(false);

  const deposit = Math.round((offer.price * offer.depositPct) / 100);
  const balance = offer.price - deposit;

  function pay() {
    if (method === "apple") {
      setSheetOpen(true);
    } else {
      setCardProcessing(true);
      setTimeout(() => {
        setCardProcessing(false);
        setPaid(true);
      }, 1600);
    }
  }

  if (paid) {
    return <DepositSuccess offerBroker={offer.broker} deposit={deposit} balance={balance} />;
  }

  return (
    <div className="mx-auto max-w-[760px] px-6 py-12 pb-28">
      <Link
        href="/client"
        className="inline-flex items-center gap-1.5 text-xs text-[var(--color-fg-3)] hover:text-[var(--color-fg)] transition-colors mb-6"
      >
        <ArrowLeft className="h-3 w-3" />
        Back to offers
      </Link>

      <div className="mb-8">
        <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
          Secure your trip
        </div>
        <h1 className="mt-1 font-serif text-[32px] leading-tight text-white">
          Pay deposit to confirm
        </h1>
        <p className="mt-2 text-sm text-[var(--color-fg-2)]">
          Held in escrow and fully refundable until your broker confirms the
          aircraft.
        </p>
      </div>

      {/* Selected offer */}
      <Card className="mb-6">
        <div className="px-6 py-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base text-white font-medium">
                  {offer.broker}
                </span>
                {offer.verified && (
                  <ShieldCheck className="h-4 w-4 text-[var(--color-ok)]" />
                )}
                <span className="inline-flex items-center gap-1 text-xs text-[var(--color-accent)]">
                  <Star className="h-3 w-3 fill-current" />
                  {offer.rating.toFixed(1)}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-[var(--color-fg-2)]">
                <Plane className="h-3.5 w-3.5 text-[var(--color-fg-3)]" />
                {offer.aircraft}
                <span className="text-[var(--color-fg-3)]">·</span>
                {offer.operator}
              </div>
              <div className="mt-1 font-mono text-sm text-white">
                {customerRequest.fromCode}
                <span className="text-[var(--color-fg-3)] mx-2">→</span>
                {customerRequest.toCode}
                <span className="text-[var(--color-fg-3)] ml-2 text-xs">
                  {customerRequest.dateLabel}
                </span>
              </div>
            </div>
            <Link
              href="/client"
              className="text-xs text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
            >
              Change
            </Link>
          </div>
        </div>
      </Card>

      {/* Price breakdown */}
      <Card className="mb-6">
        <div className="px-6 py-5 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--color-fg-2)]">Trip total (all-in)</span>
            <span className="font-mono text-[var(--color-fg)]">
              {formatUsd(offer.price)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--color-fg-2)]">
              Deposit due now ({offer.depositPct}%)
            </span>
            <span className="font-mono text-[var(--color-accent)] text-base">
              {formatUsd(deposit)}
            </span>
          </div>
          <Separator />
          <div className="flex items-center justify-between text-xs text-[var(--color-fg-3)]">
            <span>Balance on confirmation</span>
            <span className="font-mono">{formatUsd(balance)}</span>
          </div>
        </div>
      </Card>

      {/* Payment method */}
      <Card className="mb-6">
        <div className="px-6 py-5">
          <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)] mb-3">
            Payment method
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMethod("apple")}
              className={cn(
                "flex items-center gap-3 p-4 rounded-lg border transition-colors",
                method === "apple"
                  ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]"
                  : "border-[var(--color-border)] hover:bg-[var(--color-surface-2)]"
              )}
            >
              <AppleLogo className="h-5 w-5 text-white" />
              <span className="text-sm text-white font-medium">Apple Pay</span>
              {method === "apple" && (
                <CheckCircle2 className="h-4 w-4 text-[var(--color-accent)] ml-auto" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setMethod("card")}
              className={cn(
                "flex items-center gap-3 p-4 rounded-lg border transition-colors",
                method === "card"
                  ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]"
                  : "border-[var(--color-border)] hover:bg-[var(--color-surface-2)]"
              )}
            >
              <CreditCard className="h-5 w-5 text-[var(--color-fg-2)]" />
              <span className="text-sm text-white font-medium">
                Credit card
              </span>
              {method === "card" && (
                <CheckCircle2 className="h-4 w-4 text-[var(--color-accent)] ml-auto" />
              )}
            </button>
          </div>

          {method === "card" && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              <input
                className="col-span-2 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm font-mono text-[var(--color-fg)] placeholder:text-[var(--color-fg-3)] focus:outline-none focus:border-[var(--color-accent)]"
                placeholder="4242 4242 4242 4242"
                defaultValue="4242 4242 4242 4242"
              />
              <input
                className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm font-mono text-[var(--color-fg)] placeholder:text-[var(--color-fg-3)] focus:outline-none focus:border-[var(--color-accent)]"
                placeholder="MM/YY"
                defaultValue="03/29"
              />
              <input
                className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm font-mono text-[var(--color-fg)] placeholder:text-[var(--color-fg-3)] focus:outline-none focus:border-[var(--color-accent)]"
                placeholder="CVC"
                defaultValue="123"
              />
            </div>
          )}
        </div>
      </Card>

      <div className="flex items-center justify-center gap-2 text-xs text-[var(--color-fg-3)] mb-2">
        <Lock className="h-3.5 w-3.5 text-[var(--color-ok)]" />
        Escrow-protected by Voyex · refundable until aircraft confirmed
      </div>

      {/* Sticky pay bar */}
      <div className="fixed bottom-0 left-[240px] right-0 border-t border-[var(--color-border)] bg-[rgba(22,10,38,0.9)] backdrop-blur z-10">
        <div className="mx-auto max-w-[760px] px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="text-sm text-[var(--color-fg-2)]">
            Deposit due now ·{" "}
            <span className="font-mono text-[var(--color-accent)] text-base">
              {formatUsd(deposit)}
            </span>
          </div>
          {method === "apple" ? (
            <button
              onClick={pay}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-black px-8 py-3 text-[15px] font-semibold active:scale-[0.99] transition-transform"
            >
              <AppleLogo className="h-4 w-4" />
              Pay
            </button>
          ) : (
            <Button size="lg" onClick={pay} disabled={cardProcessing} className="gap-2">
              {cardProcessing ? "Processing…" : `Pay ${formatUsd(deposit)}`}
            </Button>
          )}
        </div>
      </div>

      <ApplePaySheet
        open={sheetOpen}
        amount={deposit}
        merchant={offer.broker}
        onClose={() => setSheetOpen(false)}
        onPaid={() => {
          setSheetOpen(false);
          setPaid(true);
        }}
      />
    </div>
  );
}

function DepositSuccess({
  offerBroker,
  deposit,
  balance,
}: {
  offerBroker: string;
  deposit: number;
  balance: number;
}) {
  const rows = [
    `Deposit of ${formatUsd(deposit)} received & held in escrow`,
    `${offerBroker} notified — confirming your aircraft`,
    "Trip thread opened — your broker will message you shortly",
    `Balance of ${formatUsd(balance)} due once aircraft is confirmed`,
  ];

  return (
    <div className="mx-auto max-w-[600px] px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
          className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#34c759]"
        >
          <CheckCircle2 className="h-9 w-9 text-white" />
        </motion.div>
        <h1 className="mt-6 font-serif text-[32px] leading-tight text-white">
          Deposit confirmed
        </h1>
        <p className="mt-2 text-sm text-[var(--color-fg-2)]">
          Your trip is secured. Here&apos;s what happens next.
        </p>
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
            <CheckCircle2 className="h-4 w-4 text-[var(--color-ok)] shrink-0" />
            <span className="text-sm text-[var(--color-fg)]">{label}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 2 }}
        className="mt-10 flex items-center justify-center gap-3"
      >
        <Button asChild variant="ghost">
          <Link href="/client">Back to my trips</Link>
        </Button>
      </motion.div>
    </div>
  );
}

function AppleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 384 512" className={className} fill="currentColor" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}
