'use client';

// ==============================================================================
// ASCEND - CHARACTER DOSSIER & RPG ASCENSION SHEET
// Distinctive Cyberpunk Terminal architecture, roadmap circuits, and mastery tree
// ==============================================================================

import React, { useState } from 'react';
import { useGame } from '@/lib/context/game-context';
import { calculateLevelProgress, calculateXPForLevel, BASE_XP } from '@/lib/progression/levels';
import { ARCHETYPES } from '@/lib/progression/archetypes';
import { ATTRIBUTE_LIST, calculateAttributeLevel, getAttributeMasteryTitle } from '@/lib/progression/attributes';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
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
  Brain,
  Dumbbell,
  Heart,
  Target,
  Users,
  Terminal,
  Activity,
  ChevronRight,
} from 'lucide-react';
import { formatNumber } from '@/lib/utils';

const ICON_MAP: Record<string, React.ElementType> = {
  Brain,
  Dumbbell,
  Heart,
  Target,
  Sparkles,
  Users,
};

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
    <div className="space-y-8 pb-10">
      {/* 1. CYBER TERMINAL DOSSIER HEADER */}
      <div className="cyber-panel p-6 sm:p-8 rounded-2xl border-white/10 relative overflow-hidden">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
            <Terminal className="w-4 h-4" />
            <span>NEURAL_DOSSIER // CLASSIFIED_HERO_RECORD</span>
          </div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-500">
            <span>STATUS: ACTIVE_CONSCIOUSNESS</span>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Hero Avatar Badge */}
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            <div
              className="w-32 h-32 rounded-2xl p-1 flex items-center justify-center relative shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${archetypeInfo.color}, #3B82F6)`,
                boxShadow: `0 0 35px ${archetypeInfo.accentGlow}`,
              }}
            >
              <div className="w-full h-full bg-[#07090E] rounded-[13px] flex items-center justify-center text-5xl font-display font-black text-white">
                {profile.username.charAt(0)}
              </div>
              <div className="absolute -bottom-3 px-3 py-0.5 rounded-full bg-[#07090E] border border-cyan-400 font-display font-black text-[11px] text-cyan-300">
                LVL {progress.currentLevel}
              </div>
            </div>

            <h1 className="font-display text-2xl font-black text-white mt-5">
              {profile.username}
            </h1>
            <div className="text-xs font-semibold text-cyan-400 mt-0.5">{profile.title}</div>

            <div className="mt-3 px-3 py-1 rounded-full text-xs font-bold uppercase bg-white/5 border border-white/10 text-slate-300">
              {profile.archetype} • {progress.rankTitle}
            </div>
          </div>

          {/* Dossier Telemetry Stats & Passive Perk */}
          <div className="lg:col-span-8 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-[#07090E] border border-white/10">
                <div className="text-[10px] font-mono uppercase text-slate-500">EXPERIENCE</div>
                <div className="font-display text-xl font-black text-cyan-400 mt-1">
                  <AnimatedCounter value={profile.xp} />
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Cumulative XP</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#07090E] border border-white/10">
                <div className="text-[10px] font-mono uppercase text-slate-500">TREASURY</div>
                <div className="font-display text-xl font-black text-amber-400 mt-1 flex items-center gap-1">
                  <Coins className="w-4 h-4" />
                  <AnimatedCounter value={profile.gold} />
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Guild Gold</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#07090E] border border-white/10">
                <div className="text-[10px] font-mono uppercase text-slate-500">DISCIPLINE</div>
                <div className="font-display text-xl font-black text-orange-400 mt-1">
                  {streak.current_streak}d
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Active Combo</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#07090E] border border-white/10">
                <div className="text-[10px] font-mono uppercase text-slate-500">COMPLETIONS</div>
                <div className="font-display text-xl font-black text-emerald-400 mt-1">
                  {quests.filter((q) => q.status === 'Completed').length}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Quests Cleared</div>
              </div>
            </div>

            {/* Passive Archetype Perk Box */}
            <div className="p-4 rounded-xl bg-[#07090E] border border-cyan-500/30 flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-display font-bold uppercase text-cyan-300">
                  {archetypeInfo.name} Passive Specialization
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {archetypeInfo.perk} {archetypeInfo.lore}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MATHEMATICAL PROGRESSION BLUEPRINT (Formula Inspection) */}
      <div className="cyber-panel p-6 rounded-2xl border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-5 border-b border-white/10">
          <div>
            <h2 className="font-display text-base font-black text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>NON-LINEAR LEVELING BLUEPRINT</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Strict mathematical scaling curve: <code className="font-mono text-cyan-400">XP(n) = 100 * n^1.5</code>
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-slate-400">Inspect Level:</span>
            <input
              type="number"
              min={1}
              max={100}
              value={previewFormulaLevel}
              onChange={(e) => setPreviewFormulaLevel(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 px-2 py-1 rounded bg-[#07090E] border border-white/20 text-xs font-display font-bold text-center text-cyan-300 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#07090E] border border-white/5">
            <div className="text-[10px] font-mono uppercase text-slate-500">CURRENT TIER FORMULA</div>
            <div className="font-display text-base font-bold text-white mt-1">Level {progress.currentLevel}</div>
            <div className="text-xs text-slate-400 mt-1">
              Required: {formatNumber(progress.xpForCurrentLevel)} XP total
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#07090E] border border-cyan-500/20">
            <div className="text-[10px] font-mono uppercase text-cyan-400">NEXT TIER GOAL</div>
            <div className="font-display text-base font-bold text-cyan-300 mt-1">Level {progress.currentLevel + 1}</div>
            <div className="text-xs text-slate-300 mt-1">
              Requires <strong className="text-cyan-400">{formatNumber(progress.xpForNextLevel - profile.xp)} more XP</strong>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#07090E] border border-white/5">
            <div className="text-[10px] font-mono uppercase text-slate-500">INSPECTED LEVEL {previewFormulaLevel}</div>
            <div className="font-display text-base font-bold text-slate-200 mt-1">
              {formatNumber(previewXpRequired)} XP Total
            </div>
            <div className="text-xs text-slate-400 mt-1">Cumulative requirement threshold</div>
          </div>
        </div>
      </div>

      {/* 3. ASCENSION RANK ROADMAP CIRCUITS */}
      <div className="cyber-panel p-6 rounded-2xl border-white/10">
        <div className="pb-4 mb-6 border-b border-white/10">
          <h2 className="font-display text-base font-black text-white flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-400" />
            <span>ASCENSION ROADMAP & RANK TIERS</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Progress through six discrete character ranks by conquering real-world life quests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rankMilestones.map((milestone) => {
            const isUnlocked = profile.level >= milestone.level;
            const isCurrent = progress.tier === milestone.tier;

            return (
              <div
                key={milestone.tier}
                className={`p-4 rounded-xl border transition-all relative ${
                  isCurrent
                    ? 'bg-[#0D1524] border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400'
                    : isUnlocked
                    ? 'bg-[#0D111A] border-white/15'
                    : 'bg-[#07090E]/60 border-white/5 opacity-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display text-[10px] font-black uppercase tracking-wider text-cyan-400">
                    LEVEL {milestone.level}+
                  </span>
                  {isUnlocked ? (
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <Lock className="w-4 h-4 text-slate-600" />
                  )}
                </div>

                <h3 className="font-display text-sm font-black text-white">{milestone.name}</h3>
                <div className="text-xs text-slate-400 font-semibold mt-0.5">{milestone.tier} Tier</div>

                <p className="text-xs text-slate-300 mt-2.5 pt-2 border-t border-white/5 leading-relaxed">
                  {milestone.perk}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. ATTRIBUTE MASTERY MATRIX */}
      <div className="cyber-panel p-6 rounded-2xl border-white/10">
        <div className="pb-4 mb-6 border-b border-white/10">
          <h2 className="font-display text-base font-black text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            <span>6-ATTRIBUTE SPECIALIZATION MATRIX</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            XP gained in each attribute advances your mastery level and unlocks distinct life buffs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ATTRIBUTE_LIST.map((attr) => {
            const attrKey = `${attr.type.toLowerCase()}_xp` as keyof typeof attributes;
            const currentXP = (attributes[attrKey] as number) || 0;
            const level = calculateAttributeLevel(currentXP);
            const masteryTitle = getAttributeMasteryTitle(level);
            const IconComp = ICON_MAP[attr.icon] || Zap;

            const xpInCurrentLevel = currentXP % 150;
            const percent = Math.min(100, Math.floor((xpInCurrentLevel / 150) * 100));

            return (
              <div
                key={attr.type}
                className="p-4 rounded-xl bg-[#07090E] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2.5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center border"
                        style={{
                          backgroundColor: attr.accentBg,
                          borderColor: `${attr.color}50`,
                          color: attr.color,
                        }}
                      >
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display text-xs font-bold text-white">{attr.name}</h4>
                        <div className="text-[10px] text-slate-400">{masteryTitle} Tier</div>
                      </div>
                    </div>

                    <span
                      className="font-display text-[10px] font-black px-2 py-0.5 rounded border"
                      style={{
                        backgroundColor: `${attr.color}15`,
                        color: attr.color,
                        borderColor: `${attr.color}40`,
                      }}
                    >
                      LVL {level}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mt-1">
                    {attr.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300 mb-1.5">
                    <span>Mastery Progress</span>
                    <span>{xpInCurrentLevel}/150 XP</span>
                  </div>

                  <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: attr.color,
                      }}
                    />
                  </div>

                  <div className="text-[10px] text-slate-400 mt-2 font-medium">
                    ⚡ {attr.buffBenefit}
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
