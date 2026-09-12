'use client';

// ==============================================================================
// ASCEND - GUILD SHOP ITEM CARD COMPONENT
// Minimalist Editorial Theme
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
        return 'text-[#6B665C] bg-[#F3F1EC] border-[#141210]';
      case 'Rare':
        return 'text-[#E85D25] bg-white border-[#141210] shadow-[2px_2px_0_0_#141210]';
      case 'Epic':
        return 'text-[#D97706] bg-white border-[#141210] shadow-[2px_2px_0_0_#141210]';
      case 'Legendary':
        return 'text-white bg-[#141210] border-[#141210] shadow-[2px_2px_0_0_#D97706]';
      case 'Mythic':
        return 'text-white bg-[#E85D25] border-[#141210] shadow-[2px_2px_0_0_#141210]';
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
    <div className="p-6 bg-white border-4 border-[#141210] flex flex-col justify-between shadow-[8px_8px_0_0_rgba(20,18,16,0.1)] hover:shadow-[8px_8px_0_0_#141210] transition-all">
      <div>
        {/* Top Tag Bar */}
        <div className="flex items-center justify-between mb-4">
          <span className={`font-sans text-[10px] font-bold uppercase tracking-widest px-2 py-1 border-2 ${getRarityBadge(item.rarity)}`}>
            {item.rarity}
          </span>
          <span className="text-[10px] font-sans font-bold text-[#6B665C] uppercase tracking-widest">
            {item.category}
          </span>
        </div>

        {/* Icon & Details */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-12 h-12 bg-[#F3F1EC] border-2 border-[#141210] flex items-center justify-center text-[#141210] shrink-0 shadow-[2px_2px_0_0_#141210]">
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display text-lg font-black text-[#141210] uppercase tracking-widest leading-tight">
              {item.name}
            </h3>
            <p className="text-xs font-sans font-medium text-[#6B665C] mt-1 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      </div>

      {/* Price & Action Button */}
      <div className="pt-4 border-t-2 border-[#141210]/10 mt-2">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-sans font-bold text-[#6B665C] uppercase tracking-widest">Guild Price</span>
          <span className="font-display text-lg font-black text-[#D97706] flex items-center gap-1.5">
            <Coins className="w-4 h-4" />
            <AnimatedCounter value={item.price} /> G
          </span>
        </div>

        {feedback && (
          <div className="text-[11px] text-[#141210] font-bold uppercase tracking-widest mb-3 text-center bg-[#F3F1EC] p-2 border-2 border-[#141210]">
            {feedback}
          </div>
        )}

        {isOwned && item.category !== 'Consumable' ? (
          <button
            onClick={handleEquip}
            className={`w-full py-3 font-sans text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 transition-all border-2 ${
              isEquipped
                ? 'bg-[#141210] text-white border-[#141210]'
                : 'bg-white text-[#141210] border-[#141210] hover:bg-[#F3F1EC]'
            }`}
          >
            {isEquipped ? (
              <>
                <Check className="w-4 h-4 text-white" />
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
            className={`w-full py-3 font-sans text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 transition-all border-2 ${
              canAfford
                ? 'bg-[#E85D25] text-white border-[#141210] hover:bg-[#C54A18] shadow-[2px_2px_0_0_#141210] cursor-pointer'
                : 'bg-[#F3F1EC] text-[#6B665C] border-[#6B665C] opacity-75 cursor-not-allowed'
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
                <span>Need {item.price - profile.gold} more G</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};;
