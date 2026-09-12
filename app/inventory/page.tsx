'use client';

// ==============================================================================
// ASCEND - TACTICAL LOADOUT & INVENTORY
// Vibrant Modern RPG HUD Inventory Vault
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
    <div className="space-y-10 pb-16 pt-6">
      {/* 1. TACTICAL LOADOUT DOCK */}
      <div className="rounded-3xl bg-[#0D111A]/90 border border-indigo-500/30 p-6 sm:p-8 shadow-[0_0_35px_rgba(99,102,241,0.15)]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="flex items-center space-x-5 text-center md:text-left">
            <div className="w-14 h-14 bg-indigo-950/80 border border-indigo-500/40 rounded-2xl flex items-center justify-center text-indigo-400 shrink-0 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              <Package className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight font-sans">
                Loadout & Inventory
              </h1>
              <p className="text-xs sm:text-sm font-sans text-slate-400 mt-1 max-w-xl">
                Active cosmetic equipment, titles, and consumables stored in your neural vault.
              </p>
            </div>
          </div>

          <Link
            href="/shop"
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all flex items-center space-x-2 shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Open Guild Shop</span>
          </Link>
        </div>

        {/* 3 EQUIPPED GEAR SLOTS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/5 flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Active Theme</div>
              <div className="font-mono text-base font-bold text-indigo-400 uppercase mt-0.5">{profile.theme}</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/5 flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Active Title</div>
              <div className="font-mono text-base font-bold text-purple-400 uppercase mt-0.5">{profile.title}</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/5 flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Streak Freeze Vault</div>
              <div className="font-mono text-base font-bold text-amber-400 uppercase mt-0.5">
                {streak.streak_freeze_count} / 3 Ready
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY TABS */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-white/10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all shrink-0 border cursor-pointer ${
              selectedCategory === cat
                ? 'bg-indigo-500 text-white border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                : 'bg-slate-900/80 text-slate-400 border-white/5 hover:border-white/15'
            }`}
          >
            {cat}s
          </button>
        ))}
      </div>

      {/* 3. INVENTORY ITEMS GRID */}
      {filteredInventory.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-[#0D111A]/60 border border-white/10">
          <Package className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="font-mono text-base font-bold text-slate-300 uppercase">No acquired items</h3>
          <p className="text-xs font-sans text-slate-500 mt-2 max-w-md mx-auto">
            Complete quests to earn gold, then acquire themes, badges, and titles from the Guild Market.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all cursor-pointer"
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
                className="p-6 rounded-3xl bg-[#0D111A]/90 border border-white/10 hover:border-indigo-500/40 flex flex-col justify-between shadow-[0_0_25px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.15)] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border border-indigo-500/40 bg-indigo-950/40 text-indigo-300">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                      Acquired {formatDate(inv.acquired_at)}
                    </span>
                  </div>

                  <h3 className="font-mono text-base font-bold text-slate-100 uppercase leading-tight">{item.name}</h3>
                  <p className="text-xs font-sans text-slate-400 mt-2 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-4 border-t border-white/10 mt-6">
                  {item.category !== 'Consumable' ? (
                    <button
                      onClick={() => equipItem(inv.id)}
                      className={`w-full py-2.5 font-mono text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center space-x-2 transition-all border cursor-pointer ${
                        isEquipped
                          ? 'bg-indigo-500 text-white border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                          : 'bg-slate-900 text-slate-300 border-white/10 hover:border-indigo-500/40'
                      }`}
                    >
                      {isEquipped ? (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>Equipped</span>
                        </>
                      ) : (
                        <span>Equip Item</span>
                      )}
                    </button>
                  ) : (
                    <div className="text-center font-mono text-xs font-bold uppercase text-amber-400 bg-amber-950/40 py-2.5 rounded-xl border border-amber-500/40">
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
