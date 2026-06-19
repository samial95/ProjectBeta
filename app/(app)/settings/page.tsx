import { SettingsView } from "@/components/voyex/settings-view";
import { BROKER_SESSION } from "@/lib/session";

export default function SettingsPage() {
  return (
    <SettingsView
      eyebrow="Broker workspace"
      profile={{
        name: BROKER_SESSION.name,
        role: BROKER_SESSION.subtitle,
        email: BROKER_SESSION.email,
        org: BROKER_SESSION.org,
      }}
      notifications={[
        {
          id: "quotes",
          label: "New operator quotes",
          desc: "Alert me the moment an operator responds to a request.",
          on: true,
        },
        {
          id: "principals",
          label: "Principal messages",
          desc: "Messages from your VIP principals and family offices.",
          on: true,
        },
        {
          id: "sla",
          label: "Operator SLA breaches",
          desc: "When an operator misses the quote response window.",
          on: true,
        },
        {
          id: "summary",
          label: "Weekly performance summary",
          desc: "A Monday digest of bookings, value, and win rate.",
          on: false,
        },
      ]}
      workspace={[
        { label: "Default currency", value: "USD ($)" },
        { label: "Timezone", value: "GST (UTC+4)" },
        { label: "Quote response target", value: "10 minutes" },
        { label: "Escrow account", value: "Voyex Escrow · VX-7-291" },
      ]}
    />
  );
}
