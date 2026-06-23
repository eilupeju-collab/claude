import { NextResponse } from 'next/server';
import { BREATHING_EXERCISES } from '@/lib/data/meditations';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const exercise = BREATHING_EXERCISES.find((e) => e.id === id);
    if (!exercise) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ exercise });
  }

  return NextResponse.json({ exercises: BREATHING_EXERCISES });
}
