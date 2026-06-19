import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, EyeOff, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PageContainer } from "@/components/voyex/page-header";
import { QuotePanel } from "@/components/voyex/operator/quote-panel";
import { SlaCountdown } from "@/components/voyex/sla-countdown";
import { TripChat } from "@/components/voyex/client/trip/trip-chat";
import { SelfVault } from "@/components/voyex/shared/self-vault";
import { getRfqDetail, type InboundRfq } from "@/lib/operator-data";
import { formatUsd } from "@/lib/mock-data";

const DESK_QUICK_REPLIES = [
  {
    q: "Aircraft and crew are confirmed",
    a: "Noted — I've flagged that to the traveller's comparison.",
  },
  {
    q: "Can you confirm catering requirements?",
    a: "Halal, no shellfish, plus child seats at LTN.",
  },
  {
    q: "What's my current rank?",
    a: "You're competitive — sustainability and safety are landing well with this traveller.",
  },
  {
    q: "Share my SAF offering",
    a: "Great — SAF is a strong signal for this traveller.",
  },
];

const STATUS: Record<
  InboundRfq["status"],
  { label: string; variant: "gold" | "ok" | "warn" | "info" | "default" }
> = {
  needs_quote: { label: "Needs quote", variant: "warn" },
  quote_sent: { label: "Quote sent", variant: "info" },
  won: { label: "Won", variant: "ok" },
  lost: { label: "Lost", variant: "default" },
  expired: { label: "Expired", variant: "default" },
};

export default async function OperatorRfqDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rfq = getRfqDetail(id);
  if (!rfq) notFound();

  const status = STATUS[rfq.status];
  const [from, to] = rfq.route.split(" → ");

  return (
    <PageContainer>
      <Link
        href="/operator"
        className="inline-flex items-center gap-1.5 text-xs text-[var(--color-fg-3)] hover:text-[var(--color-fg)] transition-colors mb-6"
      >
        <ArrowLeft className="h-3 w-3" />
        Inbound RFQs
      </Link>

      <header className="flex items-baseline justify-between gap-4 flex-wrap mb-6">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Inbound RFQ · direct from traveller
          </div>
          <div className="mt-1 flex items-center gap-3 flex-wrap">
            <span className="font-mono text-2xl text-[var(--color-fg)]">
              {rfq.id}
            </span>
            <Badge variant={status.variant}>{status.label}</Badge>
            {rfq.rank === 1 && rfq.status === "quote_sent" && (
              <Badge variant="gold">Currently leading</Badge>
            )}
          </div>
          <div className="mt-2 text-sm text-[var(--color-fg-2)] inline-flex items-center gap-2">
            <EyeOff className="h-3.5 w-3.5 text-[var(--color-fg-3)]" />
            <span>
              Traveller identity hidden until you&apos;re selected · {rfq.clientCode}{" "}
              · {rfq.clientTier}
            </span>
          </div>
        </div>
      </header>

      {rfq.status === "needs_quote" && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-[var(--color-fg)]">
            <Clock className="h-4 w-4 text-[var(--color-accent)]" />
            Respond directly to the traveller within 30 minutes
          </div>
          <SlaCountdown seconds={rfq.slaSecondsLeft ?? 1500} capMinutes={30} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="px-7 py-6">
              <div className="flex items-baseline gap-4 font-mono text-2xl tracking-tight text-[var(--color-fg)] flex-wrap">
                <span>{from}</span>
                <ArrowRight className="h-5 w-5 text-[var(--color-accent)]" />
                <span>{to}</span>
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
                    Traveller budget
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
                Traveller signal
              </div>
              <p className="text-sm text-[var(--color-fg-2)]">{rfq.clientNote}</p>
            </div>
          </Card>

          <QuotePanel rfq={rfq} />
        </div>

        <aside className="space-y-3">
          <Card>
            <div className="px-5 py-4">
              <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
                Timing
              </div>
              <div className="mt-3 space-y-2 font-mono text-[12px]">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[var(--color-fg-3)]">Received</span>
                  <span className="text-[var(--color-fg-2)]">
                    {rfq.receivedAgo}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[var(--color-fg-3)]">Travel date</span>
                  <span className="text-[var(--color-fg)]">
                    {rfq.bidWindowCloses}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[var(--color-fg-3)]">Offers in</span>
                  <span className="text-[var(--color-fg-2)]">
                    {rfq.totalQuotes}
                  </span>
                </div>
                {rfq.responseSeconds != null && (
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[var(--color-fg-3)]">Your response</span>
                    <span className="text-[var(--color-ok)]">
                      {rfq.responseSeconds}s
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Card>
            <div className="px-5 py-4">
              <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
                Competitive position
              </div>
              <p className="text-xs text-[var(--color-fg-2)] mt-3 leading-relaxed">
                Voyex never shares competitor prices. You can see how many
                operators and brokers are responding and where your offer ranks
                in the traveller&apos;s comparison (price, safety, SAF, fit).
              </p>
              <Separator className="my-3" />
              <div className="text-xs text-[var(--color-fg-3)]">
                Your rank updates in real time as offers arrive or get revised.
              </div>
            </div>
          </Card>

          <div className="border border-dashed border-[var(--color-border)] rounded-xl px-5 py-4">
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

      {/* Coordination: conversation + shared documents */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="mb-3 text-sm uppercase tracking-[0.18em] text-[var(--color-fg-3)]">
            Conversation with Voyex desk
          </h2>
          <TripChat
            name="Voyex Trip Desk"
            initials="VX"
            role="Coordination"
            company="Voyex"
            greeting={`Hi — this is the Voyex desk coordinating ${rfq.id}. The traveller is comparing live offers; reply here for anything you need to confirm.`}
            quickReplies={DESK_QUICK_REPLIES}
          />
        </div>
        <div>
          <h2 className="mb-3 text-sm uppercase tracking-[0.18em] text-[var(--color-fg-3)]">
            Shared documents
          </h2>
          <SelfVault
            counterparty="Voyex"
            myDocs={[
              {
                id: "airworthiness",
                name: "Airworthiness certificate",
                meta: "Valid through 2027",
              },
              {
                id: "insurance",
                name: "Operator insurance certificate",
                meta: "$300M liability",
              },
              {
                id: "crew",
                name: "Crew licences & medicals",
                meta: "Captain + 2 cabin crew",
              },
            ]}
            theirDocs={[
              { id: "brief", name: "Trip brief", meta: "Shared by Voyex" },
              {
                id: "pax",
                name: "Traveller passports",
                meta: "Released once you're selected",
              },
            ]}
          />
        </div>
      </div>
    </PageContainer>
  );
}
