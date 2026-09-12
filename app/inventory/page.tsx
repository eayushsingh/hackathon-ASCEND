'use client';

// ==============================================================================
// ASCEND - TACTICAL LOADOUT & INVENTORY
// Distinct loadout dock with equipped slots and modular backpack matrix
// ==============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import { useGame } from '@/lib/context/game-context';
import {
  Package,
  Sparkles,
  ShoppingBag,
  Check,
  Shield,
  Palette,
  Tag,
  Hexagon,
  ShieldAlert,
  FlaskConical,
  Layers,
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
    <div className="space-y-6 pb-10">
      {/* 1. TACTICAL LOADOUT DOCK (EQUIPPED ACTIVE GEAR) */}
      <div className="cyber-panel p-6 rounded-2xl border-white/10 bg-[#0D111A]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display text-xl sm:text-2xl font-black text-white">
                TACTICAL LOADOUT & INVENTORY
              </h1>
              <p className="text-xs text-slate-400">
                Active cosmetic equipment, titles, and consumables stored in your neural vault.
              </p>
            </div>
          </div>

          <Link
            href="/shop"
            className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-display text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Open Guild Shop</span>
          </Link>
        </div>

        {/* 3 EQUIPPED GEAR SLOTS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          <div className="p-4 rounded-xl bg-[#07090E] border border-cyan-500/30 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-500 uppercase">ACTIVE THEME</div>
              <div className="font-display text-xs font-bold text-cyan-300 capitalize">{profile.theme}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#07090E] border border-purple-500/30 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-500 uppercase">ACTIVE TITLE</div>
              <div className="font-display text-xs font-bold text-purple-300">{profile.title}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#07090E] border border-orange-500/30 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-500 uppercase">STREAK FREEZE VAULT</div>
              <div className="font-display text-xs font-bold text-orange-300">
                {streak.streak_freeze_count} / 3 Ready
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY TABS */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 border ${
              selectedCategory === cat
                ? 'bg-purple-500/15 text-purple-300 border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.2)]'
                : 'bg-[#0D111A] text-slate-400 hover:bg-white/5 border-white/5'
            }`}
          >
            {cat}s
          </button>
        ))}
      </div>

      {/* 3. INVENTORY ITEMS GRID */}
      {filteredInventory.length === 0 ? (
        <div className="py-20 text-center rounded-2xl bg-[#0D111A] border border-dashed border-white/10">
          <Package className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="font-display text-sm font-bold text-slate-300">NO ACQUIRED ITEMS IN THIS CATEGORY</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Complete quests to earn gold, then acquire themes, badges, and titles from the Guild Market.
          </p>
          <Link
            href="/shop"
            className="mt-4 inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-display text-xs font-bold transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Visit Guild Market</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredInventory.map((inv) => {
            if (!inv.item) return null;
            const item = inv.item;
            const isEquipped = inv.is_equipped || (item.category === 'Theme' && profile.theme === item.effect_value);

            return (
              <div
                key={inv.id}
                className="cyber-panel p-4 sm:p-5 rounded-xl flex flex-col justify-between border-white/10 hover:border-white/20 transition-all bg-[#0D111A]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-display text-[10px] font-black uppercase px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      Acquired {formatDate(inv.acquired_at)}
                    </span>
                  </div>

                  <h3 className="font-display text-sm font-bold text-white">{item.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-3.5 border-t border-white/5 mt-4">
                  {item.category !== 'Consumable' ? (
                    <button
                      onClick={() => equipItem(inv.id)}
                      className={`w-full py-2 rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 transition-all border ${
                        isEquipped
                          ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
                          : 'bg-[#131824] hover:bg-white/10 text-white border-white/10 cursor-pointer'
                      }`}
                    >
                      {isEquipped ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Equipped</span>
                        </>
                      ) : (
                        <span>Equip Item</span>
                      )}
                    </button>
                  ) : (
                    <div className="text-center text-xs font-mono font-bold text-cyan-400 bg-cyan-950/40 py-1.5 rounded-lg border border-cyan-500/30">
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
