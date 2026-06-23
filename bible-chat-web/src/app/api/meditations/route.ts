import { NextResponse } from 'next/server';
import { MEDITATIONS, getMeditationsByCategory } from '@/lib/data/meditations';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const id = searchParams.get('id');

  if (id) {
    const meditation = MEDITATIONS.find((m) => m.id === id);
    if (!meditation) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ meditation });
  }

  if (category) {
    return NextResponse.json({ meditations: getMeditationsByCategory(category) });
  }

  return NextResponse.json({ meditations: MEDITATIONS });
}
