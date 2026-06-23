'use client';

import { useState } from 'react';
import { KIDS_STORIES } from '@/lib/data/community';
import { cn } from '@/lib/utils';

const CATEGORIES = ['all', 'creation', 'heroes', 'parables', 'christmas'];

export default function KidsPage() {
  const [category, setCategory] = useState('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = category === 'all'
    ? KIDS_STORIES
    : KIDS_STORIES.filter((s) => s.category === category);

  return (
    <div className="max-w-3xl mx-auto px-5 py-6 lg:py-10">
      <div className="text-center mb-6">
        <span className="text-4xl">📖✨</span>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Kids Bible</h1>
        <p className="text-gray-500 text-sm">Fun stories about God&apos;s love</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 -mx-5 px-5 justify-center">
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

      <div className="space-y-3">
        {filtered.map((story) => (
          <div key={story.id} className="card" style={{ borderLeftWidth: 4, borderLeftColor: story.color }}>
            <button
              className="w-full text-left"
              onClick={() => setExpanded(expanded === story.id ? null : story.id)}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{story.emoji}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-sm">{story.title}</h3>
                  <p className="text-xs text-gray-500">{story.subtitle} · Ages {story.ageRange} · {story.duration}</p>
                </div>
              </div>
            </button>
            {expanded === story.id && (
              <div className="mt-4 pt-3 border-t border-gray-100 animate-fade-in space-y-3">
                <p className="text-sm text-gray-600">{story.summary}</p>
                <div className="bg-amber-50 rounded-xl p-3">
                  <p className="text-xs font-semibold text-amber-700 mb-1">💡 Lesson</p>
                  <p className="text-sm text-gray-700">{story.moralLesson}</p>
                </div>
                <p className="text-xs text-primary font-medium">{story.scripture}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
