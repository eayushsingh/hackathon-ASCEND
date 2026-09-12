'use client';

// ==============================================================================
// ASCEND - COMMAND TELEMETRY & HERO CHARACTER HUD
// Dominant visual element on dashboard with high-contrast glowing XP telemetry
// ==============================================================================

import React from 'react';
import { useGame } from '@/lib/context/game-context';
import { calculateLevelProgress } from '@/lib/progression/levels';
import { ARCHETYPES } from '@/lib/progression/archetypes';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Shield, Sparkles, Flame, Coins, Trophy, Zap, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const CharacterHUD: React.FC = () => {
  const { profile, streak, quests, inventory } = useGame();
  const progress = calculateLevelProgress(profile.xp);
  const archetypeInfo = ARCHETYPES[profile.archetype] || ARCHETYPES['Cyber Mage'];

  const completedQuestsCount = quests.filter((q) => q.status === 'Completed').length;

  return (
    <div className="cyber-hero-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden border border-cyan-500/50 shadow-[0_0_35px_rgba(6,182,212,0.25)]">
      {/* Background radial glow */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-25"
        style={{ backgroundColor: archetypeInfo.color }}
      />

      <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8 relative z-10">
        {/* Large Prominent Avatar + Dominant Level Badge */}
        <div className="relative group shrink-0 text-center">
          <div
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl p-1 flex items-center justify-center transition-transform group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${archetypeInfo.color}, #3B82F6)`,
              boxShadow: `0 0 30px ${archetypeInfo.accentGlow}`,
            }}
          >
            <div className="w-full h-full bg-[#07090E] rounded-[13px] flex items-center justify-center text-4xl sm:text-5xl font-display font-black text-white">
              {profile.username.charAt(0)}
            </div>
          </div>

          {/* Loudest Hero Level Badge */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#07090E] border-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.8)] text-cyan-300 font-display font-black text-xs tracking-wider whitespace-nowrap">
            LEVEL <AnimatedCounter value={progress.currentLevel} className="font-display font-black" />
          </div>
        </div>

        {/* Profile Info & The Main Loud XP Progression Telemetry */}
        <div className="flex-1 w-full text-center lg:text-left pt-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {profile.username}
                </h2>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  {profile.title}
                </span>
              </div>

              <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="font-semibold text-slate-200">{profile.archetype}</span>
                <span>•</span>
                <span className="text-cyan-400 font-display font-semibold tracking-wide">
                  {progress.rankTitle} ({progress.tier})
                </span>
                <span>•</span>
                <span className="text-emerald-400">{archetypeInfo.role}</span>
              </div>
            </div>

            <Link
              href="/character"
              className="inline-flex items-center justify-center space-x-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors self-center sm:self-auto"
            >
              <span>Full Character Sheet</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* VISUALLY LOUDEST ELEMENT: THE COMMAND XP TELEMETRY BAR */}
          <div className="mt-6 p-4 rounded-xl bg-[#07090E]/90 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <div className="flex items-center justify-between text-xs mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-display text-xs font-black uppercase text-cyan-300 tracking-wider flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-cyan-400" /> XP PROGRESSION TELEMETRY
                </span>
              </div>
              <div className="font-display text-xs font-bold text-slate-200">
                <AnimatedCounter value={progress.xpIntoCurrentLevel} /> / {progress.xpNeededForLevel} XP{' '}
                <span className="text-cyan-400">({progress.progressPercent}%)</span>
              </div>
            </div>

            {/* Glowing Thick XP Bar */}
            <div className="w-full bg-slate-950 rounded-full h-4 p-0.5 border border-white/10 overflow-hidden relative">
              <div
                className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 h-full rounded-full transition-all duration-700 relative"
                style={{
                  width: `${progress.progressPercent}%`,
                  boxShadow: '0 0 20px rgba(6, 182, 212, 0.9)',
                }}
              >
                {/* Shimmer line inside progress */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-60 animate-pulse" />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
              <span>Total XP: <AnimatedCounter value={profile.xp} /></span>
              <span>Next Level Goal: {progress.xpForNextLevel} XP</span>
            </div>
          </div>
        </div>

        {/* Crisp High-Density Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2.5 w-full lg:w-60 shrink-0">
          <div className="p-3 rounded-xl bg-[#07090E] border border-white/10 text-center">
            <div className="flex items-center justify-center space-x-1 text-amber-400 mb-0.5">
              <Coins className="w-4 h-4" />
              <AnimatedCounter value={profile.gold} className="font-display text-sm font-black text-amber-300" />
            </div>
            <div className="text-[10px] font-semibold text-slate-400 uppercase">Treasury Gold</div>
          </div>

          <div className="p-3 rounded-xl bg-[#07090E] border border-white/10 text-center">
            <div className="flex items-center justify-center space-x-1 text-orange-400 mb-0.5">
              <Flame className="w-4 h-4" />
              <span className="font-display text-sm font-black text-orange-300">{streak.current_streak}d</span>
            </div>
            <div className="text-[10px] font-semibold text-slate-400 uppercase">Streak Combo</div>
          </div>

          <div className="p-3 rounded-xl bg-[#07090E] border border-white/10 text-center">
            <div className="flex items-center justify-center space-x-1 text-cyan-400 mb-0.5">
              <Shield className="w-4 h-4" />
              <span className="font-display text-sm font-black text-cyan-300">{completedQuestsCount}</span>
            </div>
            <div className="text-[10px] font-semibold text-slate-400 uppercase">Quests Done</div>
          </div>

          <div className="p-3 rounded-xl bg-[#07090E] border border-white/10 text-center">
            <div className="flex items-center justify-center space-x-1 text-purple-400 mb-0.5">
              <Trophy className="w-4 h-4" />
              <span className="font-display text-sm font-black text-purple-300">{streak.longest_streak}d</span>
            </div>
            <div className="text-[10px] font-semibold text-slate-400 uppercase">Peak Streak</div>
          </div>
        </div>
      </div>

      {/* Passive Archetype Perk Indicator */}
      <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-400">Class Perk:</span>
          <strong className="text-slate-200">{archetypeInfo.perk}</strong>
        </span>
        <span className="text-cyan-400 font-display font-semibold text-[11px] hidden sm:inline">
          ASCEND v1.0 PROTOCOL
        </span>
      </div>
    </div>
  );
};
