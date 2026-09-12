'use client';

// ==============================================================================
// ASCEND - GUILD SHOP ITEM CARD COMPONENT
// Vibrant Modern RPG HUD Shop Card
// ==============================================================================

import React, { useState } from 'react';
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
        return 'text-slate-400 border-white/10 bg-slate-950';
      case 'Rare':
        return 'text-cyan-400 border-cyan-500/40 bg-cyan-950/40';
      case 'Epic':
        return 'text-purple-400 border-purple-500/40 bg-purple-950/40';
      case 'Legendary':
        return 'text-amber-400 border-amber-500/40 bg-amber-950/40 shadow-[0_0_12px_rgba(245,158,11,0.3)]';
      case 'Mythic':
        return 'text-rose-400 border-rose-500/40 bg-rose-950/40 shadow-[0_0_12px_rgba(244,63,94,0.3)]';
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
    <div className="p-6 rounded-3xl bg-[#0D111A]/90 border border-white/10 hover:border-indigo-500/40 flex flex-col justify-between shadow-[0_0_25px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.15)] transition-all group">
      <div>
        {/* Top Tag Bar */}
        <div className="flex items-center justify-between mb-4">
          <span className={`font-mono text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${getRarityBadge(item.rarity)}`}>
            {item.rarity}
          </span>
          <span className="text-[10px] font-mono text-slate-400 uppercase">
            {item.category}
          </span>
        </div>

        {/* Icon & Details */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.2)] group-hover:scale-105 transition-transform">
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-mono text-base font-bold text-slate-100 uppercase leading-tight">
              {item.name}
            </h3>
            <p className="text-xs font-sans text-slate-400 mt-1 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      </div>

      {/* Price & Action Button */}
      <div className="pt-4 border-t border-white/10 mt-2">
        <div className="flex items-center justify-between mb-4 font-mono">
          <span className="text-xs text-slate-400 uppercase">Guild Price</span>
          <span className="text-base font-bold text-amber-400 flex items-center gap-1.5">
            <Coins className="w-4 h-4 text-amber-400" />
            <AnimatedCounter value={item.price} /> G
          </span>
        </div>

        {feedback && (
          <div className="text-[11px] text-indigo-300 font-mono font-bold uppercase mb-3 text-center bg-indigo-950/60 p-2 rounded-xl border border-indigo-500/40">
            {feedback}
          </div>
        )}

        {isOwned && item.category !== 'Consumable' ? (
          <button
            onClick={handleEquip}
            className={`w-full py-2.5 font-mono text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center space-x-2 transition-all border cursor-pointer ${
              isEquipped
                ? 'bg-indigo-500 text-white border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                : 'bg-slate-900 text-slate-300 border-white/10 hover:border-indigo-500/40'
            }`}
          >
            {isEquipped ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
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
            className={`w-full py-2.5 font-mono text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center space-x-2 transition-all border ${
              canAfford
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.3)] cursor-pointer'
                : 'bg-slate-950 text-slate-500 border-white/5 cursor-not-allowed opacity-60'
            }`}
          >
            {canAfford ? (
              <>
                <Coins className="w-4 h-4" />
                <span>{isPurchasing ? 'Purchasing...' : 'Acquire Item'}</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Need {item.price - profile.gold} G</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
