"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { PageContainer } from "@/components/voyex/page-header";
import { PageHeading } from "@/components/voyex/page-heading";

export interface NotificationOption {
  id: string;
  label: string;
  desc: string;
  on: boolean;
}

export interface SettingsViewProps {
  eyebrow: string;
  profile: { name: string; role: string; email: string; org: string };
  notifications: NotificationOption[];
  workspace: { label: string; value: string }[];
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)] mb-1.5">
        {label}
      </div>
      <div className="text-sm text-[var(--color-fg)]">{value}</div>
    </div>
  );
}

export function SettingsView({
  eyebrow,
  profile,
  notifications,
  workspace,
}: SettingsViewProps) {
  const [notifs, setNotifs] = useState(
    Object.fromEntries(notifications.map((n) => [n.id, n.on]))
  );

  return (
    <PageContainer>
      <PageHeading
        eyebrow={eyebrow}
        title="Settings"
        sub="Manage your profile, notifications, and preferences"
      />

      <div className="max-w-[720px] space-y-6">
        <Card>
          <div className="px-6 py-5">
            <h2 className="text-sm uppercase tracking-[0.18em] text-[var(--color-fg-3)] mb-5">
              Profile
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              <Field label="Name" value={profile.name} />
              <Field label="Role" value={profile.role} />
              <Field label="Email" value={profile.email} />
              <Field label="Organisation" value={profile.org} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="px-6 py-5">
            <h2 className="text-sm uppercase tracking-[0.18em] text-[var(--color-fg-3)] mb-2">
              Notifications
            </h2>
            <div className="divide-y divide-[var(--color-border)]">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="flex items-center justify-between gap-6 py-4"
                >
                  <div className="min-w-0">
                    <div className="text-sm text-[var(--color-fg)]">
                      {n.label}
                    </div>
                    <div className="text-xs text-[var(--color-fg-3)] mt-0.5">
                      {n.desc}
                    </div>
                  </div>
                  <Switch
                    checked={notifs[n.id]}
                    onCheckedChange={(v) =>
                      setNotifs((prev) => ({ ...prev, [n.id]: v }))
                    }
                    aria-label={n.label}
                  />
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="px-6 py-5">
            <h2 className="text-sm uppercase tracking-[0.18em] text-[var(--color-fg-3)] mb-5">
              Preferences
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              {workspace.map((w) => (
                <Field key={w.label} label={w.label} value={w.value} />
              ))}
            </div>
            <Separator className="my-5" />
            <p className="text-xs text-[var(--color-fg-3)]">
              Investor demo · settings are illustrative and not yet saved.
            </p>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
