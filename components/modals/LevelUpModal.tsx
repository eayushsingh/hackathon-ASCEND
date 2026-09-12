'use client';

// ==============================================================================
// ASCEND - LEVEL UP CELEBRATION MODAL
// ==============================================================================

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/lib/context/game-context';
import { Sparkles, Trophy, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { ARCHETYPES } from '@/lib/progression/archetypes';

export const LevelUpModal: React.FC = () => {
  const { levelUpModal, closeLevelUpModal } = useGame();

  if (!levelUpModal.isOpen) return null;

  const archetypeInfo = ARCHETYPES[levelUpModal.archetype] || ARCHETYPES['Cyber Mage'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[#0F1420] border border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.4)] p-6 text-center"
        >
          {/* Top Holographic Rays */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Icon Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 p-1 shadow-[0_0_30px_rgba(6,182,212,0.6)] mb-4"
          >
            <div className="w-full h-full bg-[#080B11] rounded-[14px] flex items-center justify-center">
              <Trophy className="w-10 h-10 text-cyan-400 animate-bounce" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
              Ascension Milestone Reached
            </span>

            <h2 className="text-3xl font-black tracking-tight text-white mt-3 mb-1">
              LEVEL UP!
            </h2>

            <div className="flex items-center justify-center space-x-3 my-4">
              <span className="text-2xl font-bold text-slate-400">LVL {levelUpModal.oldLevel}</span>
              <ArrowRight className="w-6 h-6 text-cyan-400" />
              <span className="text-3xl font-black text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">
                LVL {levelUpModal.newLevel}
              </span>
            </div>

            <div className="bg-slate-900/90 rounded-xl p-4 border border-white/10 my-4 text-left space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Rank Title</span>
                <span className="text-purple-400 font-bold">{levelUpModal.rankTitle}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Active Archetype</span>
                <span className="text-cyan-400 font-bold">{archetypeInfo.name}</span>
              </div>
              <div className="flex items-center justify-between text-xs border-t border-white/5 pt-2">
                <span className="text-slate-400 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> Attribute Potential
                </span>
                <span className="text-emerald-400 font-bold">+100 Max Capacity</span>
              </div>
            </div>

            <button
              onClick={closeLevelUpModal}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Claim Glory & Continue</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
