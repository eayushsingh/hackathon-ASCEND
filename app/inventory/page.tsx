'use client';

// ==============================================================================
// ASCEND - TACTICAL LOADOUT & INVENTORY
// Minimalist Editorial Theme
// ==============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import { useGame } from '@/lib/context/game-context';
import {
  Package,
  ShoppingBag,
  Check,
  Palette,
  Tag,
  ShieldAlert,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function InventoryPage() {
  const { inventory, equipItem, profile, streak } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Theme', 'Badge', 'Title', 'Frame', 'Consumable'];

  const filteredInventory = inventory.filter((inv) => {
    if (selectedCategory === 'All') return true;
    return inv.item?.category === selectedCategory;
  });

  return (
    <div className="space-y-12 pb-12 pt-8">
      {/* 1. TACTICAL LOADOUT DOCK (EQUIPPED ACTIVE GEAR) */}
      <div className="p-8 bg-white border-4 border-[#141210] shadow-[8px_8px_0_0_#141210]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b-2 border-[#141210]/10">
          <div className="flex items-center space-x-6 text-center md:text-left">
            <div className="w-16 h-16 bg-[#141210] border-4 border-[#141210] flex items-center justify-center text-white shrink-0 shadow-[4px_4px_0_0_#E85D25]">
              <Package className="w-8 h-8" />
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-black text-[#14120F] uppercase tracking-widest">
                Loadout & Inventory
              </h1>
              <p className="text-sm font-sans font-medium text-[#6B665C] mt-2">
                Active cosmetic equipment, titles, and consumables stored in your neural vault.
              </p>
            </div>
          </div>

          <Link
            href="/shop"
            className="px-6 py-3 bg-[#E85D25] border-2 border-[#141210] hover:bg-[#C54A18] text-white font-sans text-sm font-bold uppercase tracking-widest transition-all flex items-center space-x-2 shrink-0 shadow-[4px_4px_0_0_#141210]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Open Guild Shop</span>
          </Link>
        </div>

        {/* 3 EQUIPPED GEAR SLOTS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-[#F3F1EC] border-2 border-[#141210] shadow-[4px_4px_0_0_#141210] flex items-center space-x-4">
            <div className="w-12 h-12 bg-white border-2 border-[#141210] flex items-center justify-center text-[#141210] shadow-[2px_2px_0_0_#141210]">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-sans font-bold text-[#6B665C] uppercase tracking-widest">Active Theme</div>
              <div className="font-display text-xl font-black text-[#141210] uppercase tracking-widest mt-1">{profile.theme}</div>
            </div>
          </div>

          <div className="p-6 bg-[#F3F1EC] border-2 border-[#141210] shadow-[4px_4px_0_0_#141210] flex items-center space-x-4">
            <div className="w-12 h-12 bg-white border-2 border-[#141210] flex items-center justify-center text-[#141210] shadow-[2px_2px_0_0_#141210]">
              <Tag className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-sans font-bold text-[#6B665C] uppercase tracking-widest">Active Title</div>
              <div className="font-display text-xl font-black text-[#141210] uppercase tracking-widest mt-1">{profile.title}</div>
            </div>
          </div>

          <div className="p-6 bg-[#F3F1EC] border-2 border-[#141210] shadow-[4px_4px_0_0_#141210] flex items-center space-x-4">
            <div className="w-12 h-12 bg-white border-2 border-[#141210] flex items-center justify-center text-[#D97706] shadow-[2px_2px_0_0_#141210]">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-sans font-bold text-[#6B665C] uppercase tracking-widest">Streak Freeze Vault</div>
              <div className="font-display text-xl font-black text-[#D97706] uppercase tracking-widest mt-1">
                {streak.streak_freeze_count} / 3 Ready
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY TABS */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 hide-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-sans font-bold uppercase tracking-widest transition-all shrink-0 border-2 ${
              selectedCategory === cat
                ? 'bg-[#141210] text-white border-[#141210] shadow-[4px_4px_0_0_#E85D25]'
                : 'bg-white text-[#57534E] hover:text-[#141210] border-[#141210]/20 hover:border-[#141210] shadow-[4px_4px_0_0_rgba(20,18,16,0.1)]'
            }`}
          >
            {cat}s
          </button>
        ))}
      </div>

      {/* 3. INVENTORY ITEMS GRID */}
      {filteredInventory.length === 0 ? (
        <div className="py-24 text-center bg-white border-4 border-[#141210] shadow-[8px_8px_0_0_#141210]">
          <Package className="w-12 h-12 text-[#141210]/30 mx-auto mb-4" />
          <h3 className="font-display text-xl font-black text-[#141210] uppercase tracking-widest">No acquired items</h3>
          <p className="text-sm font-sans font-medium text-[#6B665C] mt-2 max-w-md mx-auto">
            Complete quests to earn gold, then acquire themes, badges, and titles from the Guild Market.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center space-x-2 px-6 py-3 bg-[#141210] hover:bg-[#2A2621] border-2 border-[#141210] text-white font-sans text-sm font-bold uppercase tracking-widest transition-all shadow-[4px_4px_0_0_#E85D25]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Visit Guild Market</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInventory.map((inv) => {
            if (!inv.item) return null;
            const item = inv.item;
            const isEquipped = inv.is_equipped || (item.category === 'Theme' && profile.theme === item.effect_value);

            return (
              <div
                key={inv.id}
                className="p-6 bg-white border-4 border-[#141210] flex flex-col justify-between shadow-[8px_8px_0_0_rgba(20,18,16,0.1)] hover:shadow-[8px_8px_0_0_#141210] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-[#141210] text-white border-2 border-[#141210]">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-sans font-bold text-[#6B665C] uppercase tracking-widest">
                      Acquired {formatDate(inv.acquired_at)}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-black text-[#141210] uppercase tracking-widest leading-tight">{item.name}</h3>
                  <p className="text-xs font-sans font-medium text-[#6B665C] mt-2 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-4 border-t-2 border-[#141210]/10 mt-6">
                  {item.category !== 'Consumable' ? (
                    <button
                      onClick={() => equipItem(inv.id)}
                      className={`w-full py-3 font-sans text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 transition-all border-2 ${
                        isEquipped
                          ? 'bg-[#141210] text-white border-[#141210]'
                          : 'bg-white text-[#141210] border-[#141210] hover:bg-[#F3F1EC]'
                      }`}
                    >
                      {isEquipped ? (
                        <>
                          <Check className="w-4 h-4 text-white" />
                          <span>Equipped</span>
                        </>
                      ) : (
                        <span>Equip Item</span>
                      )}
                    </button>
                  ) : (
                    <div className="text-center font-sans text-xs font-bold uppercase tracking-widest text-[#D97706] bg-white py-3 border-2 border-[#D97706]">
                      Active In Vault ({inv.quantity || 1}x)
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
