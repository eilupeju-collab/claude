'use client';

import Link from 'next/link';
import { getGreeting } from '@/lib/utils';

export default function Header() {
  return (
    <header className="lg:hidden sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100/50">
      <div className="flex items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="font-semibold text-gray-900">Bible Chat</span>
        </Link>
        <Link
          href="/profile"
          className="w-9 h-9 rounded-full bg-primary-50 flex items-center justify-center"
        >
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
