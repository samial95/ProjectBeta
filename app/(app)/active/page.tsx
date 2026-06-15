import { Card } from "@/components/ui/card";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { PageContainer } from "@/components/voyex/page-header";
import { PageHeading } from "@/components/voyex/page-heading";
import { BookingStatus } from "@/components/voyex/status-pill";
import { brokerBookings } from "@/lib/extra-data";
import { formatUsd } from "@/lib/mock-data";

export default function ActiveBookingsPage() {
  const live = brokerBookings.filter(
    (b) => b.status === "confirmed" || b.status === "in_flight" || b.status === "scheduled"
  ).length;

  return (
    <PageContainer>
      <PageHeading
        eyebrow="Broker workspace"
        title="Active Bookings"
        sub={`${live} live · ${brokerBookings.length} total this month`}
      />
      <Card className="overflow-hidden">
        <Table>
          <THead>
            <TR>
              <TH className="pl-6">Trip</TH>
              <TH>Principal</TH>
              <TH>Route</TH>
              <TH>Date</TH>
              <TH>Aircraft</TH>
              <TH>Operator</TH>
              <TH className="text-right">Value</TH>
              <TH className="pr-6">Status</TH>
            </TR>
          </THead>
          <TBody>
            {brokerBookings.map((b) => (
              <TR key={b.id} className="last:border-b-0">
                <TD className="pl-6 font-mono text-[13px] text-white">{b.id}</TD>
                <TD className="text-sm text-[var(--color-fg)]">{b.principal}</TD>
                <TD className="font-mono text-[13px] text-[var(--color-fg-2)]">
                  {b.route}
                </TD>
                <TD className="font-mono text-[12px] text-[var(--color-fg-2)]">
                  {b.date}
                </TD>
                <TD className="text-sm text-[var(--color-fg-2)]">{b.aircraft}</TD>
                <TD className="text-sm text-[var(--color-fg-2)]">{b.operator}</TD>
                <TD className="font-mono text-[13px] text-white text-right">
                  {formatUsd(b.price)}
                </TD>
                <TD className="pr-6">
                  <BookingStatus status={b.status} />
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </Card>
    </PageContainer>
  );
}
