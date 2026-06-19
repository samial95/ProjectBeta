import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PageContainer } from "@/components/voyex/page-header";
import { TrustBrief } from "@/components/voyex/trust-brief";
import { SlaCountdown } from "@/components/voyex/sla-countdown";
import { TripChat } from "@/components/voyex/client/trip/trip-chat";
import { SelfVault } from "@/components/voyex/shared/self-vault";
import { BrokerOfferComposer } from "@/components/voyex/broker/offer-composer";
import { tripRequest, formatUsd } from "@/lib/mock-data";

const TRAVELLER_QUICK_REPLIES = [
  { q: "I'll send our best aircraft options shortly", a: "Perfect, thank you." },
  {
    q: "Confirming halal catering + child seats",
    a: "Yes please, and ground transport to Mayfair.",
  },
  { q: "I can hold a Global 7500 for you", a: "That sounds ideal." },
  { q: "Sending our all-in offer now", a: "Great — we'll review and confirm." },
];

export default function TripRequestPage() {
  const bookerInitials = tripRequest.booker
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <PageContainer>
      <div className="flex flex-col xl:flex-row gap-8 xl:gap-10 items-start">
        <div className="flex-1 min-w-0 w-full space-y-6">
          <header>
            <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Trip request · direct from traveller
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <span className="font-mono text-2xl text-[var(--color-fg)] tracking-tight">
                {tripRequest.id}
              </span>
              <Badge variant="gold">
                {tripRequest.client} — {tripRequest.clientTier}
              </Badge>
            </div>
            <div className="mt-2 text-sm text-[var(--color-fg-2)]">
              {tripRequest.booker}, {tripRequest.bookerRole} · created{" "}
              {tripRequest.createdAgo}
            </div>
          </header>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-[var(--color-fg)]">
              <Clock className="h-4 w-4 text-[var(--color-accent)]" />
              Respond directly to the traveller within 1 hour
            </div>
            <SlaCountdown seconds={2820} capMinutes={60} />
          </div>

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

          <BrokerOfferComposer
            budgetMin={tripRequest.budgetMin}
            budgetMax={tripRequest.budgetMax}
            client={tripRequest.client}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="mb-3 text-sm uppercase tracking-[0.18em] text-[var(--color-fg-3)]">
                Conversation with the traveller
              </h2>
              <TripChat
                name={tripRequest.booker}
                initials={bookerInitials}
                role={tripRequest.bookerRole}
                company={tripRequest.client}
                greeting={`Hi Sarah — we'd like ${tripRequest.fromCode} to ${tripRequest.toCode} on the 14th, ${tripRequest.pax} guests, ${tripRequest.aircraftPref}. Can Atlas put something together?`}
                quickReplies={TRAVELLER_QUICK_REPLIES}
              />
            </div>
            <div>
              <h2 className="mb-3 text-sm uppercase tracking-[0.18em] text-[var(--color-fg-3)]">
                Shared documents
              </h2>
              <SelfVault
                counterparty={tripRequest.client}
                myDocs={[
                  {
                    id: "agreement",
                    name: "Draft charter agreement",
                    meta: "Ready to send",
                  },
                  { id: "quote", name: "All-in quote (PDF)", meta: "Prepared" },
                ]}
                theirDocs={[
                  {
                    id: "pax",
                    name: "Passports · 6 adults + 2 children",
                    meta: "Provided by traveller",
                  },
                  {
                    id: "kyc",
                    name: "KYC · Westbourne Family Office",
                    meta: "Verified",
                  },
                ]}
              />
            </div>
          </div>
        </div>

        <TrustBrief />
      </div>
    </PageContainer>
  );
}
