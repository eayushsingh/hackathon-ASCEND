'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface HeroCharacterProps {
  className?: string;
}

export default function HeroCharacter({ className = '' }: HeroCharacterProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative pointer-events-none select-none ${className}`}>
      <motion.div
        initial={{ y: 0 }}
        animate={{
          y: shouldReduceMotion ? 0 : [-6, 6, -6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-full h-full flex items-center justify-center"
      >
        <svg
          viewBox="0 0 500 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-w-[500px] drop-shadow-xl"
        >
          <defs>
            {/* Background Halo Gradient */}
            <radialGradient id="haloGlow" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#E85D25" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#E85D25" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#E85D25" stopOpacity="0" />
            </radialGradient>

            {/* Weapon & Hand Orb Radial Glow */}
            <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF9E00" stopOpacity="1" />
              <stop offset="40%" stopColor="#E85D25" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#E85D25" stopOpacity="0" />
            </radialGradient>

            {/* Armor Highlight Gradient */}
            <linearGradient id="armorShine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A463F" />
              <stop offset="50%" stopColor="#141210" />
              <stop offset="100%" stopColor="#0D0B0A" />
            </linearGradient>

            {/* Hood Shadow Gradient */}
            <linearGradient id="hoodDark" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#2A2421" />
              <stop offset="100%" stopColor="#141210" />
            </linearGradient>

            {/* Staff Metallic Linear */}
            <linearGradient id="staffMetal" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#141210" />
              <stop offset="50%" stopColor="#6B665C" />
              <stop offset="100%" stopColor="#141210" />
            </linearGradient>
          </defs>

          {/* 1. BACKGROUND GEOMETRIC RUNE & AMBIENT GLOW */}
          <circle cx="250" cy="240" r="210" fill="url(#haloGlow)" />
          <circle
            cx="250"
            cy="240"
            r="160"
            stroke="#141210"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            opacity="0.25"
          />
          <polygon
            points="250,70 390,310 110,310"
            stroke="#E85D25"
            strokeWidth="1.5"
            strokeDasharray="8 4"
            fill="none"
            opacity="0.3"
          />

          {/* 2. WARRIOR-MAGE SILHOUETTE BODY (Chest-up / Upper Torso) */}

          {/* Layer A: Back Cloak / Shoulders drapes */}
          <path
            d="M 120 480 C 130 360, 160 300, 200 270 C 170 320, 140 380, 100 550 Z"
            fill="#141210"
          />
          <path
            d="M 380 480 C 370 360, 340 300, 300 270 C 330 320, 360 380, 400 550 Z"
            fill="#141210"
          />

          {/* Layer B: Main Torso / Armor Body */}
          <path
            d="M 150 560 L 170 380 L 250 350 L 330 380 L 350 560 L 250 580 Z"
            fill="url(#armorShine)"
            stroke="#141210"
            strokeWidth="3"
          />

          {/* Layer C: Pauldrons (Shoulder Armor Plating) */}
          {/* Left Shoulder */}
          <path
            d="M 120 370 L 180 340 L 210 370 L 160 420 L 110 400 Z"
            fill="#2A2421"
            stroke="#141210"
            strokeWidth="3"
          />
          <path
            d="M 135 375 L 175 350 L 195 370 L 165 405 Z"
            fill="none"
            stroke="#E85D25"
            strokeWidth="2"
            opacity="0.8"
          />

          {/* Right Shoulder */}
          <path
            d="M 380 370 L 320 340 L 290 370 L 340 420 L 390 400 Z"
            fill="#2A2421"
            stroke="#141210"
            strokeWidth="3"
          />
          <path
            d="M 365 375 L 325 350 L 305 370 L 335 405 Z"
            fill="none"
            stroke="#E85D25"
            strokeWidth="2"
            opacity="0.8"
          />

          {/* Layer D: Chest Armor Crest & Core Geometric Lines */}
          <polygon
            points="250,370 280,420 250,470 220,420"
            fill="#141210"
            stroke="#E85D25"
            strokeWidth="3"
          />
          <circle cx="250" cy="420" r="8" fill="#E85D25" />

          {/* Layer E: Hood & Head Silhouette */}
          {/* Outer Hood Fold */}
          <path
            d="M 180 320 C 170 210, 210 150, 250 140 C 290 150, 330 210, 320 320 C 290 340, 210 340, 180 320 Z"
            fill="url(#hoodDark)"
            stroke="#141210"
            strokeWidth="4"
          />
          {/* Inner Hood Shadow */}
          <path
            d="M 200 300 C 195 230, 220 180, 250 175 C 280 180, 305 230, 300 300 C 275 315, 225 315, 200 300 Z"
            fill="#0D0B0A"
          />

          {/* Visor / Eye Glow seam */}
          <polygon points="230,245 270,245 260,252 240,252" fill="#E85D25" />
          <path
            d="M 225 245 L 275 245"
            stroke="#FF9E00"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Collar / Cowl Neck Folds */}
          <path
            d="M 190 320 L 250 350 L 310 320 L 250 365 Z"
            fill="#141210"
            stroke="#4A463F"
            strokeWidth="2"
          />

          {/* 3. STAFF / SPELL WEAPON (Right hand foreground) */}
          <g>
            {/* Staff Shaft */}
            <rect
              x="345"
              y="120"
              width="10"
              height="440"
              rx="4"
              fill="url(#staffMetal)"
              stroke="#141210"
              strokeWidth="2"
            />

            {/* Staff Head Frame */}
            <path
              d="M 330 150 C 310 110, 330 60, 350 50 C 370 60, 390 110, 370 150 Z"
              fill="#2A2421"
              stroke="#141210"
              strokeWidth="3"
            />
            <polygon
              points="350,30 365,65 335,65"
              fill="#141210"
              stroke="#E85D25"
              strokeWidth="2"
            />

            {/* Animated Staff Crystal Orb & Glow */}
            <motion.g
              animate={{
                opacity: shouldReduceMotion ? 0.9 : [0.7, 1.0, 0.7],
                scale: shouldReduceMotion ? 1 : [0.96, 1.04, 0.96],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ transformOrigin: '350px 100px' }}
            >
              {/* Outer Energy Glow Sphere */}
              <circle cx="350" cy="100" r="32" fill="url(#orbGlow)" />
              {/* Inner Glowing Crystal Diamond */}
              <polygon
                points="350,82 364,100 350,118 336,100"
                fill="#FF9E00"
                stroke="#F3F1EC"
                strokeWidth="2"
              />
              {/* Core Light Spark */}
              <circle cx="350" cy="100" r="4" fill="#FFFFFF" />

              {/* Arcane Energy Sparks */}
              <path
                d="M 325 90 Q 335 80 340 95"
                stroke="#FF9E00"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 375 110 Q 365 120 360 105"
                stroke="#E85D25"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </motion.g>
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
