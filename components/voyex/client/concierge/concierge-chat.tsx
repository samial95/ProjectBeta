"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Send,
  ArrowRight,
  CheckCircle2,
  Loader2,
  RotateCcw,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MsgRole = "assistant" | "user";
interface Msg {
  id: number;
  role: MsgRole;
  text: string;
}
interface RequestData {
  from: string;
  to: string;
  date: string;
  pax: string;
  cabin: string;
  wifi: string;
  extras: string[];
  notes: string;
}

const STEP_ORDER = [
  "from",
  "to",
  "date",
  "pax",
  "cabin",
  "wifi",
  "extras",
  "notes",
] as const;
type Step = (typeof STEP_ORDER)[number];

const SUGGEST_FROM = ["Dubai", "London", "New York", "Riyadh"];
const SUGGEST_TO = ["London", "Paris", "Geneva", "Maldives"];
const CABINS = ["Light jet", "Mid-size", "Super-mid", "Heavy", "Ultra-long-range"];
const EXTRAS = [
  "Halal catering",
  "Child seats",
  "Ground transport",
  "Pet-friendly",
  "Sustainable fuel (SAF)",
];

const TEXT_STEPS: Step[] = ["from", "to", "date", "pax", "notes"];

function emptyData(): RequestData {
  return {
    from: "",
    to: "",
    date: "",
    pax: "",
    cabin: "",
    wifi: "",
    extras: [],
    notes: "",
  };
}

function parsePax(s: string): number {
  const m = s.match(/\d+/);
  return m ? parseInt(m[0], 10) : 2;
}

function recommendCabin(pax: number): string {
  if (pax <= 4) return "Light jet";
  if (pax <= 6) return "Mid-size";
  if (pax <= 8) return "Super-mid";
  if (pax <= 12) return "Heavy";
  return "Ultra-long-range";
}

function buildPrompt(step: Step, d: RequestData): string {
  switch (step) {
    case "from":
      return "Welcome to Voyex — I'm Ava, your private flight concierge. I'll have competing offers in front of you within minutes. To begin, which city are you flying from?";
    case "to":
      return `${d.from} — lovely. And where are we flying to?`;
    case "date":
      return "Perfect. What date would you like to depart?";
    case "pax":
      return "And how many guests will be travelling?";
    case "cabin": {
      const rec = recommendCabin(parsePax(d.pax));
      return `For ${d.pax || "your party"}, I'd suggest a ${rec} — the right balance of range and comfort. Which cabin would you prefer?`;
    }
    case "wifi":
      return "Will you need Wi-Fi on board?";
    case "extras":
      return "Anything to make the trip seamless? Tap any that apply, then continue.";
    case "notes":
      return "Noted. Anything else I should pass to our brokers — special catering, pets, or requests?";
  }
}

function quickRepliesFor(step: Step): string[] {
  switch (step) {
    case "from":
      return SUGGEST_FROM;
    case "to":
      return SUGGEST_TO;
    case "date":
      return ["This weekend", "Next week", "I'm flexible"];
    case "pax":
      return ["1–2", "3–4", "5–8", "9+"];
    case "cabin":
      return CABINS;
    case "wifi":
      return ["Yes, essential", "Not needed"];
    case "extras":
      return EXTRAS;
    case "notes":
      return ["No, that's everything"];
  }
}

const placeholderFor: Record<string, string> = {
  from: "e.g. Dubai",
  to: "e.g. London",
  date: "e.g. 14 March",
  pax: "Number of guests",
  notes: "Type any special requests…",
};

export function ConciergeChat({
  variant = "page",
  onClose,
}: {
  variant?: "page" | "bubble";
  onClose?: () => void;
}) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  // Opens in the "typing" state — Ava is composing the greeting from the start.
  const [typing, setTyping] = useState(true);
  const [awaiting, setAwaiting] = useState(false);
  const [phase, setPhase] = useState<"chatting" | "summary" | "sending" | "sent">(
    "chatting"
  );
  const [input, setInput] = useState("");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  // `data` drives rendering (summary + success). `dataRef` mirrors it so the
  // delayed prompts inside timers always read the latest answers.
  const [data, setData] = useState<RequestData>(emptyData());

  const dataRef = useRef<RequestData>(emptyData());
  const idRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const nextId = () => ++idRef.current;

  const later = useCallback((fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timersRef.current.push(t);
  }, []);

  const pushAssistant = useCallback((text: string) => {
    setMessages((m) => [...m, { id: nextId(), role: "assistant", text }]);
  }, []);

  const pushUser = (text: string) =>
    setMessages((m) => [...m, { id: nextId(), role: "user", text }]);

  const askStep = useCallback(
    (i: number, delay = 650) => {
      const step = STEP_ORDER[i];
      setTyping(true);
      setAwaiting(false);
      later(() => {
        setTyping(false);
        pushAssistant(buildPrompt(step, dataRef.current));
        setAwaiting(true);
      }, delay);
    },
    [later, pushAssistant]
  );

  // Open with Ava's greeting. The timer is scoped to this effect and cleaned up
  // on unmount, so a remount (toggling form↔chat, or React's dev double-mount)
  // simply reschedules it instead of leaving the chat stuck on "typing…".
  useEffect(() => {
    const t = setTimeout(() => {
      setTyping(false);
      pushAssistant(buildPrompt("from", dataRef.current));
      setAwaiting(true);
    }, 250);
    return () => clearTimeout(t);
  }, [pushAssistant]);

  // Clear any in-conversation timers on unmount.
  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  // Keep the latest message in view.
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing, phase]);

  const currentStep = STEP_ORDER[stepIndex];

  function record(step: Step, value: string) {
    const d = dataRef.current;
    if (step === "wifi") {
      d.wifi = value.toLowerCase().startsWith("yes") ? "Yes" : "No";
    } else if (step === "notes") {
      d.notes = value.toLowerCase().startsWith("no,") ? "" : value;
    } else if (step !== "extras") {
      d[step] = value;
    }
    setData({ ...d });
  }

  function goSummary() {
    setTyping(true);
    setAwaiting(false);
    later(() => {
      setTyping(false);
      pushAssistant(
        "Here's your request — shall I send it to our broker network?"
      );
      setPhase("summary");
    }, 650);
  }

  function submitAnswer(value: string, display?: string) {
    if (!awaiting || typing) return;
    const clean = value.trim();
    if (!clean) return;
    pushUser(display ?? clean);
    record(currentStep, clean);
    setInput("");
    if (stepIndex >= STEP_ORDER.length - 1) {
      setAwaiting(false);
      goSummary();
    } else {
      const ni = stepIndex + 1;
      setStepIndex(ni);
      askStep(ni);
    }
  }

  function toggleExtra(x: string) {
    setSelectedExtras((p) =>
      p.includes(x) ? p.filter((e) => e !== x) : [...p, x]
    );
  }

  function continueExtras() {
    if (!awaiting || typing) return;
    const chosen = selectedExtras;
    dataRef.current.extras = chosen;
    setData({ ...dataRef.current });
    pushUser(chosen.length ? chosen.join(", ") : "Nothing extra, thank you");
    setAwaiting(false);
    const ni = stepIndex + 1;
    setStepIndex(ni);
    askStep(ni);
  }

  function sendToBrokers() {
    setPhase("sending");
    later(() => setPhase("sent"), 1600);
  }

  function reset() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    dataRef.current = emptyData();
    setData(emptyData());
    setMessages([]);
    setSelectedExtras([]);
    setInput("");
    setStepIndex(0);
    setPhase("chatting");
    setAwaiting(false);
    setTyping(true);
    later(() => {
      setTyping(false);
      pushAssistant(buildPrompt("from", emptyData()));
      setAwaiting(true);
    }, 250);
  }

  const d = data;
  const showTextInput =
    phase === "chatting" && awaiting && TEXT_STEPS.includes(currentStep);
  const showChoiceChips =
    phase === "chatting" &&
    awaiting &&
    (currentStep === "cabin" || currentStep === "wifi");
  const showExtras = phase === "chatting" && awaiting && currentStep === "extras";
  const showSuggestions =
    phase === "chatting" && awaiting && TEXT_STEPS.includes(currentStep);

  // ----- Success screen -----
  if (phase === "sent") {
    return (
      <Shell variant={variant} onClose={onClose}>
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)]">
            <Sparkles className="h-6 w-6 text-[var(--color-accent)]" />
          </div>
          <h2 className="mt-5 font-serif text-[24px] leading-tight text-white">
            Request sent to our broker network
          </h2>
          <p className="mt-2 text-sm text-[var(--color-fg-2)]">
            Vetted brokers are preparing offers for{" "}
            <span className="text-[var(--color-fg)]">
              {d.from} → {d.to}
            </span>
            .
          </p>
          <div className="mt-6 w-full max-w-[320px] divide-y divide-[var(--color-border)] rounded-xl border border-[var(--color-border)] navy-panel text-left">
            {[
              "Request broadcast to 6 brokers",
              "3 brokers reviewing now",
              "First offers expected in ~4 min",
            ].map((line) => (
              <div key={line} className="flex items-center gap-3 px-4 py-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--color-ok)]" />
                <span className="text-sm text-[var(--color-fg-2)]">{line}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3">
            <Button asChild size="md" className="gap-2">
              <Link href="/client">
                View my offers
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-xs text-[var(--color-fg-3)] transition-colors hover:text-[var(--color-fg)]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              New request
            </button>
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell variant={variant} onClose={onClose}>
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
        {messages.map((m) =>
          m.role === "assistant" ? (
            <AssistantBubble key={m.id} text={m.text} />
          ) : (
            <UserBubble key={m.id} text={m.text} />
          )
        )}

        {typing && <TypingBubble />}

        {/* Summary card */}
        {(phase === "summary" || phase === "sending") && (
          <div className="flex gap-2.5">
            <Avatar />
            <div className="min-w-0 flex-1">
              <div className="rounded-2xl rounded-tl-sm border border-[var(--color-border)] navy-panel p-4">
                <div className="mb-3 text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent)]">
                  Your flight request
                </div>
                <dl className="space-y-2">
                  {(
                    [
                      ["Route", `${d.from} → ${d.to}`],
                      ["Date", d.date],
                      ["Guests", d.pax],
                      ["Cabin", d.cabin],
                      ["Wi-Fi", d.wifi],
                      ["Preferences", d.extras.length ? d.extras.join(", ") : "—"],
                      ["Notes", d.notes || "—"],
                    ] as [string, string][]
                  ).map(([k, v]) => (
                    <div key={k} className="flex gap-3 text-sm">
                      <dt className="w-24 shrink-0 text-[var(--color-fg-3)]">
                        {k}
                      </dt>
                      <dd className="min-w-0 text-[var(--color-fg)]">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <Button
                  type="button"
                  size="md"
                  className="gap-2"
                  disabled={phase === "sending"}
                  onClick={sendToBrokers}
                >
                  {phase === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Broadcasting…
                    </>
                  ) : (
                    <>
                      Send to brokers
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
                {phase === "summary" && (
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-1.5 text-xs text-[var(--color-fg-3)] transition-colors hover:text-[var(--color-fg)]"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Start over
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input dock */}
      {(showTextInput || showChoiceChips || showExtras) && (
        <div className="border-t border-[var(--color-border)] px-4 py-3">
          {/* Quick suggestions / choices */}
          {(showSuggestions || showChoiceChips) && (
            <div className="mb-3 flex flex-wrap gap-2">
              {quickRepliesFor(currentStep).map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => submitAnswer(q)}
                  className="rounded-full border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] px-3.5 py-1.5 text-xs text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)] hover:text-[#1c0a33]"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Multi-select extras */}
          {showExtras && (
            <div className="mb-3 flex flex-wrap gap-2">
              {EXTRAS.map((x) => {
                const on = selectedExtras.includes(x);
                return (
                  <button
                    key={x}
                    type="button"
                    onClick={() => toggleExtra(x)}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 text-xs transition-colors",
                      on
                        ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                        : "border-[var(--color-border)] text-[var(--color-fg-2)] hover:text-[var(--color-fg)]"
                    )}
                  >
                    {x}
                  </button>
                );
              })}
            </div>
          )}

          {/* Text entry */}
          {showTextInput && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitAnswer(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholderFor[currentStep] ?? "Type your reply…"}
                className="min-w-0 flex-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-3)] focus:border-[var(--color-accent)] focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Send"
                disabled={!input.trim()}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full gold-gradient-3 text-[#1c0a33] transition-opacity disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}

          {/* Extras continue button */}
          {showExtras && (
            <button
              type="button"
              onClick={continueExtras}
              className="inline-flex items-center gap-1.5 text-xs text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]"
            >
              {selectedExtras.length ? "Continue" : "Skip — nothing extra"}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}
    </Shell>
  );
}

// ---------- Presentational helpers ----------

function Shell({
  variant,
  onClose,
  children,
}: {
  variant: "page" | "bubble";
  onClose?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden",
        variant === "page"
          ? "h-[600px] rounded-2xl border border-[var(--color-border)] navy-panel panel-shadow backdrop-blur-sm"
          : "h-full"
      )}
    >
      <header className="flex items-center gap-3 border-b border-[var(--color-border)] px-4 py-3">
        <div className="relative">
          <Avatar />
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--color-bg)] bg-[var(--color-ok)]" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium text-white">Ava · Voyex Concierge</div>
          <div className="text-[11px] text-[var(--color-fg-3)]">
            Typically replies instantly
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close concierge"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-fg-3)] transition-colors hover:bg-[var(--color-surface-2)] hover:text-[var(--color-fg)]"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </header>
      {children}
    </div>
  );
}

function Avatar() {
  return (
    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)]">
      <Sparkles className="h-4 w-4 text-[var(--color-accent)]" />
    </div>
  );
}

function AssistantBubble({ text }: { text: string }) {
  return (
    <div className="flex gap-2.5">
      <Avatar />
      <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-[var(--color-border)] navy-panel px-4 py-2.5 text-sm leading-relaxed text-[var(--color-fg)]">
        {text}
      </div>
    </div>
  );
}

function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] rounded-2xl rounded-tr-sm border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] px-4 py-2.5 text-sm leading-relaxed text-[var(--color-fg)]">
        {text}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex gap-2.5">
      <Avatar />
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-[var(--color-border)] navy-panel px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--color-fg-3)]"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
