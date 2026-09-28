export type Person = {
  name: string
  slug: string
  url: string
  title: string
}

export type Visit = {
  person: Person
  start: string // ISO date, inclusive
  end: string // ISO date, inclusive
  room?: string // defaults to the Living Room
}

const p = (name: string, url: string, title: string): Person => ({
  name,
  url,
  title,
  slug: name.toLowerCase().replace(/\s+/g, '-'),
})

export const board: Person[] = [
  p(
    'Arnav Verma',
    'https://scholar.google.ca/citations?user=9KFdv9IAAAAJ&hl=en',
    'Co-Director; Denis Diderot Professor of Snack Procurement',
  ),
  p(
    'Kartik Chandra',
    'https://cs.stanford.edu/~kach/',
    'Co-Director; Chief Scientist, Office of Ill-Advised Projects',
  ),
  p(
    'Yael Kirkpatrick',
    'https://yaelkirk.github.io/',
    'Co-Director; Chair, Committee on Thermostat Governance',
  ),
]

export const alumni: { person: Person; tenure: string }[] = [
  {
    person: p('Tony Chen', 'https://chentoast.github.io/', 'Founding Resident Fellow, Emeritus'),
    tenure: 'Sept 1, 2025 – Sept 1, 2026',
  },
]

const lionel = p(
  'Lionel Wong',
  'https://web.mit.edu/zyzzyva/www/academic.html',
  'Distinguished Recurring Fellow',
)
const sarah = p('Sarah Wu', 'https://sarahawu.github.io/', 'Visiting Fellow in Causal Inquiry')
const junyi = p('Junyi Chu', 'https://jchu10.github.io/', 'Visiting Fellow in Curiosity')
const jeanette = p('Jeanette Andrews', 'https://www.jeanetteandrews.com/', 'Artist-in-Residence (Perceptual Illusions)')

export const visits: Visit[] = [
  { person: p('Dae Houlihan', 'https://daeh.info/', 'Visiting Fellow in Affective Computing'), start: '2025-09-17', end: '2025-09-19' },
  { person: lionel, start: '2025-09-17', end: '2025-09-25' },
  { person: junyi, start: '2025-10-03', end: '2025-10-03' },
  { person: sarah, start: '2025-11-18', end: '2025-11-20' },
  { person: p('Katherine Mohr', 'https://katherinemohr.github.io/', 'Winter Visiting Fellow'), start: '2025-12-16', end: '2025-12-17' },
  { person: jeanette, start: '2026-01-12', end: '2026-01-14' },
  { person: lionel, start: '2026-01-18', end: '2026-01-22' },
  { person: p('Alex Hwang', 'https://alexhwang.github.io/', 'Visiting Fellow in Applied Photonics'), start: '2026-03-24', end: '2026-03-27' },
  { person: sarah, start: '2026-06-28', end: '2026-06-29' },
  { person: p('Michael Brocidiacono', 'https://molecularmodelinglab.github.io/members/michael-brocidiacono.html', 'Visiting Fellow in Molecular Modeling; Duke of Disco'), start: '2026-07-21', end: '2026-07-22' },
  { person: p('Ke Fang', 'https://kefangpsych.github.io/intro.html', 'Visiting Fellow in Psychology'), start: '2026-09-11', end: '2026-09-13' },
  { person: jeanette, start: '2026-09-29', end: '2026-10-01', room: 'Guest Room' },
  { person: junyi, start: '2026-10-01', end: '2026-10-02', room: 'Guest Room' },
]

const today = new Date().toISOString().slice(0, 10)

/** Visits that have started (ongoing visits count as past). */
export const pastVisits = visits.filter((v) => v.start <= today)
export const upcomingVisits = visits.filter((v) => v.start > today)

/** Unique visitors, most recent visit first, with all their visits attached. */
export function visitingFellows() {
  const byName = new Map<string, { person: Person; visits: Visit[] }>()
  for (const v of visits) {
    const entry = byName.get(v.person.name) ?? { person: v.person, visits: [] }
    entry.visits.push(v)
    byName.set(v.person.name, entry)
  }
  return [...byName.values()].sort((a, b) => lastStart(b) - lastStart(a))
}

const lastStart = (e: { visits: Visit[] }) =>
  Math.max(...e.visits.map((v) => Date.parse(v.start)))

const DAY = 86_400_000

export const nightsHosted = pastVisits.reduce(
  (sum, v) => sum + Math.max(1, (Date.parse(v.end) - Date.parse(v.start)) / DAY),
  0,
)

export function formatRange(start: string, end: string) {
  const s = new Date(start + 'T12:00:00')
  const e = new Date(end + 'T12:00:00')
  const md = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  if (start === end) return `${md(s)}, ${s.getFullYear()}`
  if (s.getFullYear() !== e.getFullYear()) return `${md(s)}, ${s.getFullYear()} – ${md(e)}, ${e.getFullYear()}`
  if (s.getMonth() === e.getMonth()) return `${md(s)}–${e.getDate()}, ${e.getFullYear()}`
  return `${md(s)} – ${md(e)}, ${e.getFullYear()}`
}

export const news = [
  {
    kind: 'Milestone',
    date: 'Sep 27, 2026',
    title: 'Recurring Fellowship Enrollment Set to Double',
    blurb: 'Jeanette Andrews and Junyi Chu return this fall, joining founding member Lionel Wong and June returnee Sarah Wu. The guest room has been notified.',
  },
  {
    kind: 'Announcement',
    date: 'Sep 2, 2026',
    title: 'HOF Bids Farewell to Founding Resident Fellow Tony Chen',
    blurb: 'After one full revolution of the Earth around the Sun, Chen transitions to Emeritus status, retaining lifetime couch privileges.',
  },
  {
    kind: 'Research',
    date: 'Aug 14, 2026',
    title: 'New Study: 94% of Kitchen Sponges Are "Probably Fine"',
    blurb: 'HOF researchers conclude, with p < 0.5, that the sponge can go one more week.',
  },
  {
    kind: 'Policy Brief',
    date: 'Jun 30, 2026',
    title: 'Toward a Unified Framework for Whose Turn It Is to Take Out the Recycling',
    blurb: 'A white paper proposing a decentralized, trustless protocol. Adoption remains voluntary.',
  },
]
