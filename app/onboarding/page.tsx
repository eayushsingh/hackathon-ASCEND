'use client';

// ==============================================================================
// ASCEND - ONBOARDING & ARCHETYPE SELECTION SCREEN
// Apple Bright Premium Onboarding
// ==============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ARCHETYPE_LIST } from '@/lib/progression/archetypes';
import { useGame } from '@/lib/context/game-context';
import { Archetype } from '@/types/rpg';
import {
  Sparkles,
  ArrowRight,
  Zap,
  Check,
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

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
    <div className="max-w-5xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="flex justify-center mb-6">
          <Link href="/" className="inline-flex hover:opacity-90 transition-opacity">
            <Logo size="lg" />
          </Link>
        </div>
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-purple-50 border border-purple-200 text-purple-700 text-xs font-mono font-bold uppercase tracking-wider rounded-full mb-3">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>Character Setup</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1D1D1F] tracking-tight mb-3">
          Choose Your Archetype
        </h1>
        <p className="text-sm text-[#6E6E73] font-sans leading-relaxed">
          Select your starting character class. Your archetype boosts specific productivity attributes and generates custom starter habits.
        </p>
      </div>

      <form onSubmit={handleInitialize} className="space-y-10">
        {/* Username input */}
        <div className="max-w-md mx-auto">
          <label className="block text-xs font-mono font-bold text-[#1D1D1F] uppercase tracking-wider mb-2 text-center">
            Your Hero Codename / Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full text-center px-4 py-3.5 bg-white border border-[#E5E5EA] text-[#1D1D1F] rounded-2xl font-bold text-lg focus:outline-none focus:border-purple-500 shadow-sm transition-colors"
            placeholder="e.g., Kaelen Vance"
          />
        </div>

        {/* Archetype Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARCHETYPE_LIST.map((arch) => {
            const isSelected = selectedArchetype === arch.id;

            return (
              <motion.div
                key={arch.id}
                whileHover={{ y: -3 }}
                onClick={() => setSelectedArchetype(arch.id)}
                className={`cursor-pointer p-6 rounded-3xl border transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'apple-card border-purple-400 ring-2 ring-purple-400/30'
                    : 'bg-white border-[#E5E5EA] hover:border-[#C7C7CC]'
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full btn-primary-gradient text-white flex items-center justify-center font-bold shadow-md">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                )}

                <div>
                  <div
                    className="inline-block text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-[#E5E5EA] mb-3 bg-[#F5F5F7] text-[#1D1D1F]"
                  >
                    {arch.role}
                  </div>

                  <h3 className="text-xl font-bold text-[#1D1D1F] mb-1">{arch.name}</h3>
                  <p className="text-xs text-purple-600 font-mono font-semibold uppercase mb-2">{arch.title}</p>
                  <p className="text-xs text-[#6E6E73] leading-relaxed mb-5 font-sans">{arch.description}</p>
                </div>

                <div className="pt-3 border-t border-[#E5E5EA] space-y-2">
                  <div className="text-xs text-[#1D1D1F] font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span>{arch.perk}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[11px] font-mono text-[#6E6E73]">
                    <span>Primary: <strong className="text-[#1D1D1F]">{arch.primaryAttribute}</strong></span>
                    <span>•</span>
                    <span>Secondary: <strong className="text-[#1D1D1F]">{arch.secondaryAttribute}</strong></span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Archetype Starter Quests Preview */}
        <div className="apple-card p-6 sm:p-8 max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E5E5EA]">
            <h4 className="text-sm font-bold text-[#1D1D1F] flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-600" />
              <span>Starter Quests for {activeArch.name}</span>
            </h4>
            <span className="text-[11px] text-[#6E6E73] font-mono hidden sm:inline-block">Auto-Generated on Launch</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {activeArch.starterQuests.map((q, idx) => (
              <div key={idx} className="p-4 bg-[#F5F5F7] rounded-2xl border border-[#E5E5EA]">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-md">
                  {q.difficulty}
                </span>
                <div className="text-xs font-bold text-[#1D1D1F] mt-2 leading-snug">{q.title}</div>
                <div className="text-[11px] font-mono text-[#6E6E73] mt-1.5 font-medium">+{q.attribute} XP</div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <div className="text-center pt-4">
          <button
            type="submit"
            disabled={isInitializing || !username.trim()}
            className="px-10 py-4 btn-primary-gradient text-white font-bold text-sm uppercase font-mono tracking-wider rounded-2xl shadow-md transition-all inline-flex items-center space-x-2.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{isInitializing ? 'Starting Journey...' : 'Initialize Character & Begin'}</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </form>
    </div>
  );
}

