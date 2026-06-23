import { CommunityPrayer, TriviaQuestion, CalendarEvent, KidsStory } from '@/types';

export const COMMUNITY_PRAYERS: CommunityPrayer[] = [
  { id: 'cp-1', author: 'Sarah M.', content: 'Please pray for my mom\'s surgery tomorrow. She\'s scared and so am I. God is our healer.', category: 'Health', prayerCount: 47, createdAt: '2025-06-20T10:30:00Z', isAnonymous: false },
  { id: 'cp-2', author: 'David K.', content: 'I lost my job last week. Praying for provision and open doors. God knows my needs.', category: 'Work', prayerCount: 83, createdAt: '2025-06-20T09:00:00Z', isAnonymous: false },
  { id: 'cp-3', author: 'Anonymous', content: 'Struggling with addiction. I want to be free. Please pray for strength and deliverance.', category: 'Personal', prayerCount: 124, createdAt: '2025-06-20T08:00:00Z', isAnonymous: true },
  { id: 'cp-4', author: 'Maria L.', content: 'My marriage is falling apart. We need God\'s love to restore what feels broken.', category: 'Relationships', prayerCount: 96, createdAt: '2025-06-19T22:00:00Z', isAnonymous: false },
  { id: 'cp-5', author: 'James P.', content: 'Thank you Lord! My test results came back clear. God answers prayers!', category: 'Praise', prayerCount: 201, createdAt: '2025-06-19T18:00:00Z', isAnonymous: false },
  { id: 'cp-6', author: 'Grace W.', content: 'Starting a new chapter in my life. Pray for wisdom and courage as I step into the unknown.', category: 'Guidance', prayerCount: 62, createdAt: '2025-06-19T15:00:00Z', isAnonymous: false },
];

export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  { id: 'tq-1', question: 'How many books are in the Bible?', options: ['27', '39', '66', '73'], correctIndex: 2, explanation: 'The Protestant Bible has 66 books: 39 in the OT and 27 in the NT.', scriptureRef: '2 Timothy 3:16', difficulty: 'easy', category: 'general' },
  { id: 'tq-2', question: 'Who built the ark?', options: ['Abraham', 'Moses', 'Noah', 'David'], correctIndex: 2, explanation: 'God commanded Noah to build an ark to save his family and animals from the flood.', scriptureRef: 'Genesis 6:14', difficulty: 'easy', category: 'OT' },
  { id: 'tq-3', question: 'What is the shortest verse in the Bible?', options: ['"God is love"', '"Jesus wept"', '"Pray always"', '"Be still"'], correctIndex: 1, explanation: '"Jesus wept" (John 11:35) is the shortest verse, showing Christ\'s compassion.', scriptureRef: 'John 11:35', difficulty: 'medium', category: 'NT' },
  { id: 'tq-4', question: 'How many days did God take to create the world?', options: ['5', '6', '7', '40'], correctIndex: 1, explanation: 'God created the world in 6 days and rested on the 7th.', scriptureRef: 'Genesis 2:2', difficulty: 'easy', category: 'OT' },
  { id: 'tq-5', question: 'Who was the first king of Israel?', options: ['David', 'Saul', 'Solomon', 'Samuel'], correctIndex: 1, explanation: 'Saul was anointed as Israel\'s first king by the prophet Samuel.', scriptureRef: '1 Samuel 10:1', difficulty: 'medium', category: 'OT' },
  { id: 'tq-6', question: 'What was Paul\'s name before conversion?', options: ['Simon', 'Saul', 'Stephen', 'Silas'], correctIndex: 1, explanation: 'Paul was known as Saul before his dramatic conversion on the road to Damascus.', scriptureRef: 'Acts 9:1-4', difficulty: 'medium', category: 'NT' },
  { id: 'tq-7', question: 'How many plagues did God send on Egypt?', options: ['5', '7', '10', '12'], correctIndex: 2, explanation: 'God sent 10 plagues to convince Pharaoh to free the Israelites.', scriptureRef: 'Exodus 7-12', difficulty: 'easy', category: 'OT' },
  { id: 'tq-8', question: 'Which disciple walked on water with Jesus?', options: ['John', 'James', 'Peter', 'Andrew'], correctIndex: 2, explanation: 'Peter stepped out of the boat in faith and walked toward Jesus on the water.', scriptureRef: 'Matthew 14:29', difficulty: 'medium', category: 'NT' },
];

export const CALENDAR_EVENTS: CalendarEvent[] = [
  { id: 'ce-1', title: 'Ash Wednesday', date: '2026-02-18', type: 'liturgical', description: 'The beginning of Lent — 40 days of fasting, prayer, and repentance leading to Easter.', color: '#7B68AE', scriptures: ['Joel 2:12-13', 'Matthew 6:1-6'] },
  { id: 'ce-2', title: 'Palm Sunday', date: '2026-03-29', type: 'liturgical', description: 'Jesus\' triumphant entry into Jerusalem.', color: '#4A6FA5', scriptures: ['Matthew 21:1-11'] },
  { id: 'ce-3', title: 'Good Friday', date: '2026-04-03', type: 'holy_day', description: 'The crucifixion of Jesus Christ.', color: '#1A1A2E', scriptures: ['John 19:16-30', 'Isaiah 53:1-12'] },
  { id: 'ce-4', title: 'Easter Sunday', date: '2026-04-05', type: 'holy_day', description: 'He is risen! The resurrection of Jesus Christ.', color: '#C5A55A', scriptures: ['Matthew 28:1-10', 'John 20:1-18'] },
  { id: 'ce-5', title: 'Pentecost', date: '2026-05-24', type: 'holy_day', description: 'The Holy Spirit descends. The birthday of the Church!', color: '#E87E6C', scriptures: ['Acts 2:1-13'] },
  { id: 'ce-6', title: 'All Saints\' Day', date: '2026-11-01', type: 'saint', description: 'Honoring all saints who have lived faithful lives.', color: '#FFB74D', scriptures: ['Revelation 7:9-17'] },
  { id: 'ce-7', title: 'First Sunday of Advent', date: '2025-11-30', type: 'season', description: 'The beginning of the liturgical year.', color: '#7B68AE', scriptures: ['Isaiah 2:1-5'] },
  { id: 'ce-8', title: 'Christmas Day', date: '2025-12-25', type: 'holy_day', description: 'The birth of Jesus Christ — God made flesh!', color: '#C5A55A', scriptures: ['Luke 2:1-20', 'John 1:14'] },
];

export const KIDS_STORIES: KidsStory[] = [
  { id: 'ks-1', title: 'God Made Everything!', subtitle: 'The Creation Story', ageRange: '3-6', duration: '4 min', emoji: '🌍', color: '#7ECEC1', category: 'creation', scripture: 'Genesis 1-2', summary: 'In the beginning, God made the sky, the sea, the animals, and YOU!', moralLesson: 'God made everything with love — including you!', hasVideo: true, hasAudio: true },
  { id: 'ks-2', title: 'Noah\'s Big Boat', subtitle: 'The Flood & the Rainbow', ageRange: '3-6', duration: '5 min', emoji: '🌈', color: '#FFB74D', category: 'heroes', scripture: 'Genesis 6-9', summary: 'God asked Noah to build a really big boat and fill it with animals!', moralLesson: 'When God asks us to do something, we can trust Him.', hasVideo: true, hasAudio: true },
  { id: 'ks-3', title: 'David & the Giant', subtitle: 'A Boy Who Trusted God', ageRange: '5-10', duration: '6 min', emoji: '⚔️', color: '#4A6FA5', category: 'heroes', scripture: '1 Samuel 17', summary: 'Everyone was afraid of Goliath — except David who trusted God.', moralLesson: 'With God on your side, you can face any challenge!', hasVideo: true, hasAudio: true },
  { id: 'ks-4', title: 'Daniel & the Lions', subtitle: 'Brave in the Den', ageRange: '5-10', duration: '5 min', emoji: '🦁', color: '#E87E6C', category: 'heroes', scripture: 'Daniel 6', summary: 'Daniel prayed to God even when it was against the rules.', moralLesson: 'Always talk to God, no matter what.', hasVideo: true, hasAudio: true },
  { id: 'ks-5', title: 'Baby Jesus is Born!', subtitle: 'The Christmas Story', ageRange: '3-6', duration: '4 min', emoji: '⭐', color: '#C5A55A', category: 'christmas', scripture: 'Luke 2:1-20', summary: 'In a little stable, the most special baby was born.', moralLesson: 'Jesus came because God loves every single person!', hasVideo: true, hasAudio: true },
  { id: 'ks-6', title: 'The Good Samaritan', subtitle: 'Loving Your Neighbor', ageRange: '5-10', duration: '5 min', emoji: '🤝', color: '#81C784', category: 'parables', scripture: 'Luke 10:25-37', summary: 'A man was hurt. Many walked past — but one kind stranger stopped.', moralLesson: 'Be kind to everyone. That\'s how we show God\'s love.', hasVideo: true, hasAudio: true },
];
