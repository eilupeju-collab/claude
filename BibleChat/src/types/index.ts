// Bible Chat — Core Type Definitions

// ==================== BIBLE TYPES ====================

export interface BibleBook {
  id: string;
  name: string;
  shortName: string;
  testament: 'old' | 'new';
  chapters: number;
  order: number;
}

export interface BibleVerse {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  translation: BibleTranslation;
}

export type BibleTranslation = 
  | 'KJV' | 'NIV' | 'NKJV' | 'ESV' | 'NLT' | 'NASB' 
  | 'NRSV' | 'RSVCE' | 'AMP' | 'WEB' | 'CSB' | 'MSG';

export interface BibleBookmark {
  id: string;
  verseId: string;
  book: string;
  chapter: number;
  verse: number;
  note?: string;
  color?: string;
  tags: string[];
  createdAt: string;
}

export interface BibleHighlight {
  id: string;
  verseId: string;
  book: string;
  chapter: number;
  startVerse: number;
  endVerse: number;
  color: string;
  createdAt: string;
}

export interface BibleNote {
  id: string;
  verseId: string;
  book: string;
  chapter: number;
  verse: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReadingProgress {
  book: string;
  chapter: number;
  lastReadAt: string;
  percentComplete: number;
}

// ==================== MEDITATION TYPES ====================

export type MeditationCategory = 
  | 'peace' | 'gratitude' | 'forgiveness' | 'strength' 
  | 'sleep' | 'morning' | 'healing' | 'identity'
  | 'surrender' | 'waiting' | 'courage' | 'praise';

export interface MeditationSession {
  id: string;
  title: string;
  description: string;
  category: MeditationCategory;
  duration: number; // in seconds
  audioUrl?: string;
  scriptures: string[]; // verse references
  backgroundSound: BackgroundSound;
  isPremium: boolean;
  imageUrl?: string;
}

export type BackgroundSound = 
  | 'rain' | 'ocean' | 'forest' | 'birds' | 'creek'
  | 'worship' | 'silence' | 'whitenoise' | 'bowls' | 'fireplace';

export interface BreathingExercise {
  id: string;
  name: string;
  description: string;
  pattern: BreathingPattern;
  scripture: string;
  scriptureReference: string;
  duration: number;
}

export interface BreathingPattern {
  inhale: number;    // seconds
  holdIn: number;    // seconds
  exhale: number;    // seconds
  holdOut: number;   // seconds
  cycles: number;
  inhaleText?: string;
  holdInText?: string;
  exhaleText?: string;
  holdOutText?: string;
}

export interface MeditationCourse {
  id: string;
  title: string;
  description: string;
  sessions: MeditationSession[];
  totalDays: number;
  category: MeditationCategory;
  isPremium: boolean;
}

export interface MeditationLog {
  id: string;
  sessionId?: string;
  duration: number;
  completedAt: string;
  mood?: MoodRating;
  journalEntry?: string;
}

// ==================== PRAYER TYPES ====================

export interface PrayerEntry {
  id: string;
  title: string;
  content: string;
  category: PrayerCategory;
  status: 'praying' | 'answered' | 'ongoing';
  createdAt: string;
  updatedAt: string;
  answeredAt?: string;
  tags: string[];
  isPrivate: boolean;
}

export type PrayerCategory = 
  | 'praise' | 'thanksgiving' | 'confession' 
  | 'intercession' | 'petition' | 'general';

export interface CommunityPrayer {
  id: string;
  userId: string;
  userName: string;
  content: string;
  prayerCount: number;
  createdAt: string;
  isAnonymous: boolean;
}

export interface GuidedPrayer {
  id: string;
  title: string;
  content: string;
  occasion: string;
  author?: string;
  scriptureReferences: string[];
}

// ==================== STUDY & PLANS TYPES ====================

export interface StudyPlan {
  id: string;
  title: string;
  description: string;
  topic: string;
  totalDays: number;
  days: StudyPlanDay[];
  isPremium: boolean;
  imageUrl?: string;
}

export interface StudyPlanDay {
  day: number;
  title: string;
  reading: string;    // Scripture reference
  reflection: string;
  prayer: string;
  actionStep: string;
  isCompleted: boolean;
}

export interface DailyPlan {
  date: string;
  morningVerse: BibleVerse;
  devotional: string;
  prayerPrompt: string;
  meditationSuggestion?: string;
  eveningGratitude: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'liturgical' | 'saint' | 'holy_day' | 'custom';
  description: string;
  color: string;
  scriptures?: string[];
}

// ==================== AI TYPES ====================

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  verseReferences?: string[];
  timestamp: string;
}

export interface AIConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

// ==================== WELLNESS TYPES ====================

export type MoodRating = 1 | 2 | 3 | 4 | 5;

export interface MoodEntry {
  id: string;
  date: string;
  mood: MoodRating;
  emotions: string[];
  note?: string;
  closenessToGod?: MoodRating;
}

export interface GratitudeEntry {
  id: string;
  date: string;
  items: string[];
  verse?: string;
  photoUrl?: string;
}

export interface FastingLog {
  id: string;
  type: 'food' | 'social_media' | 'entertainment' | 'custom';
  customType?: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  prayerFocus: string;
  journal: string[];
}

// ==================== USER & SETTINGS TYPES ====================

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  denomination?: string;
  preferredTranslation: BibleTranslation;
  isPremium: boolean;
  createdAt: string;
}

export type ThemeMode = 'light' | 'dark' | 'sepia' | 'auto';

export interface UserSettings {
  theme: ThemeMode;
  fontSize: number;
  fontFamily: string;
  notificationsEnabled: boolean;
  morningPrayerTime?: string;
  eveningPrayerTime?: string;
  dailyVerseTime?: string;
  offlineTranslations: BibleTranslation[];
  language: string;
}

export interface Streak {
  type: 'reading' | 'prayer' | 'meditation';
  currentStreak: number;
  longestStreak: number;
  lastActivity: string;
  totalDays: number;
}

// ==================== ENGAGEMENT TYPES ====================

export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  scriptureReference?: string;
}

export interface MemoryVerse {
  id: string;
  reference: string;
  text: string;
  translation: BibleTranslation;
  mastery: number; // 0-100
  nextReviewDate: string;
  timesReviewed: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
  target: number;
}
