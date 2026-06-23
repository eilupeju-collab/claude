import { NextResponse } from 'next/server';
import { STUDY_PLANS } from '@/lib/data/studyPlans';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const topic = searchParams.get('topic');

  if (id) {
    const plan = STUDY_PLANS.find((p) => p.id === id);
    if (!plan) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ plan });
  }

  let plans = [...STUDY_PLANS];
  if (topic) {
    plans = plans.filter((p) => p.topic === topic);
  }

  return NextResponse.json({
    plans: plans.map(({ content, ...rest }) => ({ ...rest, dayCount: content.length })),
  });
}
