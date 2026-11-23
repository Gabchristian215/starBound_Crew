// Crew rules: each category (role) unlocks only a subset of attribute values.

export const COLORS = [
  { name: 'Crimson', hex: '#e5484d' },
  { name: 'Cobalt', hex: '#3e63dd' },
  { name: 'Jade', hex: '#29a383' },
  { name: 'Amber', hex: '#f5a524' },
  { name: 'Violet', hex: '#8e4ec6' },
  { name: 'Coral', hex: '#f76b4f' },
  { name: 'Teal', hex: '#12a5b8' },
  { name: 'Slate', hex: '#6b7280' },
]

export const SPEEDS = ['Slow', 'Steady', 'Fast', 'Warp']

export const CATEGORIES = {
  Pilot: {
    icon: '🚀',
    blurb: 'Flies the ship and gets everyone out of tight spots.',
    specialties: ['Navigation', 'Evasive Maneuvers', 'Docking'],
    speeds: ['Fast', 'Warp'],
    colors: ['Crimson', 'Cobalt', 'Amber', 'Slate'],
  },
  Engineer: {
    icon: '🔧',
    blurb: 'Keeps the reactor humming and the lights on.',
    specialties: ['Repairs', 'Reactor Ops', 'Wiring'],
    speeds: ['Steady', 'Fast'],
    colors: ['Amber', 'Coral', 'Slate', 'Teal'],
  },
  Medic: {
    icon: '🩺',
    blurb: 'Patches up the crew after every misadventure.',
    specialties: ['Triage', 'Surgery', 'Xenobiology'],
    speeds: ['Slow', 'Steady', 'Fast'],
    colors: ['Jade', 'Teal', 'Cobalt', 'Coral'],
  },
  Scientist: {
    icon: '🔭',
    blurb: 'Studies every strange signal the ship picks up.',
    specialties: ['Astronomy', 'Chemistry', 'Botany'],
    speeds: ['Slow', 'Steady'],
    colors: ['Violet', 'Jade', 'Cobalt', 'Crimson'],
  },
}

export const CATEGORY_NAMES = Object.keys(CATEGORIES)

export const colorHex = (name) => COLORS.find((c) => c.name === name)?.hex ?? '#888'

// Is this attribute value allowed for the given category?
export function isAllowed(category, field, value) {
  const rules = CATEGORIES[category]
  if (!rules) return false
  const key = field === 'color' ? 'colors' : field === 'speed' ? 'speeds' : 'specialties'
  return rules[key].includes(value)
}

// When the category changes, drop any attribute that the new category doesn't allow.
export function reconcile(form) {
  const next = { ...form }
  for (const field of ['color', 'speed', 'specialty']) {
    if (next[field] && !isAllowed(next.category, field, next[field])) next[field] = ''
  }
  return next
}

const SPEED_POINTS = { Slow: 1, Steady: 2, Fast: 3, Warp: 4 }

// Per-crewmate "power level" shown on the detail page.
export function powerLevel(mate) {
  const base = SPEED_POINTS[mate.speed] ?? 0
  const nameBonus = Math.min(mate.name.trim().length, 12) / 4
  return Math.round((base * 20 + nameBonus * 5) * 10) / 10
}

// Crew-wide stats.
export function crewStats(crew) {
  const total = crew.length
  const count = (field) =>
    crew.reduce((acc, m) => ({ ...acc, [m[field]]: (acc[m[field]] ?? 0) + 1 }), {})
  const pct = (n) => (total ? Math.round((n / total) * 100) : 0)
  return { total, byCategory: count('category'), byColor: count('color'), bySpeed: count('speed'), pct }
}

// Mission success: rewards role coverage, speed, and having a medic aboard.
export function missionSuccess(crew) {
  if (crew.length === 0) return { score: 0, tier: 'empty', label: 'No crew yet', message: 'Recruit crewmates to launch a mission.' }

  const roles = new Set(crew.map((m) => m.category))
  const coverage = roles.size / CATEGORY_NAMES.length // 0..1
  const avgSpeed = crew.reduce((s, m) => s + (SPEED_POINTS[m.speed] ?? 0), 0) / crew.length / 4 // 0..1
  const hasMedic = roles.has('Medic') ? 1 : 0
  const sizeScore = Math.min(crew.length, 6) / 6

  const score = Math.round((coverage * 0.4 + avgSpeed * 0.25 + hasMedic * 0.15 + sizeScore * 0.2) * 100)

  if (score >= 75) return { score, tier: 'high', label: 'Ready for launch', message: 'This crew could cross the outer rim without breaking a sweat.' }
  if (score >= 45) return { score, tier: 'mid', label: 'Shaky but hopeful', message: 'The mission might work. Pack spare parts.' }
  return { score, tier: 'low', label: 'Grounded', message: 'Mission control is not signing off on this one yet.' }
}

export function formatDate(iso) {
  return new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
}
