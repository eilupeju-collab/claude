import { NextResponse } from 'next/server';
import { TRIVIA_QUESTIONS } from '@/lib/data/community';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const difficulty = searchParams.get('difficulty');
  const category = searchParams.get('category');
  const limit = parseInt(searchParams.get('limit') || '8');

  let questions = [...TRIVIA_QUESTIONS];

  if (difficulty) {
    questions = questions.filter((q) => q.difficulty === difficulty);
  }
  if (category) {
    questions = questions.filter((q) => q.category === category);
  }

  // Shuffle and limit
  const shuffled = questions.sort(() => Math.random() - 0.5).slice(0, limit);
  return NextResponse.json({ questions: shuffled });
}
