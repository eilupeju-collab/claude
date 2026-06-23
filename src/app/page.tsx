import { getDailyVerse } from '@/lib/data/verses';
import { getGreeting } from '@/lib/utils';
import Link from 'next/link';

export default function HomePage() {
  const verse = getDailyVerse();
  const greeting = getGreeting();

  return (
    <div className="max-w-4xl mx-auto px-5 py-6 lg:py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{greeting}</h1>
        <p className="text-gray-500 mt-1">Walk with God today</p>
      </div>

      {/* Verse of the Day */}
      <section className="mb-8">
        <h2 className="section-title">Verse of the Day</h2>
        <div className="card-elevated bg-gradient-to-br from-white to-primary-50/30 p-6">
          <p className="verse-text text-lg leading-relaxed">
            &ldquo;{verse.text}&rdquo;
          </p>
          <p className="verse-ref mt-3">&mdash; {verse.reference}</p>
          <div className="flex gap-2 mt-4">
            <span className="chip text-xs">{verse.translation}</span>
            {verse.category && <span className="chip text-xs capitalize">{verse.category}</span>}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-8">
        <h2 className="section-title">Today&apos;s Plan</h2>
        <div className="grid grid-cols-4 gap-3">
          <QuickAction href="/bible" label="Read" color="bg-primary" icon="📖" />
          <QuickAction href="/meditate" label="Meditate" color="bg-accent-teal" icon="🧘" />
          <QuickAction href="/pray" label="Pray" color="bg-accent-coral" icon="🙏" />
          <QuickAction href="/wellness" label="Calm" color="bg-accent-amber" icon="🌿" />
        </div>
      </section>

      {/* Streaks */}
      <section className="mb-8">
        <h2 className="section-title">Your Streaks</h2>
        <div className="grid grid-cols-3 gap-4">
          <StreakBadge type="Reading" streak={12} color="text-primary" bg="bg-primary-50" />
          <StreakBadge type="Prayer" streak={8} color="text-accent-coral" bg="bg-red-50" />
          <StreakBadge type="Meditate" streak={5} color="text-accent-teal" bg="bg-teal-50" />
        </div>
      </section>

      {/* Meditation Suggestion */}
      <section className="mb-8">
        <h2 className="section-title">Meditation for You</h2>
        <Link href="/meditate" className="card flex items-center gap-4 group">
          <div className="w-14 h-14 rounded-xl bg-accent-teal flex items-center justify-center text-white text-xl flex-shrink-0">
            🍃
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
              Be Still &amp; Know
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">10 min · Peace · Psalm 46:10</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </Link>
      </section>

      {/* Community */}
      <section className="mb-8">
        <h2 className="section-title">Community</h2>
        <Link href="/community" className="card flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary text-lg">
            👥
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900 group-hover:text-primary transition-colors">
              247 people are praying right now
            </p>
            <p className="text-sm text-gray-500">Join the live prayer community</p>
          </div>
          <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </section>

      {/* Feature Cards Row */}
      <section>
        <h2 className="section-title">Explore</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/discover/trivia" className="card text-center py-6 group">
            <span className="text-3xl">🎮</span>
            <p className="font-medium text-gray-700 mt-2 text-sm group-hover:text-primary">Bible Trivia</p>
          </Link>
          <Link href="/discover/kids" className="card text-center py-6 group">
            <span className="text-3xl">👶</span>
            <p className="font-medium text-gray-700 mt-2 text-sm group-hover:text-primary">Kids Bible</p>
          </Link>
          <Link href="/discover/calendar" className="card text-center py-6 group">
            <span className="text-3xl">📅</span>
            <p className="font-medium text-gray-700 mt-2 text-sm group-hover:text-primary">Calendar</p>
          </Link>
          <Link href="/discover/ask" className="card text-center py-6 group">
            <span className="text-3xl">🤖</span>
            <p className="font-medium text-gray-700 mt-2 text-sm group-hover:text-primary">Ask the Bible</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

function QuickAction({ href, label, color, icon }: { href: string; label: string; color: string; icon: string }) {
  return (
    <Link href={href} className="flex flex-col items-center gap-2 group">
      <div className={`w-14 h-14 rounded-2xl ${color}/10 flex items-center justify-center text-xl group-hover:scale-105 transition-transform`}>
        {icon}
      </div>
      <span className="text-xs font-medium text-gray-600">{label}</span>
    </Link>
  );
}

function StreakBadge({ type, streak, color, bg }: { type: string; streak: number; color: string; bg: string }) {
  return (
    <div className={`${bg} rounded-2xl p-4 text-center`}>
      <p className={`text-2xl font-bold ${color}`}>{streak}</p>
      <p className="text-xs text-gray-500 mt-1">{type}</p>
    </div>
  );
}
