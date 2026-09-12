'use client';

// ==============================================================================
// ASCEND - CHARACTER DOSSIER & RPG ASCENSION SHEET
// Vibrant Modern RPG HUD High-Tech Dossier Layout
// ==============================================================================

import React, { useState } from 'react';
import { useGame } from '@/lib/context/game-context';
import { calculateLevelProgress, calculateXPForLevel } from '@/lib/progression/levels';
import { ARCHETYPES } from '@/lib/progression/archetypes';
import { ATTRIBUTE_LIST, calculateAttributeLevel, getAttributeMasteryTitle } from '@/lib/progression/attributes';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import {
  Sparkles,
  CheckCircle2,
  Lock,
  Zap,
  Shield,
  Coins,
  Flame,
  Trophy,
} from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export default function CharacterPage() {
  const { profile, streak, quests, attributes } = useGame();
  const progress = calculateLevelProgress(profile.xp);
  const archetypeInfo = ARCHETYPES[profile.archetype] || ARCHETYPES['Cyber Mage'];

  const [previewFormulaLevel, setPreviewFormulaLevel] = useState(progress.currentLevel + 1);

  const rankMilestones = [
    { name: 'Initiate Seeker', tier: 'Novice', level: 1, perk: 'Unlocked basic quest bounty system' },
    { name: 'Cyber Vanguard', tier: 'Apprentice', level: 5, perk: '+5% bonus XP on daily recurring habits' },
    { name: 'Neural Adept', tier: 'Adept', level: 10, perk: 'Unlocks Epic quest tier difficulty' },
    { name: 'Grid Overseer', tier: 'Master', level: 20, perk: 'Unlocks exclusive Guild Shop discounts' },
    { name: 'Singularity Grandmaster', tier: 'Grandmaster', level: 35, perk: 'Legendary quest tier & Aura glow' },
    { name: 'Eternal Ascendant', tier: 'Ascendant', level: 50, perk: 'Max prestige title & Mythic cosmetics' },
  ];

  const previewXpRequired = calculateXPForLevel(previewFormulaLevel);

  return (
    <div className="space-y-10 pb-16 pt-6">
      {/* 1. DOSSIER HEADER */}
      <div className="rounded-3xl bg-[#0D111A]/90 border border-indigo-500/30 p-6 sm:p-8 shadow-[0_0_35px_rgba(99,102,241,0.15)]">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 pb-8 border-b border-white/10">
          {/* Avatar Emblem Frame */}
          <div className="relative group shrink-0 text-center">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl border-2 border-indigo-400 bg-slate-950 flex items-center justify-center text-white shadow-[0_0_35px_rgba(99,102,241,0.4)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/30 via-purple-600/30 to-cyan-500/30 group-hover:opacity-100 opacity-80 transition-opacity" />
              <div className="text-7xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-indigo-300 via-purple-300 to-cyan-300 drop-shadow-[0_0_20px_rgba(99,102,241,0.8)]">
                {profile.archetype.charAt(0)}
              </div>
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-1 rounded-full font-mono text-sm font-bold tracking-widest border border-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.6)]">
              LVL <AnimatedCounter value={progress.currentLevel} />
            </div>
          </div>

          <div className="flex-1 w-full text-center lg:text-left pt-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-sans">
              {profile.username}
            </h1>
            <div className="text-xs font-mono tracking-wider text-indigo-400 uppercase mt-1 mb-4">
              {profile.title} • {profile.archetype}
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-white/10">
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Cumulative XP</div>
                <div className="font-mono text-xl font-bold text-indigo-400 mt-0.5"><AnimatedCounter value={profile.xp} /></div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Guild Gold</div>
                <div className="font-mono text-xl font-bold text-amber-400 mt-0.5"><AnimatedCounter value={profile.gold} /></div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Active Combo</div>
                <div className="font-mono text-xl font-bold text-rose-400 mt-0.5">{streak.current_streak}D</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Quests Cleared</div>
                <div className="font-mono text-xl font-bold text-purple-400 mt-0.5">{quests.filter((q) => q.status === 'Completed').length}</div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center space-x-3 text-xs font-mono">
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
              <div>
                <span className="font-bold text-indigo-400 uppercase mr-2">PASSIVE PERK:</span>
                <span className="text-slate-300 italic">{archetypeInfo.perk}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. MATHEMATICAL PROGRESSION BLUEPRINT */}
        <div className="pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-100 uppercase font-sans">Scaling Formula Blueprint</h2>
              <p className="text-xs font-mono text-indigo-400 mt-0.5">XP(n) = 100 * n^1.5</p>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono text-slate-400 uppercase">Inspect Level:</span>
              <input
                type="number"
                min={1}
                max={100}
                value={previewFormulaLevel}
                onChange={(e) => setPreviewFormulaLevel(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 px-3 py-1.5 bg-slate-900 border border-white/10 rounded-xl font-mono text-sm font-bold text-indigo-400 text-center focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/5">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Current Tier</div>
              <div className="font-mono text-2xl font-bold text-slate-100 mt-1">Level {progress.currentLevel}</div>
              <div className="text-xs font-mono text-slate-400 mt-1">{formatNumber(progress.xpForCurrentLevel)} XP Total</div>
            </div>
            
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/40">
              <div className="text-[10px] font-mono text-indigo-400 uppercase">Next Target</div>
              <div className="font-mono text-2xl font-bold text-indigo-300 mt-1">Level {progress.currentLevel + 1}</div>
              <div className="text-xs font-mono text-indigo-400 mt-1">{formatNumber(progress.xpForNextLevel - profile.xp)} XP Needed</div>
            </div>
            
            <div className="p-4 rounded-2xl bg-slate-950/40 border border-white/10 border-dashed">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Inspected Level {previewFormulaLevel}</div>
              <div className="font-mono text-2xl font-bold text-purple-400 mt-1">{formatNumber(previewXpRequired)} XP</div>
              <div className="text-xs font-mono text-slate-400 mt-1">Cumulative Requirement</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. ASCENSION RANK ROADMAP */}
      <div className="rounded-3xl bg-[#0D111A]/90 border border-white/10 p-6 sm:p-8 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
        <div className="mb-6 pb-3 border-b border-white/10">
          <h2 className="text-xl font-extrabold text-white uppercase font-sans">Ascension Rank Roadmap</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rankMilestones.map((milestone) => {
            const isUnlocked = profile.level >= milestone.level;
            const isCurrent = progress.tier === milestone.tier;

            return (
              <div
                key={milestone.tier}
                className={`p-5 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'border-indigo-500 bg-indigo-950/40 shadow-[0_0_20px_rgba(99,102,241,0.2)]'
                    : isUnlocked
                    ? 'border-white/10 bg-slate-950/80'
                    : 'border-white/5 bg-slate-950/40 opacity-50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-mono text-xs font-bold uppercase ${isCurrent ? 'text-indigo-400' : 'text-slate-400'}`}>
                    Level {milestone.level}+
                  </span>
                  {isUnlocked ? (
                    <CheckCircle2 className={`w-4 h-4 ${isCurrent ? 'text-indigo-400' : 'text-emerald-400'}`} />
                  ) : (
                    <Lock className="w-4 h-4 text-slate-500" />
                  )}
                </div>

                <h3 className="font-mono text-base font-bold text-slate-100 uppercase">{milestone.name}</h3>
                <div className="text-xs font-mono text-indigo-400 mt-0.5">{milestone.tier} Tier</div>

                <p className="text-xs font-sans text-slate-400 mt-3 pt-3 border-t border-white/5 italic">
                  {milestone.perk}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. ATTRIBUTE MASTERY MATRIX */}
      <div className="rounded-3xl bg-[#0D111A]/90 border border-white/10 p-6 sm:p-8 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
        <div className="mb-6 pb-3 border-b border-white/10">
          <h2 className="text-xl font-extrabold text-white uppercase font-sans">Attribute Specializations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ATTRIBUTE_LIST.map((attr) => {
            const attrKey = `${attr.type.toLowerCase()}_xp` as keyof typeof attributes;
            const currentXP = (attributes[attrKey] as number) || 0;
            const level = calculateAttributeLevel(currentXP);
            const masteryTitle = getAttributeMasteryTitle(level);
            
            const xpInCurrentLevel = currentXP % 150;
            const percent = Math.min(100, Math.floor((xpInCurrentLevel / 150) * 100));

            return (
              <div key={attr.type} className="p-5 rounded-2xl bg-slate-950/80 border border-white/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-mono text-lg font-bold uppercase" style={{ color: attr.color }}>{attr.name}</h4>
                    <span className="font-mono text-xs font-bold text-slate-200">LVL {level}</span>
                  </div>
                  <div className="text-xs font-mono text-slate-400 uppercase mb-3">{masteryTitle} Tier</div>
                  
                  <p className="text-xs font-sans text-slate-400 leading-relaxed mb-4">
                    {attr.description}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
                    <span>PROGRESS</span>
                    <span className="font-bold text-slate-200">{xpInCurrentLevel}/150 XP</span>
                  </div>

                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-white/10">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: attr.color,
                        boxShadow: `0 0 12px ${attr.color}`,
                      }}
                    />
                  </div>

                  <div className="text-[11px] font-sans text-slate-400 italic mt-2 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-indigo-400" /> {attr.buffBenefit}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
