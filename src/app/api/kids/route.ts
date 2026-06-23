import { NextResponse } from 'next/server';
import { KIDS_STORIES } from '@/lib/data/community';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const id = searchParams.get('id');

  if (id) {
    const story = KIDS_STORIES.find((s) => s.id === id);
    if (!story) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ story });
  }

  let stories = [...KIDS_STORIES];
  if (category && category !== 'all') {
    stories = stories.filter((s) => s.category === category);
  }

  return NextResponse.json({ stories });
}
