import { CreditCard, Lock, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { PageContainer } from "@/components/voyex/page-header";
import { PageHeading } from "@/components/voyex/page-heading";
import { formatUsd } from "@/lib/mock-data";

const TRANSACTIONS: {
  id: string;
  route: string;
  date: string;
  amount: number;
  status: "in_escrow" | "released" | "refunded";
}[] = [
  {
    id: "VYX-2026-0847",
    route: "DXB → LTN",
    date: "14 Mar 2026",
    amount: 94500,
    status: "in_escrow",
  },
  {
    id: "VYX-2025-0712",
    route: "DXB → CDG",
    date: "06 Dec 2025",
    amount: 71800,
    status: "released",
  },
  {
    id: "VYX-2025-0588",
    route: "LTN → JFK",
    date: "18 Sep 2025",
    amount: 134500,
    status: "released",
  },
  {
    id: "VYX-2025-0471",
    route: "DXB → GVA",
    date: "02 Jul 2025",
    amount: 48200,
    status: "refunded",
  },
];

const STATUS: Record<
  (typeof TRANSACTIONS)[number]["status"],
  { label: string; variant: "gold" | "ok" | "info" | "default" }
> = {
  in_escrow: { label: "Held in escrow", variant: "info" },
  released: { label: "Released", variant: "ok" },
  refunded: { label: "Refunded", variant: "default" },
};

export default function PaymentsPage() {
  return (
    <PageContainer>
      <PageHeading
        eyebrow="Traveler"
        title="Payments"
        sub="Your payment methods and escrow history"
      />

      {/* Payment methods */}
      <section className="space-y-4">
        <h2 className="text-sm uppercase tracking-[0.18em] text-[var(--color-fg-3)]">
          Payment methods
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="px-5 py-4 flex items-center gap-3">
            <AppleLogo className="h-6 w-6 text-white" />
            <div>
              <div className="text-sm text-white font-medium">Apple Pay</div>
              <div className="text-xs text-[var(--color-fg-3)]">
                Default method
              </div>
            </div>
            <Badge variant="ok" className="ml-auto">
              Active
            </Badge>
          </Card>

          <Card className="px-5 py-4 flex items-center gap-3">
            <CreditCard className="h-6 w-6 text-[var(--color-fg-2)]" />
            <div>
              <div className="text-sm text-white font-medium">
                Visa ···· 4242
              </div>
              <div className="text-xs text-[var(--color-fg-3)]">
                Expires 03/29
              </div>
            </div>
          </Card>

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--color-border)] px-5 py-4 text-sm text-[var(--color-fg-3)] transition-colors hover:border-[var(--color-accent-border)] hover:text-[var(--color-fg)]"
          >
            <Plus className="h-4 w-4" />
            Add payment method
          </button>
        </div>
      </section>

      {/* Escrow history */}
      <section className="mt-10 space-y-4">
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-[var(--color-ok)]" />
          <h2 className="text-sm uppercase tracking-[0.18em] text-[var(--color-fg-3)]">
            Escrow history
          </h2>
        </div>
        <Card className="overflow-hidden">
          <Table>
            <THead>
              <TR>
                <TH className="pl-6">Trip</TH>
                <TH>Route</TH>
                <TH>Date</TH>
                <TH className="text-right">Amount</TH>
                <TH className="pr-6">Status</TH>
              </TR>
            </THead>
            <TBody>
              {TRANSACTIONS.map((t) => (
                <TR key={t.id} className="last:border-b-0">
                  <TD className="pl-6 font-mono text-[13px] text-white">
                    {t.id}
                  </TD>
                  <TD className="font-mono text-[13px] text-[var(--color-fg-2)]">
                    {t.route}
                  </TD>
                  <TD className="font-mono text-[12px] text-[var(--color-fg-2)]">
                    {t.date}
                  </TD>
                  <TD className="font-mono text-[13px] text-white text-right">
                    {formatUsd(t.amount)}
                  </TD>
                  <TD className="pr-6">
                    <Badge variant={STATUS[t.status].variant}>
                      {STATUS[t.status].label}
                    </Badge>
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </Card>
        <p className="text-xs text-[var(--color-fg-3)]">
          Funds are held by Voyex Escrow and released only once your aircraft is
          confirmed.
        </p>
      </section>
    </PageContainer>
  );
}

function AppleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 384 512" className={className} fill="currentColor" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}
