# Voyex — Work Plan

Living checklist. Updated as we go.

## Done
- ✅ Replaced fleet card SVG illustrations with real jet photos (deployed)
- ✅ Review + cleanup: deleted dead `jet-illustration.tsx`, removed unused import,
  rewrote `useSession` to avoid wasteful re-renders (deployed)

## In progress — public site polish (approved)
1. ✅ **Mobile menu** — added a hamburger menu (opens a dropdown with all nav
   links + Enquire, closes on tap). Verified on a phone-size screen.
2. ✅ **Social preview** — created a branded share image (public/og-image.jpg)
   and added Open Graph + Twitter tags. Verified tags render and image serves.
3. ✅ **Real imagery** — added a real jet photo behind the hero (under the purple
   brand wash) and real photo headers to all 4 Lifestyle cards (yacht, resort,
   gala, champagne). Verified on screen; lint/types/build all clean.

## AI concierge (built, in preview — not deployed yet)
- ✅ **Chat-first new request** — "Ava" concierge asks route, date, guests,
  plane size/type (recommends a cabin from party size), Wi-Fi, extras, notes,
  then shows a summary + "Send to brokers". "Prefer a quick form?" link keeps
  the old form. Dummy/scripted — no AI bill.
- ✅ **Floating concierge bubble** — appears bottom-right for travellers across
  the dashboard (hidden on the request page). Verified full flow + lint/types.
- ✅ **Fixed "stuck" chat** — Ava could hang on the typing dots after toggling
  form↔chat (greeting timer was being cancelled). Greeting now survives
  remounts and re-greets on "Start over".
- ✅ **Faster load** — the fallback form (and its heavy animation library) now
  loads only if the traveller asks for it, so Ava's chat opens lean. Greeting
  appears in ~0.25s once the page is warm. (The one-time ~minute delay was a
  dev-preview cold compile only — the live site is pre-built and instant.)

## Escrow, plane details & broker fixes (in preview — not deployed)
- ✅ **Deposit → Escrow** — travellers no longer pay a part-deposit. The full
  price is held in escrow; confirmation explains a broker or operator will
  reach out, and funds release only when the aircraft is confirmed.
- ✅ **More flight detail + plane photos** — offer cards now show a real
  aircraft photo + key specs (guests, range, Wi-Fi). The escrow page has a
  photo gallery + full specs (range, speed, cabin, baggage, Wi-Fi).
- ✅ **"Charter broker" → "Broker"** everywhere (sign-in + titles).
- ✅ **Simplified traveller trust labels** — travellers now see only "Verified
  broker" / "Verified operator" (not marketing tiers or ARG/US safety codes).
  Brokers still see full operator detail in their Operators directory.
- ✅ **Broker workspace fixed** — every "Accept quote" works (was only the
  recommended one), "Request revision" responds, and the **Analytics** and
  **Settings** pages now exist (were 404).

## Landing page + sign-in refresh (in preview)
- ✅ **Landing page rewritten to match the product** — hero ("Private aviation,
  on your terms" · the marketplace), new **How it works** (request → compare →
  escrow → fly) and **Who it's for** (traveller/broker/operator/ambassador)
  sections, product-true stats/values/CTAs. Nav updated + collapses to a
  hamburger below desktop so longer labels don't crowd.
- ✅ **Sign-in simplified** — 4 personas now a compact 2×2 grid with a single
  context line (was four tall stacked cards).

## New "Ambassador" persona (referrals + royalties) (in preview)
- ✅ New **ambassador** role end-to-end: sign-in option, session, route guard
  (`/ambassador/*`), sidebar workspace + nav.
- ✅ **Dashboard** — shareable referral **code + link** (copy to clipboard),
  royalty stats (travellers referred, flights generated, royalties YTD, pending
  payout), and a top-referrals table.
- ✅ **Referrals** — full tracking table (per traveller: flights, flight value,
  royalty earned, Flying/Joined status). Royalty = 1.5% of each flight's value.
- ✅ **Earnings** — lifetime/paid/pending royalties + payout history.
- ✅ **Settings** — profile, referral notifications, payout method (shared
  settings component). Demo data; no real payouts.

## Broker/operator journeys made consistent with traveller (in preview)
- ✅ **Trip Requests are now from travellers** (not operator quotes) — the broker
  sees the traveller's request, can **send an all-in offer**, **chat with the
  traveller**, and share documents in a **vault**. (Old operator-quotes view +
  dead `quote-card.tsx` removed.)
- ✅ **Principal journey built out** — fixed the tabs (every tab used to show the
  same content) and added **Conversation** + **Documents vault** tabs, like the
  traveller trip page. Principals page now stacks responsively.
- ✅ **Operator workspace** — RFQ detail gained the same **Conversation** (Voyex
  desk) + **Documents vault**, consistent with the rest.
- ✅ Chat + vault are shared components reused across traveller, broker, operator.

## Operator & broker journey polish (in preview)
- ✅ **Fixed RFQ dead-end** — every inbound RFQ now opens a working detail
  (only one did before; others 404'd). "Needs quote" RFQs show a real
  **Submit your quote** form; already-quoted ones show revise/withdraw.
- ✅ **Photo-rich, consistent visuals** — broker quote cards and the operator
  fleet now use aircraft photos + `navy-panel` cards like the traveller side
  (shared `aircraftImage` helper). Headers use the standard `PageHeading`.
- ✅ **Responsive `/trips`** — broker request view now stacks its trust brief
  below on narrow screens instead of crushing the content; trust brief
  restyled to match.
- ✅ **Terminology aligned** to the direct-to-traveller + SLA model
  ("traveller" not "broker"/"client", 30-min SLA shown on open RFQs).

## Direct RFQ flow + response SLAs + rename (in preview)
- ✅ **Both brokers & operators respond directly to traveller RFQs** — inboxes
  reframed as "direct from travellers"; traveller offers heading now "direct
  from brokers & operators".
- ✅ **Response SLAs** — live countdowns: operators **30 min**, brokers **1 hour**,
  with policy banners and an "Overdue" state. Shown on the operator inbox,
  the broker request view, and noted to the traveller.
- ✅ **Renamed broker "Voyex Capital" → "Atlas Private Jets"** everywhere
  (broker login, offers, trip chat, settings). Avoids clashing with the Voyex
  platform brand.

## Crypto payment + post-payment trip journey (in preview)
- ✅ **Crypto payment** — escrow page now offers Apple Pay / Card / **Crypto
  (BTC, ETH, SOL)**: pick a coin → see amount in that coin, deposit address +
  QR, and confirm. Simulated (no real wallet/chain).
- ✅ **Trip journey** (`/client/trip`) reached after payment ("View your trip"):
  - **A–Z timeline** (Payment → Contact assigned → Documents → Aircraft & crew →
    Briefing → Departure → In flight → Complete). Uploading your docs advances it.
  - **Chat** with the broker *or* operator — chosen by the offer's Verified
    badge (Verified broker → broker contact; Verified operator → operator).
  - **Shared document vault** — your passports/details + their charter agreement,
    airworthiness cert, insurance, crew licences. Uploads simulated (no real docs).
  - **Flight & crew** panel — specs, captain, terminal, ground car, catering, 24/7 desk.

## All menu links now work (no more 404s)
- ✅ Traveller menu: Saved (saved jets + routes), Payments (methods + escrow
  history), Settings — all built.
- ✅ Operator menu: Active Bookings (table), Performance (win rate + utilization),
  Settings — all built.
- ✅ Settings pages share one reusable component (`settings-view.tsx`).

## Later / needs a decision (not started)
- 🔵 Real login security (currently a demo — "any password works")
- 🔵 Real dashboards with saved data (currently mock data; needs a backend)
- 🔵 Clean / custom domain (currently an auto-generated Vercel URL)

## How we deploy
Push to GitHub `main` (samial95/ProjectBeta) → Vercel auto-deploys. Only push
with Sami's explicit OK.
