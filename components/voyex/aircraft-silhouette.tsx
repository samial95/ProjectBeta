import { cn } from "@/lib/utils";

/**
 * Model-accurate business-jet silhouettes.
 *
 * Real aircraft photos are copyrighted, so instead of a generic "plane" icon
 * each aircraft renders a side-profile silhouette that matches its *class*:
 * engine configuration, relative fuselage length, and tail. The shapes are
 * deliberately distinguishable — a Falcon trijet carries its signature
 * center-engine S-duct intake at the fin root, ultra-long-range twins are the
 * longest with winglets, and super-midsize jets are visibly smaller.
 *
 * Drawn as a union of same-color primitives so the whole thing reads as one
 * clean silhouette in `currentColor` (the parent sets the colour).
 */

type JetFamily = "ultra" | "heavy" | "trijet" | "supermid";

function familyFor(model: string): JetFamily {
  const m = model.toLowerCase();
  // Trijets — Dassault Falcon family (8X, 7X, 900) have three engines.
  if (m.includes("falcon") || m.includes("dassault")) return "trijet";
  // Ultra-long-range flagships.
  if (
    m.includes("7500") ||
    m.includes("8000") ||
    m.includes("g650") ||
    m.includes("g700") ||
    m.includes("g800")
  )
    return "ultra";
  // Super-midsize / midsize.
  if (
    m.includes("praetor") ||
    m.includes("legacy 4") ||
    m.includes("legacy 5") ||
    m.includes("challenger 3") ||
    m.includes("citation") ||
    m.includes("phenom") ||
    m.includes("learjet")
  )
    return "supermid";
  // Everything else: large-cabin twin (Global 6000, G550, generic heavy).
  return "heavy";
}

const FAMILY_LABEL: Record<JetFamily, string> = {
  ultra: "ultra-long-range twin jet",
  heavy: "large-cabin twin jet",
  trijet: "trijet",
  supermid: "super-midsize jet",
};

function Body({ family }: { family: JetFamily }) {
  switch (family) {
    case "ultra":
      return (
        <g fill="currentColor">
          {/* long fuselage, pointed nose at right */}
          <path d="M34 44 L202 43 Q228 45 240 52 Q228 59 202 61 L34 60 Q24 59 22 52 Q24 45 34 44 Z" />
          {/* swept vertical fin + T-tail */}
          <path d="M44 50 L34 13 L56 18 L66 50 Z" />
          <path d="M30 14 L70 9 L70 16 L36 20 Z" />
          {/* rear-mounted engine nacelle */}
          <ellipse cx="78" cy="56" rx="22" ry="9" />
          {/* swept wing with upturned winglet */}
          <path d="M134 59 L158 59 L106 88 L94 88 L88 76 L98 84 Z" />
        </g>
      );
    case "trijet":
      return (
        <g fill="currentColor">
          {/* fuselage with pointed tail exhaust (center engine) */}
          <path d="M48 45 L196 44 Q222 46 234 52 Q222 58 196 60 L48 59 L26 54 L26 50 Z" />
          {/* signature S-duct intake hump at the fin root */}
          <ellipse cx="56" cy="42" rx="13" ry="9" />
          {/* fin + T-tail */}
          <path d="M48 48 L40 16 L60 21 L68 48 Z" />
          <path d="M34 17 L72 12 L72 19 L40 23 Z" />
          {/* one visible side engine */}
          <ellipse cx="84" cy="55" rx="17" ry="8" />
          {/* swept wing */}
          <path d="M132 58 L154 58 L106 85 L90 85 Z" />
        </g>
      );
    case "supermid":
      return (
        <g fill="currentColor">
          {/* shorter fuselage, drawn smaller / centered */}
          <path d="M74 46 L186 45 Q208 47 220 52 Q208 57 186 59 L74 58 Q64 57 62 52 Q64 47 74 46 Z" />
          {/* fin + T-tail */}
          <path d="M82 50 L74 24 L92 28 L100 50 Z" />
          <path d="M66 25 L102 21 L102 27 L72 30 Z" />
          {/* engine */}
          <ellipse cx="110" cy="54" rx="15" ry="7" />
          {/* swept wing with small winglet */}
          <path d="M152 57 L170 57 L130 80 L118 80 L114 71 L122 77 Z" />
        </g>
      );
    case "heavy":
    default:
      return (
        <g fill="currentColor">
          {/* fuselage */}
          <path d="M40 45 L196 44 Q222 46 236 52 Q222 58 196 60 L40 59 Q30 58 28 52 Q30 46 40 45 Z" />
          {/* fin + T-tail */}
          <path d="M48 50 L40 18 L58 22 L66 50 Z" />
          <path d="M34 19 L66 14 L66 20 L38 23 Z" />
          {/* rear engine nacelle */}
          <ellipse cx="80" cy="55" rx="20" ry="9" />
          {/* swept wing */}
          <path d="M128 58 L150 58 L104 86 L88 86 Z" />
        </g>
      );
  }
}

export function AircraftSilhouette({
  model,
  className,
}: {
  model: string;
  className?: string;
}) {
  const family = familyFor(model);
  return (
    <svg
      viewBox="0 0 256 96"
      className={cn("shrink-0", className)}
      role="img"
      aria-label={`${model} — ${FAMILY_LABEL[family]}`}
    >
      <title>{`${model} — ${FAMILY_LABEL[family]}`}</title>
      <Body family={family} />
    </svg>
  );
}
