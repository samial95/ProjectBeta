"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Star,
  CheckCircle2,
  Lock,
  CreditCard,
  Coins,
  QrCode,
  Users,
  Navigation,
  Gauge,
  Ruler,
  Briefcase,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { formatUsd } from "@/lib/mock-data";
import { brokerOffers, offerById, customerRequest } from "@/lib/customer-data";
import { ApplePaySheet } from "@/components/voyex/client/apple-pay-sheet";

type PayMethod = "apple" | "card" | "crypto";

const CRYPTO = [
  {
    id: "BTC",
    name: "Bitcoin",
    rate: 95000,
    network: "Bitcoin network",
    address: "bc1qhxv0yexescrow9k7m2charter0x8f3qzr4t",
  },
  {
    id: "ETH",
    name: "Ethereum",
    rate: 3400,
    network: "ERC-20 · Ethereum",
    address: "0x9F3aV0yexEscrow7c2B1e4D8a6C0f5E2b9D4A1c",
  },
  {
    id: "SOL",
    name: "Solana",
    rate: 180,
    network: "Solana network",
    address: "V0yx7Esc3oWso1anaPay9kQ2mZ4Rt6Yb8Nc1Df",
  },
] as const;

function cryptoAmount(usd: number, rate: number, id: string): string {
  const amt = usd / rate;
  const dp = id === "SOL" ? 2 : id === "ETH" ? 3 : 5;
  return amt.toFixed(dp);
}

export function DepositClient() {
  const params = useSearchParams();
  const offerId = params.get("offer") ?? brokerOffers[0].id;
  const offer = offerById(offerId) ?? brokerOffers[0];

  const [method, setMethod] = useState<PayMethod>("apple");
  const [coin, setCoin] = useState<string>("BTC");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [paid, setPaid] = useState(false);
  const [cardProcessing, setCardProcessing] = useState(false);
  const [activeImage, setActiveImage] = useState(offer.image);

  const selectedCoin = CRYPTO.find((c) => c.id === coin) ?? CRYPTO[0];
  const coinAmount = cryptoAmount(offer.price, selectedCoin.rate, selectedCoin.id);

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
    return (
      <EscrowSuccess
        offerId={offer.id}
        broker={offer.broker}
        operator={offer.operator}
        amount={offer.price}
      />
    );
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
          Pay into escrow
        </h1>
        <p className="mt-2 text-sm text-[var(--color-fg-2)]">
          Your full payment is held safely in escrow. A Voyex broker or the
          operator will reach out to finalise the details — funds are only
          released once your aircraft is confirmed.
        </p>
      </div>

      {/* Aircraft gallery + details */}
      <Card className="mb-6 overflow-hidden">
        <div className="relative h-64 w-full">
          <Image
            src={activeImage}
            alt={offer.aircraft}
            fill
            sizes="(max-width: 768px) 100vw, 760px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,9,34,0.85)] via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <div className="text-lg font-medium text-white drop-shadow">
              {offer.aircraft}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-white/75">
              <span>Operated by {offer.operator}</span>
              <span className="inline-flex items-center gap-1 text-[var(--color-ok)]">
                <ShieldCheck className="h-3 w-3" />
                Verified operator
              </span>
            </div>
          </div>
        </div>

        {offer.gallery.length > 1 && (
          <div className="flex gap-2 px-6 pt-4">
            {offer.gallery.map((src) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveImage(src)}
                className={cn(
                  "relative h-14 w-20 shrink-0 overflow-hidden rounded-md border transition-colors",
                  activeImage === src
                    ? "border-[var(--color-accent)]"
                    : "border-[var(--color-border)] opacity-70 hover:opacity-100"
                )}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Flight details */}
        <div className="px-6 py-5">
          <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)] mb-3">
            Flight details
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            <DetailRow icon={Users} value={offer.specs.passengers} />
            <DetailRow icon={Navigation} value={offer.specs.range} />
            <DetailRow icon={Gauge} value={offer.specs.speed} />
            <DetailRow icon={Ruler} value={offer.specs.cabin} />
            <DetailRow icon={Briefcase} value={offer.specs.baggage} />
            <DetailRow icon={Wifi} value={offer.specs.wifi} />
          </div>

          <Separator className="my-5" />

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <span className="text-white font-medium">{offer.broker}</span>
            <span className="inline-flex items-center gap-1 text-xs text-[var(--color-ok)]">
              <ShieldCheck className="h-3.5 w-3.5" />
              Verified broker
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-[var(--color-accent)]">
              <Star className="h-3 w-3 fill-current" />
              {offer.rating.toFixed(1)}
            </span>
            <span className="text-[var(--color-fg-3)]">·</span>
            <span className="font-mono text-sm text-white">
              {customerRequest.fromCode}
              <span className="text-[var(--color-fg-3)] mx-1.5">→</span>
              {customerRequest.toCode}
            </span>
            <span className="text-xs text-[var(--color-fg-3)]">
              {customerRequest.dateLabel}
            </span>
          </div>
        </div>
      </Card>

      {/* Amount to escrow */}
      <Card className="mb-6">
        <div className="px-6 py-5 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--color-fg-2)]">Trip total (all-in)</span>
            <span className="font-mono text-[var(--color-fg)]">
              {formatUsd(offer.price)}
            </span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-fg-2)]">
              Held in escrow now
            </span>
            <span className="font-mono text-[var(--color-accent)] text-xl">
              {formatUsd(offer.price)}
            </span>
          </div>
        </div>
      </Card>

      {/* Payment method */}
      <Card className="mb-6">
        <div className="px-6 py-5">
          <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)] mb-3">
            Payment method
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
              <span className="text-sm text-white font-medium">Card</span>
            </button>
            <button
              type="button"
              onClick={() => setMethod("crypto")}
              className={cn(
                "flex items-center gap-3 p-4 rounded-lg border transition-colors",
                method === "crypto"
                  ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]"
                  : "border-[var(--color-border)] hover:bg-[var(--color-surface-2)]"
              )}
            >
              <Coins className="h-5 w-5 text-[var(--color-fg-2)]" />
              <span className="text-sm text-white font-medium">Crypto</span>
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

          {method === "crypto" && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-3 gap-2">
                {CRYPTO.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCoin(c.id)}
                    className={cn(
                      "rounded-lg border px-3 py-2.5 text-center transition-colors",
                      coin === c.id
                        ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]"
                        : "border-[var(--color-border)] hover:bg-[var(--color-surface-2)]"
                    )}
                  >
                    <div className="text-sm font-medium text-white">{c.id}</div>
                    <div className="text-[10px] text-[var(--color-fg-3)]">
                      {c.name}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-surface-2)]">
                  <QrCode className="h-12 w-12 text-[var(--color-fg-3)]" />
                </div>
                <div className="min-w-0 flex-1 space-y-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
                      Amount to send
                    </div>
                    <div className="font-mono text-lg text-[var(--color-accent)]">
                      {coinAmount} {selectedCoin.id}
                    </div>
                    <div className="text-[11px] text-[var(--color-fg-3)]">
                      ≈ {formatUsd(offer.price)} · {selectedCoin.network}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
                      Send to address
                    </div>
                    <div className="font-mono text-xs text-[var(--color-fg)] break-all">
                      {selectedCoin.address}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-1.5 text-[11px] text-[var(--color-fg-3)]">
                <Lock className="h-3.5 w-3.5 text-[var(--color-ok)] mt-0.5 shrink-0" />
                Send the exact amount from your wallet. On confirmation, funds are
                converted and held in Voyex escrow.
              </div>
            </div>
          )}
        </div>
      </Card>

      <div className="flex items-center justify-center gap-2 text-xs text-[var(--color-fg-3)] mb-2">
        <Lock className="h-3.5 w-3.5 text-[var(--color-ok)]" />
        Escrow-protected by Voyex · released only once your aircraft is confirmed
      </div>

      {/* Sticky pay bar */}
      <div className="fixed bottom-0 left-[240px] right-0 border-t border-[var(--color-border)] bg-[rgba(22,10,38,0.9)] backdrop-blur z-10">
        <div className="mx-auto max-w-[760px] px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="text-sm text-[var(--color-fg-2)]">
            Held in escrow ·{" "}
            <span className="font-mono text-[var(--color-accent)] text-base">
              {formatUsd(offer.price)}
            </span>
          </div>
          {method === "apple" ? (
            <button
              onClick={pay}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-black px-8 py-3 text-[15px] font-semibold active:scale-[0.99] transition-transform"
            >
              <AppleLogo className="h-4 w-4" />
              Pay into escrow
            </button>
          ) : (
            <Button size="lg" onClick={pay} disabled={cardProcessing} className="gap-2">
              {cardProcessing
                ? "Confirming…"
                : method === "crypto"
                  ? `I've sent ${coinAmount} ${selectedCoin.id}`
                  : `Pay ${formatUsd(offer.price)} into escrow`}
            </Button>
          )}
        </div>
      </div>

      <ApplePaySheet
        open={sheetOpen}
        amount={offer.price}
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

function DetailRow({
  icon: Icon,
  value,
}: {
  icon: React.ElementType;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5 text-sm">
      <Icon className="h-4 w-4 text-[var(--color-accent)] shrink-0" />
      <span className="text-[var(--color-fg-2)]">{value}</span>
    </div>
  );
}

function EscrowSuccess({
  offerId,
  broker,
  operator,
  amount,
}: {
  offerId: string;
  broker: string;
  operator: string;
  amount: number;
}) {
  const rows = [
    `${formatUsd(amount)} received & held safely in Voyex escrow`,
    `${broker} and ${operator} have been notified`,
    "Your broker or the operator will reach out shortly to finalise the details",
    "Funds are only released once your aircraft is confirmed",
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
          Payment secured in escrow
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
        <Button asChild size="lg" className="gap-2">
          <Link href={`/client/trip?offer=${offerId}`}>
            View your trip
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
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
