import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PageContainer } from "@/components/voyex/page-header";
import { QuoteCard } from "@/components/voyex/quote-card";
import { TrustBrief } from "@/components/voyex/trust-brief";
import { tripRequest, formatUsd } from "@/lib/mock-data";

export default function TripRequestPage() {
  const received = tripRequest.quotes.filter((q) => q.status === "received").length;
  const pending = tripRequest.quotes.filter((q) => q.status === "pending").length;

  return (
    <PageContainer>
      <div className="flex gap-10 items-start">
        <div className="flex-1 min-w-0 space-y-8">
          <header>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-2xl text-[var(--color-fg)] tracking-tight">
                {tripRequest.id}
              </span>
              <span className="inline-flex items-center gap-2 px-2.5 py-1 border border-[rgba(245,158,11,0.3)] bg-[rgba(245,158,11,0.06)] rounded-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-warn)] amber-pulse" />
                <span className="text-xs text-[var(--color-warn)] uppercase tracking-[0.14em]">
                  {tripRequest.statusLabel}
                </span>
              </span>
              <Badge variant="gold">
                {tripRequest.client} — {tripRequest.clientTier}
              </Badge>
            </div>
            <div className="mt-3 text-sm text-[var(--color-fg-2)]">
              {tripRequest.booker}, {tripRequest.bookerRole} · created{" "}
              {tripRequest.createdAgo}
            </div>
          </header>

          <Card>
            <div className="px-7 py-6">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-baseline gap-4 font-mono text-2xl tracking-tight text-[var(--color-fg)]">
                  <span>
                    {tripRequest.fromCode}
                    <span className="text-[var(--color-fg-3)] text-base ml-2">
                      {tripRequest.fromIcao}
                    </span>
                  </span>
                  <ArrowRight className="h-5 w-5 text-[var(--color-accent)]" />
                  <span>
                    {tripRequest.toCode}
                    <span className="text-[var(--color-fg-3)] text-base ml-2">
                      {tripRequest.toIcao}
                    </span>
                  </span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 text-sm">
                <div className="text-[var(--color-fg-2)]">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)] block mb-1">
                    Date
                  </span>
                  {tripRequest.dateLabel}
                </div>
                <div className="text-[var(--color-fg-2)]">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)] block mb-1">
                    Passengers
                  </span>
                  {tripRequest.pax} · {tripRequest.aircraftPref}
                </div>
                <div className="text-[var(--color-fg-2)]">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)] block mb-1">
                    Special requirements
                  </span>
                  {tripRequest.catering} · {tripRequest.groundTransport}
                </div>
                <div className="text-[var(--color-fg-2)]">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)] block mb-1">
                    Budget guidance
                  </span>
                  <span className="font-mono text-[var(--color-fg)]">
                    {formatUsd(tripRequest.budgetMin)} –{" "}
                    {formatUsd(tripRequest.budgetMax)}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <section className="space-y-4">
            <div className="flex items-baseline justify-between">
              <h2 className="text-sm uppercase tracking-[0.18em] text-[var(--color-fg-3)]">
                Operator Quotes
                <span className="ml-3 text-[var(--color-fg-2)] normal-case tracking-normal">
                  {received} received · {pending} pending
                </span>
              </h2>
            </div>
            <Separator />

            <div className="space-y-4 pt-1">
              {tripRequest.quotes.map((q, i) => (
                <QuoteCard key={q.id} quote={q} index={i} />
              ))}
            </div>
          </section>
        </div>

        <TrustBrief />
      </div>
    </PageContainer>
  );
}
