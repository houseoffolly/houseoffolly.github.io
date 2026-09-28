import { useState } from 'react'
import { alumni, board, formatRange, news, nightsHosted, pastVisits, upcomingVisits, visitingFellows, type Person, type Visit } from './data'

const fellows = visitingFellows()

const nav = [
  { label: 'About', href: '#about' },
  { label: 'Research', href: '#research' },
  { label: 'Education', href: '#education' },
  { label: 'Policy', href: '#policy' },
  { label: 'Folly Index', href: '#index' },
  { label: 'People', href: '#people' },
  { label: 'News', href: '#news' },
  { label: 'Events', href: '#events' },
]

const portrait = (person: Person) => `${import.meta.env.BASE_URL}portraits/${person.slug}.jpg`

function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-3 sm:gap-4">
      <span
        className={`font-serif text-3xl font-bold tracking-tight sm:text-4xl ${inverted ? 'text-white' : 'text-cardinal'}`}
      >
        HOF
      </span>
      <span className={`h-10 w-px ${inverted ? 'bg-white/40' : 'bg-ink/30'}`} />
      <span className={`text-sm leading-tight sm:text-base ${inverted ? 'text-white' : 'text-ink'}`}>
        <span className="block font-semibold">House of Folly</span>
        <span className={`block ${inverted ? 'text-white/70' : 'text-ink/70'}`}>Human-Centered Artificial Folly</span>
      </span>
    </a>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header id="top" className="sticky top-0 z-50 bg-white shadow-[0_1px_0_rgba(0,0,0,0.08)]">
      <div className="bg-cardinal px-4 py-1.5 sm:px-8">
        <p className="mx-auto max-w-7xl font-serif text-sm text-white">Cambridge, Massachusetts</p>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
        <Logo />
        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-[15px] font-semibold text-ink transition-colors hover:text-cardinal"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <button
          className="rounded p-2 text-ink lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>
      {open && (
        <nav className="border-t border-fog px-4 pb-4 lg:hidden">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block border-b border-stone py-3 font-semibold text-ink hover:text-cardinal"
            >
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

const fillers = [
  { text: 'Your face here?', href: '#engage', className: 'bg-cardinal text-white hover:bg-cardinal-dark' },
  { text: 'HOF', href: '#top', className: 'bg-ink text-white text-2xl sm:text-3xl' },
  { text: 'Est. 2025', href: '#about', className: 'border-2 border-ink text-ink' },
]

function Hero() {
  const faces = [...board, ...alumni.map((a) => a.person), ...fellows.map((f) => f.person)]
  return (
    <section id="about" className="relative overflow-hidden bg-stone">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:py-24">
        <div>
          <p className="mb-6 text-sm font-semibold tracking-[0.2em] text-cardinal uppercase">
            Est. 2025 · Cambridge, MA
          </p>
          <h1 className="font-serif text-4xl leading-[1.15] text-ink sm:text-5xl lg:text-[3.5rem]">
            HOF’s mission is to advance folly research, education, policy and practice to improve the human
            condition.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink/80">
            Founded on the belief that the future of humanity depends on people who stay up far too late arguing
            about things that do not matter, the House of Folly convenes scholars across disciplines, time zones,
            and sleeping arrangements.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#engage"
              className="bg-cardinal px-6 py-3 font-semibold text-white transition-colors hover:bg-cardinal-dark"
            >
              Engage With HOF
            </a>
            <a
              href="#people"
              className="border-2 border-ink px-6 py-3 font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
            >
              Meet Our Scholars
            </a>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {faces.map((person) => (
            <a
              key={person.slug}
              href={person.url}
              target="_blank"
              rel="noreferrer"
              title={person.name}
              className="group relative aspect-square overflow-hidden"
            >
              <img
                src={portrait(person)}
                alt={person.name}
                className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
              />
              <span className="absolute inset-0 bg-cardinal/20 mix-blend-multiply transition-opacity group-hover:opacity-0" />
            </a>
          ))}
          {fillers.slice(0, (4 - (faces.length % 4)) % 4).map((f) => (
            <a
              key={f.text}
              href={f.href}
              className={`flex aspect-square items-center justify-center p-2 text-center font-serif text-sm font-semibold sm:text-lg ${f.className}`}
            >
              {f.text}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

const pillars = [
  {
    id: 'research',
    n: '01',
    title: 'Research',
    body: 'HOF studies and develops human-centered folly technologies that are collaborative, argumentative, and diminishing to human productivity and quality of sleep.',
    items: ['Late-Night Whiteboard Initiative', 'Center for Unfinished Side Projects', 'Lab for Computational Bickering'],
  },
  {
    id: 'education',
    n: '02',
    title: 'Education',
    body: 'We offer transformative learning experiences for every stage of folly, from first-time couch surfers to seasoned multi-visit fellows.',
    items: ['Executive Education in Dishwashing', 'K–12 (Kitchen to 12 a.m.) Programs', 'Graduate Certificate in Guest Towel Etiquette'],
  },
  {
    id: 'policy',
    n: '03',
    title: 'Policy',
    body: 'Through evidence-free research and global convenings in the living room, HOF equips decision-makers to govern the thermostat responsibly.',
    items: ['Framework for Fridge Label Compliance', 'Quiet Hours Accord (non-binding)', 'The Leftovers Doctrine'],
  },
]

function Pillars() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
      <div className="grid gap-12 md:grid-cols-3">
        {pillars.map((p) => (
          <article key={p.id} id={p.id} className="scroll-mt-32 border-t-4 border-cardinal pt-6">
            <p className="font-serif text-5xl text-cardinal">{p.n}</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold">{p.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/80">{p.body}</p>
            <ul className="mt-6 space-y-2">
              {p.items.map((item) => (
                <li key={item} className="group flex items-center gap-2 font-semibold">
                  <span className="text-cardinal transition-transform group-hover:translate-x-1">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

function FollyIndex() {
  const repeat = fellows.filter((f) => f.visits.filter((v) => pastVisits.includes(v)).length > 1).length
  const visited = new Set(pastVisits.map((v) => v.person.name)).size
  const stats = [
    { value: nightsHosted, label: 'Scholar-nights hosted since founding' },
    { value: visited, label: 'Distinct Visiting Fellows' },
    { value: pastVisits.length, label: 'Official convenings (visits)' },
    { value: repeat, label: 'Scholar(s) foolish enough to return' },
    { value: 0, label: 'Dishes washed the same day (median)' },
    { value: '∞', label: 'Open questions raised at dinner' },
  ]
  return (
    <section id="index" className="scroll-mt-28 bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-white/60 uppercase">Report</p>
            <h2 className="mt-2 font-serif text-4xl sm:text-5xl">The 2026 Folly Index</h2>
          </div>
          <p className="max-w-md text-white/70">
            The most comprehensive, data-driven report on folly ever produced by a residential apartment in
            Cambridge, Massachusetts.
          </p>
        </div>
        <div className="mt-12 grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-ink p-8">
              <p className="font-serif text-6xl text-white">{s.value}</p>
              <p className="mt-3 text-white/70">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PersonCard({ person, meta, large = false }: { person: Person; meta?: string; large?: boolean }) {
  return (
    <a href={person.url} target="_blank" rel="noreferrer" className="group block">
      <div className="aspect-square overflow-hidden bg-stone">
        <img
          src={portrait(person)}
          alt={person.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <h3
        className={`mt-4 font-serif font-semibold group-hover:text-cardinal group-hover:underline ${large ? 'text-2xl' : 'text-xl'}`}
      >
        {person.name}
      </h3>
      <p className="mt-1 text-ink/75">{person.title}</p>
      {meta && <p className="mt-2 text-sm font-semibold text-cardinal">{meta}</p>}
    </a>
  )
}

function People() {
  return (
    <section id="people" className="scroll-mt-28 mx-auto max-w-7xl px-4 py-20 sm:px-8">
      <h2 className="font-serif text-4xl sm:text-5xl">People</h2>
      <p className="mt-4 max-w-2xl text-lg text-ink/80">
        HOF brings together a diverse, interdisciplinary community of scholars united by a shared commitment to
        sleeping on the couch.
      </p>

      <h3 className="mt-14 border-b border-fog pb-3 text-sm font-semibold tracking-[0.2em] text-cardinal uppercase">
        Organizing Board · Current Residents
      </h3>
      <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {board.map((person) => (
          <PersonCard key={person.slug} person={person} large />
        ))}
      </div>

      <h3 className="mt-20 border-b border-fog pb-3 text-sm font-semibold tracking-[0.2em] text-cardinal uppercase">
        Visiting Fellows
      </h3>
      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {fellows.map(({ person, visits }) => (
          <PersonCard
            key={person.slug}
            person={person}
            meta={visits.map((v) => formatRange(v.start, v.end)).join(' · ')}
          />
        ))}
      </div>

      <h3 className="mt-20 border-b border-fog pb-3 text-sm font-semibold tracking-[0.2em] text-cardinal uppercase">
        Alumni
      </h3>
      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {alumni.map(({ person, tenure }) => (
          <PersonCard key={person.slug} person={person} meta={tenure} />
        ))}
      </div>
    </section>
  )
}

function News() {
  return (
    <section id="news" className="scroll-mt-28 bg-stone">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-4xl sm:text-5xl">Latest News</h2>
          <span className="hidden font-semibold text-cardinal sm:block">All News →</span>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {news.map((n) => (
            <article key={n.title} className="group flex flex-col bg-white p-6 shadow-sm transition hover:shadow-md">
              <p className="text-xs font-semibold tracking-[0.15em] text-cardinal uppercase">{n.kind}</p>
              <h3 className="mt-3 font-serif text-xl leading-snug font-semibold group-hover:text-cardinal">
                {n.title}
              </h3>
              <p className="mt-3 flex-1 text-ink/75">{n.blurb}</p>
              <p className="mt-6 text-sm text-ink/60">{n.date}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ConveningList({ visits }: { visits: Visit[] }) {
  return (
    <ol className="mt-10 divide-y divide-fog border-y border-fog">
      {visits.map((v) => (
        <li key={v.person.slug + v.start} className="grid gap-2 py-5 sm:grid-cols-[14rem_1fr_auto] sm:items-center">
          <p className="font-semibold text-cardinal">{formatRange(v.start, v.end)}</p>
          <div className="flex items-center gap-4">
            <img src={portrait(v.person)} alt="" className="h-12 w-12 rounded-full object-cover" />
            <div>
              <a
                href={v.person.url}
                target="_blank"
                rel="noreferrer"
                className="font-serif text-lg font-semibold hover:text-cardinal hover:underline"
              >
                {v.person.name}
              </a>
              <p className="text-sm text-ink/70">{v.person.title}</p>
            </div>
          </div>
          <p className="text-sm text-ink/60">{v.room ?? 'Living Room'}, HOF Main Campus</p>
        </li>
      ))}
    </ol>
  )
}

function Events() {
  const upcoming = [...upcomingVisits].sort((a, b) => Date.parse(a.start) - Date.parse(b.start))
  const past = [...pastVisits].sort((a, b) => Date.parse(b.start) - Date.parse(a.start))
  return (
    <section id="events" className="scroll-mt-28 mx-auto max-w-7xl px-4 py-20 sm:px-8">
      {upcoming.length > 0 && (
        <div className="mb-20">
          <h2 className="font-serif text-4xl sm:text-5xl">Upcoming Convenings</h2>
          <p className="mt-4 max-w-2xl text-lg text-ink/80">
            Distinguished scholars scheduled to convene at HOF. Towels are being folded accordingly.
          </p>
          <ConveningList visits={upcoming} />
        </div>
      )}
      <h2 className="font-serif text-4xl sm:text-5xl">Past Convenings</h2>
      <p className="mt-4 max-w-2xl text-lg text-ink/80">
        Each visit is a high-level convening of thought leaders, typically held around the kitchen table.
      </p>
      <ConveningList visits={past} />
    </section>
  )
}

function Engage() {
  return (
    <section id="engage" className="scroll-mt-28 bg-cardinal text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 sm:px-8 md:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="font-serif text-4xl">Become a Visiting Fellow</h2>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Applications are reviewed on a rolling basis, usually via group chat. Preference is given to candidates
            who bring snacks, strong opinions, or both.
          </p>
        </div>
        <a
          href="#people"
          className="justify-self-start border-2 border-white px-6 py-3 font-semibold transition-colors hover:bg-white hover:text-cardinal md:justify-self-end"
        >
          Contact the Organizing Board
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div>
            <Logo inverted />
            <p className="mt-6 text-white/70">
              House of Folly
              <br />
              Cambridge, Massachusetts
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-white/85">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-white hover:underline">
                {n.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-white/20 pt-6 text-sm text-white/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} House of Folly. All rights reserved, most wrongs too.</p>
          <p>A parody. Not affiliated with Stanford, Harvard, MIT, or good judgment.</p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pillars />
        <FollyIndex />
        <People />
        <News />
        <Events />
        <Engage />
      </main>
      <Footer />
    </>
  )
}
