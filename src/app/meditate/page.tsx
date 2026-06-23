'use client';

import { useState } from 'react';
import { MEDITATIONS, BREATHING_EXERCISES } from '@/lib/data/meditations';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const CATEGORIES = ['all', 'peace', 'anxiety', 'morning', 'gratitude', 'sleep', 'healing', 'forgiveness'];

export default function MeditatePage() {
  const [category, setCategory] = useState('all');
  const [view, setView] = useState<'sessions' | 'breathing'>('sessions');

  const filtered = category === 'all'
    ? MEDITATIONS
    : MEDITATIONS.filter((m) => m.category === category);

  return (
    <div className="max-w-4xl mx-auto px-5 py-6 lg:py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Meditate</h1>
      <p className="text-gray-500 mb-6">Find peace in God&apos;s presence</p>

      {/* View Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          className={cn('chip', view === 'sessions' && 'chip-active')}
          onClick={() => setView('sessions')}
        >
          Guided Sessions
        </button>
        <button
          className={cn('chip', view === 'breathing' && 'chip-active')}
          onClick={() => setView('breathing')}
        >
          Breathing
        </button>
      </div>

      {view === 'sessions' && (
        <>
          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-6 -mx-5 px-5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={cn('chip whitespace-nowrap capitalize', category === cat && 'chip-active')}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sessions List */}
          <div className="space-y-3">
            {filtered.map((med) => (
              <Link
                key={med.id}
                href={`/meditate/${med.id}`}
                className="card flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-teal/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🍃</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-800 text-sm group-hover:text-primary transition-colors">
                      {med.title}
                    </h3>
                    {med.isPremium && <span className="text-xs text-secondary font-medium">✦ PRO</span>}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{med.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{med.duration} min · {med.scriptureRef}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all text-primary">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {view === 'breathing' && (
        <div className="space-y-3">
          {BREATHING_EXERCISES.map((ex) => (
            <Link
              key={ex.id}
              href={`/meditate/breathing/${ex.id}`}
              className="card group"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: ex.color + '20' }}
                >
                  <div
                    className="w-6 h-6 rounded-full animate-pulse"
                    style={{ backgroundColor: ex.color }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-sm group-hover:text-primary transition-colors">
                    {ex.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{ex.pattern} pattern · {ex.scriptureRef}</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3 italic">&ldquo;{ex.scripture}&rdquo;</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
