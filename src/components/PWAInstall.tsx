'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }

    // Check if iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(ios);

    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) return;

    // Listen for install prompt (Android/Desktop Chrome)
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Show iOS banner after 3 seconds if not installed
    if (ios && !isStandalone) {
      setTimeout(() => setShowBanner(true), 3000);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const dismiss = () => {
    setShowBanner(false);
    setShowIOSGuide(false);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Install Banner */}
      <div className="fixed bottom-20 lg:bottom-4 left-4 right-4 lg:left-auto lg:right-4 lg:w-80 z-50 animate-slide-up">
        <div className="bg-white rounded-2xl shadow-elevated p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 text-sm">Install Bible Chat</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Add to your home screen for quick access
              </p>
            </div>
            <button onClick={dismiss} className="text-gray-400 hover:text-gray-600 p-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <button
            onClick={handleInstall}
            className="w-full mt-3 bg-primary text-white py-2.5 rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            {isIOS ? 'Show Me How' : 'Install App'}
          </button>
        </div>
      </div>

      {/* iOS Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-end justify-center" onClick={dismiss}>
          <div className="bg-white rounded-t-3xl w-full max-w-lg p-6 pb-10 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Install on iPhone/iPad</h3>
              <button onClick={dismiss} className="text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-primary-50 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">1</span>
                <div>
                  <p className="text-sm font-medium text-gray-800">Tap the Share button</p>
                  <p className="text-xs text-gray-500 mt-0.5">The square with an arrow at the bottom of Safari</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-primary-50 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">2</span>
                <div>
                  <p className="text-sm font-medium text-gray-800">Scroll down and tap &ldquo;Add to Home Screen&rdquo;</p>
                  <p className="text-xs text-gray-500 mt-0.5">You may need to scroll to find it</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-primary-50 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">3</span>
                <div>
                  <p className="text-sm font-medium text-gray-800">Tap &ldquo;Add&rdquo;</p>
                  <p className="text-xs text-gray-500 mt-0.5">Bible Chat will appear on your home screen like a real app!</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      )}
    </>
  );
}
