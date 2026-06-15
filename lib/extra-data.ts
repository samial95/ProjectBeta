export interface BookingRow {
  id: string;
  principal: string;
  route: string;
  date: string;
  aircraft: string;
  operator: string;
  price: number;
  status: "confirmed" | "in_flight" | "completed" | "scheduled";
}

export interface OperatorDirectoryRow {
  name: string;
  aocId: string;
  jurisdiction: string;
  fleet: string;
  safety: string;
  trustScore: number;
  trips: number;
  verified: boolean;
}

export interface StatCard {
  label: string;
  value: string;
  delta?: string;
  positive?: boolean;
  context?: string;
}

// ---- Broker: Active Bookings ----
export const brokerBookings: BookingRow[] = [
  {
    id: "VYX-2026-0847",
    principal: "Catherine Westbourne",
    route: "DWC → LTN",
    date: "14 Mar 2026",
    aircraft: "Global 7500",
    operator: "Sovereign Jet Partners",
    price: 94500,
    status: "confirmed",
  },
  {
    id: "VYX-2026-0802",
    principal: "Maria Sokolova",
    route: "LTN → JFK",
    date: "12 Mar 2026",
    aircraft: "Gulfstream G650",
    operator: "Crescent Aviation",
    price: 134500,
    status: "in_flight",
  },
  {
    id: "VYX-2026-0791",
    principal: "Lord James Pemberton",
    route: "LCY → GVA",
    date: "10 Mar 2026",
    aircraft: "Falcon 8X",
    operator: "Meridian Charter Group",
    price: 48200,
    status: "scheduled",
  },
  {
    id: "VYX-2026-0768",
    principal: "Dr. Ahmed Farouk",
    route: "DXB → CDG",
    date: "06 Mar 2026",
    aircraft: "Global 6000",
    operator: "Sovereign Jet Partners",
    price: 71800,
    status: "completed",
  },
  {
    id: "VYX-2026-0742",
    principal: "HRH Sheikh Khalid Al-Rashid",
    route: "AUH → LTN",
    date: "01 Mar 2026",
    aircraft: "Gulfstream G650ER",
    operator: "Crescent Aviation",
    price: 156400,
    status: "completed",
  },
];

// ---- Broker: Operators directory ----
export const operatorDirectory: OperatorDirectoryRow[] = [
  {
    name: "Sovereign Jet Partners",
    aocId: "GCAA-OPS-3471",
    jurisdiction: "UAE",
    fleet: "12 aircraft · ULR + heavy",
    safety: "ARG/US Platinum · IS-BAO 3",
    trustScore: 98,
    trips: 214,
    verified: true,
  },
  {
    name: "Crescent Aviation",
    aocId: "GCAA-OPS-1129",
    jurisdiction: "UAE",
    fleet: "9 aircraft · heavy",
    safety: "ARG/US Gold · Wyvern",
    trustScore: 91,
    trips: 168,
    verified: true,
  },
  {
    name: "Meridian Charter Group",
    aocId: "UK CAA AOC 2247",
    jurisdiction: "UK",
    fleet: "7 aircraft · super-mid + heavy",
    safety: "ARG/US Gold",
    trustScore: 87,
    trips: 132,
    verified: true,
  },
  {
    name: "VistaJet",
    aocId: "MT-AOC-014",
    jurisdiction: "Malta",
    fleet: "Global program",
    safety: "ARG/US Gold · IS-BAO 3",
    trustScore: 93,
    trips: 96,
    verified: true,
  },
  {
    name: "Northwind Air",
    aocId: "FAA-135-7781",
    jurisdiction: "USA",
    fleet: "5 aircraft · mid-size",
    safety: "ARG/US Silver",
    trustScore: 74,
    trips: 41,
    verified: false,
  },
];

// ---- Broker: Analytics ----
export const brokerStats: StatCard[] = [
  {
    label: "Trips booked YTD",
    value: "128",
    delta: "+19%",
    positive: true,
    context: "vs 2025 YTD",
  },
  {
    label: "Gross booking value",
    value: "$11.2M",
    delta: "+24%",
    positive: true,
    context: "across 5 principals",
  },
  {
    label: "Avg quote→accept",
    value: "8m 40s",
    delta: "−12%",
    positive: true,
    context: "median this quarter",
  },
  {
    label: "Operator SLA",
    value: "97%",
    delta: "+2 pts",
    positive: true,
    context: "quotes within window",
  },
];

export const brokerRouteBreakdown: { route: string; trips: number; share: number }[] =
  [
    { route: "LTN ⇆ DXB / DWC", trips: 38, share: 100 },
    { route: "LTN / LCY ⇆ JFK", trips: 27, share: 71 },
    { route: "DXB ⇆ Europe", trips: 22, share: 58 },
    { route: "Intra-Europe", trips: 25, share: 66 },
    { route: "Other long-haul", trips: 16, share: 42 },
  ];

// ---- Operator: Active bookings (won trips) ----
export const operatorBookings: BookingRow[] = [
  {
    id: "VYX-2026-0847",
    principal: "Family Office · VIP T1",
    route: "DWC → LTN",
    date: "14 Mar 2026",
    aircraft: "A6-SJP · Global 7500",
    operator: "Confirmed",
    price: 94500,
    status: "confirmed",
  },
  {
    id: "VYX-2026-0831",
    principal: "Sovereign · vetted",
    route: "AUH → GVA",
    date: "25 Mar 2026",
    aircraft: "A6-SJC · Falcon 8X",
    operator: "Confirmed",
    price: 42800,
    status: "scheduled",
  },
  {
    id: "VYX-2026-0698",
    principal: "Corporate · returning",
    route: "DWC → CDG",
    date: "Today",
    aircraft: "A6-SJG · G650ER",
    operator: "Airborne",
    price: 68400,
    status: "in_flight",
  },
  {
    id: "VYX-2026-0655",
    principal: "Family Office · VIP T1",
    route: "DWC → LHR",
    date: "02 Mar 2026",
    aircraft: "A6-SJP · Global 7500",
    operator: "Completed",
    price: 98200,
    status: "completed",
  },
];

// ---- Operator: Performance ----
export const operatorPerfStats: StatCard[] = [
  {
    label: "Win rate (90d)",
    value: "47%",
    delta: "+4 pts",
    positive: true,
    context: "32 of 68 quotes",
  },
  {
    label: "Avg response",
    value: "1m 12s",
    delta: "−18%",
    positive: true,
    context: "fastest quartile on Voyex",
  },
  {
    label: "Revenue YTD",
    value: "$18.4M",
    delta: "+22%",
    positive: true,
    context: "vs 2025 YTD",
  },
  {
    label: "Fleet utilization",
    value: "68%",
    delta: "+5 pts",
    positive: true,
    context: "12 aircraft",
  },
];

export const operatorWinLoss: { label: string; won: number; total: number }[] = [
  { label: "Ultra-long-range", won: 18, total: 28 },
  { label: "Heavy", won: 9, total: 21 },
  { label: "Super-mid", won: 5, total: 14 },
  { label: "Mid-size", won: 0, total: 5 },
];
