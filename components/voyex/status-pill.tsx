import { Badge } from "@/components/ui/badge";
import type { BookingRow } from "@/lib/extra-data";

const MAP: Record<
  BookingRow["status"],
  { label: string; variant: "gold" | "ok" | "warn" | "info" | "default" }
> = {
  confirmed: { label: "Confirmed", variant: "gold" },
  in_flight: { label: "In flight", variant: "info" },
  scheduled: { label: "Scheduled", variant: "warn" },
  completed: { label: "Completed", variant: "default" },
};

export function BookingStatus({ status }: { status: BookingRow["status"] }) {
  const s = MAP[status];
  return <Badge variant={s.variant}>{s.label}</Badge>;
}
