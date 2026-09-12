'use client';

// ==============================================================================
// ASCEND - CHARACTER DOSSIER & RPG ASCENSION SHEET
// Minimalist Editorial Theme
// ==============================================================================

import React, { useState } from 'react';
import { useGame } from '@/lib/context/game-context';
import { calculateLevelProgress, calculateXPForLevel, BASE_XP } from '@/lib/progression/levels';
import { ARCHETYPES } from '@/lib/progression/archetypes';
import { ATTRIBUTE_LIST, calculateAttributeLevel, getAttributeMasteryTitle } from '@/lib/progression/attributes';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import {
  Sparkles,
  CheckCircle2,
  Lock,
  Zap,
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
    <div className="space-y-16 pb-16 pt-8">
      {/* 1. DOSSIER HEADER */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 border-b-2 border-[#141110] pb-12">
        {/* Large Avatar Badge */}
        <div className="relative group shrink-0 text-center">
          <div className="w-48 h-48 rounded-full border-[8px] border-[#141110] flex items-center justify-center bg-white text-[#141110]">
            <div className="text-8xl font-display font-bold">
              {profile.archetype.charAt(0)}
            </div>
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#E8552A] text-white px-6 py-2 border-4 border-[#141110] font-display text-xl tracking-widest">
            LVL <AnimatedCounter value={progress.currentLevel} />
          </div>
        </div>

        <div className="flex-1 w-full text-center lg:text-left pt-2">
          <h1 className="font-display text-6xl font-bold text-[#141110] uppercase tracking-tight">
            {profile.username}
          </h1>
          <div className="text-sm font-display tracking-widest text-[#6B6560] uppercase mt-2 mb-4">
            {profile.title} • {profile.archetype}
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-[#141110]/20">
            <div>
              <div className="text-xs font-sans font-bold uppercase tracking-wider text-[#6B6560]">Cumulative XP</div>
              <div className="font-display text-3xl font-bold text-[#E8552A] mt-1"><AnimatedCounter value={profile.xp} /></div>
            </div>
            <div>
              <div className="text-xs font-sans font-bold uppercase tracking-wider text-[#6B6560]">Guild Gold</div>
              <div className="font-display text-3xl font-bold text-[#C9A227] mt-1"><AnimatedCounter value={profile.gold} /></div>
            </div>
            <div>
              <div className="text-xs font-sans font-bold uppercase tracking-wider text-[#6B6560]">Active Combo</div>
              <div className="font-display text-3xl font-bold text-[#141110] mt-1">{streak.current_streak}D</div>
            </div>
            <div>
              <div className="text-xs font-sans font-bold uppercase tracking-wider text-[#6B6560]">Quests Cleared</div>
              <div className="font-display text-3xl font-bold text-[#141110] mt-1">{quests.filter((q) => q.status === 'Completed').length}</div>
            </div>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <Sparkles className="w-6 h-6 text-[#141110]" />
            <div>
              <div className="text-sm font-display font-bold uppercase tracking-widest text-[#141110]">Class Passive Perk</div>
              <p className="text-sm font-sans text-[#6B6560] italic mt-1">{archetypeInfo.perk} {archetypeInfo.lore}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MATHEMATICAL PROGRESSION BLUEPRINT */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-[#141110] uppercase tracking-widest">Scaling Blueprint</h2>
            <p className="text-sm font-sans font-bold text-[#6B6560] uppercase tracking-widest mt-1">XP(n) = 100 * n^1.5</p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm font-sans font-bold uppercase tracking-widest text-[#141110]">Inspect Level:</span>
            <input
              type="number"
              min={1}
              max={100}
              value={previewFormulaLevel}
              onChange={(e) => setPreviewFormulaLevel(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 px-3 py-2 border-2 border-[#141110] font-display font-bold text-center text-lg focus:outline-none focus:border-[#E8552A]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border-2 border-[#141110]">
            <div className="text-xs font-sans font-bold uppercase tracking-wider text-[#6B6560]">Current Tier</div>
            <div className="font-display text-3xl font-bold text-[#141110] mt-1">Level {progress.currentLevel}</div>
            <div className="text-sm font-sans text-[#6B6560] mt-2 italic">{formatNumber(progress.xpForCurrentLevel)} XP total req</div>
          </div>
          
          <div className="p-6 border-2 border-[#E8552A] bg-[#E8552A]/5">
            <div className="text-xs font-sans font-bold uppercase tracking-wider text-[#E8552A]">Next Target</div>
            <div className="font-display text-3xl font-bold text-[#E8552A] mt-1">Level {progress.currentLevel + 1}</div>
            <div className="text-sm font-sans text-[#6B6560] mt-2 italic">{formatNumber(progress.xpForNextLevel - profile.xp)} more XP needed</div>
          </div>
          
          <div className="p-6 border-2 border-[#141110]/20 border-dashed">
            <div className="text-xs font-sans font-bold uppercase tracking-wider text-[#6B6560]">Inspected Lvl {previewFormulaLevel}</div>
            <div className="font-display text-3xl font-bold text-[#141110] mt-1">{formatNumber(previewXpRequired)} XP</div>
            <div className="text-sm font-sans text-[#6B6560] mt-2 italic">Cumulative total</div>
          </div>
        </div>
      </div>

      {/* 3. ASCENSION RANK ROADMAP */}
      <div>
        <div className="mb-8 border-b-2 border-[#141110] pb-2">
          <h2 className="font-display text-3xl font-bold text-[#141110] uppercase tracking-widest">Ascension Ranks</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rankMilestones.map((milestone) => {
            const isUnlocked = profile.level >= milestone.level;
            const isCurrent = progress.tier === milestone.tier;

            return (
              <div
                key={milestone.tier}
                className={`p-6 border-2 transition-all ${
                  isCurrent
                    ? 'border-[#E8552A] bg-[#E8552A]/5'
                    : isUnlocked
                    ? 'border-[#141110]'
                    : 'border-[#141110]/20 bg-[#F5F3EE]/50 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`font-display text-xs font-bold uppercase tracking-widest ${isCurrent ? 'text-[#E8552A]' : 'text-[#141110]'}`}>
                    Level {milestone.level}+
                  </span>
                  {isUnlocked ? (
                    <CheckCircle2 className={`w-5 h-5 ${isCurrent ? 'text-[#E8552A]' : 'text-[#141110]'}`} />
                  ) : (
                    <Lock className="w-5 h-5 text-[#6B6560]" />
                  )}
                </div>

                <h3 className="font-display text-xl font-bold text-[#141110] uppercase tracking-wider">{milestone.name}</h3>
                <div className="text-xs font-sans font-bold uppercase text-[#6B6560] mt-1">{milestone.tier} Tier</div>

                <p className="text-sm font-sans text-[#6B6560] mt-4 pt-4 border-t border-[#141110]/10 italic">
                  {milestone.perk}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. ATTRIBUTE MASTERY MATRIX */}
      <div>
        <div className="mb-8 border-b-2 border-[#141110] pb-2">
          <h2 className="font-display text-3xl font-bold text-[#141110] uppercase tracking-widest">Attribute Specializations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ATTRIBUTE_LIST.map((attr) => {
            const attrKey = `${attr.type.toLowerCase()}_xp` as keyof typeof attributes;
            const currentXP = (attributes[attrKey] as number) || 0;
            const level = calculateAttributeLevel(currentXP);
            const masteryTitle = getAttributeMasteryTitle(level);
            
            const xpInCurrentLevel = currentXP % 150;
            const percent = Math.min(100, Math.floor((xpInCurrentLevel / 150) * 100));

            return (
              <div key={attr.type} className="group flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-display text-2xl font-bold uppercase" style={{ color: attr.color }}>{attr.name}</h4>
                    <span className="font-display text-sm font-bold tracking-widest text-[#141110]">LVL {level}</span>
                  </div>
                  <div className="text-xs font-sans font-bold uppercase text-[#6B6560] tracking-wider mb-4">{masteryTitle} Tier</div>
                  
                  <p className="text-sm font-sans text-[#6B6560] leading-relaxed mb-6">
                    {attr.description}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-display tracking-widest font-bold text-[#141110] mb-2">
                    <span>Progress</span>
                    <span>{xpInCurrentLevel}/150 XP</span>
                  </div>

                  <div className="w-full bg-[#E5E5E5] h-2">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: attr.color,
                      }}
                    />
                  </div>

                  <div className="text-xs font-sans text-[#6B6560] italic mt-3">
                    <Zap className="w-3 h-3 inline mr-1" /> {attr.buffBenefit}
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
