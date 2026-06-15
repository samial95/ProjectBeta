import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PageContainer } from "@/components/voyex/page-header";
import { QuotePanel } from "@/components/voyex/operator/quote-panel";
import { rfqDetails } from "@/lib/operator-data";
import { formatUsd } from "@/lib/mock-data";

export default async function OperatorRfqDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rfq = rfqDetails[id];
  if (!rfq) notFound();

  return (
    <PageContainer>
      <Link
        href="/operator"
        className="inline-flex items-center gap-1.5 text-xs text-[var(--color-fg-3)] hover:text-[var(--color-fg)] transition-colors mb-6"
      >
        <ArrowLeft className="h-3 w-3" />
        Inbound RFQs
      </Link>

      <header className="flex items-baseline justify-between gap-4 flex-wrap mb-8">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-2xl text-[var(--color-fg)]">
              {rfq.id}
            </span>
            <Badge variant="info">Quote sent</Badge>
            {rfq.rank === 1 && (
              <Badge variant="gold">Currently leading</Badge>
            )}
          </div>
          <div className="mt-2 text-sm text-[var(--color-fg-2)] inline-flex items-center gap-2">
            <EyeOff className="h-3.5 w-3.5 text-[var(--color-fg-3)]" />
            <span>
              Client identity hidden until award · {rfq.clientCode} ·{" "}
              {rfq.clientTier}
            </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="px-7 py-6">
              <div className="flex items-baseline gap-4 font-mono text-2xl tracking-tight text-[var(--color-fg)] flex-wrap">
                <span>{rfq.route.split(" → ")[0]}</span>
                <ArrowRight className="h-5 w-5 text-[var(--color-accent)]" />
                <span>{rfq.route.split(" → ")[1]}</span>
              </div>
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 text-sm">
                <div className="text-[var(--color-fg-2)]">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)] block mb-1">
                    Date
                  </span>
                  {rfq.date}
                </div>
                <div className="text-[var(--color-fg-2)]">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)] block mb-1">
                    Passengers
                  </span>
                  {rfq.pax} · {rfq.aircraftPref}
                </div>
                <div className="text-[var(--color-fg-2)]">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)] block mb-1">
                    Catering &amp; ground
                  </span>
                  {rfq.catering} · {rfq.groundTransport}
                </div>
                <div className="text-[var(--color-fg-2)]">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)] block mb-1">
                    Client budget
                  </span>
                  <span className="font-mono text-[var(--color-fg)]">
                    {formatUsd(rfq.budgetMin)} – {formatUsd(rfq.budgetMax)}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="px-6 py-5">
              <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)] mb-2">
                Client signal
              </div>
              <p className="text-sm text-[var(--color-fg-2)]">
                {rfq.clientNote}
              </p>
            </div>
          </Card>

          <QuotePanel rfq={rfq} />
        </div>

        <aside className="space-y-3">
          <div className="border border-[var(--color-border)] rounded-sm bg-[var(--color-surface)] px-5 py-4">
            <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
              Bid window
            </div>
            <div className="mt-3 space-y-2 font-mono text-[12px]">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[var(--color-fg-3)]">Opened</span>
                <span className="text-[var(--color-fg-2)]">
                  {rfq.bidWindowOpened}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[var(--color-fg-3)]">Closes</span>
                <span className="text-[var(--color-fg)]">
                  {rfq.bidWindowCloses}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[var(--color-fg-3)]">Quotes in</span>
                <span className="text-[var(--color-fg-2)]">
                  {rfq.totalQuotes}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[var(--color-fg-3)]">Your response</span>
                <span className="text-[var(--color-ok)]">
                  {rfq.responseSeconds}s
                </span>
              </div>
            </div>
          </div>

          <div className="border border-[var(--color-border)] rounded-sm bg-[var(--color-surface)] px-5 py-4">
            <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
              Competitive position
            </div>
            <p className="text-xs text-[var(--color-fg-2)] mt-3 leading-relaxed">
              Voyex does not share competitor prices. You can see how many
              operators are bidding and where your quote ranks on broker score
              (price, safety, SAF, fit).
            </p>
            <Separator className="my-3" />
            <div className="text-xs text-[var(--color-fg-3)]">
              Your rank moves in real time as quotes arrive or get revised.
            </div>
          </div>

          <div className="border border-dashed border-[var(--color-border)] rounded-sm px-5 py-4">
            <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
              Auto-revise (off)
            </div>
            <p className="text-xs text-[var(--color-fg-2)] mt-2 leading-relaxed">
              Set a floor and let Voyex automatically rebid down to it if you
              lose the #1 position.
            </p>
          </div>
        </aside>
      </div>
    </PageContainer>
  );
}
