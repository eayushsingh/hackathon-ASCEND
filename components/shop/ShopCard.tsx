'use client';

// ==============================================================================
// ASCEND - GUILD SHOP ITEM CARD COMPONENT
// Disciplined, high-contrast merchant item card with clear rarity styling
// ==============================================================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShopItem, ItemRarity } from '@/types/rpg';
import { useGame } from '@/lib/context/game-context';
import {
  Coins,
  Palette,
  Sun,
  Terminal,
  Flame,
  ShieldCheck,
  BrainCircuit,
  Dumbbell,
  Crown,
  Infinity as InfinityIcon,
  Tag,
  Zap,
  EyeOff,
  Award,
  Hexagon,
  CircleDot,
  Sparkles,
  ShieldAlert,
  FlaskConical,
  Check,
  Lock,
} from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

const ICON_MAP: Record<string, React.ElementType> = {
  Palette,
  Sun,
  Terminal,
  Flame,
  ShieldCheck,
  BrainCircuit,
  Dumbbell,
  Crown,
  Infinity: InfinityIcon,
  Tag,
  Zap,
  EyeOff,
  Award,
  Hexagon,
  CircleDot,
  Sparkles,
  ShieldAlert,
  FlaskConical,
};

interface ShopCardProps {
  item: ShopItem;
}

export const ShopCard: React.FC<ShopCardProps> = ({ item }) => {
  const { profile, inventory, purchaseItem, equipItem } = useGame();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const IconComponent = ICON_MAP[item.icon] || Sparkles;

  const ownedItem = inventory.find((inv) => inv.item_id === item.id);
  const isOwned = Boolean(ownedItem);
  const isEquipped = Boolean(ownedItem?.is_equipped);
  const canAfford = profile.gold >= item.price;

  const getRarityBadge = (rarity: ItemRarity) => {
    switch (rarity) {
      case 'Common':
        return 'text-slate-400 bg-slate-900 border-slate-700';
      case 'Rare':
        return 'text-cyan-400 bg-cyan-950/40 border-cyan-700/60';
      case 'Epic':
        return 'text-purple-400 bg-purple-950/40 border-purple-700/60';
      case 'Legendary':
        return 'text-amber-400 bg-amber-950/40 border-amber-700/60';
      case 'Mythic':
        return 'text-rose-400 bg-rose-950/40 border-rose-500/80 shadow-[0_0_15px_rgba(244,63,94,0.4)]';
    }
  };

  const handlePurchase = async () => {
    if (isPurchasing || (!canAfford && !isOwned)) return;
    setIsPurchasing(true);
    setFeedback(null);
    try {
      const res = await purchaseItem(item.id);
      setFeedback(res.message);
      setTimeout(() => setFeedback(null), 3000);
    } catch {
      setFeedback('Purchase error');
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleEquip = async () => {
    if (!ownedItem) return;
    await equipItem(ownedItem.id);
  };

  return (
    <div className="cyber-panel p-4 sm:p-5 rounded-xl flex flex-col justify-between border-white/10 hover:border-white/20 transition-all bg-[#0D111A]">
      <div>
        {/* Top Tag Bar */}
        <div className="flex items-center justify-between mb-3">
          <span className={`font-display text-[10px] font-black uppercase px-2 py-0.5 rounded border ${getRarityBadge(item.rarity)}`}>
            {item.rarity}
          </span>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
            {item.category}
          </span>
        </div>

        {/* Icon & Details */}
        <div className="flex items-start space-x-3.5 mb-3">
          <div className="w-11 h-11 rounded-xl bg-[#07090E] border border-white/10 flex items-center justify-center text-cyan-400 shrink-0">
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-xs sm:text-sm font-bold text-white tracking-tight">
              {item.name}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      </div>

      {/* Price & Action Button (Solid flat styling, no rainbow gradients) */}
      <div className="pt-3 border-t border-white/5 mt-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-slate-400">Guild Price</span>
          <span className="font-display text-xs font-bold text-amber-400 flex items-center gap-1">
            <Coins className="w-3.5 h-3.5" />
            <AnimatedCounter value={item.price} /> Gold
          </span>
        </div>

        {feedback && (
          <div className="text-[11px] text-cyan-300 font-semibold mb-2 text-center bg-cyan-950/80 p-1.5 rounded-lg border border-cyan-500/40">
            {feedback}
          </div>
        )}

        {isOwned && item.category !== 'Consumable' ? (
          <button
            onClick={handleEquip}
            className={`w-full py-2 rounded-lg font-bold text-xs flex items-center justify-center space-x-1.5 transition-all border ${
              isEquipped
                ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
                : 'bg-[#131824] hover:bg-white/10 text-slate-200 border-white/10'
            }`}
          >
            {isEquipped ? (
              <>
                <Check className="w-3.5 h-3.5 text-cyan-400" />
                <span>Currently Active</span>
              </>
            ) : (
              <span>Equip / Apply</span>
            )}
          </button>
        ) : (
          <button
            onClick={handlePurchase}
            disabled={!canAfford || isPurchasing}
            className={`w-full py-2 rounded-lg font-display text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
              canAfford
                ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                : 'bg-[#131824] text-slate-500 border border-white/5 cursor-not-allowed'
            }`}
          >
            {canAfford ? (
              <>
                <Coins className="w-3.5 h-3.5" />
                <span>{isPurchasing ? 'Purchasing...' : 'Acquire Item'}</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>Need {item.price - profile.gold} more Gold</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
