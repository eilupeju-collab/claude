// Bible Chat — Shared TypeScript Types

export interface Verse {
  id: string;
  text: string;
  reference: string;
  book: string;
  chapter: number;
  verse: number;
  translation: string;
  category?: string;
}

export interface BibleBook {
  id: string;
  name: string;
  abbreviation: string;
  chapters: number;
  testament: 'OT' | 'NT';
  order: number;
}

export interface BibleChapter {
  book: string;
  chapter: number;
  verses: { number: number; text: string }[];
  translation: string;
}

export interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  category: MeditationCategory;
  scripture: string;
  scriptureRef: string;
  steps: MeditationStep[];
  isPremium: boolean;
}

export type MeditationCategory =
  | 'peace'
  | 'anxiety'
  | 'sleep'
  | 'gratitude'
  | 'morning'
  | 'healing'
  | 'forgiveness';

export interface MeditationStep {
  instruction: string;
  duration: number; // seconds
  type: 'breathe' | 'reflect' | 'listen' | 'pray';
}

export interface BreathingExercise {
  id: string;
  name: string;
  pattern: string;
  inhale: number;
  hold: number;
  exhale: number;
  holdAfter?: number;
  scripture: string;
  scriptureRef: string;
  description: string;
  color: string;
}

export interface Prayer {
  id: string;
  title: string;
  content: string;
  category: PrayerCategory;
  timeOfDay?: 'morning' | 'evening' | 'anytime';
  scripture?: string;
  scriptureRef?: string;
}

export type PrayerCategory =
  | 'morning'
  | 'evening'
  | 'gratitude'
  | 'intercession'
  | 'confession'
  | 'petition'
  | 'praise'
  | 'protection'
  | 'wisdom';

export interface PrayerEntry {
  id: string;
  content: string;
  category: PrayerCategory;
  status: 'active' | 'answered' | 'ongoing';
  createdAt: string;
  answeredAt?: string;
}

export interface AudioChapter {
  id: string;
  book: string;
  chapter: number;
  title: string;
  duration: string;
  durationSeconds: number;
  narrator: string;
  audioUrl?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  chapters: string[]; // chapter IDs
  totalDuration: string;
}

export interface CommunityPrayer {
  id: string;
  author: string;
  content: string;
  category: string;
  prayerCount: number;
  createdAt: string;
  isAnonymous: boolean;
}

export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  scriptureRef: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'OT' | 'NT' | 'general';
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'holy_day' | 'liturgical' | 'saint' | 'season' | 'feast';
  description: string;
  color: string;
  scriptures?: string[];
  traditions?: string[];
}

export interface StudyPlan {
  id: string;
  title: string;
  description: string;
  days: number;
  topic: string;
  color: string;
  content: StudyDay[];
}

export interface StudyDay {
  day: number;
  title: string;
  reading: string;
  reflection: string;
  prayer: string;
  actionStep: string;
}

export interface KidsStory {
  id: string;
  title: string;
  subtitle: string;
  ageRange: string;
  duration: string;
  emoji: string;
  color: string;
  category: string;
  scripture: string;
  summary: string;
  moralLesson: string;
  hasVideo: boolean;
  hasAudio: boolean;
}

export interface MoodEntry {
  id: string;
  mood: number; // 1-5
  emotions: string[];
  closenessToGod: number; // 1-5
  note?: string;
  createdAt: string;
}

export interface Streak {
  type: 'reading' | 'prayer' | 'meditation';
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
  lastCompletedDate: string;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  fontSize: number;
  translation: string;
  notificationsEnabled: boolean;
  morningPrayerTime: string;
  eveningPrayerTime: string;
}

export interface DailyPlanStep {
  id: string;
  title: string;
  description: string;
  type: 'verse' | 'reflection' | 'prayer' | 'meditation' | 'gratitude';
  content: string;
  completed: boolean;
  icon: string;
}

export interface AskBibleMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  references?: string[];
}
