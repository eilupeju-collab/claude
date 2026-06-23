import Link from 'next/link';

const FEATURES = [
  { href: '/discover/ask', title: 'Ask the Bible', desc: 'AI answers from Scripture', icon: '🤖', color: 'bg-primary-50' },
  { href: '/discover/trivia', title: 'Bible Trivia', desc: 'Test your knowledge', icon: '🎮', color: 'bg-amber-50' },
  { href: '/discover/calendar', title: 'Calendar', desc: 'Holy days & events', icon: '📅', color: 'bg-teal-50' },
  { href: '/discover/kids', title: 'Kids Bible', desc: 'Stories for little ones', icon: '👶', color: 'bg-pink-50' },
  { href: '/discover/study', title: 'Study Plans', desc: 'Grow deeper in faith', icon: '📚', color: 'bg-purple-50' },
  { href: '/community', title: 'Community', desc: 'Pray with others', icon: '👥', color: 'bg-red-50' },
];

export default function DiscoverPage() {
  return (
    <div className="max-w-4xl mx-auto px-5 py-6 lg:py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Discover</h1>
      <p className="text-gray-500 mb-8">Grow deeper in your faith</p>

      <div className="grid grid-cols-2 gap-4">
        {FEATURES.map((f) => (
          <Link key={f.href} href={f.href} className="card group py-6 text-center">
            <span className="text-3xl mb-3 block">{f.icon}</span>
            <h3 className="font-semibold text-sm text-gray-800 group-hover:text-primary transition-colors">
              {f.title}
            </h3>
            <p className="text-xs text-gray-400 mt-1">{f.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
