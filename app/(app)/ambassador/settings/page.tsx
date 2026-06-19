import { SettingsView } from "@/components/voyex/settings-view";
import { AMBASSADOR_SESSION } from "@/lib/session";
import { ambassadorProfile } from "@/lib/ambassador-data";

export default function AmbassadorSettingsPage() {
  return (
    <SettingsView
      eyebrow="Ambassador"
      profile={{
        name: AMBASSADOR_SESSION.name,
        role: AMBASSADOR_SESSION.subtitle,
        email: AMBASSADOR_SESSION.email,
        org: AMBASSADOR_SESSION.org,
      }}
      notifications={[
        {
          id: "signup",
          label: "New referral sign-up",
          desc: "When someone joins Voyex with your code or link.",
          on: true,
        },
        {
          id: "flight",
          label: "Referral flight booked",
          desc: "When a referred traveller books a flight and royalty accrues.",
          on: true,
        },
        {
          id: "payout",
          label: "Payout sent",
          desc: "When a royalty payout is paid to your account.",
          on: true,
        },
        {
          id: "tips",
          label: "Growth tips",
          desc: "Occasional ideas to grow your referrals.",
          on: false,
        },
      ]}
      workspace={[
        { label: "Referral code", value: ambassadorProfile.code },
        { label: "Royalty rate", value: "1.5% of every flight" },
        { label: "Payout method", value: "Bank transfer · monthly" },
        { label: "Tier", value: ambassadorProfile.tier },
      ]}
    />
  );
}
