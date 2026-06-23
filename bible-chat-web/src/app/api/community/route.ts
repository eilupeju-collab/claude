import { NextResponse } from 'next/server';
import { COMMUNITY_PRAYERS } from '@/lib/data/community';

// In-memory store for demo (would be a DB in production)
let prayers = [...COMMUNITY_PRAYERS];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  let result = prayers;
  if (category && category !== 'All') {
    result = prayers.filter((p) => p.category === category);
  }

  return NextResponse.json({ prayers: result, total: result.length });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { content, category, author, isAnonymous } = body;

  if (!content || !category) {
    return NextResponse.json({ error: 'Content and category required' }, { status: 400 });
  }

  const newPrayer = {
    id: `cp-${Date.now()}`,
    author: isAnonymous ? 'Anonymous' : (author || 'User'),
    content,
    category,
    prayerCount: 0,
    createdAt: new Date().toISOString(),
    isAnonymous: !!isAnonymous,
  };

  prayers = [newPrayer, ...prayers];
  return NextResponse.json({ prayer: newPrayer }, { status: 201 });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, action } = body;

  if (action === 'pray') {
    prayers = prayers.map((p) =>
      p.id === id ? { ...p, prayerCount: p.prayerCount + 1 } : p
    );
    const updated = prayers.find((p) => p.id === id);
    return NextResponse.json({ prayer: updated });
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}
