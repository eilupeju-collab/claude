// Bible Chat — Global State Management with Zustand

import { create } from 'zustand';
import type {
  BibleTranslation,
  BibleBookmark,
  BibleHighlight,
  BibleNote,
  PrayerEntry,
  MeditationLog,
  MoodEntry,
  GratitudeEntry,
  Streak,
  ThemeMode,
  UserSettings,
  MemoryVerse,
  FastingLog,
} from '../types';

interface AppState {
  // User settings
  settings: UserSettings;
  updateSettings: (settings: Partial<UserSettings>) => void;
  
  // Bible state
  currentTranslation: BibleTranslation;
  setTranslation: (t: BibleTranslation) => void;
  currentBook: string;
  currentChapter: number;
  setCurrentLocation: (book: string, chapter: number) => void;
  bookmarks: BibleBookmark[];
  addBookmark: (bookmark: BibleBookmark) => void;
  removeBookmark: (id: string) => void;
  highlights: BibleHighlight[];
  addHighlight: (highlight: BibleHighlight) => void;
  removeHighlight: (id: string) => void;
  notes: BibleNote[];
  addNote: (note: BibleNote) => void;
  updateNote: (id: string, content: string) => void;
  removeNote: (id: string) => void;
  
  // Prayer state
  prayerEntries: PrayerEntry[];
  addPrayerEntry: (entry: PrayerEntry) => void;
  updatePrayerEntry: (id: string, updates: Partial<PrayerEntry>) => void;
  removePrayerEntry: (id: string) => void;
  
  // Meditation state
  meditationLogs: MeditationLog[];
  addMeditationLog: (log: MeditationLog) => void;
  totalMeditationMinutes: number;
  
  // Wellness state
  moodEntries: MoodEntry[];
  addMoodEntry: (entry: MoodEntry) => void;
  gratitudeEntries: GratitudeEntry[];
  addGratitudeEntry: (entry: GratitudeEntry) => void;
  fastingLogs: FastingLog[];
  addFastingLog: (log: FastingLog) => void;
  updateFastingLog: (id: string, updates: Partial<FastingLog>) => void;
  
  // Streaks
  streaks: Streak[];
  updateStreak: (type: Streak['type']) => void;
  
  // Memory verses
  memoryVerses: MemoryVerse[];
  addMemoryVerse: (verse: MemoryVerse) => void;
  updateMemoryVerse: (id: string, updates: Partial<MemoryVerse>) => void;
  
  // Premium
  isPremium: boolean;
  setPremium: (status: boolean) => void;
  
  // Onboarding
  hasCompletedOnboarding: boolean;
  setOnboardingComplete: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // User settings
  settings: {
    theme: 'light' as ThemeMode,
    fontSize: 18,
    fontFamily: 'Georgia',
    notificationsEnabled: true,
    morningPrayerTime: '07:00',
    eveningPrayerTime: '21:00',
    dailyVerseTime: '06:30',
    offlineTranslations: [],
    language: 'en',
  },
  updateSettings: (updates) =>
    set((state) => ({ settings: { ...state.settings, ...updates } })),
  
  // Bible state
  currentTranslation: 'KJV',
  setTranslation: (t) => set({ currentTranslation: t }),
  currentBook: 'Genesis',
  currentChapter: 1,
  setCurrentLocation: (book, chapter) => set({ currentBook: book, currentChapter: chapter }),
  bookmarks: [],
  addBookmark: (bookmark) =>
    set((state) => ({ bookmarks: [...state.bookmarks, bookmark] })),
  removeBookmark: (id) =>
    set((state) => ({ bookmarks: state.bookmarks.filter((b) => b.id !== id) })),
  highlights: [],
  addHighlight: (highlight) =>
    set((state) => ({ highlights: [...state.highlights, highlight] })),
  removeHighlight: (id) =>
    set((state) => ({ highlights: state.highlights.filter((h) => h.id !== id) })),
  notes: [],
  addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
  updateNote: (id, content) =>
    set((state) => ({
      notes: state.notes.map((n) => (n.id === id ? { ...n, content, updatedAt: new Date().toISOString() } : n)),
    })),
  removeNote: (id) =>
    set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),
  
  // Prayer state
  prayerEntries: [],
  addPrayerEntry: (entry) =>
    set((state) => ({ prayerEntries: [...state.prayerEntries, entry] })),
  updatePrayerEntry: (id, updates) =>
    set((state) => ({
      prayerEntries: state.prayerEntries.map((e) =>
        e.id === id ? { ...e, ...updates } : e
      ),
    })),
  removePrayerEntry: (id) =>
    set((state) => ({ prayerEntries: state.prayerEntries.filter((e) => e.id !== id) })),
  
  // Meditation state
  meditationLogs: [],
  addMeditationLog: (log) =>
    set((state) => ({
      meditationLogs: [...state.meditationLogs, log],
      totalMeditationMinutes: state.totalMeditationMinutes + Math.round(log.duration / 60),
    })),
  totalMeditationMinutes: 0,
  
  // Wellness state
  moodEntries: [],
  addMoodEntry: (entry) =>
    set((state) => ({ moodEntries: [...state.moodEntries, entry] })),
  gratitudeEntries: [],
  addGratitudeEntry: (entry) =>
    set((state) => ({ gratitudeEntries: [...state.gratitudeEntries, entry] })),
  fastingLogs: [],
  addFastingLog: (log) =>
    set((state) => ({ fastingLogs: [...state.fastingLogs, log] })),
  updateFastingLog: (id, updates) =>
    set((state) => ({
      fastingLogs: state.fastingLogs.map((f) =>
        f.id === id ? { ...f, ...updates } : f
      ),
    })),
  
  // Streaks
  streaks: [
    { type: 'reading', currentStreak: 0, longestStreak: 0, lastActivity: '', totalDays: 0 },
    { type: 'prayer', currentStreak: 0, longestStreak: 0, lastActivity: '', totalDays: 0 },
    { type: 'meditation', currentStreak: 0, longestStreak: 0, lastActivity: '', totalDays: 0 },
  ],
  updateStreak: (type) =>
    set((state) => ({
      streaks: state.streaks.map((s) => {
        if (s.type !== type) return s;
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        const isConsecutive = s.lastActivity === yesterday || s.lastActivity === today;
        const newStreak = s.lastActivity === today ? s.currentStreak : (isConsecutive ? s.currentStreak + 1 : 1);
        return {
          ...s,
          currentStreak: newStreak,
          longestStreak: Math.max(s.longestStreak, newStreak),
          lastActivity: today,
          totalDays: s.lastActivity === today ? s.totalDays : s.totalDays + 1,
        };
      }),
    })),
  
  // Memory verses
  memoryVerses: [],
  addMemoryVerse: (verse) =>
    set((state) => ({ memoryVerses: [...state.memoryVerses, verse] })),
  updateMemoryVerse: (id, updates) =>
    set((state) => ({
      memoryVerses: state.memoryVerses.map((v) =>
        v.id === id ? { ...v, ...updates } : v
      ),
    })),
  
  // Premium
  isPremium: false,
  setPremium: (status) => set({ isPremium: status }),
  
  // Onboarding
  hasCompletedOnboarding: false,
  setOnboardingComplete: () => set({ hasCompletedOnboarding: true }),
}));
