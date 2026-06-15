export type QuoteStatus = "received" | "pending";

export interface Quote {
  id: string;
  operator: string;
  aocId: string;
  jurisdiction: string;
  verified: boolean;
  aircraft: string;
  tail: string;
  yearBuild: number;
  hoursSinceNew: number;
  insurance: string;
  insurer: string;
  insuranceExpiry: string;
  safety: string;
  price: number;
  safNote: string;
  trustScore: number;
  trustNote?: string;
  respondedAgo: string;
  recommended?: boolean;
  status: QuoteStatus;
  pendingNote?: string;
}

export interface TripRequest {
  id: string;
  status: string;
  statusLabel: string;
  client: string;
  clientTier: string;
  booker: string;
  bookerRole: string;
  createdAgo: string;
  fromCode: string;
  fromIcao: string;
  toCode: string;
  toIcao: string;
  dateLabel: string;
  pax: string;
  aircraftPref: string;
  catering: string;
  groundTransport: string;
  budgetMin: number;
  budgetMax: number;
  quotes: Quote[];
  trust: {
    clientRisk: string;
    escrow: string;
    compliance: string;
    recovery: string;
  };
  activity: { time: string; text: string }[];
}

export interface Principal {
  id: string;
  initials: string;
  name: string;
  role: string;
  ytdHours: number;
  status: "green" | "amber" | "red";
}

export interface RecentTrip {
  date: string;
  route: string;
  aircraft: string;
  price: number;
}

export interface PrincipalDetail extends Principal {
  tier: string;
  office: string;
  preferences: { label: string; value: string }[];
  approval: { range: string; rule: string }[];
  companions: string[];
  linkedEntities: { name: string; note: string }[];
  recentTrips: RecentTrip[];
}

export interface VerificationItem {
  status: "ok" | "pending";
  label: string;
  detail: string;
}
