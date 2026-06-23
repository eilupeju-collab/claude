import { Prayer } from '@/types';

export const GUIDED_PRAYERS: Prayer[] = [
  {
    id: 'gp-1', title: 'Morning Offering', category: 'morning', timeOfDay: 'morning',
    content: 'Lord, I give you this day. Every thought, word, and action — let them honor You. Guide my steps, guard my heart, and use me as a vessel of Your love. In Jesus\' name, Amen.',
    scripture: 'This is the day the LORD has made; let us rejoice and be glad in it.',
    scriptureRef: 'Psalm 118:24',
  },
  {
    id: 'gp-2', title: 'Prayer for Peace', category: 'petition', timeOfDay: 'anytime',
    content: 'Father, my heart is anxious and my mind won\'t rest. I bring my worries to You — every one of them. Replace my fear with Your peace that passes understanding. Help me trust that You are in control. Amen.',
    scripture: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.',
    scriptureRef: 'Philippians 4:6',
  },
  {
    id: 'gp-3', title: 'Evening Gratitude', category: 'gratitude', timeOfDay: 'evening',
    content: 'Thank You, Lord, for this day — for the blessings I noticed and the ones I missed. Thank You for Your faithfulness, even when I wasn\'t faithful. As I rest tonight, I trust You with tomorrow. Amen.',
    scripture: 'Give thanks to the LORD, for he is good; his love endures forever.',
    scriptureRef: 'Psalm 107:1',
  },
  {
    id: 'gp-4', title: 'Prayer for Wisdom', category: 'wisdom', timeOfDay: 'anytime',
    content: 'God, I face a decision and I don\'t know what to do. You promise wisdom to those who ask — so here I am, asking. Open my eyes to see clearly. Quiet the noise and speak to my heart. I trust Your guidance. Amen.',
    scripture: 'If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault.',
    scriptureRef: 'James 1:5',
  },
  {
    id: 'gp-5', title: 'Prayer of Protection', category: 'protection', timeOfDay: 'morning',
    content: 'Lord, cover me and my family today with Your protection. Be our shield against harm, our refuge in trouble, and our strength in weakness. We trust in Your mighty hand. In Jesus\' name, Amen.',
    scripture: 'The LORD is my rock, my fortress and my deliverer; my God is my rock, in whom I take refuge.',
    scriptureRef: 'Psalm 18:2',
  },
  {
    id: 'gp-6', title: 'Confession & Renewal', category: 'confession', timeOfDay: 'evening',
    content: 'Father, I come with a humble heart. I\'ve fallen short today — in my words, my thoughts, my actions. Forgive me. Cleanse me. Create in me a clean heart and renew a right spirit within me. Thank You for Your grace. Amen.',
    scripture: 'If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.',
    scriptureRef: '1 John 1:9',
  },
  {
    id: 'gp-7', title: 'Prayer for Others', category: 'intercession', timeOfDay: 'anytime',
    content: 'Lord, I lift up those I love today. You know their needs better than I do. Meet them where they are — bring healing to the sick, comfort to the grieving, strength to the weary, and hope to the lost. Amen.',
    scripture: 'Therefore I tell you, whatever you ask for in prayer, believe that you have received it, and it will be yours.',
    scriptureRef: 'Mark 11:24',
  },
  {
    id: 'gp-8', title: 'Praise & Worship', category: 'praise', timeOfDay: 'anytime',
    content: 'God, You are worthy of all praise. I worship You — not for what You do, but for who You are. You are holy, faithful, loving, and good. My heart sings to You. All glory belongs to You alone. Amen.',
    scripture: 'Great is the LORD and most worthy of praise; his greatness no one can fathom.',
    scriptureRef: 'Psalm 145:3',
  },
];

export function getPrayersByCategory(category: string): Prayer[] {
  return GUIDED_PRAYERS.filter((p) => p.category === category);
}

export function getPrayersByTimeOfDay(time: string): Prayer[] {
  return GUIDED_PRAYERS.filter((p) => p.timeOfDay === time || p.timeOfDay === 'anytime');
}
