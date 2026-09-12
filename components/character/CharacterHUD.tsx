'use client';

// ==============================================================================
// ASCEND - COMMAND TELEMETRY & HERO CHARACTER HUD
// Vibrant Modern RPG HUD Telemetry Panel
// ==============================================================================

import React from 'react';
import { useGame } from '@/lib/context/game-context';
import { calculateLevelProgress } from '@/lib/progression/levels';
import { ARCHETYPES } from '@/lib/progression/archetypes';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Shield, Flame, Coins, Trophy, Zap, ArrowUpRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const CharacterHUD: React.FC = () => {
  const { profile, streak, quests } = useGame();
  const progress = calculateLevelProgress(profile.xp);
  const archetypeInfo = ARCHETYPES[profile.archetype] || ARCHETYPES['Cyber Mage'];

  const completedQuestsCount = quests.filter((q) => q.status === 'Completed').length;

  return (
    <div className="rounded-3xl bg-[#0D111A]/90 border border-indigo-500/30 p-6 shadow-[0_0_35px_rgba(99,102,241,0.15)] relative overflow-hidden my-6">
      {/* Background Subtle Ambient Lighting */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-transparent to-purple-600/10 pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8 relative z-10">
        
        {/* Archetype Emblem Frame */}
        <div className="relative group shrink-0 text-center">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-2 border-indigo-400 bg-slate-950 flex items-center justify-center text-white shadow-[0_0_25px_rgba(99,102,241,0.4)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-cyan-500/20 group-hover:opacity-100 opacity-80 transition-opacity" />
            <span className="text-5xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-indigo-300 via-purple-300 to-cyan-300 drop-shadow-[0_0_20px_rgba(99,102,241,0.8)]">
              {profile.archetype.charAt(0)}
            </span>
          </div>
          
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-0.5 rounded-full font-mono text-xs font-bold tracking-widest border border-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.6)]">
            LVL <AnimatedCounter value={progress.currentLevel} />
          </div>
        </div>

        {/* Profile Info & Progress */}
        <div className="flex-1 w-full text-center lg:text-left pt-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div>
              <div className="flex items-center justify-center lg:justify-start space-x-3 mb-1">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase font-sans">
                  {profile.username}
                </h2>
                <span className="text-xs font-mono tracking-wider px-2.5 py-0.5 rounded-full border border-indigo-500/40 text-indigo-300 bg-indigo-950/60">
                  {profile.title}
                </span>
              </div>
              
              <div className="text-xs font-mono text-slate-400 flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="font-bold text-slate-200 uppercase">{profile.archetype}</span>
                <span className="text-slate-600">/</span>
                <span className="text-indigo-400 font-bold">
                  {progress.rankTitle} ({progress.tier})
                </span>
                <span className="text-slate-600">/</span>
                <span className="text-slate-400 italic">{archetypeInfo.role}</span>
              </div>
            </div>

            <Link
              href="/character"
              className="inline-flex items-center justify-center space-x-1 text-xs font-mono font-bold tracking-wider text-slate-300 hover:text-indigo-400 transition-colors border border-white/10 hover:border-indigo-500/40 px-4 py-2 rounded-xl bg-slate-900/60"
            >
              <span>INSPECT SHEET</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* XP Telemetry */}
          <div className="mt-4 max-w-2xl mx-auto lg:mx-0">
            <div className="flex items-center justify-between text-xs mb-1.5 font-mono text-slate-400">
              <div className="flex items-center space-x-1.5 uppercase">
                <Zap className="w-3.5 h-3.5 text-indigo-400" /> 
                <span>XP PROGRESSION</span>
              </div>
              <div className="font-bold text-slate-200">
                <AnimatedCounter value={progress.xpIntoCurrentLevel} /> / {progress.xpNeededForLevel} XP{' '}
                <span className="text-indigo-400">({progress.progressPercent}%)</span>
              </div>
            </div>

            <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-white/10 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-full transition-all duration-700 shadow-[0_0_15px_rgba(99,102,241,0.8)]"
                style={{ width: `${progress.progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Telemetry Stat Blocks */}
        <div className="w-full lg:w-44 shrink-0 flex flex-row lg:flex-col justify-between gap-3 pt-2 lg:pt-0">
          <div className="flex-1 bg-slate-950/80 border border-white/10 p-2.5 rounded-2xl flex flex-col items-center lg:items-end">
            <div className="text-amber-400 font-mono text-lg font-bold flex items-center space-x-1">
              <Coins className="w-4 h-4 text-amber-400" />
              <AnimatedCounter value={profile.gold} />
            </div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">TREASURY</div>
          </div>
          
          <div className="flex-1 bg-slate-950/80 border border-white/10 p-2.5 rounded-2xl flex flex-col items-center lg:items-end">
            <div className="text-rose-400 font-mono text-lg font-bold flex items-center space-x-1">
              <Flame className="w-4 h-4 text-rose-400" />
              <span>{streak.current_streak}D</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">STREAK</div>
          </div>
          
          <div className="flex-1 bg-slate-950/80 border border-white/10 p-2.5 rounded-2xl flex flex-col items-center lg:items-end">
            <div className="text-purple-400 font-mono text-lg font-bold flex items-center space-x-1">
              <Trophy className="w-4 h-4 text-purple-400" />
              <span>{completedQuestsCount}</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">QUESTS</div>
          </div>
        </div>
      </div>
      
      {/* Class Perk Banner */}
      <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-bold text-indigo-400 uppercase">CLASS PERK:</span>
          <span className="text-slate-300 italic">{archetypeInfo.perk}</span>
        </div>
        <div className="hidden sm:block text-[11px] text-slate-500 font-mono">
          VIBRANT HUD PROTOCOL v2.4
        </div>
      </div>
    </div>
  );
};
