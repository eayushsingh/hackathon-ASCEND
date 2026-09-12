'use client';

// ==============================================================================
// ASCEND - HERO LANDING PAGE
// Minimalist Editorial Theme
// ==============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Zap,
  Coins,
  Brain,
  CheckCircle2,
  Play,
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
    <div className="space-y-20 py-6 pb-16 relative">
      {/* 1. HERO SECTION */}
      <section className="relative text-center max-w-4xl mx-auto pt-8 pb-8 px-4">
        {/* Animated Hero Character Visual Anchor */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[20rem] h-[24rem] sm:w-[28rem] sm:h-[32rem] md:w-[34rem] md:h-[38rem] lg:w-[40rem] lg:h-[44rem] -z-10 opacity-25 sm:opacity-35 lg:opacity-45 transition-opacity">
          <HeroCharacter className="w-full h-full" />
        </div>
        
        <div className="flex justify-center mb-8">
          {/* Logo updated to rely on black rather than white/glow */}
          <div className="font-display font-black text-5xl tracking-widest text-[#14120F]">ASCEND</div>
        </div>

        <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-white border-2 border-[#141210] text-[#14120F] font-display text-xs font-bold uppercase tracking-widest mb-8 shadow-[4px_4px_0_0_#141210]">
          <Sparkles className="w-4 h-4 text-[#E85D25]" />
          <span>LIFE RPG PRODUCTIVITY PROTOCOL</span>
        </div>

        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#14120F] leading-none uppercase">
          Transform Reality <br />
          <span className="text-[#E85D25]">
            Into an Epic RPG
          </span>
        </h1>

        <p className="mt-8 text-base sm:text-xl text-[#4A463F] max-w-2xl mx-auto leading-relaxed font-sans font-medium">
          Stop managing boring to-do lists. Turn workouts, coding sprints, deep work, and habits into server-authoritative quests. Gain XP, level up your 6 core attributes, maintain daily streaks, and conquer reality.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/onboarding"
            className="w-full sm:w-auto px-8 py-4 bg-[#E85D25] text-white border-2 border-[#141210] font-display font-black text-sm uppercase tracking-widest shadow-[6px_6px_0_0_#141210] hover:translate-y-0.5 hover:shadow-[4px_4px_0_0_#141210] transition-all flex items-center justify-center space-x-2"
          >
            <span>Initialize Ascension</span>
            <ArrowRight className="w-5 h-5 stroke-[3]" />
          </Link>

          <Link
            href="/dashboard"
            onClick={() => loginAsDemoUser('Cyber Mage')}
            className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-[#141210] text-[#14120F] font-display font-bold text-sm uppercase tracking-widest shadow-[6px_6px_0_0_#141210] hover:translate-y-0.5 hover:shadow-[4px_4px_0_0_#141210] transition-all flex items-center justify-center space-x-2"
          >
            <Play className="w-5 h-5 text-[#E85D25]" />
            <span>Instant Demo Mode</span>
          </Link>
        </div>

        {/* 2. LIVE INTERACTIVE QUEST DEMO WIDGET */}
        <div className="mt-16 max-w-xl mx-auto p-6 bg-white border-4 border-[#141210] text-left relative overflow-hidden shadow-[8px_8px_0_0_#141210]">
          <div className="flex items-center justify-between mb-4 border-b-2 border-[#141210]/20 pb-3">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-none bg-[#E85D25]" />
              <span className="font-display text-xs font-black text-[#14120F] uppercase tracking-widest">
                Live Interactive Testbed
              </span>
            </div>
            <span className="text-[11px] font-sans font-bold text-[#6B665C] uppercase tracking-wider">Click quest checkbox</span>
          </div>

          <div
            onClick={() => setDemoQuestCompleted(!demoQuestCompleted)}
            className={`p-4 border-2 transition-all cursor-pointer flex items-center justify-between ${
              demoQuestCompleted
                ? 'bg-[#F3F1EC] border-[#141210]'
                : 'bg-white border-[#141210]/30 hover:border-[#141210]'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-8 h-8 flex items-center justify-center border-2 transition-all ${
                  demoQuestCompleted
                    ? 'bg-[#141210] text-white border-[#141210]'
                    : 'border-[#141210]/30 text-transparent'
                }`}
              >
                <CheckCircle2 className="w-6 h-6 stroke-[3]" />
              </div>
              <div>
                <h4 className={`text-sm sm:text-base font-bold font-sans ${demoQuestCompleted ? 'line-through text-[#6B665C]' : 'text-[#14120F]'}`}>
                  Deep Work Protocol: Complete Next.js Matrix
                </h4>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] font-sans font-bold text-[#E85D25] border-2 border-[#E85D25] px-2 py-0.5 uppercase tracking-wider">
                    Hard
                  </span>
                  <span className="text-[10px] font-sans font-bold text-[#14120F] border-2 border-[#141210] px-2 py-0.5 uppercase tracking-wider">
                    +120 Intellect XP
                  </span>
                </div>
              </div>
            </div>

            <span className="font-display text-sm font-black text-[#D97706] flex items-center gap-1 uppercase tracking-widest">
              <Coins className="w-4 h-4" /> +60 G
            </span>
          </div>

          {demoQuestCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-3 border-2 border-[#141210] bg-[#E85D25] text-xs font-bold text-white flex items-center justify-between font-sans uppercase tracking-wider"
            >
              <span>+ Authoritative XP calculated: +120 XP</span>
              <span>🔥 Combo: 1 Day</span>
            </motion.div>
          )}
        </div>
      </section>

      {/* 3. CORE RPG PILLARS */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-black text-[#14120F] tracking-widest uppercase">
            The Three Pillars
          </h2>
          <p className="text-sm font-sans font-bold text-[#6B665C] mt-2 uppercase tracking-wider">
            Engineered with strict server authoritativeness and rich RPG progression.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 border-4 border-[#141210] bg-white shadow-[8px_8px_0_0_#141210]">
            <div className="w-12 h-12 border-4 border-[#141210] bg-[#F3F1EC] flex items-center justify-center text-[#E85D25] mb-6">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-black text-[#14120F] mb-3 uppercase tracking-widest">6-Attribute Mastery</h3>
            <p className="text-sm text-[#4A463F] leading-relaxed font-medium">
              Tasks map to Intellect, Strength, Vitality, Discipline, Creativity, or Charisma. Build a balanced, formidable character in real life.
            </p>
          </div>

          <div className="p-8 border-4 border-[#141210] bg-white shadow-[8px_8px_0_0_#141210]">
            <div className="w-12 h-12 border-4 border-[#141210] bg-[#F3F1EC] flex items-center justify-center text-[#E85D25] mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-black text-[#14120F] mb-3 uppercase tracking-widest">Non-Linear Leveling</h3>
            <p className="text-sm text-[#4A463F] leading-relaxed font-medium">
              Powered by <code className="text-[#E85D25] font-sans font-bold bg-[#F3F1EC] px-1 border border-[#141210]/20">XP(n) = 100 * n^1.5</code>. Early milestones provide fast momentum while high tiers demand relentless consistency.
            </p>
          </div>

          <div className="p-8 border-4 border-[#141210] bg-white shadow-[8px_8px_0_0_#141210]">
            <div className="w-12 h-12 border-4 border-[#141210] bg-[#F3F1EC] flex items-center justify-center text-[#E85D25] mb-6">
              <Coins className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-black text-[#14120F] mb-3 uppercase tracking-widest">Guild Shop Economy</h3>
            <p className="text-sm text-[#4A463F] leading-relaxed font-medium">
              Earn in-game gold to purchase exclusive UI Themes, Crests, Titles, Avatar Frames, and Streak Freeze Relics from the market.
            </p>
          </div>
        </div>
      </section>

      {/* 4. ARCHETYPE SHOWCASE */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-black text-[#14120F] tracking-widest uppercase">
            Choose Your Archetype
          </h2>
          <p className="text-sm font-sans font-bold text-[#6B665C] mt-2 uppercase tracking-wider">
            Each class begins with tailored starter quests and distinct XP perks.
          </p>
        </div>

        {/* Archetype Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-3 mb-8">
          {ARCHETYPE_LIST.map((arch) => (
            <button
              key={arch.id}
              onClick={() => setActiveArchetypeTab(arch.id)}
              className={`px-4 py-2 font-display text-xs font-black uppercase tracking-widest transition-all border-2 ${
                activeArchetypeTab === arch.id
                  ? 'bg-[#141210] text-white border-[#141210] shadow-[4px_4px_0_0_#E85D25]'
                  : 'bg-white text-[#6B665C] border-[#141210]/20 hover:border-[#141210]'
              }`}
            >
              {arch.name}
            </button>
          ))}
        </div>

        {/* Archetype Card */}
        <div className="p-8 sm:p-10 bg-white border-4 border-[#141210] shadow-[8px_8px_0_0_#141210]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div
                className="inline-block font-sans text-[10px] font-bold uppercase tracking-widest px-3 py-1 border-2 border-[#141210] bg-[#F3F1EC] mb-4"
              >
                {selectedArch.role}
              </div>
              <h3 className="font-display text-4xl font-black text-[#14120F] mb-2 uppercase tracking-widest">{selectedArch.name}</h3>
              <p className="text-sm text-[#E85D25] font-sans font-bold uppercase tracking-wider mb-4">{selectedArch.title}</p>
              <p className="text-sm text-[#4A463F] leading-relaxed mb-6 font-medium">{selectedArch.lore}</p>

              <div className="p-4 bg-[#F3F1EC] border-2 border-[#141210] mb-6">
                <div className="text-xs font-sans font-bold text-[#6B665C] uppercase tracking-wider">Passive Perk</div>
                <div className="text-sm font-bold text-[#14120F] mt-1">{selectedArch.perk}</div>
              </div>

              <Link
                href="/onboarding"
                onClick={() => loginAsDemoUser(selectedArch.id)}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-[#E85D25] text-white font-display font-black text-sm uppercase tracking-widest border-2 border-[#141210] shadow-[4px_4px_0_0_#141210] hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#141210] transition-all cursor-pointer"
              >
                <span>Select {selectedArch.name}</span>
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </Link>
            </div>

            {/* Starter Quests Preview */}
            <div className="space-y-4">
              <div className="font-display text-sm font-black text-[#14120F] uppercase tracking-widest mb-2 border-b-2 border-[#141210]/10 pb-2">
                Starter Quests
              </div>
              {selectedArch.starterQuests.map((sq, i) => (
                <div
                  key={i}
                  className="p-4 bg-white border-2 border-[#141210] flex items-start justify-between shadow-[4px_4px_0_0_rgba(20,18,16,0.1)]"
                >
                  <div className="pr-4">
                    <h5 className="text-sm font-bold text-[#14120F] font-sans">{sq.title}</h5>
                    <p className="text-xs text-[#6B665C] mt-1 font-medium font-sans">{sq.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] font-bold text-[#6B665C] border border-[#141210]/20 px-2 py-0.5 uppercase tracking-wider">
                        {sq.category}
                      </span>
                      <span className="text-[10px] font-bold text-[#E85D25] uppercase tracking-wider">
                        {sq.attribute}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#14120F] border-2 border-[#141210] bg-[#F3F1EC] px-2 py-1 whitespace-nowrap">
                    {sq.difficulty}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="border-t-4 border-[#141210] pt-12 pb-8 text-center mt-20 bg-white">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="font-display font-black text-3xl tracking-widest text-[#14120F]">ASCEND</div>
          <p className="text-xs font-sans font-bold text-[#6B665C] uppercase tracking-widest">
            ASCEND PROTOCOL • FULL-STACK LIFE RPG • LEVEL UP YOUR REALITY
          </p>
        </div>
      </footer>
    </div>
  );
}
