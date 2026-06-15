export function JetIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 300"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="jetBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f5f5f5" />
          <stop offset="50%" stopColor="#c0c0c0" />
          <stop offset="100%" stopColor="#8b93b8" />
        </linearGradient>
        <linearGradient id="jetGold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#ffd700" />
        </linearGradient>
        <radialGradient id="jetGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(212,175,55,0.35)" />
          <stop offset="100%" stopColor="rgba(212,175,55,0)" />
        </radialGradient>
      </defs>

      {/* Glow behind the fuselage */}
      <ellipse cx="400" cy="160" rx="360" ry="70" fill="url(#jetGlow)" />

      {/* Fuselage */}
      <path
        d="M70 165 Q 240 138 470 140 L 600 142 Q 660 144 700 158 Q 712 162 700 168 L 470 178 Q 240 182 90 178 Q 60 176 70 165 Z"
        fill="url(#jetBody)"
      />
      {/* Nose cone */}
      <path d="M700 158 Q 740 161 752 163 Q 740 167 700 168 Z" fill="#8b93b8" />

      {/* Tail fin */}
      <path
        d="M86 165 L 60 96 Q 58 90 66 92 L 150 150 Z"
        fill="url(#jetBody)"
      />
      <path d="M86 165 L 60 96 Q 58 90 66 92 L 96 122 Z" fill="url(#jetGold)" opacity="0.85" />

      {/* Main wing (far) */}
      <path
        d="M360 168 L 250 230 Q 244 234 254 234 L 420 176 Z"
        fill="#8b93b8"
        opacity="0.7"
      />
      {/* Main wing (near) */}
      <path
        d="M380 158 L 300 96 Q 296 92 306 94 L 470 152 Z"
        fill="url(#jetBody)"
      />

      {/* Engine */}
      <ellipse cx="300" cy="176" rx="34" ry="13" fill="#6b7299" />
      <ellipse cx="284" cy="176" rx="6" ry="11" fill="#1e1e3f" />

      {/* Windows */}
      <g fill="#1e1e3f" opacity="0.8">
        <circle cx="470" cy="158" r="3.2" />
        <circle cx="492" cy="157" r="3.2" />
        <circle cx="514" cy="156" r="3.2" />
        <circle cx="536" cy="156" r="3.2" />
        <circle cx="558" cy="155" r="3.2" />
        <circle cx="580" cy="155" r="3.2" />
      </g>
      {/* Cockpit window */}
      <path d="M662 150 Q 684 150 696 158 L 668 160 Q 660 156 662 150 Z" fill="#1e1e3f" opacity="0.85" />

      {/* Gold accent cheatline */}
      <path
        d="M150 170 L 668 156"
        stroke="url(#jetGold)"
        strokeWidth="1.6"
        opacity="0.9"
      />
    </svg>
  );
}
