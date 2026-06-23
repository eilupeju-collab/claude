import { Verse } from '@/types';

export const DAILY_VERSES: Verse[] = [
  { id: 'v1', text: 'Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.', reference: 'Psalm 46:10', book: 'Psalms', chapter: 46, verse: 10, translation: 'NIV', category: 'peace' },
  { id: 'v2', text: 'For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.', reference: 'Jeremiah 29:11', book: 'Jeremiah', chapter: 29, verse: 11, translation: 'NIV', category: 'hope' },
  { id: 'v3', text: 'Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.', reference: 'Proverbs 3:5-6', book: 'Proverbs', chapter: 3, verse: 5, translation: 'NIV', category: 'wisdom' },
  { id: 'v4', text: 'The LORD is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.', reference: 'Psalm 23:1-3', book: 'Psalms', chapter: 23, verse: 1, translation: 'NIV', category: 'comfort' },
  { id: 'v5', text: 'I can do all this through him who gives me strength.', reference: 'Philippians 4:13', book: 'Philippians', chapter: 4, verse: 13, translation: 'NIV', category: 'strength' },
  { id: 'v6', text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.', reference: 'Romans 8:28', book: 'Romans', chapter: 8, verse: 28, translation: 'NIV', category: 'hope' },
  { id: 'v7', text: 'Cast all your anxiety on him because he cares for you.', reference: '1 Peter 5:7', book: '1 Peter', chapter: 5, verse: 7, translation: 'NIV', category: 'peace' },
  { id: 'v8', text: 'The LORD is close to the brokenhearted and saves those who are crushed in spirit.', reference: 'Psalm 34:18', book: 'Psalms', chapter: 34, verse: 18, translation: 'NIV', category: 'comfort' },
  { id: 'v9', text: 'But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.', reference: 'Isaiah 40:31', book: 'Isaiah', chapter: 40, verse: 31, translation: 'NIV', category: 'strength' },
  { id: 'v10', text: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.', reference: 'Philippians 4:6', book: 'Philippians', chapter: 4, verse: 6, translation: 'NIV', category: 'peace' },
  { id: 'v11', text: 'The LORD is my light and my salvation—whom shall I fear? The LORD is the stronghold of my life—of whom shall I be afraid?', reference: 'Psalm 27:1', book: 'Psalms', chapter: 27, verse: 1, translation: 'NIV', category: 'strength' },
  { id: 'v12', text: 'Come to me, all you who are weary and burdened, and I will give you rest.', reference: 'Matthew 11:28', book: 'Matthew', chapter: 11, verse: 28, translation: 'NIV', category: 'comfort' },
  { id: 'v13', text: 'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.', reference: 'Joshua 1:9', book: 'Joshua', chapter: 1, verse: 9, translation: 'NIV', category: 'strength' },
  { id: 'v14', text: 'His mercies are new every morning; great is your faithfulness.', reference: 'Lamentations 3:23', book: 'Lamentations', chapter: 3, verse: 23, translation: 'NIV', category: 'hope' },
  { id: 'v15', text: 'Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.', reference: 'John 14:27', book: 'John', chapter: 14, verse: 27, translation: 'NIV', category: 'peace' },
];

export function getDailyVerse(): Verse {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return DAILY_VERSES[dayOfYear % DAILY_VERSES.length];
}

export function getVersesByCategory(category: string): Verse[] {
  return DAILY_VERSES.filter((v) => v.category === category);
}
