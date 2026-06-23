'use client';

import { useState } from 'react';
import { TRIVIA_QUESTIONS } from '@/lib/data/community';
import { cn } from '@/lib/utils';

export default function TriviaPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const q = TRIVIA_QUESTIONS[current];

  const handleSelect = (idx: number) => {
    if (showAnswer) return;
    setSelected(idx);
    setShowAnswer(true);
    if (idx === q.correctIndex) setScore((s) => s + 1);
  };

  const next = () => {
    if (current < TRIVIA_QUESTIONS.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowAnswer(false);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setCurrent(0); setSelected(null); setScore(0);
    setFinished(false); setShowAnswer(false);
  };

  if (finished) {
    const pct = Math.round((score / TRIVIA_QUESTIONS.length) * 100);
    return (
      <div className="max-w-2xl mx-auto px-5 py-10 text-center">
        <span className="text-5xl mb-4 block">{pct >= 70 ? '🏆' : pct >= 40 ? '👏' : '📖'}</span>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {pct >= 70 ? 'Excellent!' : pct >= 40 ? 'Good Job!' : 'Keep Learning!'}
        </h1>
        <p className="text-gray-500 mb-6">You scored {score}/{TRIVIA_QUESTIONS.length} ({pct}%)</p>
        <button onClick={restart} className="btn-primary">Play Again</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-6 lg:py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-bold text-gray-900">Bible Trivia</h1>
        <span className="text-sm text-gray-400">{current + 1}/{TRIVIA_QUESTIONS.length}</span>
      </div>

      <div className="progress-bar mb-8">
        <div className="progress-fill" style={{ width: `${((current + 1) / TRIVIA_QUESTIONS.length) * 100}%` }} />
      </div>

      <div className="card-elevated p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className={cn('chip text-xs capitalize', q.difficulty === 'easy' ? 'bg-green-100 text-green-700' : q.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700')}>
            {q.difficulty}
          </span>
          <span className="chip text-xs">{q.category}</span>
        </div>
        <h2 className="text-lg font-semibold text-gray-800">{q.question}</h2>
      </div>

      <div className="space-y-3 mb-6">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className={cn(
              'w-full text-left p-4 rounded-xl border-2 transition-all',
              !showAnswer && 'border-gray-200 hover:border-primary/50 hover:bg-primary-50/30',
              showAnswer && i === q.correctIndex && 'border-green-400 bg-green-50',
              showAnswer && i === selected && i !== q.correctIndex && 'border-red-400 bg-red-50',
              showAnswer && i !== q.correctIndex && i !== selected && 'border-gray-100 opacity-50',
            )}
          >
            <span className="font-medium text-sm">{opt}</span>
          </button>
        ))}
      </div>

      {showAnswer && (
        <div className="card bg-blue-50 border-0 mb-6 animate-fade-in">
          <p className="text-sm text-gray-700">{q.explanation}</p>
          <p className="text-xs text-primary font-medium mt-2">{q.scriptureRef}</p>
        </div>
      )}

      {showAnswer && (
        <button onClick={next} className="btn-primary w-full">
          {current < TRIVIA_QUESTIONS.length - 1 ? 'Next Question' : 'See Results'}
        </button>
      )}
    </div>
  );
}
