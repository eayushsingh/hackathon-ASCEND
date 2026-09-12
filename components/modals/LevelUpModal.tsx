'use client';

// ==============================================================================
// ASCEND - LEVEL UP CELEBRATION MODAL
// Apple Bright Premium Celebration Modal
// ==============================================================================

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/lib/context/game-context';
import { Trophy, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { ARCHETYPES } from '@/lib/progression/archetypes';

export const LevelUpModal: React.FC = () => {
  const { levelUpModal, closeLevelUpModal } = useGame();

  if (!levelUpModal.isOpen) return null;

  const archetypeInfo = ARCHETYPES[levelUpModal.archetype] || ARCHETYPES['Cyber Mage'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: 'spring', damping: 22, stiffness: 320 }}
          className="relative w-full max-w-md apple-card p-8 text-center"
        >
          {/* Icon Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto w-20 h-20 rounded-3xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-5 shadow-sm"
          >
            <Trophy className="w-10 h-10 text-amber-500" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-xs uppercase font-mono font-bold tracking-wider text-purple-700 bg-purple-50 px-3.5 py-1 rounded-full border border-purple-200">
              Rank Milestone
            </span>

            <h2 className="text-3xl font-extrabold text-[#1D1D1F] mt-4 mb-2 tracking-tight">
              Level Up!
            </h2>

            <div className="flex items-center justify-center space-x-4 my-6">
              <span className="text-2xl font-mono font-bold text-[#8E8E93]">LVL {levelUpModal.oldLevel}</span>
              <ArrowRight className="w-6 h-6 text-purple-600" />
              <span className="text-4xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-sky-500">
                LVL {levelUpModal.newLevel}
              </span>
            </div>

            <div className="bg-[#F5F5F7] border border-[#E5E5EA] rounded-2xl p-4 my-6 text-left space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#6E6E73] font-medium">Rank Title</span>
                <span className="text-[#1D1D1F] font-bold font-mono uppercase">{levelUpModal.rankTitle}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#6E6E73] font-medium">Archetype</span>
                <span className="text-purple-600 font-bold font-mono uppercase">{archetypeInfo.name}</span>
              </div>
              <div className="flex items-center justify-between text-xs border-t border-[#E5E5EA] pt-2.5">
                <span className="text-[#6E6E73] font-medium flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Progression Bonus
                </span>
                <span className="text-amber-700 font-bold font-mono">+100 Capacity</span>
              </div>
            </div>

            <button
              onClick={closeLevelUpModal}
              className="w-full py-3.5 btn-primary-gradient text-white rounded-xl font-bold text-sm shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Continue Journey</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

