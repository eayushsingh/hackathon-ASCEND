import type { Metadata } from 'next';
import './globals.css';
import { GameProvider } from '@/lib/context/game-context';
import { Navbar } from '@/components/layout/Navbar';
import { LevelUpModal } from '@/components/modals/LevelUpModal';
import { AchievementUnlockBanner } from '@/components/modals/AchievementUnlockBanner';

export const metadata: Metadata = {
  title: 'ASCEND | Life RPG & Productivity Cyber-Matrix',
  description: 'Transform your daily goals, fitness, learning, and habits into an immersive full-stack Life RPG experience. Earn XP, level up attributes, forge streaks, and conquer reality.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark theme-cyberpunk">
      <body className="min-h-screen bg-[#080B11] text-slate-100 antialiased selection:bg-cyan-500 selection:text-black">
        <GameProvider>
          <div className="relative min-h-screen flex flex-col cyber-grid-bg">
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
