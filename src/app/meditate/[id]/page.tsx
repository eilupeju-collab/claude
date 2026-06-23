'use client';

import { useState, useEffect } from 'react';
import { MEDITATIONS } from '@/lib/data/meditations';
import { useParams, useRouter } from 'next/navigation';

export default function MeditationPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const meditation = MEDITATIONS.find((m) => m.id === params.id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!isPlaying || !meditation) return;
    const interval = setInterval(() => {
      setElapsed((e) => {
        const step = meditation.steps[currentStep];
        if (e + 1 >= step.duration) {
          if (currentStep < meditation.steps.length - 1) {
            setCurrentStep((s) => s + 1);
            return 0;
          } else {
            setIsPlaying(false);
            setCompleted(true);
            return e;
          }
        }
        return e + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, meditation]);

  if (!meditation) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-10 text-center">
        <p className="text-gray-500">Meditation not found</p>
      </div>
    );
  }

  const step = meditation.steps[currentStep];
  const progress = step ? (elapsed / step.duration) * 100 : 100;
  const totalProgress = meditation.steps.length > 0
    ? ((currentStep + progress / 100) / meditation.steps.length) * 100
    : 0;

  if (completed) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-10 text-center min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-accent-teal/20 flex items-center justify-center mb-6">
          <span className="text-4xl">✨</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Well Done</h2>
        <p className="text-gray-500 mb-2">The peace of God is with you.</p>
        <p className="verse-text text-sm max-w-xs">&ldquo;{meditation.scripture}&rdquo;</p>
        <p className="verse-ref text-xs">&mdash; {meditation.scriptureRef}</p>
        <button onClick={() => router.push('/meditate')} className="btn-primary mt-8">
          Back to Meditations
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-6 min-h-[80vh] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <span className="text-sm text-gray-400">{meditation.title}</span>
        <span className="text-sm text-gray-400">{meditation.duration} min</span>
      </div>

      {/* Total Progress */}
      <div className="progress-bar mb-8">
        <div className="progress-fill" style={{ width: `${totalProgress}%` }} />
      </div>

      {/* Main Content — Breathing Circle + Instruction */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {/* Animated Circle */}
        <div className="relative mb-10">
          <div className={`w-40 h-40 rounded-full bg-accent-teal/20 flex items-center justify-center ${isPlaying ? 'animate-breathe' : ''}`}>
            <div className={`w-24 h-24 rounded-full bg-accent-teal/40 flex items-center justify-center ${isPlaying ? 'animate-pulse-slow' : ''}`}>
              <div className="w-12 h-12 rounded-full bg-accent-teal" />
            </div>
          </div>
        </div>

        {/* Step Instruction */}
        <p className="text-lg text-gray-700 font-medium max-w-sm leading-relaxed animate-fade-in" key={currentStep}>
          {step?.instruction}
        </p>

        {/* Step Counter */}
        <p className="text-sm text-gray-400 mt-4">
          Step {currentStep + 1} of {meditation.steps.length}
        </p>

        {/* Scripture */}
        <div className="mt-8 px-6 py-4 bg-primary-50/50 rounded-2xl max-w-sm">
          <p className="verse-text text-sm">&ldquo;{meditation.scripture}&rdquo;</p>
          <p className="text-xs text-primary font-medium mt-2">{meditation.scriptureRef}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 py-8">
        <button
          onClick={() => { setCurrentStep(Math.max(0, currentStep - 1)); setElapsed(0); }}
          className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center"
          disabled={currentStep === 0}
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white shadow-medium hover:shadow-elevated transition-shadow"
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
          ) : (
            <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>
        <button
          onClick={() => { setCurrentStep(Math.min(meditation.steps.length - 1, currentStep + 1)); setElapsed(0); }}
          className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
