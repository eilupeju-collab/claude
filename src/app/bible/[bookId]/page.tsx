'use client';

import { useState, useEffect } from 'react';
import { getBookById, SAMPLE_CHAPTERS } from '@/lib/data/bible';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function BibleReaderPage() {
  const params = useParams();
  const bookId = params.bookId as string;
  const book = getBookById(bookId);
  const [chapter, setChapter] = useState(1);
  const [fontSize, setFontSize] = useState(16);

  if (!book) {
    return (
      <div className="max-w-4xl mx-auto px-5 py-10 text-center">
        <p className="text-gray-500">Book not found</p>
        <Link href="/bible" className="text-primary mt-2 inline-block">Back to Bible</Link>
      </div>
    );
  }

  const key = `${bookId}-${chapter}`;
  const chapterData = SAMPLE_CHAPTERS[key];

  return (
    <div className="max-w-3xl mx-auto px-5 py-6 lg:py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/bible" className="text-gray-400 hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-lg font-bold text-gray-900">{book.name} {chapter}</h1>
        <div className="flex gap-2">
          <button onClick={() => setFontSize(Math.max(14, fontSize - 1))} className="btn-ghost text-xs p-1.5">A-</button>
          <button onClick={() => setFontSize(Math.min(24, fontSize + 1))} className="btn-ghost text-xs p-1.5">A+</button>
        </div>
      </div>

      {/* Chapter Selector */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 -mx-5 px-5">
        {Array.from({ length: Math.min(book.chapters, 30) }, (_, i) => i + 1).map((ch) => (
          <button
            key={ch}
            onClick={() => setChapter(ch)}
            className={`w-9 h-9 rounded-full flex-shrink-0 text-sm font-medium transition-all ${
              ch === chapter
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {ch}
          </button>
        ))}
      </div>

      {/* Verses */}
      <div className="bg-white rounded-2xl p-6 shadow-soft" style={{ fontSize: `${fontSize}px` }}>
        {chapterData ? (
          <div className="space-y-4">
            {chapterData.verses.map((v) => (
              <p key={v.number} className="text-gray-700 leading-relaxed">
                <sup className="text-primary font-semibold text-xs mr-1">{v.number}</sup>
                {v.text}
              </p>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-sm">Full Bible text available with API integration.</p>
            <p className="text-gray-300 text-xs mt-2">{book.name} chapter {chapter} — {book.chapters} chapters total</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setChapter(Math.max(1, chapter - 1))}
          disabled={chapter <= 1}
          className="btn-ghost disabled:opacity-30"
        >
          ← Previous
        </button>
        <button
          onClick={() => setChapter(Math.min(book.chapters, chapter + 1))}
          disabled={chapter >= book.chapters}
          className="btn-ghost disabled:opacity-30"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
