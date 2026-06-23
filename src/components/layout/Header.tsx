'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="lg:hidden sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100/50">
      <div className="flex items-center justify-between px-5 py-3.5">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm font-serif">B</span>
          </div>
          <div>
            <span className="font-bold text-gray-900 text-sm">Bible Chat</span>
            <span className="text-secondary text-[8px] font-semibold ml-1.5 tracking-wider">✦</span>
          </div>
        </Link>
        <Link
          href="/profile"
          className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-50 to-blue-50 flex items-center justify-center border border-primary/10"
        >
          <svg className="w-4.5 h-4.5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
