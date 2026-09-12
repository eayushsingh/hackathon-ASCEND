'use client';

// ==============================================================================
// ASCEND - HERO LANDING PAGE & CYBERPUNK SHOWCASE
// ==============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
  Flame,
  Coins,
  Trophy,
  Brain,
  Dumbbell,
  Heart,
  Target,
  Users,
  CheckCircle2,
  Play,
  Terminal,
} from 'lucide-react';
import { ARCHETYPE_LIST } from '@/lib/progression/archetypes';
import { useGame } from '@/lib/context/game-context';

export default function LandingPage() {
  const { loginAsDemoUser } = useGame();
  const [demoQuestCompleted, setDemoQuestCompleted] = useState(false);
  const [activeArchetypeTab, setActiveArchetypeTab] = useState(ARCHETYPE_LIST[0].id);

  const selectedArch = ARCHETYPE_LIST.find((a) => a.id === activeArchetypeTab) || ARCHETYPE_LIST[0];

  return (
    <div className="space-y-20 py-6 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative text-center max-w-4xl mx-auto pt-8 pb-4 px-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-display text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>LIFE RPG PRODUCTIVITY PROTOCOL</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-none">
          TRANSFORM REALITY <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            INTO AN EPIC RPG
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
          Stop managing boring to-do lists. Turn workouts, coding sprints, deep work, and habits into server-authoritative quests. Gain XP, level up your 6 core attributes, maintain daily streaks, and conquer reality.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="/onboarding"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-display font-black text-xs tracking-wider shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>INITIALIZE ASCENSION</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </Link>

          <Link
            href="/dashboard"
            onClick={() => loginAsDemoUser('Cyber Mage')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#0D111A] border border-white/15 hover:border-cyan-500/40 text-slate-200 hover:text-white font-display font-bold text-xs transition-all flex items-center justify-center space-x-2"
          >
            <Play className="w-4 h-4 text-cyan-400" />
            <span>INSTANT DEMO MODE</span>
          </Link>
        </div>

        {/* 2. LIVE INTERACTIVE QUEST DEMO WIDGET */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 max-w-xl mx-auto p-5 rounded-2xl bg-[#0D111A] border border-cyan-500/40 shadow-[0_0_35px_rgba(6,182,212,0.2)] text-left relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2.5">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-display text-[11px] font-black text-cyan-300 uppercase tracking-wider">
                LIVE INTERACTIVE TESTBED
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Click quest checkbox</span>
          </div>

          <div
            onClick={() => setDemoQuestCompleted(!demoQuestCompleted)}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
              demoQuestCompleted
                ? 'bg-cyan-950/40 border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'bg-[#07090E] border-white/10 hover:border-cyan-500/30'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                  demoQuestCompleted
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-[0_0_10px_rgba(6,182,212,0.8)]'
                    : 'border-white/20 text-transparent'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className={`text-xs sm:text-sm font-bold ${demoQuestCompleted ? 'line-through text-slate-400' : 'text-white'}`}>
                  Deep Work Protocol: Complete Next.js RPG Matrix
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                    Hard
                  </span>
                  <span className="text-[9px] font-bold text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">
                    +120 Intellect XP
                  </span>
                </div>
              </div>
            </div>

            <span className="font-display text-xs font-black text-amber-400 flex items-center gap-1">
              <Coins className="w-3.5 h-3.5" /> +60 G
            </span>
          </div>

          {demoQuestCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-3 p-2.5 rounded-lg bg-emerald-950/50 border border-emerald-500/40 text-xs font-semibold text-emerald-300 flex items-center justify-between font-mono"
            >
              <span>⭐ Authoritative XP calculated: +120 XP</span>
              <span className="text-orange-400">🔥 Combo: 1 Day!</span>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* 3. CORE RPG PILLARS */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
            THE THREE ASCENSION PILLARS
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Engineered with non-linear leveling math, strict server authoritativeness, and rich RPG progression.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="cyber-panel p-6 rounded-2xl border-white/10 bg-[#0D111A]">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="font-display text-sm font-bold text-white mb-2">6-Attribute Mastery</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Tasks map to Intellect, Strength, Vitality, Discipline, Creativity, or Charisma. Build a balanced, formidable character in real life.
            </p>
          </div>

          <div className="cyber-panel p-6 rounded-2xl border-white/10 bg-[#0D111A]">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-display text-sm font-bold text-white mb-2">Non-Linear Leveling</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Powered by <code className="text-cyan-400 font-mono">XP(n) = 100 * n^1.5</code>. Early milestones provide fast momentum while high tiers demand relentless consistency.
            </p>
          </div>

          <div className="cyber-panel p-6 rounded-2xl border-white/10 bg-[#0D111A]">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
              <Coins className="w-5 h-5" />
            </div>
            <h3 className="font-display text-sm font-bold text-white mb-2">Guild Shop Economy</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Earn in-game gold to purchase exclusive UI Themes, Crests, Titles, Avatar Frames, and Streak Freeze Relics from the market.
            </p>
          </div>
        </div>
      </section>

      {/* 4. ARCHETYPE SHOWCASE */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
            CHOOSE YOUR ARCHETYPE
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Each class begins with tailored starter quests and distinct XP perks.
          </p>
        </div>

        {/* Archetype Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-6">
          {ARCHETYPE_LIST.map((arch) => (
            <button
              key={arch.id}
              onClick={() => setActiveArchetypeTab(arch.id)}
              className={`px-3.5 py-1.5 rounded-lg font-display text-xs font-bold transition-all border ${
                activeArchetypeTab === arch.id
                  ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/60 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                  : 'bg-[#0D111A] text-slate-400 border-white/5 hover:border-white/20'
              }`}
            >
              {arch.name}
            </button>
          ))}
        </div>

        {/* Archetype Card */}
        <div className="cyber-panel p-6 sm:p-8 rounded-2xl border-white/10 bg-[#0D111A]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div
                className="inline-block font-display text-[10px] font-black uppercase px-2.5 py-0.5 rounded mb-2 border"
                style={{
                  color: selectedArch.color,
                  backgroundColor: `${selectedArch.color}15`,
                  borderColor: `${selectedArch.color}40`,
                }}
              >
                {selectedArch.role}
              </div>
              <h3 className="font-display text-2xl font-black text-white mb-1">{selectedArch.name}</h3>
              <p className="text-xs text-cyan-400 font-semibold mb-3">{selectedArch.title}</p>
              <p className="text-xs text-slate-300 leading-relaxed mb-5 font-sans">{selectedArch.lore}</p>

              <div className="p-3.5 rounded-xl bg-[#07090E] border border-white/10 mb-5">
                <div className="text-[10px] font-mono text-slate-400 uppercase">PASSIVE PERK</div>
                <div className="text-xs font-bold text-emerald-400 mt-0.5">{selectedArch.perk}</div>
              </div>

              <Link
                href="/onboarding"
                onClick={() => loginAsDemoUser(selectedArch.id)}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-display font-black text-xs transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
              >
                <span>SELECT {selectedArch.name.toUpperCase()}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </Link>
            </div>

            {/* Starter Quests Preview */}
            <div className="space-y-2.5">
              <div className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                STARTER QUESTS FOR {selectedArch.name.toUpperCase()}
              </div>
              {selectedArch.starterQuests.map((sq, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-[#07090E] border border-white/5 flex items-start justify-between"
                >
                  <div>
                    <h5 className="text-xs font-bold text-white">{sq.title}</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5 font-sans">{sq.description}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[9px] text-slate-400 bg-white/5 px-1.5 py-0.5 rounded">
                        {sq.category}
                      </span>
                      <span className="text-[9px] font-bold text-cyan-400">
                        {sq.attribute}
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold uppercase text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">
                    {sq.difficulty}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
