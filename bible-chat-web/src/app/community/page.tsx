'use client';

import { useState } from 'react';
import { COMMUNITY_PRAYERS } from '@/lib/data/community';
import { cn, timeAgo } from '@/lib/utils';

const CATEGORIES = ['All', 'Health', 'Work', 'Relationships', 'Personal', 'Guidance', 'Praise'];

export default function CommunityPage() {
  const [prayers, setPrayers] = useState(COMMUNITY_PRAYERS);
  const [category, setCategory] = useState('All');
  const [showSubmit, setShowSubmit] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('Personal');

  const filtered = category === 'All' ? prayers : prayers.filter((p) => p.category === category);
  const totalPraying = prayers.reduce((s, p) => s + p.prayerCount, 0);

  const handlePray = (id: string) => {
    setPrayers((prev) => prev.map((p) =>
      p.id === id ? { ...p, prayerCount: p.prayerCount + 1 } : p
    ));
  };

  const handleSubmit = () => {
    if (!newContent.trim()) return;
    const p = {
      id: `cp-${Date.now()}`, author: 'You', content: newContent.trim(),
      category: newCategory, prayerCount: 0, createdAt: new Date().toISOString(), isAnonymous: false,
    };
    setPrayers([p, ...prayers]);
    setNewContent(''); setShowSubmit(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-5 py-6 lg:py-10">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-gray-900">Live Prayer</h1>
        <button onClick={() => setShowSubmit(true)} className="btn-primary text-sm py-2 px-4">+ Share</button>
      </div>
      <div className="flex items-center gap-2 mb-6">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-sm text-gray-400">{totalPraying.toLocaleString()} prayers lifted</span>
      </div>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-5 px-5">
        {CATEGORIES.map((cat) => (
          <button key={cat} className={cn('chip whitespace-nowrap', category === cat && 'chip-active')} onClick={() => setCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      {/* Prayers */}
      <div className="space-y-3">
        {filtered.map((prayer) => (
          <div key={prayer.id} className="card">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary-50 flex items-center justify-center text-xs text-primary font-bold">
                  {prayer.author[0]}
                </div>
                <span className="text-sm font-medium text-gray-700">{prayer.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="chip text-xs py-0.5">{prayer.category}</span>
                <span className="text-xs text-gray-300">{timeAgo(prayer.createdAt)}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">{prayer.content}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">{prayer.prayerCount} praying</span>
              <button onClick={() => handlePray(prayer.id)} className="chip text-xs gap-1 hover:bg-primary hover:text-white">
                ❤️ Pray
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Modal */}
      {showSubmit && (
        <div className="fixed inset-0 bg-black/40 flex items-end lg:items-center justify-center z-50" onClick={() => setShowSubmit(false)}>
          <div className="bg-white rounded-t-3xl lg:rounded-3xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Share Your Prayer</h2>
            <textarea
              className="input-field min-h-[100px] resize-none mb-4"
              placeholder="What's on your heart?"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              maxLength={300}
            />
            <div className="flex gap-2 flex-wrap mb-4">
              {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <button key={cat} className={cn('chip text-xs', newCategory === cat && 'chip-active')} onClick={() => setNewCategory(cat)}>
                  {cat}
                </button>
              ))}
            </div>
            <button onClick={handleSubmit} className="btn-primary w-full" disabled={!newContent.trim()}>Share Prayer</button>
          </div>
        </div>
      )}
    </div>
  );
}
