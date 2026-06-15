import { Plane } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { PageContainer } from "@/components/voyex/page-header";
import { sovereignFleet, type FleetAircraft } from "@/lib/operator-data";
import { cn } from "@/lib/utils";

const STATUS_STYLE: Record<
  FleetAircraft["status"],
  { label: string; dot: string; text: string }
> = {
  available: {
    label: "Available",
    dot: "bg-[var(--color-ok)]",
    text: "text-[var(--color-ok)]",
  },
  in_flight: {
    label: "In flight",
    dot: "bg-[var(--color-info)]",
    text: "text-[var(--color-info)]",
  },
  scheduled: {
    label: "Scheduled",
    dot: "bg-[var(--color-accent)]",
    text: "text-[var(--color-accent)]",
  },
  maintenance: {
    label: "Maintenance",
    dot: "bg-[var(--color-warn)]",
    text: "text-[var(--color-warn)]",
  },
};

export default function FleetPage() {
  const counts = sovereignFleet.reduce<Record<FleetAircraft["status"], number>>(
    (acc, a) => {
      acc[a.status] = (acc[a.status] ?? 0) + 1;
      return acc;
    },
    { available: 0, in_flight: 0, scheduled: 0, maintenance: 0 }
  );

  return (
    <PageContainer>
      <header className="mb-8">
        <div className="flex items-baseline justify-between gap-4 flex-wrap">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-3)]">
              Fleet
            </div>
            <h1 className="font-serif text-[28px] leading-tight text-[var(--color-fg)] mt-1 flex items-center gap-3">
              <Plane className="h-5 w-5 text-[var(--color-accent)]" />
              {sovereignFleet.length} aircraft
            </h1>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {(
              Object.entries(STATUS_STYLE) as [
                FleetAircraft["status"],
                (typeof STATUS_STYLE)[FleetAircraft["status"]],
              ][]
            ).map(([key, s]) => (
              <Badge key={key} variant="outline" className="gap-1.5">
                <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
                <span className="font-mono normal-case tracking-normal text-[11px]">
                  {counts[key] ?? 0}
                </span>
                <span>{s.label}</span>
              </Badge>
            ))}
          </div>
        </div>
      </header>

      <Separator className="mb-2" />

      <div className="border border-[var(--color-border)] bg-[var(--color-surface)] rounded-sm overflow-hidden">
        <Table>
          <THead>
            <TR>
              <TH className="pl-6">Tail</TH>
              <TH>Aircraft</TH>
              <TH>Year · hrs</TH>
              <TH>Location</TH>
              <TH>Next maintenance</TH>
              <TH className="pr-6">Status</TH>
            </TR>
          </THead>
          <TBody>
            {sovereignFleet.map((a) => {
              const s = STATUS_STYLE[a.status];
              return (
                <TR key={a.tail} className="last:border-b-0">
                  <TD className="pl-6 font-mono text-[13px] text-[var(--color-fg)]">
                    {a.tail}
                  </TD>
                  <TD className="text-sm text-[var(--color-fg)]">{a.type}</TD>
                  <TD className="font-mono text-[12px] text-[var(--color-fg-2)]">
                    {a.yearBuild} · {a.hoursSinceNew.toLocaleString()}
                  </TD>
                  <TD className="font-mono text-[12px] text-[var(--color-fg-2)]">
                    {a.location}
                  </TD>
                  <TD className="font-mono text-[12px] text-[var(--color-fg-2)]">
                    {a.nextMaintenance}
                  </TD>
                  <TD className="pr-6">
                    <div className={cn("inline-flex items-center gap-2 text-[12px]", s.text)}>
                      <span
                        className={cn("h-1.5 w-1.5 rounded-full", s.dot)}
                      />
                      {s.label}
                    </div>
                    {a.statusNote && (
                      <div className="text-[11px] text-[var(--color-fg-3)] mt-0.5">
                        {a.statusNote}
                      </div>
                    )}
                  </TD>
                </TR>
              );
            })}
          </TBody>
        </Table>
      </div>
    </PageContainer>
  );
}
