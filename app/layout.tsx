import type { Metadata } from 'next';
import { Oswald, Inter } from 'next/font/google';
import './globals.css';
import { GameProvider } from '@/lib/context/game-context';
import { Navbar } from '@/components/layout/Navbar';
import { LevelUpModal } from '@/components/modals/LevelUpModal';
import { AchievementUnlockBanner } from '@/components/modals/AchievementUnlockBanner';

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ASCEND | Life RPG & Productivity Protocol',
  description: 'Transform your daily tasks, workouts, learning, and habits into an immersive full-stack Life RPG. Earn authoritative XP, level up attributes, forge streaks, and conquer reality.',
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-[#F3F1EC] font-sans text-[#141210] antialiased selection:bg-[#E85D25] selection:text-[#F3F1EC]">
        {/* Minimalist edge (No border) */}
        
        <GameProvider>
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {children}
            </main>
            <LevelUpModal />
            <AchievementUnlockBanner />
          </div>
        </GameProvider>
      </body>
    </html>
  );
}
