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
  Lock,
  Play,
} from 'lucide-react';
import { ARCHETYPE_LIST } from '@/lib/progression/archetypes';
import { useGame } from '@/lib/context/game-context';

export default function LandingPage() {
  const { loginAsDemoUser } = useGame();
  const [demoQuestCompleted, setDemoQuestCompleted] = useState(false);
  const [activeArchetypeTab, setActiveArchetypeTab] = useState(ARCHETYPE_LIST[0].id);

  const selectedArch = ARCHETYPE_LIST.find((a) => a.id === activeArchetypeTab) || ARCHETYPE_LIST[0];

  return (
    <div className="space-y-24 py-6">
      {/* 1. HERO SECTION */}
      <section className="relative text-center max-w-4xl mx-auto pt-10 pb-6 px-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Gen Life RPG Productivity Protocol</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-none">
          TRANSFORM REALITY <br />
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            INTO AN EPIC RPG
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Stop managing boring to-do lists. Turn your workouts, coding sprints, deep work, and habits into server-authoritative quests. Gain XP, level up your attributes, forge streaks, and buy badges in the Guild Shop.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/onboarding"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all flex items-center justify-center space-x-2 group"
          >
            <span>Begin Ascension</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/dashboard"
            onClick={() => loginAsDemoUser('Cyber Mage')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 border border-white/15 hover:border-cyan-500/40 text-slate-200 hover:text-white font-bold text-sm transition-all flex items-center justify-center space-x-2"
          >
            <Play className="w-4 h-4 text-cyan-400" />
            <span>Instant Demo Mode</span>
          </Link>
        </div>

        {/* 2. LIVE INTERACTIVE QUEST DEMO WIDGET */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-14 max-w-xl mx-auto p-6 rounded-2xl bg-[#0F1420]/90 border border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.2)] text-left relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                Live Interactive Sandbox
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Try clicking the quest</span>
          </div>

          <div
            onClick={() => setDemoQuestCompleted(!demoQuestCompleted)}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
              demoQuestCompleted
                ? 'bg-cyan-950/40 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                : 'bg-slate-900/80 border-white/10 hover:border-cyan-500/30'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                  demoQuestCompleted
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                    : 'border-white/20 text-transparent'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className={`text-sm font-bold ${demoQuestCompleted ? 'line-through text-slate-400' : 'text-white'}`}>
                  Deep Work Protocol: Ship ASCEND App
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                    Hard Difficulty
                  </span>
                  <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    +120 Intellect XP
                  </span>
                </div>
              </div>
            </div>

            <span className="text-xs font-extrabold text-amber-400 flex items-center gap-1">
              <Coins className="w-4 h-4" /> +60 Gold
            </span>
          </div>

          {demoQuestCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-3 p-3 rounded-lg bg-emerald-950/50 border border-emerald-500/40 text-xs font-semibold text-emerald-300 flex items-center justify-between"
            >
              <span>⭐ Authoritative XP calculated! Level 1 → Level 2</span>
              <span className="font-bold text-orange-400">🔥 Streak Ignited!</span>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* 3. CORE RPG PILLARS */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            THE ASCENSION ENGINE
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Engineered with non-linear math, strict server authoritativeness, and rich RPG progression.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="cyber-panel p-6 rounded-2xl border-white/10 hover:border-cyan-500/40">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">6-Attribute Mastery</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every quest is mapped to Intellect, Strength, Vitality, Discipline, Creativity, or Charisma. Grow a balanced, formidable character in real life.
            </p>
          </div>

          <div className="cyber-panel p-6 rounded-2xl border-white/10 hover:border-purple-500/40">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Non-Linear Leveling</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Powered by <code className="text-cyan-400 font-mono">XP(n) = 100 * n^1.5</code>. Early milestones provide fast momentum while high tiers demand relentless discipline.
            </p>
          </div>

          <div className="cyber-panel p-6 rounded-2xl border-white/10 hover:border-amber-500/40">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
              <Coins className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Guild Shop Economy</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Earn real in-game gold to purchase exclusive UI Themes, Badges, Titles, Avatar Frames, and Streak Freeze Relics from the market.
            </p>
          </div>
        </div>
      </section>

      {/* 4. ARCHETYPE SHOWCASE */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            CHOOSE YOUR ARCHETYPE
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Each class begins with tailored starter quests and distinct XP perks.
          </p>
        </div>

        {/* Archetype Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
          {ARCHETYPE_LIST.map((arch) => (
            <button
              key={arch.id}
              onClick={() => setActiveArchetypeTab(arch.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                activeArchetypeTab === arch.id
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : 'bg-slate-900 text-slate-400 border-white/5 hover:border-white/20'
              }`}
            >
              {arch.name}
            </button>
          ))}
        </div>

        {/* Archetype Preview Card */}
        <div className="cyber-panel p-8 rounded-3xl border-white/15 relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
            style={{ backgroundColor: selectedArch.color }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <div
                className="inline-block text-xs font-black uppercase px-3 py-1 rounded-full mb-3 border"
                style={{
                  color: selectedArch.color,
                  backgroundColor: `${selectedArch.color}20`,
                  borderColor: `${selectedArch.color}50`,
                }}
              >
                {selectedArch.role}
              </div>
              <h3 className="text-3xl font-black text-white mb-2">{selectedArch.name}</h3>
              <p className="text-sm text-cyan-400 font-semibold mb-4">{selectedArch.title}</p>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">{selectedArch.lore}</p>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 mb-6">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Passive Perk
                </div>
                <div className="text-sm font-bold text-emerald-400">{selectedArch.perk}</div>
              </div>

              <Link
                href="/onboarding"
                onClick={() => loginAsDemoUser(selectedArch.id)}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg transition-all"
              >
                <span>Select {selectedArch.name}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Starter Quests Preview */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Starter Quests for {selectedArch.name}
              </div>
              {selectedArch.starterQuests.map((sq, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 flex items-start justify-between"
                >
                  <div>
                    <h5 className="text-xs font-bold text-white">{sq.title}</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">{sq.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] font-semibold text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                        {sq.category}
                      </span>
                      <span className="text-[10px] font-bold text-cyan-400">
                        {sq.attribute}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                    {sq.difficulty}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER CALLOUT */}
      <section className="text-center py-12 border-t border-white/10">
        <h2 className="text-3xl font-black text-white">READY TO ENTER THE GRID?</h2>
        <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto">
          Start today with full server-authoritative progression, customizable cyberpunk themes, and real character growth.
        </p>
        <div className="mt-6 flex items-center justify-center space-x-4">
          <Link
            href="/dashboard"
            onClick={() => loginAsDemoUser('Cyber Mage')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs shadow-lg transition-all"
          >
            Launch Command Center
          </Link>
        </div>
      </section>
    </div>
  );
}
