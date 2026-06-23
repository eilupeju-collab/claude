import { NextResponse } from 'next/server';

// Simulated AI responses for demo (in production, connect to OpenAI/Anthropic)
const RESPONSES: Record<string, { answer: string; references: string[] }> = {
  anxiety: {
    answer: 'The Bible speaks directly to anxiety in many places. God knows our tendency to worry and offers us a clear path to peace:\n\n1. **Cast your cares** — "Cast all your anxiety on him because he cares for you" (1 Peter 5:7). God invites you to literally throw your worries onto Him.\n\n2. **Pray instead of worry** — "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God" (Philippians 4:6).\n\n3. **Trust His provision** — Jesus said, "Look at the birds of the air; they do not sow or reap, yet your heavenly Father feeds them. Are you not much more valuable than they?" (Matthew 6:26).\n\nThe key is not suppressing anxiety but redirecting it — turning worry into prayer, fear into faith.',
    references: ['1 Peter 5:7', 'Philippians 4:6-7', 'Matthew 6:25-34', 'Isaiah 41:10'],
  },
  forgiveness: {
    answer: 'Forgiveness is central to the Christian faith. Here\'s what Scripture teaches:\n\n1. **God forgives completely** — "As far as the east is from the west, so far has he removed our transgressions from us" (Psalm 103:12).\n\n2. **We are called to forgive others** — "Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you" (Colossians 3:13).\n\n3. **Forgiveness is ongoing** — When Peter asked if seven times was enough, Jesus said "seventy-seven times" (Matthew 18:22), meaning limitlessly.\n\nForgiveness doesn\'t mean the offense was okay. It means you\'re choosing freedom over bitterness.',
    references: ['Colossians 3:13', 'Matthew 18:21-22', 'Psalm 103:12', 'Ephesians 4:32'],
  },
  purpose: {
    answer: 'God has a purpose for your life — Scripture is clear about this:\n\n1. **You were created intentionally** — "For we are God\'s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do" (Ephesians 2:10).\n\n2. **God has plans for you** — "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future" (Jeremiah 29:11).\n\n3. **Your purpose is found in relationship** — The Westminster Catechism says our chief purpose is "to glorify God and enjoy Him forever." Purpose flows from connection with God.\n\nStart by asking: Where do my gifts, passions, and the world\'s needs intersect?',
    references: ['Ephesians 2:10', 'Jeremiah 29:11', 'Romans 8:28', 'Proverbs 3:5-6'],
  },
};

export async function POST(request: Request) {
  const body = await request.json();
  const { message } = body;

  if (!message) {
    return NextResponse.json({ error: 'Message required' }, { status: 400 });
  }

  // Simple keyword matching for demo
  const lower = message.toLowerCase();
  let response = {
    answer: 'That\'s a wonderful question. The Bible has much to say about this topic. Let me share some key passages:\n\n"Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight" (Proverbs 3:5-6).\n\nGod invites us to bring all our questions to Him. Keep seeking, and He will reveal His truth to you step by step.',
    references: ['Proverbs 3:5-6', 'James 1:5', 'Jeremiah 33:3'],
  };

  if (lower.includes('anxi') || lower.includes('worry') || lower.includes('fear')) {
    response = RESPONSES.anxiety;
  } else if (lower.includes('forgiv')) {
    response = RESPONSES.forgiveness;
  } else if (lower.includes('purpose') || lower.includes('meaning') || lower.includes('calling')) {
    response = RESPONSES.purpose;
  }

  // Simulate slight delay for natural feel
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({
    id: `msg-${Date.now()}`,
    role: 'assistant',
    content: response.answer,
    references: response.references,
    timestamp: new Date().toISOString(),
  });
}
