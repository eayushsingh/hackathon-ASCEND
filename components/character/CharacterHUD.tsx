'use client';

// ==============================================================================
// ASCEND - CHARACTER STATUS HUD
// ==============================================================================

import React from 'react';
import { useGame } from '@/lib/context/game-context';
import { calculateLevelProgress } from '@/lib/progression/levels';
import { ARCHETYPES } from '@/lib/progression/archetypes';
import { Shield, Sparkles, Flame, Coins, Trophy, Zap, Heart } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import Image from 'next/image';

export const CharacterHUD: React.FC = () => {
  const { profile, streak, quests, inventory } = useGame();
  const progress = calculateLevelProgress(profile.xp);
  const archetypeInfo = ARCHETYPES[profile.archetype] || ARCHETYPES['Cyber Mage'];

  const completedQuestsCount = quests.filter((q) => q.status === 'Completed').length;
  const equippedBadgesCount = inventory.filter((i) => i.is_equipped && i.item?.category === 'Badge').length;

  return (
    <div className="cyber-panel p-6 rounded-2xl relative overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ backgroundColor: archetypeInfo.color }}
      />

      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 relative z-10">
        {/* Avatar Portrait with Archetype Glowing Ring */}
        <div className="relative group">
          <div
            className="w-24 h-24 rounded-2xl p-1 flex items-center justify-center shadow-lg transition-all group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${archetypeInfo.color}, #6366F1, #A855F7)`,
              boxShadow: `0 0 25px ${archetypeInfo.accentGlow}`,
            }}
          >
            <div className="w-full h-full bg-[#080B11] rounded-[14px] flex items-center justify-center text-3xl font-black text-white">
              {profile.username.charAt(0)}
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-md bg-slate-900 border border-white/20 text-[10px] font-black text-cyan-400">
            LVL {progress.currentLevel}
          </div>
        </div>

        {/* Profile Info & Ranks */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-3">
            <h2 className="text-2xl font-black tracking-tight text-white">
              {profile.username}
            </h2>
            <span className="inline-block text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              {profile.title}
            </span>
          </div>

          <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="font-semibold text-slate-200">{profile.archetype}</span>
            <span>•</span>
            <span className="text-purple-400 font-bold">{progress.rankTitle} ({progress.tier})</span>
            <span>•</span>
            <span className="text-emerald-400">{archetypeInfo.role}</span>
          </div>

          {/* XP Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span className="text-cyan-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> XP Progression
              </span>
              <span className="text-slate-300">
                {progress.xpIntoCurrentLevel} / {progress.xpNeededForLevel} XP ({progress.progressPercent}%)
              </span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2.5 border border-white/10 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progress.progressPercent}%`,
                  boxShadow: '0 0 12px rgba(6,182,212,0.8)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 text-center">
            <div className="flex items-center justify-center space-x-1 text-amber-400 mb-0.5">
              <Coins className="w-4 h-4" />
              <span className="text-sm font-black">{formatNumber(profile.gold)}</span>
            </div>
            <div className="text-[10px] font-semibold text-slate-400 uppercase">Treasury Gold</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 text-center">
            <div className="flex items-center justify-center space-x-1 text-orange-400 mb-0.5">
              <Flame className="w-4 h-4" />
              <span className="text-sm font-black">{streak.current_streak} Days</span>
            </div>
            <div className="text-[10px] font-semibold text-slate-400 uppercase">Streak Combo</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 text-center">
            <div className="flex items-center justify-center space-x-1 text-cyan-400 mb-0.5">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-black">{completedQuestsCount}</span>
            </div>
            <div className="text-[10px] font-semibold text-slate-400 uppercase">Quests Eradicated</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 text-center">
            <div className="flex items-center justify-center space-x-1 text-purple-400 mb-0.5">
              <Trophy className="w-4 h-4" />
              <span className="text-sm font-black">{streak.longest_streak}d Max</span>
            </div>
            <div className="text-[10px] font-semibold text-slate-400 uppercase">Peak Streak</div>
          </div>
        </div>
      </div>

      {/* Archetype Perk banner */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
        <span className="text-slate-400 flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Active Archetype Perk:</span>
          <strong className="text-slate-200">{archetypeInfo.perk}</strong>
        </span>
        <span className="text-cyan-400 font-bold hidden sm:inline">
          {formatNumber(profile.xp)} Cumulative XP
        </span>
      </div>
    </div>
  );
};
