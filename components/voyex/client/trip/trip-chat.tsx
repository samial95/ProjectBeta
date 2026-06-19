"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Msg {
  id: number;
  role: "them" | "me";
  text: string;
}

const QUICK_REPLIES: { q: string; a: string }[] = [
  {
    q: "When will the aircraft be confirmed?",
    a: "I expect tail confirmation within the hour — I'll post it here and tick it off your timeline the moment it's locked in.",
  },
  {
    q: "Can you arrange vegetarian catering?",
    a: "Absolutely. I've added vegetarian meals alongside the halal catering — the galley will confirm the full menu 24h before departure.",
  },
  {
    q: "Share my arrival details",
    a: "Perfect, noted. Our ground team will meet you planeside and your car will be waiting at the private terminal on arrival.",
  },
  {
    q: "What's the cancellation policy?",
    a: "Your funds stay in escrow and are fully refundable until the aircraft is confirmed. After that, standard charter terms apply — happy to send the full policy.",
  },
];

export function TripChat({
  name,
  initials,
  role,
  company,
  greeting,
  quickReplies = QUICK_REPLIES,
}: {
  name: string;
  initials: string;
  role: string;
  company: string;
  greeting?: string;
  quickReplies?: { q: string; a: string }[];
}) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 1,
      role: "them",
      text:
        greeting ??
        `Hi Catherine, I'm ${name} from ${company} — I'll be looking after your trip personally. Your payment is secured in escrow and I'm confirming the aircraft now. Anything you need?`,
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [asked, setAsked] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const idRef = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  function send(question: string, answer?: string) {
    const q = question.trim();
    if (!q || typing) return;
    setMessages((m) => [...m, { id: ++idRef.current, role: "me", text: q }]);
    setInput("");
    setTyping(true);
    const reply =
      answer ??
      "Thanks Catherine — I've noted that and will come straight back to you here.";
    timerRef.current = setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: ++idRef.current, role: "them", text: reply }]);
    }, 900);
  }

  const remaining = quickReplies.filter((r) => !asked.includes(r.q));

  return (
    <div className="flex h-[460px] flex-col overflow-hidden rounded-xl border border-[var(--color-border)] navy-panel">
      {/* header */}
      <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] text-xs font-semibold tracking-wider text-[var(--color-accent)]">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium text-white">{name}</div>
          <div className="text-[11px] text-[var(--color-fg-3)]">
            {role} · {company}
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] text-[var(--color-ok)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-ok)]" />
          Online
        </span>
      </div>

      {/* messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((m) =>
          m.role === "them" ? (
            <div key={m.id} className="flex">
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3.5 py-2.5 text-sm leading-relaxed text-[var(--color-fg)]">
                {m.text}
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-tr-sm border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] px-3.5 py-2.5 text-sm leading-relaxed text-[var(--color-fg)]">
                {m.text}
              </div>
            </div>
          )
        )}
        {typing && (
          <div className="flex">
            <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-3">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--color-fg-3)]"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* quick replies */}
      {remaining.length > 0 && (
        <div className="flex flex-wrap gap-2 border-t border-[var(--color-border)] px-4 pt-3">
          {remaining.map((r) => (
            <button
              key={r.q}
              type="button"
              onClick={() => {
                setAsked((a) => [...a, r.q]);
                send(r.q, r.a);
              }}
              className="rounded-full border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] px-3 py-1.5 text-xs text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)] hover:text-[#1c0a33]"
            >
              {r.q}
            </button>
          ))}
        </div>
      )}

      {/* input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 px-4 py-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message ${name.split(" ")[0]}…`}
          className="min-w-0 flex-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-3)] focus:border-[var(--color-accent)] focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Send"
          disabled={!input.trim()}
          className={cn(
            "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full gold-gradient-3 text-[#1c0a33] transition-opacity",
            !input.trim() && "opacity-40"
          )}
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
