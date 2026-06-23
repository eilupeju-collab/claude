'use client';

import { useState } from 'react';
import { BIBLE_BOOKS } from '@/lib/data/bible';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function BiblePage() {
  const [testament, setTestament] = useState<'OT' | 'NT'>('OT');
  const books = BIBLE_BOOKS.filter((b) => b.testament === testament);

  return (
    <div className="max-w-4xl mx-auto px-5 py-6 lg:py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">The Bible</h1>
      <p className="text-gray-500 mb-6">Choose a book to begin reading</p>

      {/* Testament Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          className={cn('chip', testament === 'OT' && 'chip-active')}
          onClick={() => setTestament('OT')}
        >
          Old Testament (39)
        </button>
        <button
          className={cn('chip', testament === 'NT' && 'chip-active')}
          onClick={() => setTestament('NT')}
        >
          New Testament (27)
        </button>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {books.map((book) => (
          <Link
            key={book.id}
            href={`/bible/${book.id}`}
            className="card py-4 px-4 hover:border-primary/30 transition-all group"
          >
            <p className="font-semibold text-gray-800 text-sm group-hover:text-primary transition-colors">
              {book.name}
            </p>
            <p className="text-xs text-gray-400 mt-1">{book.chapters} chapters</p>
          </Link>
        ))}
      </div>

      {/* Audio Bible Banner */}
      <div className="mt-8 card bg-gradient-to-r from-primary-50 to-blue-50 border-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white flex-shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-800">Audio Bible</p>
            <p className="text-sm text-gray-500">Listen while you commute, walk, or rest</p>
          </div>
          <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
