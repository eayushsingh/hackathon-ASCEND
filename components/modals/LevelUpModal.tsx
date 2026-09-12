'use client';

// ==============================================================================
// ASCEND - LEVEL UP CELEBRATION MODAL
// Minimalist Editorial Theme
// ==============================================================================

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/lib/context/game-context';
import { Trophy, ArrowRight, Zap } from 'lucide-react';
import { ARCHETYPES } from '@/lib/progression/archetypes';

export const LevelUpModal: React.FC = () => {
  const { levelUpModal, closeLevelUpModal } = useGame();

  if (!levelUpModal.isOpen) return null;

  const archetypeInfo = ARCHETYPES[levelUpModal.archetype] || ARCHETYPES['Cyber Mage'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141110]/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="relative w-full max-w-md overflow-hidden bg-white border-4 border-[#141110] p-8 text-center shadow-[8px_8px_0_0_#141110]"
        >
          {/* Icon Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto w-24 h-24 border-4 border-[#141110] bg-[#F5F3EE] flex items-center justify-center mb-6"
          >
            <Trophy className="w-12 h-12 text-[#E8552A]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-xs uppercase font-sans font-bold tracking-widest text-[#6B6560] bg-[#F5F3EE] px-4 py-1.5 border-2 border-[#141110]">
              Ascension Milestone
            </span>

            <h2 className="text-5xl font-display font-bold text-[#141110] mt-6 mb-2 tracking-widest uppercase">
              Level Up!
            </h2>

            <div className="flex items-center justify-center space-x-4 my-6">
              <span className="text-3xl font-display font-bold text-[#A8A29E]">LVL {levelUpModal.oldLevel}</span>
              <ArrowRight className="w-8 h-8 text-[#141110]" />
              <span className="text-5xl font-display font-bold text-[#E8552A]">
                LVL {levelUpModal.newLevel}
              </span>
            </div>

            <div className="bg-[#F5F3EE] border-2 border-[#141110] p-5 my-6 text-left space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B6560] font-sans font-bold uppercase tracking-wider">Rank Title</span>
                <span className="text-[#141110] font-display font-bold tracking-widest uppercase">{levelUpModal.rankTitle}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B6560] font-sans font-bold uppercase tracking-wider">Archetype</span>
                <span className="text-[#141110] font-display font-bold tracking-widest uppercase">{archetypeInfo.name}</span>
              </div>
              <div className="flex items-center justify-between text-sm border-t-2 border-[#141110]/10 pt-3">
                <span className="text-[#6B6560] font-sans font-bold uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-4 h-4 text-[#C9A227]" /> Potential
                </span>
                <span className="text-[#E8552A] font-display font-bold tracking-widest uppercase">+100 Capacity</span>
              </div>
            </div>

            <button
              onClick={closeLevelUpModal}
              className="w-full py-4 bg-[#E8552A] border-2 border-[#141110] text-white hover:bg-[#C54A18] font-display font-bold uppercase tracking-widest text-lg transition-colors flex items-center justify-center space-x-2"
            >
              <span>Continue Ascending</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
