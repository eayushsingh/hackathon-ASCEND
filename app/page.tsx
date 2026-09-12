'use client';

// ==============================================================================
// ASCEND - LANDING PAGE
// Apple-Inspired Bright Premium Product Design
// ==============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Zap,
  Coins,
  Brain,
  CheckCircle2,
  Play,
  Shield,
  Target,
  Flame,
  Award,
  Terminal,
  Layers,
  Crown,
} from 'lucide-react';
import { ARCHETYPE_LIST } from '@/lib/progression/archetypes';
import { useGame } from '@/lib/context/game-context';
import HeroCharacter from '@/components/HeroCharacter';

export default function LandingPage() {
  const { loginAsDemoUser } = useGame();
  const [demoQuestCompleted, setDemoQuestCompleted] = useState(false);
  const [activeArchetypeTab, setActiveArchetypeTab] = useState(ARCHETYPE_LIST[0].id);

  const selectedArch = ARCHETYPE_LIST.find((a) => a.id === activeArchetypeTab) || ARCHETYPE_LIST[0];

  return (
    <div className="space-y-24 py-8 pb-20 relative">
      {/* 1. HERO SECTION (12-COL SPLIT GRID) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: HEADLINE, COPY & CTAS (7 COLS) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-[#F2F2F7] border border-[#E5E5EA] rounded-full text-[#7C3AED] text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span>THE ULTIMATE LIFE GAMIFICATION SYSTEM</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1D1D1F] leading-[1.05]">
              Transform Reality <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#38BDF8]">
                Into an Epic RPG
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#6E6E73] max-w-2xl font-normal leading-relaxed">
              Turn your everyday tasks, workouts, study sessions, and habits into rewarding quests. Earn XP, level up your 6 core attributes, build streaks, and master your life.
            </p>

            {/* Verb-led Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/onboarding"
                className="px-8 py-4 btn-primary-gradient font-semibold text-base rounded-full flex items-center justify-center space-x-2 group cursor-pointer"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/dashboard"
                onClick={() => loginAsDemoUser('Cyber Mage')}
                className="px-8 py-4 bg-white hover:bg-[#FAF9F5] text-[#1D1D1F] border border-[#E5E5EA] shadow-sm font-semibold text-base rounded-full transition-all flex items-center justify-center space-x-2 group cursor-pointer"
              >
                <Play className="w-4 h-4 text-[#7C3AED] fill-[#7C3AED]" />
                <span>Instant Demo Mode</span>
              </Link>
            </div>

            {/* Quick Feature Pills */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#E5E5EA]">
              <div className="p-3 bg-white rounded-2xl border border-[#E5E5EA] shadow-sm">
                <div className="text-xs text-[#8E8E93] font-medium">Progression</div>
                <div className="text-sm font-semibold text-[#1D1D1F] mt-0.5">6 Attributes</div>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-[#E5E5EA] shadow-sm">
                <div className="text-xs text-[#8E8E93] font-medium">Consistency</div>
                <div className="text-sm font-semibold text-[#7C3AED] mt-0.5">Streak Engine</div>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-[#E5E5EA] shadow-sm">
                <div className="text-xs text-[#8E8E93] font-medium">Economy</div>
                <div className="text-sm font-semibold text-[#C9A227] mt-0.5">Guild Market</div>
              </div>
            </div>
          </div>

          {/* RIGHT: DEDICATED CHARACTER FRAME (5 COLS) */}
          <div className="lg:col-span-5 relative">
            <div className="apple-card p-6 sm:p-8 relative overflow-hidden group">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#E5E5EA] pb-4 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#7C3AED] animate-pulse" />
                  <span className="text-xs font-semibold text-[#1D1D1F] tracking-wide">
                    CYBER MAGE • LEVEL 14
                  </span>
                </div>
                <span className="text-xs font-semibold bg-[#F2F2F7] px-2.5 py-0.5 rounded-full text-[#6E6E73]">
                  Active Character
                </span>
              </div>

              {/* Character Illustration */}
              <div className="relative h-72 sm:h-80 w-full flex items-center justify-center my-2">
                <HeroCharacter className="w-full h-full" />
              </div>

              {/* Telemetry Bar */}
              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1.5 text-[#6E6E73]">
                    <span>XP PROGRESSION</span>
                    <span className="text-[#7C3AED]">1,840 / 2,500 XP</span>
                  </div>
                  <div className="h-2.5 w-full bg-[#E5E5EA] rounded-full overflow-hidden">
                    <div className="h-full btn-primary-gradient w-[73%] rounded-full" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-medium pt-1">
                  <div className="bg-[#FAF9F5] p-2.5 rounded-xl border border-[#E5E5EA] flex justify-between items-center">
                    <span className="text-[#6E6E73]">Intellect</span>
                    <span className="text-[#7C3AED] font-semibold">Lvl 18</span>
                  </div>
                  <div className="bg-[#FAF9F5] p-2.5 rounded-xl border border-[#E5E5EA] flex justify-between items-center">
                    <span className="text-[#6E6E73]">Discipline</span>
                    <span className="text-[#38BDF8] font-semibold">Lvl 15</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. LIVE INTERACTIVE QUEST DEMO WIDGET */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="apple-card p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4 border-b border-[#E5E5EA] pb-3">
            <div className="flex items-center space-x-2.5">
              <Sparkles className="w-4 h-4 text-[#7C3AED]" />
              <span className="text-xs font-semibold text-[#1D1D1F] tracking-wide uppercase">
                Interactive Quest Demo
              </span>
            </div>
            <span className="text-xs text-[#8E8E93]">Click checkbox to complete</span>
          </div>

          <div
            onClick={() => setDemoQuestCompleted(!demoQuestCompleted)}
            className={`p-4.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
              demoQuestCompleted
                ? 'bg-[#F2F2F7] border-[#7C3AED]'
                : 'bg-white border-[#E5E5EA] hover:border-[#D1D1D6]'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all ${
                  demoQuestCompleted
                    ? 'btn-primary-gradient border-transparent text-white'
                    : 'border-[#C7C7CC] text-transparent bg-white'
                }`}
              >
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h4 className={`text-base font-semibold ${demoQuestCompleted ? 'line-through text-[#8E8E93]' : 'text-[#1D1D1F]'}`}>
                  Complete Deep Work Focus Session
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-semibold text-[#7C3AED] bg-[#F2F2F7] px-2.5 py-0.5 rounded-full">
                    Hard
                  </span>
                  <span className="text-xs font-semibold text-[#38BDF8] bg-[#F2F2F7] px-2.5 py-0.5 rounded-full">
                    +120 Intellect XP
                  </span>
                </div>
              </div>
            </div>

            <span className="text-sm font-semibold text-[#C9A227] flex items-center gap-1.5 bg-[#FAF9F5] px-3.5 py-1.5 rounded-full border border-[#E5E5EA]">
              <Coins className="w-4 h-4 text-[#C9A227]" /> +60 Gold
            </span>
          </div>

          {demoQuestCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3.5 rounded-xl border border-[#7C3AED]/30 bg-[#F2F2F7] text-xs font-medium text-[#7C3AED] flex items-center justify-between"
            >
              <span className="flex items-center gap-2 font-semibold">
                <Zap className="w-4 h-4 text-[#7C3AED] fill-[#7C3AED]" />
                <span>Quest Completed! +120 XP Added to Intellect</span>
              </span>
              <span className="text-[#1D1D1F] font-bold flex items-center gap-1">
                <Flame className="w-4 h-4 text-[#7C3AED]" /> 1 Day Streak
              </span>
            </motion.div>
          )}
        </div>
      </section>

      {/* 3. CORE RPG PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-tight font-sans">
            Built for Real Life Progress
          </h2>
          <p className="text-[#6E6E73] text-base max-w-2xl mx-auto">
            Designed with thoughtful game mechanics to build momentum, consistency, and daily motivation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="apple-card apple-card-hover p-8">
            <div className="w-12 h-12 rounded-2xl bg-[#F2F2F7] flex items-center justify-center text-[#7C3AED] mb-6">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-[#1D1D1F] mb-3">6 Core Attributes</h3>
            <p className="text-sm text-[#6E6E73] leading-relaxed">
              Tasks map directly to Intellect, Strength, Vitality, Discipline, Creativity, or Charisma. Build a well-rounded character.
            </p>
          </div>

          <div className="apple-card apple-card-hover p-8">
            <div className="w-12 h-12 rounded-2xl bg-[#F2F2F7] flex items-center justify-center text-[#38BDF8] mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-[#1D1D1F] mb-3">Rewarding Levels</h3>
            <p className="text-sm text-[#6E6E73] leading-relaxed">
              Level up as you accomplish real-world goals. Early wins build momentum while higher levels challenge your growth.
            </p>
          </div>

          <div className="apple-card apple-card-hover p-8">
            <div className="w-12 h-12 rounded-2xl bg-[#F2F2F7] flex items-center justify-center text-[#C9A227] mb-6">
              <Coins className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-[#1D1D1F] mb-3">Guild Market</h3>
            <p className="text-sm text-[#6E6E73] leading-relaxed">
              Earn gold from completed quests to unlock custom UI themes, avatar frames, titles, and streak freeze protections.
            </p>
          </div>
        </div>
      </section>

      {/* 4. ARCHETYPE SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-tight font-sans">
            Choose Your Character Class
          </h2>
          <p className="text-[#6E6E73] text-base max-w-2xl mx-auto">
            Every archetype comes with tailored starter quests and passive XP bonuses.
          </p>
        </div>

        {/* Archetype Selector Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 mb-8">
          {ARCHETYPE_LIST.map((arch) => (
            <button
              key={arch.id}
              onClick={() => setActiveArchetypeTab(arch.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeArchetypeTab === arch.id
                  ? 'btn-primary-gradient'
                  : 'bg-white text-[#6E6E73] border border-[#E5E5EA] hover:text-[#1D1D1F]'
              }`}
            >
              {arch.name}
            </button>
          ))}
        </div>

        {/* Archetype Card */}
        <div className="apple-card p-8 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="inline-block text-xs font-semibold text-[#7C3AED] bg-[#F2F2F7] px-3 py-1 rounded-full">
                {selectedArch.role}
              </span>
              <h3 className="text-3xl font-bold text-[#1D1D1F]">{selectedArch.name}</h3>
              <p className="text-sm text-[#7C3AED] font-semibold">{selectedArch.title}</p>
              <p className="text-[#6E6E73] text-sm leading-relaxed">{selectedArch.lore}</p>

              <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E5E5EA] space-y-1">
                <div className="text-xs font-semibold text-[#8E8E93] uppercase">Class Perk</div>
                <div className="text-sm font-semibold text-[#1D1D1F]">{selectedArch.perk}</div>
              </div>

              <Link
                href="/onboarding"
                onClick={() => loginAsDemoUser(selectedArch.id)}
                className="inline-flex items-center space-x-2 px-6 py-3.5 btn-primary-gradient font-semibold text-xs rounded-full cursor-pointer"
              >
                <span>Start as {selectedArch.name}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Starter Quests Preview */}
            <div className="space-y-3 rounded-2xl bg-[#FAF9F5] border border-[#E5E5EA] p-6">
              <div className="text-xs font-semibold text-[#6E6E73] uppercase tracking-wider mb-2 border-b border-[#E5E5EA] pb-3 flex items-center justify-between">
                <span>Starter Quests</span>
                <Target className="w-4 h-4 text-[#7C3AED]" />
              </div>
              {selectedArch.starterQuests.map((sq, i) => {
                const reward = sq.difficulty === 'Easy' ? { xp: 30, gold: 15 } : sq.difficulty === 'Hard' ? { xp: 120, gold: 60 } : { xp: 60, gold: 30 };
                return (
                  <div key={i} className="p-3.5 rounded-xl bg-white border border-[#E5E5EA] flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-xs font-semibold text-[#1D1D1F]">{sq.title}</div>
                      <div className="text-[11px] text-[#7C3AED] font-medium">+{reward.xp} {sq.attribute} XP</div>
                    </div>
                    <span className="text-xs font-semibold text-[#C9A227]">+{reward.gold} Gold</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
