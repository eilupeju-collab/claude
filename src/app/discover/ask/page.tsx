'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  references?: string[];
}

const SUGGESTED = [
  'What does the Bible say about anxiety?',
  'How do I forgive someone?',
  'What is my purpose in life?',
  'How do I pray effectively?',
];

export default function AskBiblePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ask-bible', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      const aiMsg: Message = {
        id: data.id,
        role: 'assistant',
        content: data.content,
        references: data.references,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [...prev, { id: 'err', role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-120px)] lg:h-[calc(100vh-40px)]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100">
        <h1 className="text-lg font-bold text-gray-900">Ask the Bible</h1>
        <p className="text-sm text-gray-400">AI-powered answers grounded in Scripture</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <span className="text-5xl mb-4 block">📖</span>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Ask anything about the Bible</h2>
            <p className="text-sm text-gray-400 mb-6">Get answers with chapter-and-verse references</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-md mx-auto">
              {SUGGESTED.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-left text-sm p-3 rounded-xl bg-primary-50 text-primary hover:bg-primary-100 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              msg.role === 'user'
                ? 'bg-primary text-white rounded-br-md'
                : 'bg-white border border-gray-100 shadow-soft rounded-bl-md'
            }`}>
              <p className={`text-sm whitespace-pre-wrap leading-relaxed ${msg.role === 'user' ? 'text-white' : 'text-gray-700'}`}>
                {msg.content}
              </p>
              {msg.references && msg.references.length > 0 && (
                <div className="mt-3 pt-2 border-t border-gray-100">
                  <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1">References</p>
                  <div className="flex flex-wrap gap-1">
                    {msg.references.map((ref) => (
                      <span key={ref} className="text-xs bg-primary-50 text-primary px-2 py-0.5 rounded-full">{ref}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-soft">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="px-5 py-4 border-t border-gray-100 bg-white">
        <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex gap-2">
          <input
            className="input-field flex-1"
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className="btn-primary px-4" disabled={!input.trim() || loading}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
