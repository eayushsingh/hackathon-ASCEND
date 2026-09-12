'use client';

// ==============================================================================
// ASCEND - GUILD SHOP ITEM CARD COMPONENT
// Apple Bright Premium Shop Card
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
        return 'text-[#6E6E73] border-[#E5E5EA] bg-[#F5F5F7]';
      case 'Rare':
        return 'text-sky-700 border-sky-200 bg-sky-50';
      case 'Epic':
        return 'text-purple-700 border-purple-200 bg-purple-50';
      case 'Legendary':
        return 'text-amber-800 border-amber-300 bg-amber-50 font-bold';
      case 'Mythic':
        return 'text-rose-700 border-rose-200 bg-rose-50 font-bold';
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
    <div className="apple-card p-6 flex flex-col justify-between group">
      <div>
        {/* Top Tag Bar */}
        <div className="flex items-center justify-between mb-4">
          <span className={`font-mono text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-full border ${getRarityBadge(item.rarity)}`}>
            {item.rarity}
          </span>
          <span className="text-[11px] font-mono text-[#6E6E73] uppercase font-medium">
            {item.category}
          </span>
        </div>

        {/* Icon & Details */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F5F5F7] border border-[#E5E5EA] flex items-center justify-center text-purple-600 shrink-0 group-hover:scale-105 transition-transform shadow-sm">
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-mono text-base font-bold text-[#1D1D1F] uppercase leading-tight">
              {item.name}
            </h3>
            <p className="text-xs font-sans text-[#6E6E73] mt-1 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      </div>

      {/* Price & Action Button */}
      <div className="pt-4 border-t border-[#E5E5EA] mt-2">
        <div className="flex items-center justify-between mb-4 font-mono">
          <span className="text-xs text-[#6E6E73] uppercase font-medium">Price</span>
          <span className="text-base font-bold text-amber-600 flex items-center gap-1.5">
            <Coins className="w-4 h-4 text-amber-500" />
            <AnimatedCounter value={item.price} /> G
          </span>
        </div>

        {feedback && (
          <div className="text-[11px] text-purple-700 font-mono font-bold uppercase mb-3 text-center bg-purple-50 p-2 rounded-xl border border-purple-200">
            {feedback}
          </div>
        )}

        {isOwned && item.category !== 'Consumable' ? (
          <button
            onClick={handleEquip}
            className={`w-full py-2.5 font-mono text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center space-x-2 transition-all border cursor-pointer ${
              isEquipped
                ? 'btn-primary-gradient text-white border-transparent shadow-sm'
                : 'bg-white text-[#1D1D1F] border-[#E5E5EA] hover:border-[#C7C7CC]'
            }`}
          >
            {isEquipped ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Currently Active</span>
              </>
            ) : (
              <span>Equip Item</span>
            )}
          </button>
        ) : (
          <button
            onClick={handlePurchase}
            disabled={!canAfford || isPurchasing}
            className={`w-full py-2.5 font-mono text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center space-x-2 transition-all border ${
              canAfford
                ? 'btn-primary-gradient text-white shadow-sm cursor-pointer'
                : 'bg-[#F5F5F7] text-[#8E8E93] border-[#E5E5EA] cursor-not-allowed'
            }`}
          >
            {canAfford ? (
              <>
                <Coins className="w-4 h-4" />
                <span>{isPurchasing ? 'Purchasing...' : 'Acquire Item'}</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-[#8E8E93]" />
                <span>Need {item.price - profile.gold} G</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

