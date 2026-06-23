'use client';

import { useState, useEffect } from 'react';
import { BREATHING_EXERCISES } from '@/lib/data/meditations';
import { useParams, useRouter } from 'next/navigation';

export default function BreathingPage() {
  const params = useParams();
  const router = useRouter();
  const exercise = BREATHING_EXERCISES.find((e) => e.id === params.id);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale'|'hold'|'exhale'|'holdAfter'>('inhale');
  const [count, setCount] = useState(0);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    if (!isActive || !exercise) return;
    const timer = setInterval(() => {
      setCount((c) => {
        const max = phase === 'inhale' ? exercise.inhale
          : phase === 'hold' ? exercise.hold
          : phase === 'exhale' ? exercise.exhale
          : (exercise.holdAfter || 0);
        if (c + 1 >= max) {
          // Move to next phase
          if (phase === 'inhale') setPhase(exercise.hold > 0 ? 'hold' : 'exhale');
          else if (phase === 'hold') setPhase('exhale');
          else if (phase === 'exhale') {
            if (exercise.holdAfter && exercise.holdAfter > 0) setPhase('holdAfter');
            else { setPhase('inhale'); setCycles((cy) => cy + 1); }
          } else { setPhase('inhale'); setCycles((cy) => cy + 1); }
          return 0;
        }
        return c + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isActive, phase, exercise]);

  if (!exercise) {
    return <div className="max-w-2xl mx-auto px-5 py-10 text-center"><p className="text-gray-400">Not found</p></div>;
  }

  const scaleMap = { inhale: 'scale-125', hold: 'scale-125', exhale: 'scale-100', holdAfter: 'scale-100' };
  const labelMap = { inhale: 'Breathe In', hold: 'Hold', exhale: 'Breathe Out', holdAfter: 'Hold' };

  return (
    <div className="max-w-2xl mx-auto px-5 py-6 min-h-[80vh] flex flex-col items-center">
      <div className="flex items-center justify-between w-full mb-8">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-sm font-medium text-gray-700">{exercise.name}</span>
        <span className="text-sm text-gray-400">{exercise.pattern}</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {/* Animated Circle */}
        <div className={`w-48 h-48 rounded-full flex items-center justify-center transition-transform duration-[2000ms] ease-in-out ${isActive ? scaleMap[phase] : 'scale-100'}`}
          style={{ backgroundColor: exercise.color + '20' }}>
          <div className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-[2000ms]`}
            style={{ backgroundColor: exercise.color + '40' }}>
            <div className="w-12 h-12 rounded-full" style={{ backgroundColor: exercise.color }} />
          </div>
        </div>

        {/* Phase Label */}
        <p className="text-xl font-semibold text-gray-800 mt-8">
          {isActive ? labelMap[phase] : 'Ready'}
        </p>
        <p className="text-sm text-gray-400 mt-2">{isActive ? `Cycle ${cycles + 1}` : 'Tap Start to begin'}</p>

        {/* Scripture */}
        <div className="mt-8 max-w-sm bg-white rounded-2xl p-5 shadow-soft">
          <p className="verse-text text-sm">&ldquo;{exercise.scripture}&rdquo;</p>
          <p className="verse-ref text-xs">&mdash; {exercise.scriptureRef}</p>
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={() => { setIsActive(!isActive); if (!isActive) { setCount(0); setPhase('inhale'); setCycles(0); } }}
        className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-medium mb-8"
        style={{ backgroundColor: exercise.color }}
      >
        {isActive ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
        ) : (
          <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        )}
      </button>
    </div>
  );
}
