'use client';

import { useState } from 'react';
import { GUIDED_PRAYERS } from '@/lib/data/prayers';
import { cn } from '@/lib/utils';

const CATEGORIES = ['all', 'morning', 'evening', 'gratitude', 'petition', 'intercession', 'confession', 'praise', 'wisdom', 'protection'];

export default function PrayPage() {
  const [category, setCategory] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [journalEntry, setJournalEntry] = useState('');
  const [showJournal, setShowJournal] = useState(false);

  const filtered = category === 'all'
    ? GUIDED_PRAYERS
    : GUIDED_PRAYERS.filter((p) => p.category === category);

  return (
    <div className="max-w-4xl mx-auto px-5 py-6 lg:py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pray</h1>
          <p className="text-gray-500 mt-1">Draw near to God</p>
        </div>
        <button
          className="btn-secondary text-sm"
          onClick={() => setShowJournal(!showJournal)}
        >
          {showJournal ? 'Guided Prayers' : '📝 Journal'}
        </button>
      </div>

      {!showJournal ? (
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

          {/* Prayers */}
          <div className="space-y-3">
            {filtered.map((prayer) => {
              const isExpanded = expandedId === prayer.id;
              return (
                <div key={prayer.id} className="card">
                  <button
                    className="w-full text-left"
                    onClick={() => setExpandedId(isExpanded ? null : prayer.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">{prayer.title}</h3>
                        <p className="text-xs text-gray-400 capitalize mt-0.5">
                          {prayer.category} {prayer.timeOfDay && `· ${prayer.timeOfDay}`}
                        </p>
                      </div>
                      <svg
                        className={cn('w-4 h-4 text-gray-400 transition-transform', isExpanded && 'rotate-180')}
                        fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in">
                      <p className="text-gray-700 leading-relaxed text-sm">{prayer.content}</p>
                      {prayer.scripture && (
                        <div className="mt-4 bg-primary-50/50 rounded-xl p-4">
                          <p className="verse-text text-sm">&ldquo;{prayer.scripture}&rdquo;</p>
                          <p className="text-xs text-primary font-medium mt-2">{prayer.scriptureRef}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Prayer Journal */
        <div className="animate-fade-in">
          <div className="card mb-4">
            <h3 className="font-semibold text-gray-800 mb-3">Write Your Prayer</h3>
            <textarea
              className="input-field min-h-[120px] resize-none"
              placeholder="Pour out your heart to God..."
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
            />
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-400">{journalEntry.length}/500</span>
              <button className="btn-primary text-sm py-2" disabled={!journalEntry.trim()}>
                Save Prayer
              </button>
            </div>
          </div>

          <h3 className="section-title mt-6">Recent Prayers</h3>
          <div className="space-y-3">
            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-xs text-green-600 font-medium">Answered</span>
                <span className="text-xs text-gray-400 ml-auto">2 days ago</span>
              </div>
              <p className="text-sm text-gray-700">Lord, give me patience with my coworker...</p>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs text-primary font-medium">Active</span>
                <span className="text-xs text-gray-400 ml-auto">5 days ago</span>
              </div>
              <p className="text-sm text-gray-700">Father, heal my relationship with my sister...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
