'use client';

// ==============================================================================
// ASCEND - ONBOARDING & ARCHETYPE SELECTION SCREEN
// Minimalist Editorial Theme
// ==============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
          <Link href="/">
            <div className="font-display font-black text-4xl tracking-widest text-[#141110]">ASCEND</div>
          </Link>
        </div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#F5F3EE] border-2 border-[#141110] text-[#141110] text-[10px] font-sans font-bold uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#E8552A]" />
          <span>Character Initialization</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-black text-[#141110] tracking-widest uppercase mb-4">
          Choose Your Archetype
        </h1>
        <p className="text-sm text-[#4A463F] font-sans font-medium leading-relaxed">
          Select your starting RPG class. Your archetype defines your primary attribute growth bonuses and provides your initial batch of starter quests.
        </p>
      </div>

      <form onSubmit={handleInitialize} className="space-y-12">
        {/* Username input */}
        <div className="max-w-md mx-auto">
          <label className="block text-xs font-sans font-bold text-[#6B6560] uppercase tracking-widest mb-3 text-center">
            Your Hero Codename / Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full text-center px-4 py-4 bg-white border-2 border-[#141110] text-[#141110] font-display font-bold text-xl uppercase tracking-widest focus:outline-none focus:shadow-[4px_4px_0_0_#E8552A] shadow-[4px_4px_0_0_rgba(20,18,16,0.1)] transition-all"
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
                whileHover={{ y: -4 }}
                onClick={() => setSelectedArchetype(arch.id)}
                className={`cursor-pointer p-6 border-4 transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#141110] shadow-[8px_8px_0_0_#141110]'
                    : 'bg-[#F5F3EE] border-[#141110]/20 hover:border-[#141110]/60'
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-3 -right-3 w-8 h-8 border-2 border-[#141110] bg-[#E8552A] text-white flex items-center justify-center font-bold shadow-[2px_2px_0_0_#141110]">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                )}

                <div>
                  <div
                    className="inline-block text-[10px] font-sans font-bold uppercase tracking-widest px-3 py-1 border-2 border-[#141110] mb-4 bg-white"
                  >
                    {arch.role}
                  </div>

                  <h3 className="font-display text-2xl font-black text-[#141110] uppercase tracking-widest mb-1">{arch.name}</h3>
                  <p className="text-xs text-[#E8552A] font-sans font-bold uppercase tracking-wider mb-3">{arch.title}</p>
                  <p className="text-sm text-[#4A463F] font-medium leading-relaxed mb-6 font-sans">{arch.description}</p>
                </div>

                <div className="pt-4 border-t-2 border-[#141110]/10 space-y-3">
                  <div className="text-xs font-sans font-bold text-[#141110]">
                    <span className="text-[#E8552A]">⚡</span> {arch.perk}
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] font-sans font-bold text-[#6B6560] uppercase tracking-wider">
                    <span>Primary: <strong className="text-[#141110]">{arch.primaryAttribute}</strong></span>
                    <span>•</span>
                    <span>Secondary: <strong className="text-[#141110]">{arch.secondaryAttribute}</strong></span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Archetype Starter Quests Preview */}
        <div className="p-8 bg-white border-4 border-[#141110] max-w-3xl mx-auto shadow-[8px_8px_0_0_#141110]">
          <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-[#141110]/10">
            <h4 className="text-sm font-display font-black text-[#141110] uppercase tracking-widest flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#E8552A]" />
              <span>Starter Quests for {activeArch.name}</span>
            </h4>
            <span className="text-[10px] text-[#4A463F] font-sans font-bold uppercase tracking-wider hidden sm:inline-block">Auto-Generated on Launch</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {activeArch.starterQuests.map((q, idx) => (
              <div key={idx} className="p-4 bg-[#F5F3EE] border-2 border-[#141110]">
                <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-[#141110] bg-white border border-[#141110] px-2 py-0.5">
                  {q.difficulty}
                </span>
                <div className="text-sm font-bold text-[#141110] mt-3 font-sans leading-snug">{q.title}</div>
                <div className="text-[11px] font-sans font-bold text-[#E8552A] mt-2 uppercase tracking-wider">{q.attribute} XP</div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <div className="text-center pt-8">
          <button
            type="submit"
            disabled={isInitializing || !username.trim()}
            className="px-12 py-5 bg-[#E8552A] border-2 border-[#141110] text-white font-display font-black text-base uppercase tracking-widest shadow-[6px_6px_0_0_#141110] hover:translate-y-0.5 hover:shadow-[4px_4px_0_0_#141110] transition-all inline-flex items-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{isInitializing ? 'Calibrating...' : 'Initialize Ascension'}</span>
            <ArrowRight className="w-6 h-6 stroke-[3]" />
          </button>
        </div>
      </form>
    </div>
  );
}
