'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: '☀️' },
  { href: '/bible', label: 'Bible', icon: '📖' },
  { href: '/meditate', label: 'Meditate', icon: '🕊️' },
  { href: '/pray', label: 'Pray', icon: '🙏' },
  { href: '/discover', label: 'Discover', icon: '⭐' },
  { href: '/community', label: 'Community', icon: '👥' },
  { href: '/wellness', label: 'Wellness', icon: '🌿' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-72 h-screen bg-white border-r border-gray-100/80 fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="p-7 border-b border-gray-100/50">
        <Link href="/" className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg font-serif">B</span>
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-lg tracking-tight">Bible Chat</h1>
            <p className="text-[10px] text-secondary font-medium tracking-wider uppercase">Walk with God daily</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary-50 text-primary shadow-sm border border-primary/10'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              )}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Daily Scripture */}
      <div className="px-4 mb-4">
        <div className="rounded-2xl bg-gradient-to-br from-amber-50/80 to-yellow-50/50 p-4 border border-secondary/10">
          <p className="text-[10px] font-bold uppercase tracking-wider text-secondary/60 mb-2">✦ Today&apos;s Word</p>
          <p className="text-xs text-gray-600 font-serif italic leading-relaxed">
            &ldquo;Be strong and courageous. Do not be afraid...&rdquo;
          </p>
          <p className="text-[10px] text-primary font-semibold mt-2">Joshua 1:9</p>
        </div>
      </div>

      {/* Premium CTA */}
      <div className="px-4 pb-6">
        <div className="relative rounded-2xl bg-gradient-to-br from-primary via-blue-700 to-indigo-800 p-5 overflow-hidden">
          {/* Decorative light */}
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-xl" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/20 rounded-full blur-lg" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-secondary text-sm">✦</span>
              <span className="text-sm font-bold text-white">Go Premium</span>
            </div>
            <p className="text-[11px] text-white/60 mb-4 leading-relaxed">
              Unlock all meditations, translations &amp; study plans
            </p>
            <button className="w-full bg-white text-primary py-2.5 rounded-xl text-xs font-bold hover:bg-white/90 transition-colors shadow-md">
              Start 7-Day Free Trial
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
