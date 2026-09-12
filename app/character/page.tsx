'use client';

// ==============================================================================
// ASCEND - CHARACTER SHEET & RPG MASTERY
// ==============================================================================

import React from 'react';
import { useGame } from '@/lib/context/game-context';
import { calculateLevelProgress } from '@/lib/progression/levels';
import { ARCHETYPES } from '@/lib/progression/archetypes';
import { AttributeBarList } from '@/components/character/AttributeBarList';
import {
  Shield,
  Zap,
  Sparkles,
  Trophy,
  Flame,
  Coins,
  Crown,
  CheckCircle2,
  Lock,
  Award,
} from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export default function CharacterPage() {
  const { profile, streak, inventory, quests } = useGame();
  const progress = calculateLevelProgress(profile.xp);
  const archetypeInfo = ARCHETYPES[profile.archetype] || ARCHETYPES['Cyber Mage'];

  const rankTiers = [
    { name: 'Initiate Seeker', tier: 'Novice', range: 'LVL 1 - 4', minLevel: 1 },
    { name: 'Cyber Vanguard', tier: 'Apprentice', range: 'LVL 5 - 9', minLevel: 5 },
    { name: 'Neural Adept', tier: 'Adept', range: 'LVL 10 - 19', minLevel: 10 },
    { name: 'Grid Overseer', tier: 'Master', range: 'LVL 20 - 34', minLevel: 20 },
    { name: 'Singularity Grandmaster', tier: 'Grandmaster', range: 'LVL 35 - 49', minLevel: 35 },
    { name: 'Eternal Ascendant', tier: 'Ascendant', range: 'LVL 50+', minLevel: 50 },
  ];

  const equippedItems = inventory.filter((i) => i.is_equipped);

  return (
    <div className="space-y-8">
      {/* 1. CHARACTER HERO SHEET */}
      <div className="cyber-panel p-8 rounded-3xl relative overflow-hidden border-white/15">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: archetypeInfo.color }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Avatar & Class Crest */}
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            <div
              className="w-32 h-32 rounded-3xl p-1.5 flex items-center justify-center shadow-2xl transition-all"
              style={{
                background: `linear-gradient(135deg, ${archetypeInfo.color}, #6366F1, #A855F7)`,
                boxShadow: `0 0 35px ${archetypeInfo.accentGlow}`,
              }}
            >
              <div className="w-full h-full bg-[#080B11] rounded-[20px] flex items-center justify-center text-5xl font-black text-white">
                {profile.username.charAt(0)}
              </div>
            </div>

            <h2 className="text-2xl font-black text-white mt-4">{profile.username}</h2>
            <div className="text-xs font-bold text-cyan-400 mt-0.5">{profile.title}</div>

            <div
              className="mt-3 px-3 py-1 rounded-full text-xs font-black uppercase border"
              style={{
                color: archetypeInfo.color,
                backgroundColor: `${archetypeInfo.color}15`,
                borderColor: `${archetypeInfo.color}40`,
              }}
            >
              {profile.archetype} • {progress.rankTitle}
            </div>
          </div>

          {/* Core Stats & Progression Details */}
          <div className="lg:col-span-8 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10 text-center">
                <div className="text-xs text-slate-400 font-semibold uppercase">Current Level</div>
                <div className="text-2xl font-black text-cyan-300 mt-1">LVL {progress.currentLevel}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10 text-center">
                <div className="text-xs text-slate-400 font-semibold uppercase">Treasury Gold</div>
                <div className="text-2xl font-black text-amber-400 mt-1">{formatNumber(profile.gold)}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10 text-center">
                <div className="text-xs text-slate-400 font-semibold uppercase">Active Streak</div>
                <div className="text-2xl font-black text-orange-400 mt-1">{streak.current_streak}d</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10 text-center">
                <div className="text-xs text-slate-400 font-semibold uppercase">Quests Cleared</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">
                  {quests.filter((q) => q.status === 'Completed').length}
                </div>
              </div>
            </div>

            {/* Non-Linear Leveling Formula Details */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10">
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span className="text-cyan-400 flex items-center gap-1">
                  <Zap className="w-4 h-4" /> Non-Linear Level Progression
                </span>
                <span className="text-slate-300">
                  {progress.xpIntoCurrentLevel} / {progress.xpNeededForLevel} XP ({progress.progressPercent}%)
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-white/5">
                <div
                  className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progress.progressPercent}%`,
                    boxShadow: '0 0 15px rgba(6,182,212,0.8)',
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                <span>Total XP: {formatNumber(profile.xp)}</span>
                <span>Formula: XP(n) = 100 * n^1.5</span>
                <span>Next Lvl: {formatNumber(progress.xpForNextLevel)} XP</span>
              </div>
            </div>

            {/* Passive Archetype Perk */}
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center space-x-3">
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-emerald-300">Archetype Passive Perk</div>
                <div className="text-xs text-slate-300 mt-0.5">{archetypeInfo.perk}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. RANK MILESTONE PROGRESSION TREE */}
      <div className="cyber-panel p-6 rounded-2xl">
        <div className="pb-4 border-b border-white/10 mb-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-400" />
            <span>Ascension Rank Milestones</span>
          </h3>
          <p className="text-xs text-slate-400">Unlock grandmaster titles and status as you level up</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rankTiers.map((rk) => {
            const isUnlocked = profile.level >= rk.minLevel;
            const isCurrent = progress.tier === rk.tier;

            return (
              <div
                key={rk.tier}
                className={`p-4 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-cyan-950/40 border-cyan-500/70 shadow-[0_0_20px_rgba(6,182,212,0.3)] ring-1 ring-cyan-500'
                    : isUnlocked
                    ? 'bg-slate-900/80 border-white/15'
                    : 'bg-slate-900/30 border-white/5 opacity-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                    {rk.range}
                  </span>
                  {isUnlocked ? (
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <Lock className="w-4 h-4 text-slate-600" />
                  )}
                </div>
                <h4 className="text-sm font-bold text-white">{rk.name}</h4>
                <div className="text-xs text-cyan-400 font-semibold mt-0.5">{rk.tier} Tier</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. ATTRIBUTE MASTERY DEEP DIVE */}
      <div className="cyber-panel p-6 rounded-2xl">
        <div className="pb-4 border-b border-white/10 mb-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            <span>Attribute Breakdown & Specializations</span>
          </h3>
          <p className="text-xs text-slate-400">Gain attribute XP by executing category-specific quests</p>
        </div>
        <AttributeBarList />
      </div>
    </div>
  );
}
