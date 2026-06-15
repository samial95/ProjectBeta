export interface BrokerOffer {
  id: string;
  broker: string;
  brokerTier: string;
  verified: boolean;
  rating: number; // out of 5
  reviews: number;
  aircraft: string;
  operator: string;
  operatorSafety: string;
  price: number;
  depositPct: number;
  inclusions: string[];
  notes: string;
  respondedAgo: string;
  recommended?: boolean;
  bestPrice?: boolean;
  fastestResponse?: boolean;
}

export interface CustomerRequest {
  id: string;
  status: string;
  statusLabel: string;
  fromCode: string;
  fromCity: string;
  toCode: string;
  toCity: string;
  dateLabel: string;
  pax: string;
  cabinPref: string;
  notes: string;
  createdAgo: string;
  offerCount: number;
}

export const customerRequest: CustomerRequest = {
  id: "VYX-2026-0847",
  status: "comparing_offers",
  statusLabel: "Comparing offers",
  fromCode: "DXB",
  fromCity: "Dubai",
  toCode: "LTN",
  toCity: "London",
  dateLabel: "Sat 14 March 2026 · 09:30 GST",
  pax: "6 adults + 2 children",
  cabinPref: "Ultra-long-range · halal catering · child seats",
  notes: "Ground transport to Mayfair on arrival.",
  createdAgo: "14 min ago",
  offerCount: 4,
};

export const brokerOffers: BrokerOffer[] = [
  {
    id: "offer-voyex",
    broker: "Voyex Capital",
    brokerTier: "Preferred partner",
    verified: true,
    rating: 4.9,
    reviews: 312,
    aircraft: "Bombardier Global 7500",
    operator: "Sovereign Jet Partners",
    operatorSafety: "ARG/US Platinum · IS-BAO 3",
    price: 94500,
    depositPct: 25,
    inclusions: [
      "All-in price — no hidden fees",
      "Halal catering + child seats",
      "Mayfair ground transport included",
      "$4,200 SAF (30% blend) included",
      "Full escrow protection",
    ],
    notes: "Newest aircraft, highest safety rating, sustainability included.",
    respondedAgo: "Responded 2 min ago",
    recommended: true,
    fastestResponse: true,
  },
  {
    id: "offer-meridian",
    broker: "Meridian Air Brokers",
    brokerTier: "Verified broker",
    verified: true,
    rating: 4.6,
    reviews: 198,
    aircraft: "Dassault Falcon 8X",
    operator: "Meridian Charter Group",
    operatorSafety: "ARG/US Gold",
    price: 81900,
    depositPct: 30,
    inclusions: [
      "Catering included",
      "Child seats on request",
      "Ground transport not included",
      "SAF not offered",
    ],
    notes: "Lowest headline price; smaller cabin and no sustainability option.",
    respondedAgo: "Responded 5 min ago",
    bestPrice: true,
  },
  {
    id: "offer-crescent",
    broker: "Crescent Private Travel",
    brokerTier: "Verified broker",
    verified: true,
    rating: 4.7,
    reviews: 241,
    aircraft: "Gulfstream G650ER",
    operator: "Crescent Aviation",
    operatorSafety: "ARG/US Gold · Wyvern",
    price: 92800,
    depositPct: 25,
    inclusions: [
      "Catering included",
      "Child seats included",
      "Ground transport included",
      "SAF available (+$3,800)",
    ],
    notes: "Comparable cabin; SAF available at extra cost.",
    respondedAgo: "Responded 8 min ago",
  },
  {
    id: "offer-aerolux",
    broker: "AeroLux Jets",
    brokerTier: "Verified broker",
    verified: true,
    rating: 4.3,
    reviews: 86,
    aircraft: "Bombardier Global 6000",
    operator: "Northwind Air",
    operatorSafety: "ARG/US Silver",
    price: 88600,
    depositPct: 35,
    inclusions: [
      "Catering included",
      "Child seats on request",
      "Ground transport included",
      "SAF not offered",
    ],
    notes: "Older aircraft; higher deposit and lower operator safety tier.",
    respondedAgo: "Responded 11 min ago",
  },
];

export function offerById(id: string): BrokerOffer | undefined {
  return brokerOffers.find((o) => o.id === id);
}
