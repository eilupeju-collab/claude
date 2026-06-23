import { Meditation, BreathingExercise } from '@/types';

export const MEDITATIONS: Meditation[] = [
  {
    id: 'med-1', title: 'Be Still & Know', description: 'A gentle meditation on God\'s presence and sovereignty.',
    duration: 10, category: 'peace', scripture: 'Be still, and know that I am God.', scriptureRef: 'Psalm 46:10', isPremium: false,
    steps: [
      { instruction: 'Close your eyes and take three deep breaths.', duration: 30, type: 'breathe' },
      { instruction: 'Let go of the day\'s worries. God holds everything.', duration: 60, type: 'reflect' },
      { instruction: 'Breathe in peace. Breathe out tension.', duration: 45, type: 'breathe' },
      { instruction: 'Meditate on: "Be still, and know that I am God."', duration: 90, type: 'reflect' },
      { instruction: 'Rest in His presence. You are safe here.', duration: 60, type: 'listen' },
    ],
  },
  {
    id: 'med-2', title: 'Release Anxiety', description: 'Cast your worries onto the God who cares for you deeply.',
    duration: 12, category: 'anxiety', scripture: 'Cast all your anxiety on him because he cares for you.', scriptureRef: '1 Peter 5:7', isPremium: false,
    steps: [
      { instruction: 'Settle into a comfortable position.', duration: 20, type: 'breathe' },
      { instruction: 'Name one thing causing you anxiety today.', duration: 45, type: 'reflect' },
      { instruction: 'Picture yourself placing it in God\'s hands.', duration: 60, type: 'reflect' },
      { instruction: 'Breathe deeply. He carries what you cannot.', duration: 45, type: 'breathe' },
      { instruction: 'Pray: "Lord, I give this to you."', duration: 60, type: 'pray' },
    ],
  },
  {
    id: 'med-3', title: 'Morning Light', description: 'Start your day grounded in God\'s love and purpose.',
    duration: 8, category: 'morning', scripture: 'His mercies are new every morning; great is your faithfulness.', scriptureRef: 'Lamentations 3:23', isPremium: false,
    steps: [
      { instruction: 'Good morning. Take a deep breath.', duration: 20, type: 'breathe' },
      { instruction: 'Thank God for this new day — a fresh start.', duration: 45, type: 'pray' },
      { instruction: 'His mercies are new every morning.', duration: 60, type: 'reflect' },
      { instruction: 'Set an intention: How will you walk with God today?', duration: 45, type: 'reflect' },
    ],
  },
  {
    id: 'med-4', title: 'Gratitude Garden', description: 'Cultivate a thankful heart through guided reflection.',
    duration: 10, category: 'gratitude', scripture: 'Give thanks in all circumstances; for this is God\'s will for you.', scriptureRef: '1 Thessalonians 5:18', isPremium: false,
    steps: [
      { instruction: 'Breathe slowly and settle your mind.', duration: 30, type: 'breathe' },
      { instruction: 'Think of 3 things you\'re grateful for today.', duration: 60, type: 'reflect' },
      { instruction: 'Thank God specifically for each one.', duration: 60, type: 'pray' },
      { instruction: 'Feel the warmth of gratitude in your heart.', duration: 45, type: 'listen' },
    ],
  },
  {
    id: 'med-5', title: 'Healing Waters', description: 'A restorative meditation for body, mind, and spirit.',
    duration: 15, category: 'healing', scripture: 'He heals the brokenhearted and binds up their wounds.', scriptureRef: 'Psalm 147:3', isPremium: true,
    steps: [
      { instruction: 'Relax your body from head to toe.', duration: 60, type: 'breathe' },
      { instruction: 'Invite God\'s healing presence into your pain.', duration: 60, type: 'pray' },
      { instruction: 'Imagine cool, healing waters washing over you.', duration: 90, type: 'reflect' },
      { instruction: 'God is restoring what is broken.', duration: 60, type: 'listen' },
    ],
  },
  {
    id: 'med-6', title: 'Forgiveness Journey', description: 'Release resentment and find freedom through God\'s grace.',
    duration: 12, category: 'forgiveness', scripture: 'Bear with each other and forgive one another.', scriptureRef: 'Colossians 3:13', isPremium: true,
    steps: [
      { instruction: 'Center yourself with slow, deep breaths.', duration: 30, type: 'breathe' },
      { instruction: 'Think of someone you need to forgive.', duration: 60, type: 'reflect' },
      { instruction: 'Ask God for the strength to release this burden.', duration: 60, type: 'pray' },
      { instruction: 'Forgiveness is a gift you give yourself.', duration: 45, type: 'reflect' },
    ],
  },
  {
    id: 'med-7', title: 'Peaceful Sleep', description: 'Drift into restful sleep wrapped in God\'s promises.',
    duration: 15, category: 'sleep', scripture: 'In peace I will lie down and sleep, for you alone, LORD, make me dwell in safety.', scriptureRef: 'Psalm 4:8', isPremium: false,
    steps: [
      { instruction: 'Lie down comfortably and close your eyes.', duration: 30, type: 'breathe' },
      { instruction: 'Release the events of today. They are done.', duration: 60, type: 'reflect' },
      { instruction: 'Breathe slowly: 4 in, 7 hold, 8 out.', duration: 90, type: 'breathe' },
      { instruction: 'God watches over you as you sleep.', duration: 60, type: 'listen' },
    ],
  },
  {
    id: 'med-8', title: 'Strength for Today', description: 'Receive divine strength for the challenges ahead.',
    duration: 10, category: 'peace', scripture: 'I can do all this through him who gives me strength.', scriptureRef: 'Philippians 4:13', isPremium: false,
    steps: [
      { instruction: 'Stand or sit tall. Take a warrior breath.', duration: 20, type: 'breathe' },
      { instruction: 'God\'s strength flows into you right now.', duration: 60, type: 'reflect' },
      { instruction: 'Name the challenge ahead of you today.', duration: 45, type: 'reflect' },
      { instruction: 'Declare: "I can do this through Christ."', duration: 45, type: 'pray' },
    ],
  },
];

export const BREATHING_EXERCISES: BreathingExercise[] = [
  {
    id: 'breath-1', name: 'Be Still', pattern: '4-7-8',
    inhale: 4, hold: 7, exhale: 8,
    scripture: 'Be still, and know that I am God.',
    scriptureRef: 'Psalm 46:10',
    description: 'A calming pattern that activates your rest response.',
    color: '#7ECEC1',
  },
  {
    id: 'breath-2', name: 'Peace of Christ', pattern: '4-4-4-4',
    inhale: 4, hold: 4, exhale: 4, holdAfter: 4,
    scripture: 'The peace of God, which transcends all understanding, will guard your hearts.',
    scriptureRef: 'Philippians 4:7',
    description: 'Box breathing to center your mind on Christ\'s peace.',
    color: '#4A6FA5',
  },
  {
    id: 'breath-3', name: 'Rest in God', pattern: '5-3-7',
    inhale: 5, hold: 3, exhale: 7,
    scripture: 'Come to me, all you who are weary and burdened, and I will give you rest.',
    scriptureRef: 'Matthew 11:28',
    description: 'Extended exhale to release tension into God\'s care.',
    color: '#7B68AE',
  },
  {
    id: 'breath-4', name: 'Holy Spirit Breath', pattern: '4-4-4',
    inhale: 4, hold: 4, exhale: 4,
    scripture: 'Suddenly a sound like the blowing of a violent wind came from heaven.',
    scriptureRef: 'Acts 2:2',
    description: 'Invite the Holy Spirit with each breath cycle.',
    color: '#E87E6C',
  },
  {
    id: 'breath-5', name: 'Surrender', pattern: '3-0-6',
    inhale: 3, hold: 0, exhale: 6,
    scripture: 'Cast your cares on the LORD and he will sustain you.',
    scriptureRef: 'Psalm 55:22',
    description: 'Deep exhale focus — releasing everything to God.',
    color: '#FFB74D',
  },
];

export function getMeditationsByCategory(category: string): Meditation[] {
  return MEDITATIONS.filter((m) => m.category === category);
}
