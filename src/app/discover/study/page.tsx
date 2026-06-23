'use client';

import { useState } from 'react';
import { STUDY_PLANS } from '@/lib/data/studyPlans';
import { cn } from '@/lib/utils';

export default function StudyPage() {
  const [activePlan, setActivePlan] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState(0);

  const plan = STUDY_PLANS.find((p) => p.id === activePlan);

  if (plan) {
    const day = plan.content[activeDay];
    return (
      <div className="max-w-3xl mx-auto px-5 py-6 lg:py-10">
        <button onClick={() => setActivePlan(null)} className="text-sm text-gray-400 hover:text-gray-600 mb-4 flex items-center gap-1">
          ← Back to plans
        </button>
        <h1 className="text-xl font-bold text-gray-900 mb-1">{plan.title}</h1>
        <p className="text-sm text-gray-500 mb-6">Day {activeDay + 1} of {plan.days}</p>

        <div className="progress-bar mb-6">
          <div className="progress-fill" style={{ width: `${((activeDay + 1) / plan.days) * 100}%` }} />
        </div>

        {/* Day Selector */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 -mx-5 px-5">
          {plan.content.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={cn(
                'w-9 h-9 rounded-full flex-shrink-0 text-sm font-medium transition-all',
                i === activeDay ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Day Content */}
        <div className="space-y-4">
          <div className="card">
            <h3 className="font-semibold text-gray-800 text-sm mb-1">{day.title}</h3>
          </div>
          <div className="card">
            <p className="section-title !mb-2">📖 Reading</p>
            <p className="text-sm text-primary font-medium">{day.reading}</p>
          </div>
          <div className="card">
            <p className="section-title !mb-2">🤔 Reflection</p>
            <p className="text-sm text-gray-600">{day.reflection}</p>
          </div>
          <div className="card">
            <p className="section-title !mb-2">🙏 Prayer</p>
            <p className="text-sm text-gray-600 italic">{day.prayer}</p>
          </div>
          <div className="card">
            <p className="section-title !mb-2">✅ Action Step</p>
            <p className="text-sm text-gray-600">{day.actionStep}</p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setActiveDay(Math.max(0, activeDay - 1))}
            disabled={activeDay === 0}
            className="btn-ghost flex-1 disabled:opacity-30"
          >
            ← Previous
          </button>
          <button
            onClick={() => setActiveDay(Math.min(plan.content.length - 1, activeDay + 1))}
            disabled={activeDay >= plan.content.length - 1}
            className="btn-primary flex-1 disabled:opacity-30"
          >
            Next Day →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-5 py-6 lg:py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Study Plans</h1>
      <p className="text-gray-500 mb-6">Grow deeper, one day at a time</p>

      <div className="space-y-3">
        {STUDY_PLANS.map((sp) => (
          <button
            key={sp.id}
            onClick={() => { setActivePlan(sp.id); setActiveDay(0); }}
            className="card w-full text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: sp.color + '20' }}>
                <span className="text-lg">📚</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-sm group-hover:text-primary transition-colors">{sp.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{sp.description}</p>
                <p className="text-xs text-gray-400 mt-1">{sp.days} days · {sp.topic}</p>
              </div>
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
