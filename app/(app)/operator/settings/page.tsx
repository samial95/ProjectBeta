import { SettingsView } from "@/components/voyex/settings-view";
import { OPERATOR_SESSION } from "@/lib/session";
import { operatorProfile } from "@/lib/operator-data";

export default function OperatorSettingsPage() {
  return (
    <SettingsView
      eyebrow="Operator workspace"
      profile={{
        name: OPERATOR_SESSION.name,
        role: OPERATOR_SESSION.subtitle,
        email: OPERATOR_SESSION.email,
        org: OPERATOR_SESSION.org,
      }}
      notifications={[
        {
          id: "rfqs",
          label: "Inbound RFQs",
          desc: "Alert me when a new charter request matches my fleet.",
          on: true,
        },
        {
          id: "won",
          label: "Quote accepted",
          desc: "When a broker accepts one of my quotes.",
          on: true,
        },
        {
          id: "expiring",
          label: "Expiring availability",
          desc: "When an aircraft's availability window is about to close.",
          on: true,
        },
        {
          id: "digest",
          label: "Weekly performance digest",
          desc: "A Monday summary of win rate and utilization.",
          on: false,
        },
      ]}
      workspace={[
        { label: "AOC", value: operatorProfile.aocId },
        { label: "Base", value: operatorProfile.base },
        { label: "Fleet size", value: `${operatorProfile.fleetSize} aircraft` },
        { label: "Safety rating", value: operatorProfile.rating },
      ]}
    />
  );
}
