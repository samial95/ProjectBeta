import Link from "next/link";
import Image from "next/image";
import { Plane, MapPin, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/voyex/page-header";
import { PageHeading } from "@/components/voyex/page-heading";

const SAVED_AIRCRAFT = [
  {
    name: "Bombardier Global 7500",
    operator: "Sovereign Jet Partners",
    image: "/fleet/ultra-long-range.jpg",
    note: "Up to 14 guests · 7,700 nm range",
  },
  {
    name: "Gulfstream G650ER",
    operator: "Crescent Aviation",
    image: "/fleet/vip-airliner.jpg",
    note: "Up to 14 guests · 7,500 nm range",
  },
  {
    name: "Dassault Falcon 8X",
    operator: "Meridian Charter Group",
    image: "/fleet/heavy.jpg",
    note: "Up to 12 guests · 6,450 nm range",
  },
];

const SAVED_ROUTES = [
  "Dubai (DXB) → London (LTN)",
  "London (LCY) → Geneva (GVA)",
  "Dubai (DXB) → Maldives (MLE)",
];

export default function SavedPage() {
  return (
    <PageContainer>
      <PageHeading
        eyebrow="Traveler"
        title="Saved"
        sub="Aircraft and routes you've saved for next time"
        right={
          <Button asChild size="md" className="gap-2">
            <Link href="/client/request">
              New request
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-[var(--color-fg-3)]">
          <Plane className="h-4 w-4" />
          Saved aircraft
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SAVED_AIRCRAFT.map((a) => (
            <Card key={a.name} className="overflow-hidden flex flex-col">
              <div className="relative h-40 w-full">
                <Image
                  src={a.image}
                  alt={a.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,9,34,0.85)] to-transparent" />
              </div>
              <div className="px-5 py-4 flex-1 flex flex-col">
                <div className="text-sm text-white font-medium">{a.name}</div>
                <div className="text-xs text-[var(--color-fg-3)] mt-0.5">
                  {a.operator}
                </div>
                <div className="text-xs text-[var(--color-fg-2)] mt-2">
                  {a.note}
                </div>
                <Button asChild variant="ghost" size="sm" className="mt-4 w-full">
                  <Link href="/client/request">Request this jet</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-[var(--color-fg-3)]">
          <MapPin className="h-4 w-4" />
          Saved routes
        </h2>
        <div className="flex flex-wrap gap-3">
          {SAVED_ROUTES.map((r) => (
            <Link
              key={r}
              href="/client/request"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-fg-2)] transition-colors hover:border-[var(--color-accent-border)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-fg)]"
            >
              <MapPin className="h-3.5 w-3.5 text-[var(--color-accent)]" />
              {r}
            </Link>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
