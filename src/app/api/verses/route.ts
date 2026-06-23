import { NextResponse } from 'next/server';
import { DAILY_VERSES, getDailyVerse, getVersesByCategory } from '@/lib/data/verses';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const daily = searchParams.get('daily');

  if (daily === 'true') {
    return NextResponse.json({ verse: getDailyVerse() });
  }

  if (category) {
    return NextResponse.json({ verses: getVersesByCategory(category) });
  }

  return NextResponse.json({ verses: DAILY_VERSES });
}
