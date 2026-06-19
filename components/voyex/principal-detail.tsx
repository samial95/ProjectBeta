"use client";

import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { TripChat } from "@/components/voyex/client/trip/trip-chat";
import { SelfVault } from "@/components/voyex/shared/self-vault";
import type { VaultDoc } from "@/components/voyex/client/trip/trip-vault";
import { formatUsd } from "@/lib/mock-data";
import type { PrincipalDetail } from "@/types";

const PRINCIPAL_QUICK_REPLIES = [
  { q: "I'll send Geneva options shortly", a: "Wonderful — thank you, Sarah." },
  {
    q: "Are all passenger passports current?",
    a: "Yes, all current — I'll confirm them in the vault.",
  },
  { q: "Same catering as last time?", a: "Yes please — halal, no shellfish." },
  {
    q: "Shall I hold the Global 7500?",
    a: "Please do — the family loved it last time.",
  },
];

const BROKER_DOCS: VaultDoc[] = [
  { id: "master", name: "Master charter agreement", meta: "Signed · renews annually" },
  { id: "policy", name: "Corporate travel policy", meta: "Approval rules on file" },
];

function principalDocs(name: string): VaultDoc[] {
  return [
    { id: "kyc", name: "KYC / source of funds", meta: "Verified" },
    { id: "pp-lead", name: `Passport · ${name}`, meta: "Lead principal" },
    { id: "pp-family", name: "Passports · family & staff", meta: "6 on file" },
  ];
}

function PreferencesSection({ p }: { p: PrincipalDetail }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 py-6 pb-32">
      <Card>
        <CardHeader>
          <CardTitle>Travel preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="divide-y divide-[var(--color-border)]">
            {p.preferences.map((pref) => (
              <div
                key={pref.label}
                className="flex items-baseline justify-between gap-6 py-3"
              >
                <dt className="text-xs text-[var(--color-fg-3)] uppercase tracking-[0.12em]">
                  {pref.label}
                </dt>
                <dd className="text-sm text-[var(--color-fg)] text-right">
                  {pref.value}
                </dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Approval chain</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {p.approval.map((step, i) => (
              <li key={step.range} className="flex items-start gap-3">
                <span className="font-mono text-xs text-[var(--color-accent)] mt-0.5 w-5 shrink-0">
                  0{i + 1}
                </span>
                <div className="flex-1">
                  <div className="text-sm text-[var(--color-fg)] font-mono">
                    {step.range}
                  </div>
                  <div className="text-xs text-[var(--color-fg-2)] mt-0.5">
                    {step.rule}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function ProfileSection({ p }: { p: PrincipalDetail }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 py-6 pb-32">
      <Card>
        <CardHeader>
          <CardTitle>Travel companions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {p.companions.map((c) => (
              <li
                key={c}
                className="text-sm text-[var(--color-fg-2)] flex items-start gap-2"
              >
                <span className="text-[var(--color-accent)] mt-0.5">·</span>
                {c}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Linked entities</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {p.linkedEntities.map((e) => (
              <li key={e.name} className="text-sm">
                <div className="text-[var(--color-fg)]">{e.name}</div>
                <div className="text-xs text-[var(--color-fg-3)] mt-0.5">
                  {e.note}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function TripsSection({ p }: { p: PrincipalDetail }) {
  return (
    <div className="py-6 pb-32">
      <Card>
        <CardHeader>
          <CardTitle>Recent trips</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <THead>
              <TR className="border-b">
                <TH>Date</TH>
                <TH>Route</TH>
                <TH>Aircraft</TH>
                <TH className="text-right">Price</TH>
              </TR>
            </THead>
            <TBody>
              {p.recentTrips.map((t) => (
                <TR key={t.date} className="last:border-b-0">
                  <TD className="font-mono text-[13px] text-[var(--color-fg-2)]">
                    {t.date}
                  </TD>
                  <TD className="font-mono text-[13px] text-[var(--color-fg)]">
                    {t.route}
                  </TD>
                  <TD className="text-sm text-[var(--color-fg-2)]">
                    {t.aircraft}
                  </TD>
                  <TD className="font-mono text-[13px] text-[var(--color-fg)] text-right">
                    {formatUsd(t.price)}
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export function PrincipalDetailPane({ p }: { p: PrincipalDetail }) {
  return (
    <div className="flex-1 min-w-0 relative">
      <div className="px-10 pt-10 pb-8 border-b border-[var(--color-border)]">
        <div className="flex items-start gap-5">
          <div className="h-16 w-16 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] text-base tracking-wider">
            {p.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="font-serif text-[28px] leading-tight text-[var(--color-fg)]">
                {p.name}
              </h1>
              <Badge variant="gold">{p.tier}</Badge>
            </div>
            <div className="mt-1 text-sm text-[var(--color-fg-2)]">
              {p.office}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
              YTD flight hours
            </div>
            <div className="font-mono text-2xl text-[var(--color-fg)] mt-1">
              {p.ytdHours}
            </div>
          </div>
        </div>
      </div>

      <div className="px-10">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="conversation">Conversation</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="trips">Recent Trips</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <ProfileSection p={p} />
          </TabsContent>
          <TabsContent value="preferences">
            <PreferencesSection p={p} />
          </TabsContent>
          <TabsContent value="conversation">
            <div className="py-6 pb-32 max-w-[640px]">
              <TripChat
                name={p.name}
                initials={p.initials}
                role="Principal"
                company={p.office}
                greeting={`Hi Sarah — thanks again for the Dubai arrangements. Could you look at Geneva options for the family next month?`}
                quickReplies={PRINCIPAL_QUICK_REPLIES}
              />
            </div>
          </TabsContent>
          <TabsContent value="documents">
            <div className="py-6 pb-32 max-w-[640px]">
              <SelfVault
                counterparty={p.name}
                myDocs={BROKER_DOCS}
                theirDocs={principalDocs(p.name)}
              />
            </div>
          </TabsContent>
          <TabsContent value="trips">
            <TripsSection p={p} />
          </TabsContent>
        </Tabs>
      </div>

      <div className="sticky bottom-0 left-0 right-0 border-t border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur px-10 py-4 flex items-center justify-between">
        <div className="text-xs text-[var(--color-fg-3)]">
          New booking will inherit {p.name}&apos;s preferences and approval rules.
        </div>
        <Button size="md" className="gap-2">
          <Plus className="h-4 w-4" />
          Start new booking for {p.name.split(" ").slice(-1)[0]}
        </Button>
      </div>
    </div>
  );
}
