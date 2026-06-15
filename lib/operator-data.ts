export interface OperatorProfile {
  name: string;
  aocId: string;
  jurisdiction: string;
  base: string;
  fleetSize: number;
  rating: string;
}

export interface OperatorKpi {
  label: string;
  value: string;
  delta?: string;
  positive?: boolean;
  context?: string;
}

export interface InboundRfq {
  id: string;
  clientCode: string;
  clientTier: string;
  route: string;
  date: string;
  pax: string;
  aircraftPref: string;
  budgetMin: number;
  budgetMax: number;
  receivedAgo: string;
  status:
    | "quote_sent"
    | "needs_quote"
    | "won"
    | "lost"
    | "expired";
  yourQuote?: number;
  rank?: number;
  competitors?: number;
  expiresIn?: string;
}

export interface FleetAircraft {
  tail: string;
  type: string;
  yearBuild: number;
  hoursSinceNew: number;
  location: string;
  nextMaintenance: string;
  status: "available" | "in_flight" | "maintenance" | "scheduled";
  statusNote?: string;
}

export const operatorProfile: OperatorProfile = {
  name: "Sovereign Jet Partners",
  aocId: "GCAA-OPS-3471",
  jurisdiction: "UAE",
  base: "Al Maktoum International · DWC",
  fleetSize: 12,
  rating: "ARG/US Platinum · IS-BAO Stage 3",
};

export const operatorKpis: OperatorKpi[] = [
  {
    label: "Avg response time",
    value: "1m 12s",
    delta: "−18%",
    positive: true,
    context: "vs last 30 days",
  },
  {
    label: "Win rate (90d)",
    value: "47%",
    delta: "+4 pts",
    positive: true,
    context: "32 of 68 quotes",
  },
  {
    label: "Revenue YTD",
    value: "$18.4M",
    delta: "+22%",
    positive: true,
    context: "vs 2025 YTD",
  },
  {
    label: "Upcoming flights",
    value: "7",
    context: "next 14 days",
  },
];

export const inboundRfqs: InboundRfq[] = [
  {
    id: "VYX-2026-0847",
    clientCode: "Family Office · returning",
    clientTier: "VIP Tier 1",
    route: "DWC → LTN",
    date: "Sat 14 Mar 2026 · 09:30 GST",
    pax: "6 + 2",
    aircraftPref: "Ultra-long-range",
    budgetMin: 85000,
    budgetMax: 115000,
    receivedAgo: "12 min ago",
    status: "quote_sent",
    yourQuote: 94500,
    rank: 1,
    competitors: 3,
    expiresIn: "21h 48m",
  },
  {
    id: "VYX-2026-0844",
    clientCode: "Corporate · new",
    clientTier: "Tier 2",
    route: "DWC → CDG",
    date: "Thu 19 Mar 2026 · 14:00 GST",
    pax: "4",
    aircraftPref: "Heavy",
    budgetMin: 62000,
    budgetMax: 78000,
    receivedAgo: "34 min ago",
    status: "needs_quote",
    expiresIn: "1h 26m",
    competitors: 2,
  },
  {
    id: "VYX-2026-0839",
    clientCode: "Family Office · returning",
    clientTier: "VIP Tier 1",
    route: "DWC → JFK",
    date: "Mon 23 Mar 2026 · 21:00 GST",
    pax: "8",
    aircraftPref: "Ultra-long-range",
    budgetMin: 165000,
    budgetMax: 195000,
    receivedAgo: "1h 08m ago",
    status: "quote_sent",
    yourQuote: 178400,
    rank: 2,
    competitors: 4,
    expiresIn: "8h 12m",
  },
  {
    id: "VYX-2026-0831",
    clientCode: "Sovereign · vetted",
    clientTier: "Restricted",
    route: "AUH → GVA",
    date: "Wed 25 Mar 2026 · 06:30 GST",
    pax: "3",
    aircraftPref: "Mid-size acceptable",
    budgetMin: 38000,
    budgetMax: 48000,
    receivedAgo: "3h 41m ago",
    status: "won",
    yourQuote: 42800,
    competitors: 5,
  },
  {
    id: "VYX-2026-0824",
    clientCode: "Corporate · returning",
    clientTier: "Tier 2",
    route: "DXB → MXP",
    date: "Fri 06 Mar 2026 · 11:00 GST",
    pax: "5",
    aircraftPref: "Heavy",
    budgetMin: 54000,
    budgetMax: 68000,
    receivedAgo: "1d ago",
    status: "lost",
    yourQuote: 61200,
    competitors: 3,
  },
];

export const sovereignFleet: FleetAircraft[] = [
  {
    tail: "A6-SJP",
    type: "Bombardier Global 7500",
    yearBuild: 2023,
    hoursSinceNew: 1247,
    location: "DWC",
    nextMaintenance: "12 Jun 2026 · 800hr",
    status: "scheduled",
    statusNote: "VYX-2026-0847 hold",
  },
  {
    tail: "A6-SJG",
    type: "Gulfstream G650ER",
    yearBuild: 2022,
    hoursSinceNew: 2104,
    location: "LHR",
    nextMaintenance: "04 Aug 2026 · A-check",
    status: "in_flight",
    statusNote: "DWC ← LHR · arrives 23:40",
  },
  {
    tail: "A6-SJC",
    type: "Dassault Falcon 8X",
    yearBuild: 2021,
    hoursSinceNew: 2890,
    location: "DWC",
    nextMaintenance: "21 May 2026 · 600hr",
    status: "available",
  },
  {
    tail: "A6-SJB",
    type: "Bombardier Global 6000",
    yearBuild: 2020,
    hoursSinceNew: 4120,
    location: "GVA",
    nextMaintenance: "—",
    status: "available",
    statusNote: "Repositioning DWC 16 Mar",
  },
  {
    tail: "A6-SJF",
    type: "Gulfstream G550",
    yearBuild: 2019,
    hoursSinceNew: 5860,
    location: "AUH",
    nextMaintenance: "—",
    status: "maintenance",
    statusNote: "C-check · Jet Aviation BSL · returns 02 Apr",
  },
  {
    tail: "A6-SJM",
    type: "Embraer Praetor 600",
    yearBuild: 2024,
    hoursSinceNew: 612,
    location: "DWC",
    nextMaintenance: "18 Sep 2026 · 600hr",
    status: "available",
  },
];

export interface RfqDetail extends InboundRfq {
  clientNote: string;
  catering: string;
  groundTransport: string;
  yourAircraft?: string;
  safBlend?: number;
  responseSeconds?: number;
  bidWindowOpened: string;
  bidWindowCloses: string;
  totalQuotes?: number;
}

export const rfqDetails: Record<string, RfqDetail> = {
  "VYX-2026-0847": {
    ...inboundRfqs[0],
    clientNote:
      "Returning client · 47 prior bookings on Voyex · KYC current · no operator restrictions",
    catering: "Halal · child car seats at LTN",
    groundTransport: "Ground transport to Mayfair",
    yourAircraft: "A6-SJP · Global 7500",
    safBlend: 30,
    responseSeconds: 72,
    bidWindowOpened: "12:04 GST",
    bidWindowCloses: "Sun 15 Mar · 09:30 GST",
    totalQuotes: 3,
  },
};
