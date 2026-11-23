import { colorHex } from '../lib/crew.js'

// Original round-helmet astronaut drawn in the crewmate's color.
export default function Avatar({ color, size = 96 }) {
  const hex = colorHex(color)
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <line x1="50" y1="14" x2="50" y2="4" stroke={hex} strokeWidth="3" strokeLinecap="round" />
      <circle cx="50" cy="4" r="4" fill="#ffd166" />
      <circle cx="50" cy="44" r="30" fill={hex} />
      <rect x="28" y="34" width="44" height="22" rx="11" fill="#0f1730" />
      <circle cx="40" cy="45" r="4" fill="#9be7ff" />
      <circle cx="60" cy="45" r="4" fill="#9be7ff" />
      <path d="M26 96 Q26 72 50 72 Q74 72 74 96 Z" fill={hex} opacity="0.85" />
    </svg>
  )
}
