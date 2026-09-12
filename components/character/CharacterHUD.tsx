'use client';

// ==============================================================================
// ASCEND - COMMAND TELEMETRY & HERO CHARACTER HUD
// Minimalist Editorial Theme
// ==============================================================================

import React from 'react';
import { useGame } from '@/lib/context/game-context';
import { calculateLevelProgress } from '@/lib/progression/levels';
import { ARCHETYPES } from '@/lib/progression/archetypes';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Shield, Flame, Coins, Trophy, Zap, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const CharacterHUD: React.FC = () => {
  const { profile, streak, quests } = useGame();
  const progress = calculateLevelProgress(profile.xp);
  const archetypeInfo = ARCHETYPES[profile.archetype] || ARCHETYPES['Cyber Mage'];

  const completedQuestsCount = quests.filter((q) => q.status === 'Completed').length;

  return (
    <div className="py-8 border-b-2 border-[#141210]">
      <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-12 relative z-10">
        
        {/* Large Flat Archetype Emblem */}
        <div className="relative group shrink-0 text-center">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-[6px] border-[#141210] flex items-center justify-center bg-white text-[#141210]">
            <div className="text-6xl font-display font-bold">
              {profile.archetype.charAt(0)}
            </div>
          </div>
          
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#E85D25] text-white px-4 py-1 border-2 border-[#141210] font-display text-sm tracking-widest">
            LVL <AnimatedCounter value={progress.currentLevel} />
          </div>
        </div>

        {/* Profile Info & Progress */}
        <div className="flex-1 w-full text-center lg:text-left pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#141210]/20 pb-4">
            <div>
              <div className="flex items-center justify-center lg:justify-start space-x-3 mb-1">
                <h2 className="font-display text-4xl font-bold text-[#141210] tracking-tight uppercase">
                  {profile.username}
                </h2>
                <span className="text-xs font-display tracking-widest px-2 py-0.5 border border-[#141210] text-[#141210]">
                  {profile.title}
                </span>
              </div>
              
              <div className="text-sm font-sans text-[#57534E] flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="font-bold text-[#141210] uppercase tracking-wide">{profile.archetype}</span>
                <span>/</span>
                <span className="text-[#E85D25] font-display font-bold tracking-widest">
                  {progress.rankTitle} ({progress.tier})
                </span>
                <span>/</span>
                <span className="text-[#57534E] italic">{archetypeInfo.role}</span>
              </div>
            </div>

            <Link
              href="/character"
              className="inline-flex items-center justify-center space-x-1 text-sm font-display tracking-widest text-[#57534E] hover:text-[#141210] transition-colors border border-[#141210]/20 px-4 py-2 hover:bg-[#141210]/5"
            >
              <span>INSPECT SHEET</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* XP Telemetry */}
          <div className="mt-6 max-w-2xl mx-auto lg:mx-0">
            <div className="flex items-center justify-between text-xs mb-2 font-display tracking-widest text-[#57534E]">
              <div className="flex items-center space-x-1.5 uppercase">
                <Zap className="w-3.5 h-3.5" /> 
                <span>XP PROGRESSION</span>
              </div>
              <div className="font-bold text-[#141210]">
                <AnimatedCounter value={progress.xpIntoCurrentLevel} /> / {progress.xpNeededForLevel} XP{' '}
                <span className="text-[#E85D25]">({progress.progressPercent}%)</span>
              </div>
            </div>

            <div className="w-full h-2 bg-[#E5E5E5] overflow-hidden">
              <div
                className="bg-[#E85D25] h-full transition-all duration-700"
                style={{ width: `${progress.progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Minimal Stat Block */}
        <div className="w-full lg:w-48 shrink-0 flex flex-row lg:flex-col justify-between gap-4 lg:pt-2">
          <div className="flex flex-col items-center lg:items-end">
            <div className="text-[#D97706] font-display text-xl font-bold flex items-center space-x-1">
              <Coins className="w-4 h-4" />
              <AnimatedCounter value={profile.gold} />
            </div>
            <div className="text-[10px] font-sans font-bold text-[#6B665C] uppercase tracking-wider">Treasury</div>
          </div>
          
          <div className="flex flex-col items-center lg:items-end">
            <div className="text-[#E85D25] font-display text-xl font-bold flex items-center space-x-1">
              <Flame className="w-4 h-4" />
              <span>{streak.current_streak}D</span>
            </div>
            <div className="text-[10px] font-sans font-bold text-[#6B665C] uppercase tracking-wider">Streak</div>
          </div>
          
          <div className="flex flex-col items-center lg:items-end">
            <div className="text-[#141210] font-display text-xl font-bold flex items-center space-x-1">
              <Trophy className="w-4 h-4" />
              <span>{completedQuestsCount}</span>
            </div>
            <div className="text-[10px] font-sans font-bold text-[#6B665C] uppercase tracking-wider">Quests</div>
          </div>
        </div>
      </div>
      
      {/* Class Perk */}
      <div className="mt-8 pt-4 border-t border-[#141210]/10 flex items-center justify-between text-xs font-sans text-[#57534E]">
        <div>
          <span className="font-bold text-[#141210] uppercase tracking-wider mr-2">CLASS PERK:</span>
          <span className="italic">{archetypeInfo.perk}</span>
        </div>
        <div className="hidden sm:block font-display tracking-widest text-[#6B665C]">
          ASCEND v1.0
        </div>
      </div>
    </div>
  );
};
