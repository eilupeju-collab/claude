'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AmbientSound {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
}

interface SleepTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  durationSeconds: number;
  mood: string;
  scripture: string;
  scriptureRef: string;
  bpm: number;
  key: string;
}

const AMBIENT_SOUNDS: AmbientSound[] = [
  { id: 'rain', name: 'Gentle Rain', emoji: '🌧️', color: '#4A6FA5', description: 'Soft rainfall on leaves' },
  { id: 'ocean', name: 'Ocean Waves', emoji: '🌊', color: '#7ECEC1', description: 'Calm waves on shore' },
  { id: 'forest', name: 'Forest Night', emoji: '🌲', color: '#81C784', description: 'Crickets & gentle breeze' },
  { id: 'fireplace', name: 'Fireplace', emoji: '🔥', color: '#FFB74D', description: 'Crackling warm fire' },
  { id: 'stream', name: 'Flowing Stream', emoji: '💧', color: '#64B5F6', description: 'Babbling brook in nature' },
  { id: 'wind', name: 'Soft Wind', emoji: '🍃', color: '#A5D6A7', description: 'Wind through tall grass' },
  { id: 'thunder', name: 'Distant Thunder', emoji: '⛈️', color: '#7B68AE', description: 'Far-away rumbles' },
  { id: 'birds', name: 'Morning Birds', emoji: '🐦', color: '#F48FB1', description: 'Dawn chorus birdsong' },
];

const SLEEP_TRACKS: SleepTrack[] = [
  {
    id: 'st-1', title: 'Psalm 23 Lullaby', artist: 'Bible Chat',
    duration: '8:00', durationSeconds: 480, mood: 'peaceful',
    scripture: 'He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.',
    scriptureRef: 'Psalm 23:2-3', bpm: 60, key: 'C Major',
  },
  {
    id: 'st-2', title: 'Rest in His Arms', artist: 'Bible Chat',
    duration: '10:00', durationSeconds: 600, mood: 'comforting',
    scripture: 'Come to me, all you who are weary and burdened, and I will give you rest.',
    scriptureRef: 'Matthew 11:28', bpm: 55, key: 'G Major',
  },
  {
    id: 'st-3', title: 'Still Waters', artist: 'Bible Chat',
    duration: '12:00', durationSeconds: 720, mood: 'tranquil',
    scripture: 'In peace I will lie down and sleep, for you alone, LORD, make me dwell in safety.',
    scriptureRef: 'Psalm 4:8', bpm: 50, key: 'D Major',
  },
  {
    id: 'st-4', title: 'Angels Watching', artist: 'Bible Chat',
    duration: '15:00', durationSeconds: 900, mood: 'protected',
    scripture: 'For he will command his angels concerning you to guard you in all your ways.',
    scriptureRef: 'Psalm 91:11', bpm: 52, key: 'F Major',
  },
  {
    id: 'st-5', title: 'Midnight Peace', artist: 'Bible Chat',
    duration: '20:00', durationSeconds: 1200, mood: 'deep rest',
    scripture: 'He grants sleep to those he loves.',
    scriptureRef: 'Psalm 127:2', bpm: 48, key: 'Bb Major',
  },
  {
    id: 'st-6', title: 'Everlasting Arms', artist: 'Bible Chat',
    duration: '30:00', durationSeconds: 1800, mood: 'surrender',
    scripture: 'The eternal God is your refuge, and underneath are the everlasting arms.',
    scriptureRef: 'Deuteronomy 33:27', bpm: 45, key: 'Eb Major',
  },
];

const TIMER_OPTIONS = [
  { label: '10 min', value: 10 },
  { label: '15 min', value: 15 },
  { label: '20 min', value: 20 },
  { label: '30 min', value: 30 },
  { label: '45 min', value: 45 },
  { label: '1 hour', value: 60 },
  { label: '2 hours', value: 120 },
  { label: 'No timer', value: 0 },
];

export default function SleepMeditationPage() {
  const [activeTrack, setActiveTrack] = useState<SleepTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ambientSounds, setAmbientSounds] = useState<string[]>([]);
  const [volume, setVolume] = useState(70);
  const [timerMinutes, setTimerMinutes] = useState(30);
  const [timerRemaining, setTimerRemaining] = useState<number | null>(null);
  const [showTimer, setShowTimer] = useState(false);
  const [dimmed, setDimmed] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Timer countdown
  useEffect(() => {
    if (timerRemaining === null || timerRemaining <= 0) return;
    const timer = setInterval(() => {
      setTimerRemaining((t) => {
        if (t !== null && t <= 1) {
          setIsPlaying(false);
          setDimmed(false);
          return 0;
        }
        return t !== null ? t - 1 : null;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timerRemaining]);

  // Track progress
  useEffect(() => {
    if (!isPlaying || !activeTrack) return;
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 1) { setIsPlaying(false); return 1; }
        return p + (1 / activeTrack.durationSeconds);
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, activeTrack]);

  const toggleAmbient = (id: string) => {
    setAmbientSounds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const playTrack = (track: SleepTrack) => {
    setActiveTrack(track);
    setIsPlaying(true);
    setProgress(0);
    if (timerMinutes > 0) {
      setTimerRemaining(timerMinutes * 60);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Dimmed sleep mode
  if (dimmed && isPlaying) {
    return (
      <div
        className="fixed inset-0 z-50 bg-gray-950 flex flex-col items-center justify-center px-8 text-center cursor-pointer"
        onClick={() => setDimmed(false)}
      >
        <div className="animate-pulse-slow mb-8">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-primary/40" />
            </div>
          </div>
        </div>
        <p className="text-gray-600 text-sm font-serif italic max-w-xs">
          &ldquo;{activeTrack?.scripture}&rdquo;
        </p>
        <p className="text-gray-700 text-xs mt-3">{activeTrack?.scriptureRef}</p>
        {timerRemaining !== null && timerRemaining > 0 && (
          <p className="text-gray-700 text-xs mt-6">
            {formatTime(timerRemaining)} remaining
          </p>
        )}
        <p className="text-gray-800 text-[10px] mt-8">Tap anywhere to return</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-5 py-6 lg:py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sleep &amp; Rest</h1>
          <p className="text-gray-500 text-sm mt-1">
            Drift into peaceful sleep with God&apos;s Word
          </p>
        </div>
        <button
          onClick={() => setShowTimer(!showTimer)}
          className={cn('chip', showTimer && 'chip-active')}
        >
          ⏱️ Timer
        </button>
      </div>

      {/* Sleep Timer */}
      {showTimer && (
        <div className="card mt-4 mb-6 animate-slide-up">
          <h3 className="font-semibold text-gray-800 text-sm mb-3">Sleep Timer</h3>
          <p className="text-xs text-gray-400 mb-3">
            Music will fade out and stop after the timer ends
          </p>
          <div className="flex gap-2 flex-wrap">
            {TIMER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={cn(
                  'chip text-xs',
                  timerMinutes === opt.value && 'chip-active'
                )}
                onClick={() => setTimerMinutes(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {timerRemaining !== null && timerRemaining > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Time remaining</span>
                <span className="text-sm font-mono font-semibold text-primary">
                  {formatTime(timerRemaining)}
                </span>
              </div>
              <div className="progress-bar mt-2">
                <div
                  className="progress-fill bg-primary/60"
                  style={{ width: `${(timerRemaining / (timerMinutes * 60)) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Ambient Sounds Mixer */}
      <section className="mt-6 mb-8">
        <h2 className="section-title">Ambient Sounds</h2>
        <p className="text-xs text-gray-400 mb-4">
          Mix background sounds to create your perfect sleep atmosphere
        </p>
        <div className="grid grid-cols-4 gap-3">
          {AMBIENT_SOUNDS.map((sound) => {
            const isActive = ambientSounds.includes(sound.id);
            return (
              <button
                key={sound.id}
                onClick={() => toggleAmbient(sound.id)}
                className={cn(
                  'flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all border-2',
                  isActive
                    ? 'border-current bg-opacity-10 scale-105'
                    : 'border-transparent bg-gray-50 hover:bg-gray-100'
                )}
                style={isActive ? { borderColor: sound.color, backgroundColor: sound.color + '10' } : {}}
              >
                <span className="text-2xl">{sound.emoji}</span>
                <span className={cn(
                  'text-[10px] font-medium',
                  isActive ? 'text-gray-800' : 'text-gray-500'
                )}>
                  {sound.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Volume Control */}
        {ambientSounds.length > 0 && (
          <div className="mt-4 flex items-center gap-3 animate-fade-in">
            <span className="text-xs text-gray-400">🔈</span>
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="flex-1 h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-primary"
            />
            <span className="text-xs text-gray-400">🔊</span>
            <span className="text-xs text-gray-500 w-8">{volume}%</span>
          </div>
        )}

        {ambientSounds.length > 0 && (
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-400">Playing:</span>
            {ambientSounds.map((id) => {
              const s = AMBIENT_SOUNDS.find((a) => a.id === id);
              return s ? (
                <span key={id} className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: s.color + '15', color: s.color }}>
                  {s.emoji} {s.name}
                </span>
              ) : null;
            })}
          </div>
        )}
      </section>

      {/* Sleep Music Tracks */}
      <section className="mb-8">
        <h2 className="section-title">Sleep Music &amp; Scripture</h2>
        <p className="text-xs text-gray-400 mb-4">
          Calming melodies with God&apos;s promises for peaceful rest
        </p>
        <div className="space-y-3">
          {SLEEP_TRACKS.map((track) => {
            const isCurrent = activeTrack?.id === track.id;
            return (
              <button
                key={track.id}
                onClick={() => playTrack(track)}
                className={cn(
                  'card w-full text-left group transition-all',
                  isCurrent && 'ring-2 ring-primary/30 bg-primary-50/30'
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all',
                    isCurrent && isPlaying
                      ? 'bg-primary text-white'
                      : 'bg-indigo-50 text-primary group-hover:bg-primary group-hover:text-white'
                  )}>
                    {isCurrent && isPlaying ? (
                      <div className="flex gap-0.5 items-end h-4">
                        <div className="w-1 bg-white rounded-full animate-bounce" style={{ height: '60%', animationDelay: '0ms' }} />
                        <div className="w-1 bg-white rounded-full animate-bounce" style={{ height: '100%', animationDelay: '150ms' }} />
                        <div className="w-1 bg-white rounded-full animate-bounce" style={{ height: '40%', animationDelay: '300ms' }} />
                        <div className="w-1 bg-white rounded-full animate-bounce" style={{ height: '80%', animationDelay: '450ms' }} />
                      </div>
                    ) : (
                      <span className="text-xl">🌙</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={cn(
                      'font-semibold text-sm transition-colors',
                      isCurrent ? 'text-primary' : 'text-gray-800'
                    )}>
                      {track.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {track.duration} · {track.mood} · {track.bpm} BPM
                    </p>
                    <p className="text-xs text-gray-400 mt-1 italic truncate">
                      &ldquo;{track.scripture.slice(0, 60)}...&rdquo;
                    </p>
                  </div>
                  <span className="text-xs text-gray-300">{track.duration}</span>
                </div>

                {/* Progress bar for current track */}
                {isCurrent && (
                  <div className="mt-3 pt-3 border-t border-gray-100 animate-fade-in">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${progress * 100}%` }} />
                    </div>
                    <div className="flex justify-between mt-1.5">
                      <span className="text-[10px] text-gray-400">
                        {formatTime(Math.floor(progress * track.durationSeconds))}
                      </span>
                      <span className="text-[10px] text-gray-400">{track.duration}</span>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Bedtime Routine Card */}
      <section className="mb-8">
        <div className="card bg-gradient-to-br from-indigo-50 to-purple-50 border-0">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">✨</span>
            <h3 className="font-semibold text-gray-800">Bedtime Routine</h3>
          </div>
          <ol className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] text-primary font-bold">1</span>
              Choose ambient sounds to set the mood
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] text-primary font-bold">2</span>
              Pick a sleep track with Scripture
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] text-primary font-bold">3</span>
              Set your timer and dim the screen
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] text-primary font-bold">4</span>
              Rest in God&apos;s peace as you drift off
            </li>
          </ol>
        </div>
      </section>

      {/* Now Playing Bar */}
      {activeTrack && (
        <div className="fixed bottom-16 lg:bottom-0 left-0 right-0 lg:left-64 bg-white border-t border-gray-100 shadow-elevated z-40 px-5 py-3">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <span>🌙</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{activeTrack.title}</p>
                  <p className="text-[10px] text-gray-400">{activeTrack.scriptureRef}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Dim Button */}
                <button
                  onClick={() => setDimmed(true)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
                  title="Dim screen for sleep"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </button>

                {/* Play/Pause */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white"
                >
                  {isPlaying ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
                  ) : (
                    <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Timer indicator */}
            {timerRemaining !== null && timerRemaining > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] text-gray-400">⏱️</span>
                <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-purple/50 rounded-full transition-all"
                    style={{ width: `${(timerRemaining / (timerMinutes * 60)) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-400 font-mono">
                  {formatTime(timerRemaining)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
