import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import MobileNav from '@/components/layout/MobileNav';
import Header from '@/components/layout/Header';
import PWAInstall from '@/components/PWAInstall';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bible Chat — Daily Verses, Meditation, Prayer & Community',
  description: 'Daily Bible verses, prayer, audio Bible, devotionals & Christian study plans. Join millions walking with God.',
  keywords: ['bible', 'prayer', 'meditation', 'christian', 'devotional', 'faith'],
  manifest: '/manifest.json',
  themeColor: '#4A6FA5',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Bible Chat',
  },
  openGraph: {
    title: 'Bible Chat',
    description: 'Your walk with God, one step at a time.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 lg:ml-64">
            <Header />
            <div className="pb-20 lg:pb-0">
              {children}
            </div>
          </main>
          <MobileNav />
          <PWAInstall />
        </div>
      </body>
    </html>
  );
}
