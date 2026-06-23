'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const TABS = [
  { href: '/', label: 'Home', icon: '☀️' },
  { href: '/bible', label: 'Bible', icon: '📖' },
  { href: '/meditate', label: 'Meditate', icon: '🕊️' },
  { href: '/pray', label: 'Pray', icon: '🙏' },
  { href: '/discover', label: 'Discover', icon: '⭐' },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100/50 z-50 pb-safe">
      <div className="flex justify-around items-center py-2 px-3">
        {TABS.map((tab) => {
          const isActive = pathname === tab.href ||
            (tab.href !== '/' && pathname.startsWith(tab.href));
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-2 rounded-2xl transition-all min-w-[52px]',
                isActive ? 'bg-primary-50' : ''
              )}
            >
              <span className={cn(
                'text-lg transition-transform',
                isActive ? 'scale-110' : 'opacity-60'
              )}>
                {tab.icon}
              </span>
              <span className={cn(
                'text-[10px] font-semibold',
                isActive ? 'text-primary' : 'text-gray-400'
              )}>
                {tab.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-primary mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
