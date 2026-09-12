'use client';

// ==============================================================================
// ASCEND - ONBOARDING & ARCHETYPE SELECTION SCREEN
// ==============================================================================

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ARCHETYPE_LIST } from '@/lib/progression/archetypes';
import { useGame } from '@/lib/context/game-context';
import { Archetype } from '@/types/rpg';
import {
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
  Check,
  Brain,
  Dumbbell,
  Heart,
  Target,
  Users,
} from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { loginAsDemoUser, updateUserProfile } = useGame();

  const [username, setUsername] = useState('Kaelen Vance');
  const [selectedArchetype, setSelectedArchetype] = useState<Archetype>('Cyber Mage');
  const [isInitializing, setIsInitializing] = useState(false);

  const activeArch = ARCHETYPE_LIST.find((a) => a.id === selectedArchetype) || ARCHETYPE_LIST[0];

  const handleInitialize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || isInitializing) return;

    setIsInitializing(true);
    try {
      loginAsDemoUser(selectedArchetype);
      await updateUserProfile({
        username: username.trim(),
        archetype: selectedArchetype,
      });
      router.push('/dashboard');
    } catch {
      setIsInitializing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Character Initialization</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          CHOOSE YOUR ARCHETYPE
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Select your starting RPG class. Your archetype defines your primary attribute growth bonuses and provides your initial batch of starter quests.
        </p>
      </div>

      <form onSubmit={handleInitialize} className="space-y-8">
        {/* Username input */}
        <div className="max-w-md mx-auto">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 text-center">
            Your Hero Codename / Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full text-center px-4 py-3 rounded-xl bg-slate-900/90 border border-white/15 text-white font-bold text-base focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            placeholder="e.g., Kaelen Vance"
          />
        </div>

        {/* Archetype Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ARCHETYPE_LIST.map((arch) => {
            const isSelected = selectedArchetype === arch.id;

            return (
              <motion.div
                key={arch.id}
                whileHover={{ y: -3 }}
                onClick={() => setSelectedArchetype(arch.id)}
                className={`cursor-pointer rounded-2xl p-5 border transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900/95 border-cyan-500/80 shadow-[0_0_25px_rgba(6,182,212,0.3)] ring-1 ring-cyan-500'
                    : 'bg-[#0F1420]/60 border-white/5 hover:border-white/20'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center font-bold">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}

                <div>
                  <div
                    className="inline-block text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full mb-2 border"
                    style={{
                      color: arch.color,
                      backgroundColor: `${arch.color}15`,
                      borderColor: `${arch.color}40`,
                    }}
                  >
                    {arch.role}
                  </div>

                  <h3 className="text-lg font-black text-white">{arch.name}</h3>
                  <p className="text-xs text-cyan-400 font-semibold mb-2">{arch.title}</p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{arch.description}</p>
                </div>

                <div className="pt-3 border-t border-white/5 space-y-2">
                  <div className="text-[11px] font-bold text-emerald-400">
                    ⚡ {arch.perk}
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] text-slate-400">
                    <span>Primary: <strong className="text-white">{arch.primaryAttribute}</strong></span>
                    <span>•</span>
                    <span>Secondary: <strong className="text-white">{arch.secondaryAttribute}</strong></span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Archetype Starter Quests Preview */}
        <div className="cyber-panel p-6 rounded-2xl border-white/10 max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Initial Starter Quests for {activeArch.name}</span>
            </h4>
            <span className="text-[11px] text-emerald-400 font-bold">Auto-Generated on Launch</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {activeArch.starterQuests.map((q, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-white/5">
                <span className="text-[9px] font-bold uppercase text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">
                  {q.difficulty}
                </span>
                <div className="text-xs font-bold text-white mt-1.5 truncate">{q.title}</div>
                <div className="text-[10px] text-slate-400 mt-1">{q.attribute} XP</div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <div className="text-center pt-4">
          <button
            type="submit"
            disabled={isInitializing || !username.trim()}
            className="px-10 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all inline-flex items-center space-x-2"
          >
            <span>{isInitializing ? 'Calibrating Neural Link...' : 'Initialize Ascension'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
