'use client';

// ==============================================================================
// ASCEND - ACHIEVEMENTS & TROPHY HALL
// Distinct Gold Prestige Hall of Fame with progress metrics and claimable rewards
// ==============================================================================

import React, { useState } from 'react';
import { useGame } from '@/lib/context/game-context';
import { AchievementCard } from '@/components/achievements/AchievementCard';
import {
  Trophy,
  Sparkles,
  Zap,
  Coins,
  Crown,
  CheckCircle2,
} from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

export default function AchievementsPage() {
  const { availableAchievements, achievements } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'General', 'Quests', 'Streaks', 'Attributes', 'Economy'];

  const unlockedCount = achievements.length;
  const totalCount = availableAchievements.length;
  const progressPercent = Math.round((unlockedCount / totalCount) * 100);

  const filteredAchievements = availableAchievements.filter((ach) => {
    if (selectedCategory === 'All') return true;
    return ach.category === selectedCategory;
  });

  return (
    <div className="space-y-6 pb-10">
      {/* 1. TOP STATS HERO (GOLD PRESTIGE) */}
      <div className="cyber-panel p-6 rounded-2xl border-white/10 bg-[#0D111A]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display text-xl sm:text-2xl font-black text-white">
                TROPHY HALL OF FAME
              </h1>
              <p className="text-xs text-slate-400">
                Permanent milestones achieved across quest eradication, habit streaks, and character levels.
              </p>
            </div>
          </div>

          <div className="px-4 py-2.5 rounded-xl bg-[#07090E] border border-amber-500/30 flex items-center space-x-3 shrink-0">
            <Crown className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">UNLOCKED TROPHIES</div>
              <div className="font-display text-base font-black text-amber-300">
                <AnimatedCounter value={unlockedCount} /> / {totalCount} ({progressPercent}%)
              </div>
            </div>
          </div>
        </div>

        {/* Global Trophy Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-1.5">
            <span>Overall Trophy Completion</span>
            <span className="text-amber-400 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#07090E] rounded-full h-2 overflow-hidden border border-white/5">
            <div
              className="bg-amber-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. CATEGORY TABS */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 border ${
              selectedCategory === cat
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                : 'bg-[#0D111A] text-slate-400 hover:bg-white/5 border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. ACHIEVEMENTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAchievements.map((ach) => {
          const userAch = achievements.find(
            (ua) => ua.achievement_id === ach.id || ua.achievement?.code === ach.code
          );
          return (
            <AchievementCard
              key={ach.id}
              achievement={ach}
              userAchievement={userAch}
            />
          );
        })}
      </div>
    </div>
  );
}
