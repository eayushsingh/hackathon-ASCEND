'use client';

// ==============================================================================
// ASCEND - ACHIEVEMENTS & TROPHY HALL
// Vibrant Modern RPG HUD Trophy Hall
// ==============================================================================

import React, { useState } from 'react';
import { useGame } from '@/lib/context/game-context';
import { AchievementCard } from '@/components/achievements/AchievementCard';
import {
  Trophy,
  Crown,
} from 'lucide-react';
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
    <div className="space-y-10 pb-16 pt-6">
      {/* 1. TOP STATS HERO */}
      <div className="rounded-3xl bg-[#0D111A]/90 border border-indigo-500/30 p-6 sm:p-8 shadow-[0_0_35px_rgba(99,102,241,0.15)]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="flex items-center space-x-5 text-center md:text-left">
            <div className="w-14 h-14 bg-amber-950/80 border border-amber-500/40 rounded-2xl flex items-center justify-center text-amber-400 shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
              <Trophy className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight font-sans">
                Trophy Hall
              </h1>
              <p className="text-xs sm:text-sm font-sans text-slate-400 mt-1 max-w-lg">
                Permanent milestones achieved across quest eradication, habit streaks, and character levels.
              </p>
            </div>
          </div>

          <div className="px-5 py-3 rounded-2xl bg-slate-950 border border-white/10 flex items-center space-x-4 shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <Crown className="w-6 h-6 text-amber-400" />
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Unlocked Trophies</div>
              <div className="font-mono text-xl font-bold text-amber-400 mt-0.5">
                <AnimatedCounter value={unlockedCount} /> / {totalCount} ({progressPercent}%)
              </div>
            </div>
          </div>
        </div>

        {/* Global Trophy Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs font-mono text-slate-300 uppercase mb-2">
            <span>Overall Trophy Completion</span>
            <span className="text-amber-400 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-950 border border-white/10 rounded-full h-3 overflow-hidden p-0.5">
            <div
              className="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(245,158,11,0.7)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. CATEGORY TABS */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-white/10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all shrink-0 border cursor-pointer ${
              selectedCategory === cat
                ? 'bg-indigo-500 text-white border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                : 'bg-slate-900/80 text-slate-400 border-white/5 hover:border-white/15'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. ACHIEVEMENTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAchievements.map((ach) => {
          const userAch = achievements.find(
            (ua) => ua.achievement_id === ach.id || ua.achievement?.code === ach.code
          );
          return (
            <AchievementCard key={ach.id} achievement={ach} userAchievement={userAch} />
          );
        })}
      </div>
    </div>
  );
}
