# Bible Chat — Complete App Development Prompt for Claude

> Use this prompt to build the **Bible Chat** app from scratch or extend its features. Copy and paste it into Claude (or any AI assistant) to generate production-quality React Native code.

---

## 🎯 THE PROMPT

```
You are building "Bible Chat" — a premium Christian faith app that combines Bible reading, meditation, prayer, community, and AI-powered Scripture exploration into one beautiful, user-friendly experience.

## APP OVERVIEW

Bible Chat is the world's #1 faith app. It meets users where they are — whether they attend church every Sunday or are just finding their way back. The tone is warm, reverent, and encouraging. Never preachy. Never judgmental.

**Tagline:** "Daily Bible verses, prayer, audio Bible, devotionals & Christian study plans"

**Core Philosophy:**
- Faith should feel accessible, not overwhelming
- Technology should serve spiritual growth, not distract from it
- Every interaction should draw the user closer to God
- Community matters — no one walks alone

## TECH STACK

- **Framework:** React Native with Expo (SDK 50+)
- **Language:** TypeScript (strict mode)
- **Navigation:** React Navigation 6 (stack + bottom tabs)
- **State:** Zustand with persist middleware (AsyncStorage)
- **Styling:** StyleSheet with a comprehensive design system
- **Icons:** @expo/vector-icons (Ionicons)
- **Animations:** React Native Animated API
- **Audio:** expo-av for audio playback
- **Sharing:** React Native Share API
- **Notifications:** expo-notifications
- **Storage:** @react-native-async-storage/async-storage
- **Widgets:** react-native-widgetkit (iOS) / @nickvdwl/react-native-android-widget

## DESIGN SYSTEM

### Colors
```typescript
const Colors = {
  primary: '#4A6FA5',        // Trust blue — main actions
  secondary: '#C5A55A',     // Sacred gold — highlights, premium
  background: '#FAFBFD',    // Warm off-white
  surface: '#FFFFFF',       // Cards
  surfaceElevated: '#F5F6F8', // Inputs, chips
  textPrimary: '#1A1A2E',   // Headlines
  textSecondary: '#4A4A6A', // Body text
  textTertiary: '#8E8EA9',  // Captions
  success: '#4CAF50',       // Completions, streaks
  error: '#E53935',         // Errors
  warning: '#FF9800',       // Alerts
};
```

### Typography
- Headlines: System font, 700 weight, 24-32px
- Body: System font, 400 weight, 15-16px
- Scripture: Georgia/serif, italic for quotes
- Labels: System font, 600 weight, 11px, uppercase, letter-spacing 1

### Spacing Scale
4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80px

### Shadows
- sm: offset 0/1, blur 3, opacity 0.08
- md: offset 0/2, blur 8, opacity 0.12
- lg: offset 0/4, blur 16, opacity 0.15

## APP ARCHITECTURE

### Navigation Structure
```
AppNavigator (Stack)
├── OnboardingScreen
├── MainTabs (Bottom Tab Navigator)
│   ├── Home (Dashboard)
│   ├── Bible (Stack)
│   │   ├── BibleScreen (book browser)
│   │   ├── BibleReaderScreen (chapter reader)
│   │   └── AudioBibleScreen (audio player)
│   ├── Meditate (Stack)
│   │   ├── MeditationScreen (library)
│   │   ├── MeditationPlayerScreen (guided session)
│   │   └── BreathingScreen (breathing exercises)
│   ├── Pray (Stack)
│   │   ├── PrayerScreen (home)
│   │   └── PrayerJournalScreen (personal journal)
│   └── Discover (Stack)
│       ├── DiscoverScreen (hub)
│       ├── DailyPlanScreen (today's rhythm)
│       ├── StudyPlanScreen (multi-day plan)
│       ├── AskBibleScreen (AI chat)
│       ├── BibleTriviaScreen (game)
│       └── CalendarScreen (liturgical calendar)
├── Profile / Settings
├── PanicButton (full-screen anxiety relief)
├── MoodTracker (spiritual health check-in)
├── LivePrayer (community prayer wall)
├── SendBlessing (share verse + message)
├── KidsBible (children's stories)
└── LockScreenWidget (widget config)
```

### State Management (Zustand Store)
```typescript
interface AppState {
  // User
  isOnboarded: boolean;
  isPremium: boolean;
  settings: UserSettings;
  
  // Bible
  selectedTranslation: string;
  bookmarks: Bookmark[];
  highlights: Highlight[];
  readingHistory: ReadingEntry[];
  
  // Meditation
  totalMeditationMinutes: number;
  meditationLog: MeditationEntry[];
  
  // Prayer
  prayerEntries: PrayerEntry[];
  
  // Wellness
  moodEntries: MoodEntry[];
  
  // Streaks
  streaks: Streak[]; // reading, prayer, meditation
  
  // Actions
  addBookmark, removeBookmark, addHighlight,
  addPrayerEntry, updatePrayerStatus,
  addMoodEntry, logMeditation,
  updateSettings, setOnboardingComplete, etc.
}
```

## FEATURES TO BUILD

### 1. 📖 Bible Reader
- Book browser with OT/NT tabs, all 66 books
- Chapter reader with verse numbers, highlights, bookmarks
- 12+ translations (NIV, NKJV, ESV, KJV, NLT, NASB, NRSV, RSVCE, Amplified, WEB, CSB, MSG)
- Text-to-speech audio playback per chapter
- Cross-references and footnotes
- Copy/share verse functionality
- Night mode with dark backgrounds
- Adjustable font size (14-24px)

### 2. 🧘 Christian Meditation
- Session library with categories: Peace, Anxiety, Sleep, Gratitude, Morning, Healing, Forgiveness
- Guided meditation player with:
  - Pulsing circle animation synced to breathing
  - Session timer with progress
  - Background ambient sounds (rain, nature, gentle music)
  - Scripture integration during sessions
- Breathing exercises:
  - "Be Still" (4-7-8 pattern with Psalm 46:10)
  - "Peace of Christ" (box breathing with Philippians 4:7)
  - "Rest in God" (gentle rhythm with Matthew 11:28)
  - "Holy Spirit Breath" (4-4-4 with Acts 2:2)
  - "Surrender" (deep exhale focus with Psalm 55:22)
- Duration options: 3, 5, 10, 15, 20, 30 minutes
- Body scan relaxation with Scripture anchors
- Walking meditation with nature awareness prompts
- Sleep meditations with progressive relaxation
- Post-session journaling prompts

### 3. 🙏 Prayer
- Daily morning & evening guided prayers
- Prayer journal with categories (Gratitude, Intercession, Confession, Petition, Praise)
- Prayer status tracking (Active, Answered, Ongoing)
- Gentle reminder notifications
- Prayer streak counter
- "Pray for others" community feature
- Liturgical prayers (Lord's Prayer, Serenity Prayer, Prayer of St. Francis)
- Situational prayers (before meals, for protection, for wisdom)

### 4. 🌟 Daily Plan
- 5-step daily rhythm: Morning Verse → Reflection → Prayer → Meditation → Evening Gratitude
- Progress tracking with checkmarks
- Devotional content (short, accessible)
- Connected meditation suggestion
- Customizable prayer times and reminders

### 5. 📚 Study Plans
- Multi-day topical plans (7, 14, 21 days):
  - Overcoming Anxiety, Forgiveness, Finding Purpose, Marriage, Grief, Leadership, Wisdom, Healing
- Each day includes: Reading, Reflection question, Prayer, Action Step
- Progress tracking with completion percentage
- Ability to pause and resume
- Bookmark favorite plans

### 6. 🤖 Ask the Bible (AI)
- Conversational AI chat interface
- Answers grounded in Scripture with chapter-and-verse references
- Suggested questions for new users
- Topic-based responses (anxiety, love, forgiveness, purpose, etc.)
- "Typing" indicator for natural feel
- Chat history
- Premium: unlimited conversations

### 7. 🆘 Panic Button (Anxiety Relief)
- Full-screen dark calming interface
- 3-phase guided experience:
  1. **Grounding** — 5-4-3-2-1 sensory exercise (see, touch, hear, smell, taste)
  2. **Breathing** — 4-7-8 pattern with animated expanding circle
  3. **Comfort** — Rotating Scripture verses of peace and assurance
- Completion screen with encouragement
- Quick-access from home screen

### 8. 😊 Mood & Spiritual Health Tracker
- Emoji-based mood selection (1-5 scale)
- Emotion tagging (Peaceful, Grateful, Anxious, Hopeful, Lonely, Joyful, etc.)
- "Closeness to God" heart scale
- Optional notes
- History view with trends
- Personalized verse suggestions based on mood

### 9. 📅 Christian Calendar
- Liturgical year events (Advent, Lent, Easter, Pentecost)
- Holy days and feast days
- Saints' days
- Month navigation
- Expandable event details with Scripture readings and traditions
- Type filtering (Holy Day, Liturgical, Saint, Season, Feast)

### 10. 🎮 Bible Trivia
- Multiple-choice questions (Easy, Medium, Hard)
- Categories: Old Testament, New Testament, General
- Score tracking
- Explanations with Scripture references after each answer
- Results screen with encouragement
- Replay functionality

### 11. 👨‍👩‍👧 Kids Bible Stories
- Age-appropriate stories (3-6, 5-10 age ranges)
- Categories: Creation, Heroes, Miracles, Parables, Christmas, Easter
- Each story includes: Summary, Moral Lesson, Scripture Reference
- Audio narration and video options
- Expandable story cards
- Parent tips for faith conversations

### 12. 🌐 Community Features

#### Live Prayer Wall
- Shared prayer requests with categories
- "Pray" button with counter (shows how many are praying)
- Submit anonymous or named requests
- Category filtering (Health, Work, Relationships, Personal, Guidance, Praise)
- Real-time prayer count

#### Send a Blessing
- 3-step flow: Pick Verse → Add Personal Message → Preview & Share
- 10+ curated blessing verses
- Recipient name personalization
- Emoji decorations (❤️ 🙏 ✝️ 🕊️ 🌿 ☀️ ⭐ 🌈)
- Share via native share sheet (text, WhatsApp, etc.)

### 13. 🔊 Audio Bible
- Full Bible audio with professional narrators
- Multiple narrator options (different voices/accents)
- Curated playlists (Morning Comfort, Life of Jesus, Hope & Strength)
- Queue management (add, remove, reorder)
- Now-playing bar with progress
- Playback speed control (0.75x, 1x, 1.25x, 1.5x, 2x)
- Background playback support
- Sleep timer

### 14. 🔒 Lock Screen Widget
- Bible verse displayed on lock screen (iOS/Android)
- 8 visual styles (Classic White, Midnight, Sunrise Gold, Ocean Calm, Forest Rest, Royal Purple, Holy Fire, Minimal)
- Refresh options: Every Unlock, Hourly, Daily, Manual
- Verse category filtering (Comfort, Strength, Wisdom, Praise, Hope)
- Show/hide translation badge
- Premium: exclusive designs

### 15. 📋 Onboarding
- 5-slide introduction (Bible, Meditation, Prayer, AI, Journey)
- Denomination selection (personalization)
- Goal selection (Grow in faith, Find peace, Study deeper, Build community, Learn to meditate, Build daily habits)
- Smooth transitions between phases

### 16. 👤 Profile & Settings
- User stats (total days, best streak, meditation minutes)
- Premium upgrade banner
- Settings: Dark mode, Notifications, Font size, Language, Offline content, Prayer reminders, Privacy
- Rate app prompt
- Help & support

## ADDITIONAL FEATURES TO DIFFERENTIATE FROM COMPETITORS

### 17. 🎵 Scripture Memory System
- Spaced repetition for memorizing verses
- Visual verse cards with progressive word removal
- Audio playback of verse for auditory learners
- Weekly memory challenges
- Progress tracking and mastery levels

### 18. 📍 Faith Map / Spiritual Journal
- Visual timeline of spiritual journey
- Milestone tracking (baptism, first Bible study, answered prayers)
- Photo/note entries
- Shareable testimony builder

### 19. 🏋️ Faith Challenges
- 30-day challenges: "Pray Every Day", "Read a Psalm Daily", "Gratitude Month"
- Community challenges with leaderboard
- Badge/achievement system
- Share progress on social media

### 20. 🎧 Worship Integration
- Curated worship playlists linked to moods/topics
- "Song of the Day" with lyrics and Scripture connection
- Integration with Spotify/Apple Music
- Hymn database with history and meaning

### 21. 🗺️ Bible Maps & Timeline
- Interactive maps of biblical events
- Historical timeline from Genesis to Revelation
- Character relationship diagrams
- Archaeological discovery highlights

### 22. 💬 Accountability Partners
- Connect with a trusted friend
- Shared reading plans
- Check-in notifications
- Prayer partner matching
- Private messaging

### 23. 📊 Spiritual Growth Dashboard
- Weekly/monthly reports
- Habit heatmap (like GitHub contribution graph)
- Mood trends over time
- Bible reading progress (% of Bible read)
- Personalized insights and recommendations

### 24. 🌙 Sleep & Rest Features
- Bedtime Bible stories (adult narration)
- Psalms for sleep (audio with gentle music)
- Progressive muscle relaxation with Scripture
- "God's promises" sleep affirmations
- Smart alarm with morning verse

### 25. ✍️ Sermon Notes
- Note-taking during church services
- Template with date, speaker, Scripture, key points
- Tag by topic
- Search across all notes
- Export/share functionality

### 26. 🔔 Smart Notifications
- Context-aware verse delivery (morning encouragement, evening peace)
- Weather-based verses (rainy day comfort, sunny day praise)
- Holiday-appropriate Scripture
- Gentle, non-intrusive cadence
- Fully customizable timing

### 27. 🌍 Multi-Language Support
- UI in 20+ languages
- Bible available in original languages (Hebrew, Greek) with interlinear
- Cross-language verse comparison
- Audio Bible in multiple languages

### 28. 🎨 Creative Expression
- Verse art creator (add backgrounds, fonts, colors)
- Scripture coloring pages (for meditation)
- Prayer letter templates
- Gratitude collage builder

## PREMIUM FEATURES (Subscription)

### Free Tier Includes:
- Daily verse, 1 meditation/day, basic Bible reading
- Prayer journal (limited entries)
- 3 study plans
- Bible trivia
- Community prayer wall
- Lock screen widget (4 free styles)

### Premium Unlocks:
- Unlimited AI conversations (Ask the Bible)
- All meditation sessions (50+)
- All study plans (20+)
- All widget styles (8+)
- Audio Bible (full, all narrators)
- Offline downloads
- Ad-free experience
- Advanced analytics/dashboard
- Priority support
- Exclusive content updates

### Pricing Model:
- 7-day free trial
- Weekly: $4.99/week
- Monthly: $9.99/month (save 50%)
- Annual: $49.99/year (save 80%)
- Lifetime: $149.99 (one-time)

## UX PRINCIPLES

1. **Progressive Disclosure** — Don't overwhelm. Reveal features as the user is ready.
2. **Gentle Encouragement** — Celebrate progress without shaming missed days.
3. **Accessibility** — Large touch targets, readable fonts, screen reader support.
4. **Offline First** — Core features work without internet.
5. **Privacy Respect** — Prayer journals and mood data stay on device unless user opts to sync.
6. **Speed** — Every screen should load instantly. Use skeleton loaders for async content.
7. **Delight** — Small animations, haptic feedback, encouraging micro-copy.

## TONE OF VOICE

- Warm, not clinical
- Encouraging, not pushy
- Reverent, not stuffy
- Inclusive of all denominations
- Scripture-centered, not opinion-based
- "Walk alongside" language, never "preach at"

## SAMPLE MICRO-COPY

- Streak maintained: "Another day walking with God. Keep going!"
- Streak broken: "Welcome back. God's mercies are new every morning."
- Prayer answered: "God hears you. What a gift to witness His faithfulness."
- Mood check-in: "God cares about how you feel today."
- Meditation complete: "Well done. The peace of God is with you."
- Panic button: "You are safe. God is with you right now."

## BUILD INSTRUCTIONS

When building this app:
1. Start with the project structure and design system
2. Build the Zustand store with all state and actions
3. Create reusable components (Button, Card, VerseCard)
4. Build navigation structure
5. Implement each screen with full styles
6. Add sample data for all features
7. Ensure TypeScript compiles with zero errors
8. Use proper typing for all props and state

Generate production-quality code — not placeholders. Every screen should be fully styled, interactive, and ready to ship.
```

---

## 📂 Project Structure

```
BibleChat/
├── App.tsx
├── app.json
├── package.json
├── tsconfig.json
├── babel.config.js
├── src/
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   ├── store/
│   │   └── useAppStore.ts
│   ├── constants/
│   │   ├── theme.ts
│   │   ├── bibleData.ts
│   │   ├── meditationData.ts
│   │   └── studyData.ts
│   ├── types/
│   │   └── index.ts
│   ├── components/
│   │   └── common/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── VerseCard.tsx
│   └── screens/
│       ├── Home/
│       │   └── HomeScreen.tsx
│       ├── Bible/
│       │   ├── BibleScreen.tsx
│       │   ├── BibleReaderScreen.tsx
│       │   └── AudioBibleScreen.tsx
│       ├── Meditation/
│       │   ├── MeditationScreen.tsx
│       │   ├── MeditationPlayerScreen.tsx
│       │   └── BreathingScreen.tsx
│       ├── Prayer/
│       │   ├── PrayerScreen.tsx
│       │   └── PrayerJournalScreen.tsx
│       ├── Discover/
│       │   ├── DiscoverScreen.tsx
│       │   ├── DailyPlanScreen.tsx
│       │   ├── StudyPlanScreen.tsx
│       │   ├── AskBibleScreen.tsx
│       │   ├── BibleTriviaScreen.tsx
│       │   └── CalendarScreen.tsx
│       ├── Onboarding/
│       │   └── OnboardingScreen.tsx
│       ├── Community/
│       │   ├── LivePrayerScreen.tsx
│       │   └── SendBlessingScreen.tsx
│       ├── Kids/
│       │   └── KidsBibleScreen.tsx
│       ├── Wellness/
│       │   ├── PanicButtonScreen.tsx
│       │   └── MoodTrackerScreen.tsx
│       ├── Settings/
│       │   └── LockScreenWidgetScreen.tsx
│       └── Profile/
│           └── ProfileScreen.tsx
└── assets/
    ├── icon.png
    └── splash.png
```

---

## 🚀 Getting Started

```bash
# Install dependencies
cd BibleChat && npm install

# Start the Expo development server
npx expo start

# Run on iOS simulator
npx expo run:ios

# Run on Android emulator
npx expo run:android
```

---

## 📋 Competitive Advantages Over Other Bible Apps

| Feature | Bible Chat | YouVersion | Pray.com | Abide |
|---------|-----------|-----------|---------|-------|
| Lock Screen Widget | ✅ | ❌ | ❌ | ❌ |
| Christian Meditation | ✅ (Scripture-based) | ❌ | ✅ | ✅ |
| AI Bible Q&A | ✅ | ❌ | ❌ | ❌ |
| Panic Button | ✅ | ❌ | ❌ | ❌ |
| Mood Tracker | ✅ | ❌ | ❌ | ❌ |
| Kids Bible | ✅ | ✅ | ❌ | ❌ |
| Audio Bible | ✅ | ✅ | ✅ | ✅ |
| Community Prayer | ✅ | ✅ | ✅ | ❌ |
| Bible Trivia | ✅ | ❌ | ❌ | ❌ |
| Send Blessing | ✅ | ❌ | ❌ | ❌ |
| Liturgical Calendar | ✅ | ❌ | ❌ | ❌ |
| Breathing + Scripture | ✅ | ❌ | ❌ | ✅ |
| Study Plans | ✅ | ✅ | ❌ | ✅ |
| Spiritual Dashboard | ✅ | ❌ | ❌ | ❌ |
| Multi-translation | ✅ (12+) | ✅ (2000+) | ❌ | ✅ |

---

## 💡 Key Differentiators

1. **All-in-one** — Bible + Meditation + Prayer + Community + AI in one app
2. **Mental health aware** — Panic Button, mood tracking, anxiety-specific content
3. **Lock screen presence** — Passive Scripture exposure without opening the app
4. **AI-powered** — Ask any Bible question and get referenced answers
5. **Family-friendly** — Dedicated kids section with age-appropriate content
6. **Non-denominational** — Welcoming to all Christian traditions
7. **Beautiful design** — Premium feel that rivals secular meditation apps
8. **Scripture-rooted meditation** — Unlike secular mindfulness, every session is anchored in God's Word

---

*Built with love for God's glory. Soli Deo Gloria.* ✝️
