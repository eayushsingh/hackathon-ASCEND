'use client';

// ==============================================================================
// ASCEND - VIBRANT MODERN RPG HUD LANDING PAGE
// Production-grade hackathon layout with electric neon accents & hero showcase
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
      {/* Background Ambient Grid Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      {/* 1. HERO SECTION (12-COL SPLIT GRID) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: HEADLINE, CTA, & TELEMETRY (7 COLS) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-indigo-950/60 border border-indigo-500/40 rounded-full text-indigo-300 font-mono text-xs font-semibold tracking-wider shadow-[0_0_20px_rgba(99,102,241,0.25)]">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>SERVER-AUTHORITATIVE LIFE RPG v2.4</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] uppercase font-sans">
              Transform Reality <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 drop-shadow-[0_0_30px_rgba(99,102,241,0.5)]">
                Into an Epic RPG
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-sans font-normal leading-relaxed">
              Stop managing boring to-do lists. Convert workouts, code sprints, deep work, and habits into verified server quests. Gain XP, level up your 6 core attributes, maintain daily streaks, and conquer reality.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/onboarding"
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-600 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-mono font-bold text-sm uppercase tracking-wider rounded-xl shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all flex items-center justify-center space-x-2 group cursor-pointer"
              >
                <span>Initialize Ascension</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/dashboard"
                onClick={() => loginAsDemoUser('Cyber Mage')}
                className="px-8 py-4 bg-slate-900/90 hover:bg-slate-800/90 text-slate-200 border border-white/10 hover:border-indigo-500/50 font-mono font-bold text-sm uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 group cursor-pointer"
              >
                <Play className="w-4 h-4 text-cyan-400 fill-cyan-400 group-hover:scale-110 transition-transform" />
                <span>Instant Demo Mode</span>
              </Link>
            </div>

            {/* QUICK TELEMETRY BADGES */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Engine</div>
                <div className="text-sm font-bold text-slate-100 font-mono">Server-Verified</div>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Progression</div>
                <div className="text-sm font-bold text-cyan-400 font-mono">6 Attributes</div>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Economy</div>
                <div className="text-sm font-bold text-amber-400 font-mono">Guild Market</div>
              </div>
            </div>
          </div>

          {/* RIGHT: DEDICATED CYBER HERO FRAME (5 COLS) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl bg-[#0D111A]/90 border border-indigo-500/30 p-6 shadow-[0_0_50px_rgba(99,102,241,0.2)] overflow-hidden group">
              {/* Glass background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-purple-500/10 pointer-events-none" />
              
              {/* Top Frame Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest">
                    CYBER MAGE // LVL 14
                  </span>
                </div>
                <span className="font-mono text-[10px] bg-indigo-950/80 border border-indigo-500/40 px-2.5 py-0.5 rounded-full text-indigo-300">
                  READY
                </span>
              </div>

              {/* Character Illustration Visual Anchor */}
              <div className="relative h-72 sm:h-80 w-full flex items-center justify-center my-2">
                <HeroCharacter className="w-full h-full drop-shadow-[0_0_30px_rgba(99,102,241,0.4)]" />
              </div>

              {/* Bottom Telemetry Metrics */}
              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-400">XP PROGRESSION</span>
                    <span className="text-indigo-400 font-bold">1,840 / 2,500 XP</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden border border-white/10">
                    <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 w-[73%] rounded-full shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                  <div className="bg-slate-950/80 p-2.5 rounded-xl border border-white/5 flex justify-between items-center">
                    <span className="text-slate-400">INTELLECT</span>
                    <span className="text-cyan-400 font-bold">LVL 18</span>
                  </div>
                  <div className="bg-slate-950/80 p-2.5 rounded-xl border border-white/5 flex justify-between items-center">
                    <span className="text-slate-400">DISCIPLINE</span>
                    <span className="text-purple-400 font-bold">LVL 15</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. LIVE INTERACTIVE QUEST DEMO WIDGET */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="rounded-2xl bg-[#0D111A]/90 border border-white/10 p-6 sm:p-8 shadow-[0_0_30px_rgba(0,0,0,0.3)] relative overflow-hidden">
          <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
            <div className="flex items-center space-x-3">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span className="font-mono text-xs font-bold text-indigo-300 uppercase tracking-wider">
                Live Interactive Quest Testbed
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Click quest to complete</span>
          </div>

          <div
            onClick={() => setDemoQuestCompleted(!demoQuestCompleted)}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
              demoQuestCompleted
                ? 'bg-indigo-950/30 border-indigo-500/60 shadow-[0_0_20px_rgba(99,102,241,0.2)]'
                : 'bg-slate-900/80 border-white/5 hover:border-indigo-500/40'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                  demoQuestCompleted
                    ? 'bg-indigo-500 border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.6)]'
                    : 'border-slate-700 text-transparent bg-slate-950'
                }`}
              >
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h4 className={`text-sm sm:text-base font-bold font-sans ${demoQuestCompleted ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                  Deep Work Protocol: Complete Next.js Matrix
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/40 border border-amber-500/40 px-2 py-0.5 rounded">
                    HARD
                  </span>
                  <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-500/40 px-2 py-0.5 rounded">
                    +120 INTELLECT XP
                  </span>
                </div>
              </div>
            </div>

            <span className="font-mono text-sm font-bold text-amber-400 flex items-center gap-1.5 bg-amber-950/30 px-3 py-1.5 rounded-lg border border-amber-500/30">
              <Coins className="w-4 h-4 text-amber-400" /> +60 GOLD
            </span>
          </div>

          {demoQuestCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-xl border border-indigo-500/50 bg-indigo-950/40 text-xs font-mono text-indigo-300 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-400 fill-indigo-400 animate-bounce" />
                <span>Authoritative XP Calculated: +120 XP Added</span>
              </span>
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400" /> STREAK: 1 DAY
              </span>
            </motion.div>
          )}
        </div>
      </section>

      {/* 3. CORE RPG PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase font-sans">
            The Three Core Pillars
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto font-sans">
            Engineered with strict server authoritativeness, mathematical XP curves, and rich progression telemetry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-[#0D111A]/90 border border-white/10 hover:border-cyan-500/40 transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] group">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-3 font-sans">6-Attribute Mastery</h3>
            <p className="text-sm text-slate-400 leading-relaxed font-sans">
              Tasks map directly to Intellect, Strength, Vitality, Discipline, Creativity, or Charisma. Build a balanced, formidable character in real life.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0D111A]/90 border border-white/10 hover:border-purple-500/40 transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] group">
            <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-3 font-sans">Non-Linear Leveling</h3>
            <p className="text-sm text-slate-400 leading-relaxed font-sans">
              Powered by <code className="text-indigo-400 font-mono text-xs bg-slate-950 px-2 py-0.5 rounded border border-white/10">XP(n) = 100 * n^1.5</code>. Early milestones provide fast momentum while high tiers demand relentless consistency.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0D111A]/90 border border-white/10 hover:border-amber-500/40 transition-all hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] group">
            <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <Coins className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-3 font-sans">Guild Shop Economy</h3>
            <p className="text-sm text-slate-400 leading-relaxed font-sans">
              Earn in-game gold to purchase exclusive UI Themes, Crests, Titles, Avatar Frames, and Streak Freeze Relics from the market.
            </p>
          </div>
        </div>
      </section>

      {/* 4. ARCHETYPE SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase font-sans">
            Choose Your Archetype
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto font-sans">
            Each class begins with tailored starter quests and distinct XP perks.
          </p>
        </div>

        {/* Archetype Selector Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-3 mb-8">
          {ARCHETYPE_LIST.map((arch) => (
            <button
              key={arch.id}
              onClick={() => setActiveArchetypeTab(arch.id)}
              className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                activeArchetypeTab === arch.id
                  ? 'bg-indigo-500 text-white border-indigo-400 shadow-[0_0_25px_rgba(99,102,241,0.5)]'
                  : 'bg-slate-900/80 text-slate-400 border-white/10 hover:border-white/20 hover:text-slate-200'
              }`}
            >
              {arch.name}
            </button>
          ))}
        </div>

        {/* Archetype Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0D111A]/90 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="inline-block font-mono text-xs font-bold uppercase text-indigo-400 bg-indigo-950/80 border border-indigo-500/40 px-3 py-1 rounded-full">
                {selectedArch.role}
              </span>
              <h3 className="text-3xl font-extrabold text-white uppercase font-sans">{selectedArch.name}</h3>
              <p className="text-sm text-indigo-400 font-mono uppercase tracking-wider font-semibold">{selectedArch.title}</p>
              <p className="text-slate-300 text-sm leading-relaxed font-sans">{selectedArch.lore}</p>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 space-y-1">
                <div className="text-xs font-mono text-slate-400 uppercase">PASSIVE PERK</div>
                <div className="text-sm font-bold text-amber-400 font-sans">{selectedArch.perk}</div>
              </div>

              <Link
                href="/onboarding"
                onClick={() => loginAsDemoUser(selectedArch.id)}
                className="inline-flex items-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all cursor-pointer"
              >
                <span>Select {selectedArch.name}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Starter Quests Preview */}
            <div className="space-y-4 rounded-2xl bg-slate-950/60 border border-white/10 p-6">
              <div className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-white/10 pb-3 flex items-center justify-between">
                <span>Starter Quests Protocol</span>
                <Target className="w-4 h-4 text-indigo-400" />
              </div>
              {selectedArch.starterQuests.map((sq, i) => {
                const reward = sq.difficulty === 'Easy' ? { xp: 30, gold: 15 } : sq.difficulty === 'Hard' ? { xp: 120, gold: 60 } : { xp: 60, gold: 30 };
                return (
                  <div key={i} className="p-3 rounded-xl bg-slate-900/90 border border-white/5 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-slate-200">{sq.title}</div>
                      <div className="text-[10px] font-mono text-cyan-400">+{reward.xp} {sq.attribute.toUpperCase()} XP</div>
                    </div>
                    <span className="text-xs font-mono text-amber-400 font-bold">+{reward.gold} G</span>
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
