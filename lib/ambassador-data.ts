import type { StatCard } from "@/lib/extra-data";

export const ROYALTY_RATE = 0.015; // 1.5% of each flight's all-in value

export const ambassadorProfile = {
  name: "Olivia Marchetti",
  handle: "@oliviamarchetti",
  code: "OLIVIA-VYX",
  link: "https://voyex.app/join?ref=OLIVIA-VYX",
  tier: "Gold Ambassador",
  since: "Joined Nov 2025",
};

export const ambassadorStats: StatCard[] = [
  {
    label: "Travellers referred",
    value: "10",
    delta: "+3",
    positive: true,
    context: "this quarter",
  },
  {
    label: "Flights generated",
    value: "38",
    delta: "+19%",
    positive: true,
    context: "by your referrals",
  },
  {
    label: "Royalties YTD",
    value: "$53,775",
    delta: "+24%",
    positive: true,
    context: "1.5% of flight value",
  },
  {
    label: "Pending payout",
    value: "$8,150",
    context: "next on 01 Jul 2026",
  },
];

export interface Referral {
  id: string;
  traveller: string;
  region: string;
  joined: string;
  flights: number;
  gmv: number;
  royalty: number;
  status: "flying" | "joined";
}

export const referrals: Referral[] = [
  { id: "r1", traveller: "HRH K. Al-Rashid", region: "Abu Dhabi", joined: "Nov 2025", flights: 8, gmv: 1100000, royalty: 16500, status: "flying" },
  { id: "r2", traveller: "M. Sokolova", region: "London", joined: "Dec 2025", flights: 5, gmv: 620000, royalty: 9300, status: "flying" },
  { id: "r3", traveller: "C. Westbourne", region: "Dubai", joined: "Jan 2026", flights: 6, gmv: 540000, royalty: 8100, status: "flying" },
  { id: "r4", traveller: "N. Petrova", region: "Geneva", joined: "Jan 2026", flights: 5, gmv: 360000, royalty: 5400, status: "flying" },
  { id: "r5", traveller: "S. Okonkwo", region: "Lagos", joined: "Feb 2026", flights: 4, gmv: 300000, royalty: 4500, status: "flying" },
  { id: "r6", traveller: "J. Pemberton", region: "London", joined: "Feb 2026", flights: 4, gmv: 210000, royalty: 3150, status: "flying" },
  { id: "r7", traveller: "A. Farouk", region: "Dubai", joined: "Mar 2026", flights: 3, gmv: 215000, royalty: 3225, status: "flying" },
  { id: "r8", traveller: "T. Nakamura", region: "Tokyo", joined: "Mar 2026", flights: 3, gmv: 240000, royalty: 3600, status: "flying" },
  { id: "r9", traveller: "L. Bianchi", region: "Milan", joined: "May 2026", flights: 0, gmv: 0, royalty: 0, status: "joined" },
  { id: "r10", traveller: "R. Haddad", region: "Beirut", joined: "Jun 2026", flights: 0, gmv: 0, royalty: 0, status: "joined" },
];

export interface Payout {
  date: string;
  amount: number;
  method: string;
  status: "paid" | "scheduled";
}

export const payouts: Payout[] = [
  { date: "01 Jul 2026", amount: 8150, method: "Bank transfer", status: "scheduled" },
  { date: "01 Jun 2026", amount: 12400, method: "Bank transfer", status: "paid" },
  { date: "01 May 2026", amount: 9800, method: "Bank transfer", status: "paid" },
  { date: "01 Apr 2026", amount: 11200, method: "Bank transfer", status: "paid" },
  { date: "01 Mar 2026", amount: 7300, method: "Bank transfer", status: "paid" },
];
