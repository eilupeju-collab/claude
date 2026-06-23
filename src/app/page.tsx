import { getDailyVerse } from '@/lib/data/verses';
import { getGreeting } from '@/lib/utils';
import Link from 'next/link';

export default function HomePage() {
  const verse = getDailyVerse();
  const greeting = getGreeting();

  return (
    <div className="max-w-4xl mx-auto px-5 py-6 lg:py-10 space-y-10">
      {/* Hero Header with spiritual greeting */}
      <header className="relative">
        <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-secondary/10 to-transparent rounded-full blur-2xl" />
        <div className="relative">
          <p className="text-sm font-medium text-secondary tracking-wide">✦ {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2">{greeting}</h1>
          <p className="text-gray-500 mt-2 text-base">The Lord walks with you today. Let His Word guide your steps.</p>
        </div>
      </header>

      {/* Verse of the Day — Premium Card */}
      <section className="animate-fade-in">
        <div className="card-holy glow-gold p-7 lg:p-8">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
              <span className="text-secondary text-sm">✝</span>
            </div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary/70">Verse of the Day</h2>
          </div>
          <blockquote className="relative">
            <span className="absolute -top-2 -left-2 text-5xl text-secondary/15 font-serif">&ldquo;</span>
            <p className="verse-text text-lg lg:text-xl pl-6">
              {verse.text}
            </p>
            <span className="absolute -bottom-4 right-0 text-5xl text-secondary/15 font-serif">&rdquo;</span>
          </blockquote>
          <div className="mt-6 pt-4 border-t border-secondary/10 flex items-center justify-between">
            <p className="font-semibold text-primary text-sm tracking-wide">&mdash; {verse.reference}</p>
            <div className="flex gap-2">
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-primary/8 text-primary font-medium border border-primary/10">{verse.translation}</span>
              {verse.category && <span className="text-[10px] px-2.5 py-1 rounded-full bg-secondary/8 text-secondary font-medium border border-secondary/10 capitalize">{verse.category}</span>}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions — Spiritual Rhythm */}
      <section>
        <h2 className="section-title">Today&apos;s Spiritual Rhythm</h2>
        <div className="grid grid-cols-4 gap-3 lg:gap-4">
          <QuickAction href="/bible" label="Read" icon="📖" gradient="from-blue-50 to-indigo-50" iconBg="bg-primary/10" />
          <QuickAction href="/meditate" label="Meditate" icon="🕊️" gradient="from-teal-50 to-emerald-50" iconBg="bg-accent-teal/10" />
          <QuickAction href="/pray" label="Pray" icon="🙏" gradient="from-rose-50 to-pink-50" iconBg="bg-accent-coral/10" />
          <QuickAction href="/wellness" label="Rest" icon="🌿" gradient="from-amber-50 to-yellow-50" iconBg="bg-accent-amber/10" />
        </div>
      </section>

      {/* Streaks — Faith Journey */}
      <section>
        <h2 className="section-title">Your Faith Journey</h2>
        <div className="card p-6">
          <div className="grid grid-cols-3 gap-4">
            <StreakBadge type="Reading" streak={12} icon="📖" color="text-primary" gradient="from-primary/5 to-blue-50" />
            <StreakBadge type="Prayer" streak={8} icon="🙏" color="text-accent-coral" gradient="from-rose-50 to-pink-50" />
            <StreakBadge type="Meditate" streak={5} icon="🕊️" color="text-accent-teal" gradient="from-teal-50 to-emerald-50" />
          </div>
          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 text-[10px]">✓</span>
            </div>
            <p className="text-xs text-gray-500">Another day walking with God. Keep going! 🌟</p>
          </div>
        </div>
      </section>

      {/* Meditation — Peaceful Card */}
      <section>
        <h2 className="section-title">Find Your Peace</h2>
        <Link href="/meditate/sleep" className="block group">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 p-7 lg:p-8 text-white">
            {/* Stars decoration */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-4 left-8 w-1 h-1 bg-white/40 rounded-full animate-glow" />
              <div className="absolute top-12 right-16 w-1.5 h-1.5 bg-white/30 rounded-full animate-glow stagger-2" />
              <div className="absolute bottom-8 left-1/4 w-1 h-1 bg-white/50 rounded-full animate-glow stagger-3" />
              <div className="absolute top-1/3 right-8 w-1 h-1 bg-white/20 rounded-full animate-glow stagger-1" />
              <div className="absolute bottom-12 right-1/3 w-0.5 h-0.5 bg-white/60 rounded-full animate-glow stagger-4" />
            </div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <span className="text-2xl">🌙</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Sleep &amp; Rest</h3>
                  <p className="text-white/60 text-sm">Drift into peace with Scripture</p>
                </div>
              </div>
              <p className="text-white/50 text-sm font-serif italic mt-4">
                &ldquo;In peace I will lie down and sleep, for you alone, LORD, make me dwell in safety.&rdquo;
              </p>
              <p className="text-white/40 text-xs mt-2">— Psalm 4:8</p>
              <div className="flex items-center gap-4 mt-5">
                <span className="text-xs bg-white/10 px-3 py-1.5 rounded-full backdrop-blur">🎵 6 Tracks</span>
                <span className="text-xs bg-white/10 px-3 py-1.5 rounded-full backdrop-blur">🌧️ Ambient Sounds</span>
                <span className="text-xs bg-white/10 px-3 py-1.5 rounded-full backdrop-blur">⏱️ Sleep Timer</span>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Dove Divider */}
      <div className="dove-divider">
        <span className="text-secondary/40 text-lg">🕊️</span>
      </div>

      {/* Meditation Suggestion */}
      <section>
        <h2 className="section-title">Morning Meditation</h2>
        <Link href="/meditate" className="card flex items-center gap-4 group p-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-teal/20 to-teal-100/30 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
            <span className="text-2xl">🍃</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">
              Be Still &amp; Know
            </h3>
            <p className="text-sm text-gray-500 mt-1">10 min · Peace · Psalm 46:10</p>
          </div>
          <div className="w-11 h-11 rounded-full bg-primary glow-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </Link>
      </section>

      {/* Community — Live Prayer */}
      <section>
        <h2 className="section-title">Community of Faith</h2>
        <Link href="/community" className="card group relative overflow-hidden p-5">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full" />
          <div className="flex items-center gap-4 relative">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-primary-50 to-blue-100 flex items-center justify-center">
              <span className="text-xl">👥</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                  247 people praying now
                </p>
              </div>
              <p className="text-sm text-gray-500 mt-1">Join the live prayer community — you&apos;re never alone</p>
            </div>
            <svg className="w-5 h-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </section>

      {/* Explore — Feature Grid */}
      <section>
        <h2 className="section-title">Explore &amp; Grow</h2>
        <div className="grid grid-cols-2 gap-3 lg:gap-4">
          <FeatureCard href="/discover/ask" icon="✝️" title="Ask the Bible" desc="Scripture-powered answers" gradient="from-blue-50 to-indigo-50" />
          <FeatureCard href="/discover/trivia" icon="⭐" title="Bible Trivia" desc="Test your knowledge" gradient="from-amber-50 to-yellow-50" />
          <FeatureCard href="/discover/calendar" icon="📅" title="Holy Calendar" desc="Liturgical seasons" gradient="from-purple-50 to-violet-50" />
          <FeatureCard href="/discover/kids" icon="🐑" title="Kids Bible" desc="Stories for little ones" gradient="from-pink-50 to-rose-50" />
          <FeatureCard href="/discover/study" icon="📚" title="Study Plans" desc="Grow day by day" gradient="from-teal-50 to-cyan-50" />
          <FeatureCard href="/meditate" icon="🕊️" title="Meditate" desc="Peace in His presence" gradient="from-emerald-50 to-green-50" />
        </div>
      </section>

      {/* Daily Scripture Encouragement Footer */}
      <footer className="text-center pb-8">
        <div className="dove-divider">
          <span className="text-secondary/30 text-sm">✦</span>
        </div>
        <p className="text-xs text-gray-400 font-serif italic mt-4">
          &ldquo;For where two or three gather in my name, there am I with them.&rdquo;
        </p>
        <p className="text-[10px] text-gray-300 mt-1">Matthew 18:20</p>
      </footer>
    </div>
  );
}

function QuickAction({ href, label, icon, gradient, iconBg }: {
  href: string; label: string; icon: string; gradient: string; iconBg: string;
}) {
  return (
    <Link href={href} className="group">
      <div className={`flex flex-col items-center gap-2.5 p-4 rounded-2xl bg-gradient-to-br ${gradient} border border-white/60 group-hover:shadow-md group-hover:scale-[1.03] transition-all duration-300`}>
        <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <span className="text-xs font-semibold text-gray-700">{label}</span>
      </div>
    </Link>
  );
}

function StreakBadge({ type, streak, icon, color, gradient }: {
  type: string; streak: number; icon: string; color: string; gradient: string;
}) {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-4 text-center`}>
      <span className="text-lg">{icon}</span>
      <p className={`text-2xl font-bold ${color} mt-1`}>{streak}</p>
      <p className="text-[11px] text-gray-500 font-medium mt-1">{type}</p>
      <p className="text-[10px] text-gray-400">days</p>
    </div>
  );
}

function FeatureCard({ href, icon, title, desc, gradient }: {
  href: string; icon: string; title: string; desc: string; gradient: string;
}) {
  return (
    <Link href={href} className="group">
      <div className={`bg-gradient-to-br ${gradient} rounded-3xl p-5 text-center border border-white/50 group-hover:shadow-medium group-hover:scale-[1.02] transition-all duration-300 h-full`}>
        <span className="text-3xl block group-hover:scale-110 group-hover:animate-float transition-transform">{icon}</span>
        <h3 className="font-bold text-gray-800 mt-3 text-sm group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-[11px] text-gray-500 mt-1">{desc}</p>
      </div>
    </Link>
  );
}
