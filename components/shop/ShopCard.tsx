'use client';

// ==============================================================================
// ASCEND - GUILD SHOP ITEM CARD COMPONENT
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

  // Check if item is already owned
  const ownedItem = inventory.find((inv) => inv.item_id === item.id);
  const isOwned = Boolean(ownedItem);
  const isEquipped = Boolean(ownedItem?.is_equipped);
  const canAfford = profile.gold >= item.price;

  const getRarityBadge = (rarity: ItemRarity) => {
    switch (rarity) {
      case 'Common':
        return 'text-slate-400 bg-slate-800/80 border-slate-700';
      case 'Rare':
        return 'text-cyan-400 bg-cyan-950/60 border-cyan-700/60';
      case 'Epic':
        return 'text-purple-400 bg-purple-950/60 border-purple-700/60 shadow-[0_0_8px_rgba(168,85,247,0.3)]';
      case 'Legendary':
        return 'text-amber-400 bg-amber-950/60 border-amber-700/60 shadow-[0_0_12px_rgba(245,158,11,0.4)]';
      case 'Mythic':
        return 'text-rose-400 bg-gradient-to-r from-rose-950 to-purple-950 border-rose-500/80 shadow-[0_0_15px_rgba(244,63,94,0.6)] animate-pulse';
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
    <motion.div
      whileHover={{ y: -4 }}
      className="cyber-panel p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden group border-white/10 hover:border-cyan-500/40"
    >
      {/* Top Tag Bar */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${getRarityBadge(item.rarity)}`}>
            {item.rarity}
          </span>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            {item.category}
          </span>
        </div>

        {/* Icon & Title */}
        <div className="flex items-start space-x-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-500/50 transition-all shrink-0">
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
              {item.name}
            </h4>
            <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">
              {item.description}
            </p>
          </div>
        </div>
      </div>

      {/* Price & Action Button */}
      <div className="pt-3 border-t border-white/5 mt-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-slate-400 font-medium">Guild Price</span>
          <span className="flex items-center gap-1.5 text-sm font-black text-amber-400">
            <Coins className="w-4 h-4" />
            <span>{formatNumber(item.price)} Gold</span>
          </span>
        </div>

        {feedback && (
          <div className="text-[11px] text-cyan-300 font-bold mb-2 text-center bg-cyan-950/60 p-1.5 rounded-lg border border-cyan-500/40">
            {feedback}
          </div>
        )}

        {isOwned && item.category !== 'Consumable' ? (
          <button
            onClick={handleEquip}
            className={`w-full py-2 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-all border ${
              isEquipped
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                : 'bg-slate-850 hover:bg-white/10 text-slate-200 border-white/20'
            }`}
          >
            {isEquipped ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
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
            className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-all ${
              canAfford
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                : 'bg-slate-900 text-slate-500 border border-white/5 cursor-not-allowed'
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
    </motion.div>
  );
};
