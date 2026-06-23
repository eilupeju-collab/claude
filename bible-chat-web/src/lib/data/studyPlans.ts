import { StudyPlan } from '@/types';

export const STUDY_PLANS: StudyPlan[] = [
  {
    id: 'sp-1', title: 'Overcoming Anxiety', description: 'Find God\'s peace in anxious times.',
    days: 7, topic: 'anxiety', color: '#7ECEC1',
    content: [
      { day: 1, title: 'God Knows Your Worries', reading: 'Matthew 6:25-34', reflection: 'What worry is consuming you today?', prayer: 'Lord, help me trust You with my fears.', actionStep: 'Write down your top 3 worries and place them in God\'s hands.' },
      { day: 2, title: 'Cast Your Cares', reading: '1 Peter 5:6-7', reflection: 'What does it mean to "cast" your anxiety?', prayer: 'God, I release my burdens to You.', actionStep: 'Practice the "release breath" — inhale peace, exhale worry.' },
      { day: 3, title: 'Peace Beyond Understanding', reading: 'Philippians 4:4-9', reflection: 'How can you guard your thoughts today?', prayer: 'Fill my mind with what is true, noble, and pure.', actionStep: 'Replace one negative thought with a verse today.' },
      { day: 4, title: 'God Is Your Refuge', reading: 'Psalm 91:1-6', reflection: 'Where do you run when afraid?', prayer: 'Be my shelter, Lord. I hide in You.', actionStep: 'Memorize one verse from today\'s reading.' },
      { day: 5, title: 'Do Not Fear', reading: 'Isaiah 41:10', reflection: 'How has God strengthened you in the past?', prayer: 'Thank You for never leaving me alone.', actionStep: 'Share today\'s verse with someone who needs encouragement.' },
      { day: 6, title: 'Present Moment Peace', reading: 'Psalm 46:1-7', reflection: 'Can you be still right now?', prayer: 'Help me be present with You, not lost in "what ifs."', actionStep: 'Practice 5 minutes of silence with God.' },
      { day: 7, title: 'Victory Over Anxiety', reading: 'Romans 8:31-39', reflection: 'What can separate you from God\'s love?', prayer: 'I am more than a conqueror through Christ.', actionStep: 'Celebrate your progress. Write a gratitude list.' },
    ],
  },
  {
    id: 'sp-2', title: 'The Power of Forgiveness', description: 'Release resentment and find freedom.',
    days: 7, topic: 'forgiveness', color: '#7B68AE',
    content: [
      { day: 1, title: 'Why Forgiveness Matters', reading: 'Matthew 6:14-15', reflection: 'Is there someone you haven\'t forgiven?', prayer: 'Lord, soften my heart toward those who hurt me.', actionStep: 'Acknowledge one unforgiveness in your life.' },
      { day: 2, title: 'God Forgave You First', reading: 'Ephesians 4:31-32', reflection: 'How much has God forgiven you?', prayer: 'Help me extend the same grace I\'ve received.', actionStep: 'Journal about God\'s forgiveness in your life.' },
      { day: 3, title: 'Joseph\'s Example', reading: 'Genesis 50:15-21', reflection: 'How did God use Joseph\'s pain for good?', prayer: 'Give me eyes to see Your redemptive purpose.', actionStep: 'Pray for the person you need to forgive.' },
      { day: 4, title: 'Seventy Times Seven', reading: 'Matthew 18:21-35', reflection: 'Is forgiveness a one-time act or ongoing?', prayer: 'Give me strength to keep choosing forgiveness.', actionStep: 'Write a letter of forgiveness (you don\'t have to send it).' },
      { day: 5, title: 'Forgiveness ≠ Approval', reading: 'Romans 12:17-21', reflection: 'How can you set boundaries while forgiving?', prayer: 'Help me forgive without enabling harm.', actionStep: 'Identify one healthy boundary you need.' },
      { day: 6, title: 'The Cross: Ultimate Forgiveness', reading: 'Luke 23:32-34', reflection: 'What does "Father, forgive them" mean to you?', prayer: 'Jesus, give me Your heart of mercy.', actionStep: 'Meditate on the cross for 5 minutes.' },
      { day: 7, title: 'Walking in Freedom', reading: 'Galatians 5:1, 13-14', reflection: 'How does forgiveness set YOU free?', prayer: 'I choose freedom over bitterness today.', actionStep: 'Declare your freedom out loud. Celebrate progress.' },
    ],
  },
];
