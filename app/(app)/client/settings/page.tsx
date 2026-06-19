import { SettingsView } from "@/components/voyex/settings-view";
import { CUSTOMER_SESSION } from "@/lib/session";

export default function ClientSettingsPage() {
  return (
    <SettingsView
      eyebrow="Traveler"
      profile={{
        name: CUSTOMER_SESSION.name,
        role: CUSTOMER_SESSION.subtitle,
        email: CUSTOMER_SESSION.email,
        org: CUSTOMER_SESSION.org,
      }}
      notifications={[
        {
          id: "offers",
          label: "New broker offers",
          desc: "Alert me when brokers respond to my trip request.",
          on: true,
        },
        {
          id: "trip",
          label: "Trip updates",
          desc: "Crew, catering, and ground transport confirmations.",
          on: true,
        },
        {
          id: "escrow",
          label: "Escrow & payments",
          desc: "Receipts and updates on funds held in escrow.",
          on: true,
        },
        {
          id: "offers_digest",
          label: "Travel inspiration",
          desc: "Occasional curated destinations and empty-leg deals.",
          on: false,
        },
      ]}
      workspace={[
        { label: "Default currency", value: "USD ($)" },
        { label: "Home airport", value: "Dubai · DXB" },
        { label: "Preferred cabin", value: "Ultra-long-range" },
        { label: "Catering preference", value: "Halal · no shellfish" },
      ]}
    />
  );
}
