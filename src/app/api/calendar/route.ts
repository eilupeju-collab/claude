import { NextResponse } from 'next/server';
import { CALENDAR_EVENTS } from '@/lib/data/community';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const month = searchParams.get('month');
  const type = searchParams.get('type');

  let events = [...CALENDAR_EVENTS];

  if (month) {
    events = events.filter((e) => {
      const eventMonth = new Date(e.date).getMonth();
      return eventMonth === parseInt(month);
    });
  }

  if (type) {
    events = events.filter((e) => e.type === type);
  }

  events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return NextResponse.json({ events });
}
