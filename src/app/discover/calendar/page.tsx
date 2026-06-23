'use client';

import { useState } from 'react';
import { CALENDAR_EVENTS } from '@/lib/data/community';
import { cn } from '@/lib/utils';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function CalendarPage() {
  const [month, setMonth] = useState(new Date().getMonth());
  const events = CALENDAR_EVENTS.filter((e) => new Date(e.date).getMonth() === month)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="max-w-3xl mx-auto px-5 py-6 lg:py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Christian Calendar</h1>
      <p className="text-gray-500 mb-6">Holy days, saints &amp; liturgical events</p>

      {/* Month Selector */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 -mx-5 px-5">
        {MONTHS.map((m, i) => (
          <button
            key={m}
            className={cn('chip whitespace-nowrap', month === i && 'chip-active')}
            onClick={() => setMonth(i)}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Events */}
      {events.length === 0 ? (
        <div className="text-center py-12">
          <span className="text-4xl mb-3 block">📅</span>
          <p className="text-gray-400">No events this month</p>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((ev) => (
            <div key={ev.id} className="card" style={{ borderLeftWidth: 4, borderLeftColor: ev.color }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: ev.color + '15', color: ev.color }}>
                  {new Date(ev.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                <span className="text-xs text-gray-400 capitalize">{ev.type.replace('_', ' ')}</span>
              </div>
              <h3 className="font-semibold text-gray-800 text-sm">{ev.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{ev.description}</p>
              {ev.scriptures && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  {ev.scriptures.map((s) => (
                    <span key={s} className="text-xs text-primary bg-primary-50 px-2 py-0.5 rounded-full">{s}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
