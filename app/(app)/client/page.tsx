import Link from "next/link";
import { Plus, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/voyex/page-header";
import { OfferCard } from "@/components/voyex/client/offer-card";
import { customerRequest, brokerOffers } from "@/lib/customer-data";
import { formatUsd } from "@/lib/mock-data";

export default function ClientTripsPage() {
  const prices = brokerOffers.map((o) => o.price);
  const low = Math.min(...prices);
  const high = Math.max(...prices);

  return (
    <PageContainer>
      <header className="mb-8 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
            My Trips
          </div>
          <h1 className="mt-1 font-serif text-[32px] leading-tight text-white">
            Compare your offers
          </h1>
          <p className="mt-2 text-sm text-[var(--color-fg-2)]">
            {customerRequest.offerCount} brokers responded to your request ·
            prices from{" "}
            <span className="font-mono text-[var(--color-fg)]">
              {formatUsd(low)}
            </span>{" "}
            to{" "}
            <span className="font-mono text-[var(--color-fg)]">
              {formatUsd(high)}
            </span>
          </p>
        </div>
        <Button asChild variant="ghost" className="gap-2">
          <Link href="/client/request">
            <Plus className="h-4 w-4" />
            New request
          </Link>
        </Button>
      </header>

      {/* Request summary */}
      <Card className="mb-8">
        <div className="px-6 py-5 flex flex-wrap items-center gap-x-8 gap-y-4">
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-[var(--color-accent)]" />
            <div className="font-mono text-lg text-white">
              {customerRequest.fromCode}
              <span className="text-[var(--color-fg-3)] mx-2">→</span>
              {customerRequest.toCode}
            </div>
            <Badge variant="info" className="ml-1">
              {customerRequest.statusLabel}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
                When
              </div>
              <div className="text-[var(--color-fg-2)] mt-0.5">
                {customerRequest.dateLabel}
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
                Who
              </div>
              <div className="text-[var(--color-fg-2)] mt-0.5">
                {customerRequest.pax}
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
                Preferences
              </div>
              <div className="text-[var(--color-fg-2)] mt-0.5">
                {customerRequest.cabinPref}
              </div>
            </div>
          </div>

          <div className="ml-auto text-[11px] text-[var(--color-fg-3)] font-mono">
            {customerRequest.id} · {customerRequest.createdAgo}
          </div>
        </div>
      </Card>

      {/* Offers grid */}
      <div className="mb-4">
        <h2 className="text-sm uppercase tracking-[0.18em] text-[var(--color-fg-3)]">
          Offers
          <span className="ml-3 text-[var(--color-fg-2)] normal-case tracking-normal">
            direct from brokers &amp; operators · tap to compare · select one to continue
          </span>
        </h2>
        <p className="mt-1 text-xs text-[var(--color-fg-3)]">
          Operators respond within 30 minutes · brokers within 1 hour.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
        {brokerOffers.map((offer, i) => (
          <OfferCard key={offer.id} offer={offer} index={i} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-[var(--color-fg-3)]">
          All brokers are vetted by Voyex. Your payment is held in escrow and
          fully protected until your aircraft is confirmed.
        </p>
      </div>
    </PageContainer>
  );
}
