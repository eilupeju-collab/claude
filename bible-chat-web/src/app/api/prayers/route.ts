import { NextResponse } from 'next/server';
import { GUIDED_PRAYERS, getPrayersByCategory, getPrayersByTimeOfDay } from '@/lib/data/prayers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const timeOfDay = searchParams.get('time');

  if (category) {
    return NextResponse.json({ prayers: getPrayersByCategory(category) });
  }

  if (timeOfDay) {
    return NextResponse.json({ prayers: getPrayersByTimeOfDay(timeOfDay) });
  }

  return NextResponse.json({ prayers: GUIDED_PRAYERS });
}
