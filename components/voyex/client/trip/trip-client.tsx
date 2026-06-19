"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Lock,
  Users,
  Navigation,
  Gauge,
  Wifi,
  Plane,
  Car,
  UtensilsCrossed,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatUsd } from "@/lib/mock-data";
import { brokerOffers, offerById, customerRequest } from "@/lib/customer-data";
import { TripChat } from "@/components/voyex/client/trip/trip-chat";
import { TripVault, type VaultDoc } from "@/components/voyex/client/trip/trip-vault";

const TRAVELER_DOCS: VaultDoc[] = [
  { id: "pp-lead", name: "Passport · Catherine Westbourne", meta: "Lead passenger" },
  { id: "pp-guests", name: "Passports · 5 additional guests", meta: "Accompanying travellers" },
  { id: "insurance", name: "Travel insurance certificate", meta: "Optional but recommended" },
];

const COUNTERPARTY_DOCS: VaultDoc[] = [
  { id: "charter", name: "Charter agreement", meta: "Ready for your signature" },
  { id: "airworthiness", name: "Aircraft airworthiness certificate", meta: "Valid through 2027" },
  { id: "op-insurance", name: "Operator insurance certificate", meta: "$300M liability cover" },
  { id: "crew", name: "Crew licences & medicals", meta: "Captain + 2 cabin crew" },
];

export function TripClient() {
  const params = useSearchParams();
  const offerId = params.get("offer") ?? brokerOffers[0].id;
  const offer = offerById(offerId) ?? brokerOffers[0];

  const [uploaded, setUploaded] = useState<string[]>([]);
  const docsComplete = TRAVELER_DOCS.every((d) => uploaded.includes(d.id));

  const contact =
    offer.verifiedType === "broker"
      ? {
          kind: "broker" as const,
          label: "Broker",
          company: offer.broker,
          name: "Sarah Chen",
          initials: "SC",
          role: "Senior Broker",
        }
      : {
          kind: "operator" as const,
          label: "Operator",
          company: offer.operator,
          name: "Rashid Al Maktoum",
          initials: "RM",
          role: "Head of Charter Sales",
        };

  const stages = [
    { label: "Payment secured", desc: "Funds held safely in escrow" },
    {
      label: `${contact.label} assigned`,
      desc: `${contact.name} · ${contact.company}`,
    },
    {
      label: "Documents shared",
      desc: "Passports & traveller details in the vault",
    },
    {
      label: "Aircraft & crew confirmed",
      desc: "Tail, captain and cabin crew locked in",
    },
    { label: "Pre-flight briefing", desc: "Itinerary & timings at T-24h" },
    { label: "Departure day", desc: "Ground transport & private terminal" },
    { label: "In flight", desc: "Live trip updates en route" },
    { label: "Trip complete", desc: `Escrow released to ${contact.company}` },
  ];
  const current = docsComplete ? 3 : 2;

  return (
    <div className="mx-auto max-w-[1100px] px-6 py-10">
      <Link
        href="/client"
        className="mb-6 inline-flex items-center gap-1.5 text-xs text-[var(--color-fg-3)] transition-colors hover:text-[var(--color-fg)]"
      >
        <ArrowLeft className="h-3 w-3" />
        My trips
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Your trip
          </div>
          <h1 className="mt-1 font-serif text-[32px] leading-tight text-white">
            {customerRequest.fromCity} → {customerRequest.toCity}
          </h1>
          <div className="mt-2 text-sm text-[var(--color-fg-2)]">
            {customerRequest.dateLabel} · {offer.aircraft}
          </div>
        </div>
        <div className="text-right">
          <Badge variant="ok" className="gap-1.5">
            <Lock className="h-3 w-3" />
            {formatUsd(offer.price)} in escrow
          </Badge>
          <div className="mt-2 font-mono text-xs text-[var(--color-fg-3)]">
            {customerRequest.id}
          </div>
        </div>
      </div>

      {/* Journey timeline */}
      <Card className="mt-8">
        <div className="px-6 py-6">
          <h2 className="mb-5 text-sm uppercase tracking-[0.18em] text-[var(--color-fg-3)]">
            Your journey
          </h2>
          <ol className="relative">
            {stages.map((s, i) => {
              const done = i < current;
              const active = i === current;
              const last = i === stages.length - 1;
              return (
                <li key={s.label} className="flex gap-4 pb-6 last:pb-0">
                  <div className="relative flex flex-col items-center">
                    <span
                      className={cn(
                        "z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 transition-colors",
                        done &&
                          "border-[var(--color-ok)] bg-[var(--color-ok)] text-[#0e2a16]",
                        active &&
                          "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]",
                        !done &&
                          !active &&
                          "border-[var(--color-border)] text-[var(--color-fg-3)]"
                      )}
                    >
                      {done ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <span className="text-[11px] font-mono">{i + 1}</span>
                      )}
                    </span>
                    {!last && (
                      <span
                        className={cn(
                          "absolute top-7 h-full w-[2px]",
                          done
                            ? "bg-[var(--color-ok)]"
                            : "bg-[var(--color-border)]"
                        )}
                      />
                    )}
                  </div>
                  <div className="pt-0.5">
                    <div
                      className={cn(
                        "text-sm",
                        active ? "text-white font-medium" : "text-[var(--color-fg)]"
                      )}
                    >
                      {s.label}
                      {active && (
                        <span className="ml-2 rounded-full bg-[var(--color-accent-soft)] px-2 py-0.5 text-[10px] uppercase tracking-wide text-[var(--color-accent)]">
                          {i === 2 ? "Action needed" : "In progress"}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[var(--color-fg-3)] mt-0.5">
                      {s.desc}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Card>

      {/* Chat + Vault */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-3 text-sm uppercase tracking-[0.18em] text-[var(--color-fg-3)]">
            Chat with your {contact.label.toLowerCase()}
          </h2>
          <TripChat
            name={contact.name}
            initials={contact.initials}
            role={contact.role}
            company={contact.company}
          />
        </div>
        <div>
          <h2 className="mb-3 text-sm uppercase tracking-[0.18em] text-[var(--color-fg-3)]">
            Shared documents
          </h2>
          <TripVault
            counterparty={contact.company}
            travelerDocs={TRAVELER_DOCS}
            counterpartyDocs={COUNTERPARTY_DOCS}
            uploaded={uploaded}
            onUpload={(id) =>
              setUploaded((prev) =>
                prev.includes(id) ? prev : [...prev, id]
              )
            }
          />
        </div>
      </div>

      {/* Flight details */}
      <Card className="mt-6 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-56 md:h-auto md:min-h-[320px]">
            <Image
              src={offer.image}
              alt={offer.aircraft}
              fill
              sizes="(max-width: 768px) 100vw, 550px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,9,34,0.85)] to-transparent md:bg-gradient-to-r" />
            <div className="absolute bottom-4 left-5">
              <div className="text-lg font-medium text-white">{offer.aircraft}</div>
              <div className="flex items-center gap-1.5 text-xs text-white/75">
                {offer.operator}
                <span className="inline-flex items-center gap-1 text-[var(--color-ok)]">
                  <ShieldCheck className="h-3 w-3" />
                  Verified operator
                </span>
              </div>
            </div>
          </div>

          <div className="px-6 py-6">
            <h2 className="mb-4 text-sm uppercase tracking-[0.18em] text-[var(--color-fg-3)]">
              Flight & crew
            </h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <Detail icon={Users} value={offer.specs.passengers} />
              <Detail icon={Navigation} value={offer.specs.range} />
              <Detail icon={Gauge} value={offer.specs.speed} />
              <Detail icon={Wifi} value={offer.specs.wifi} />
            </div>

            <div className="my-5 h-px bg-[var(--color-border)]" />

            <div className="space-y-3">
              <Detail icon={Plane} value="Capt. A. Voss · 9,200 hrs · type-rated" />
              <Detail icon={MapPin} value="Depart: Al Maktoum (DWC) private terminal" />
              <Detail icon={Car} value="Arrival car: Mercedes S-Class to Mayfair" />
              <Detail
                icon={UtensilsCrossed}
                value="Catering: halal, no shellfish · vegetarian added"
              />
              <Detail icon={Phone} value="24/7 Voyex trip desk: +44 20 3514 0000" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function Detail({
  icon: Icon,
  value,
}: {
  icon: React.ElementType;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5 text-sm">
      <Icon className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
      <span className="text-[var(--color-fg-2)]">{value}</span>
    </div>
  );
}
