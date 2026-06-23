'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const COMFORT_VERSES = [
  { text: 'God is our refuge and strength, an ever-present help in trouble.', ref: 'Psalm 46:1' },
  { text: 'The LORD is close to the brokenhearted and saves those who are crushed in spirit.', ref: 'Psalm 34:18' },
  { text: 'When you pass through the waters, I will be with you.', ref: 'Isaiah 43:2' },
  { text: 'Cast all your anxiety on him because he cares for you.', ref: '1 Peter 5:7' },
  { text: 'Peace I leave with you; my peace I give you.', ref: 'John 14:27' },
];

const MOODS = [
  { emoji: '😊', label: 'Great', value: 5 },
  { emoji: '🙂', label: 'Good', value: 4 },
  { emoji: '😐', label: 'Okay', value: 3 },
  { emoji: '😔', label: 'Low', value: 2 },
  { emoji: '😢', label: 'Struggling', value: 1 },
];

export default function WellnessPage() {
  const [view, setView] = useState<'home' | 'panic' | 'mood'>('home');
  const [panicPhase, setPanicPhase] = useState(0);
  const [breathCount, setBreathCount] = useState(0);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  // Panic button phases
  const startPanic = () => { setView('panic'); setPanicPhase(0); setBreathCount(0); };

  useEffect(() => {
    if (view !== 'panic' || panicPhase !== 1) return;
    const interval = setInterval(() => {
      setBreathCount((c) => {
        if (c >= 4) { setPanicPhase(2); return c; }
        return c + 1;
      });
    }, 8000);
    return () => clearInterval(interval);
  }, [view, panicPhase]);

  if (view === 'panic') {
    const verse = COMFORT_VERSES[breathCount % COMFORT_VERSES.length];
    return (
      <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col items-center justify-center px-8 text-center">
        <button onClick={() => setView('home')} className="absolute top-6 right-6 text-gray-500 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {panicPhase === 0 && (
          <div className="animate-fade-in">
            <p className="text-gray-400 text-sm mb-4">You are safe. God is here.</p>
            <h2 className="text-white text-2xl font-bold mb-6">5-4-3-2-1 Grounding</h2>
            <div className="space-y-3 text-left max-w-xs mb-8">
              <p className="text-gray-300 text-sm">👀 Name <strong>5</strong> things you can see</p>
              <p className="text-gray-300 text-sm">✋ Name <strong>4</strong> things you can touch</p>
              <p className="text-gray-300 text-sm">👂 Name <strong>3</strong> things you can hear</p>
              <p className="text-gray-300 text-sm">👃 Name <strong>2</strong> things you can smell</p>
              <p className="text-gray-300 text-sm">👅 Name <strong>1</strong> thing you can taste</p>
            </div>
            <button onClick={() => setPanicPhase(1)} className="bg-accent-teal text-white px-8 py-3 rounded-full font-medium">
              I&apos;m ready to breathe
            </button>
          </div>
        )}

        {panicPhase === 1 && (
          <div className="animate-fade-in">
            <p className="text-gray-400 text-sm mb-4">Breathe: 4 in, 7 hold, 8 out</p>
            <div className="w-40 h-40 rounded-full bg-accent-teal/20 flex items-center justify-center animate-breathe mb-6">
              <div className="w-20 h-20 rounded-full bg-accent-teal/50 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-accent-teal" />
              </div>
            </div>
            <p className="text-gray-400 text-sm">Breath {breathCount + 1} of 5</p>
          </div>
        )}

        {panicPhase === 2 && (
          <div className="animate-fade-in">
            <span className="text-5xl mb-6 block">🕊️</span>
            <p className="text-white font-serif italic text-lg max-w-sm leading-relaxed">
              &ldquo;{verse.text}&rdquo;
            </p>
            <p className="text-accent-teal text-sm font-medium mt-3">&mdash; {verse.ref}</p>
            <p className="text-gray-500 text-sm mt-8">You did it. God is with you.</p>
            <button onClick={() => setView('home')} className="mt-6 bg-white/10 text-white px-6 py-2.5 rounded-full text-sm">
              I&apos;m feeling better
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-5 py-6 lg:py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Wellness</h1>
      <p className="text-gray-500 mb-8">God cares about how you feel</p>

      {/* Panic Button */}
      <button onClick={startPanic} className="w-full card-elevated bg-gradient-to-r from-amber-50 to-orange-50 border-0 mb-6 group text-left">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-accent-amber/20 flex items-center justify-center text-2xl">⚡</div>
          <div>
            <h3 className="font-semibold text-gray-800 group-hover:text-amber-700">Panic Button</h3>
            <p className="text-sm text-gray-500">Feeling overwhelmed? Tap for instant calm.</p>
          </div>
        </div>
      </button>

      {/* Mood Check-in */}
      <section className="mb-8">
        <h2 className="section-title">How are you feeling?</h2>
        <div className="card">
          <div className="flex justify-around mb-4">
            {MOODS.map((m) => (
              <button
                key={m.value}
                onClick={() => setSelectedMood(m.value)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                  selectedMood === m.value ? 'bg-primary-50 scale-110' : 'hover:bg-gray-50'
                }`}
              >
                <span className="text-2xl">{m.emoji}</span>
                <span className="text-[10px] text-gray-500">{m.label}</span>
              </button>
            ))}
          </div>
          {selectedMood && (
            <div className="animate-fade-in pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-400 mb-2">God cares about your feelings.</p>
              <button className="btn-primary text-sm py-2 w-full">Save Check-in</button>
            </div>
          )}
        </div>
      </section>

      {/* Quick Links */}
      <section>
        <h2 className="section-title">Quick Relief</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/meditate" className="card text-center py-5 group">
            <span className="text-2xl">🧘</span>
            <p className="text-sm font-medium text-gray-700 mt-2 group-hover:text-primary">Meditate</p>
          </Link>
          <Link href="/meditate" className="card text-center py-5 group">
            <span className="text-2xl">🌬️</span>
            <p className="text-sm font-medium text-gray-700 mt-2 group-hover:text-primary">Breathe</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
