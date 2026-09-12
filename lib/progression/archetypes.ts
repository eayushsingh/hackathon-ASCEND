// ==============================================================================
// ASCEND - ARCHETYPE DEFINITIONS & STARTER QUESTS
// ==============================================================================

import { ArchetypeDetails } from '@/types/rpg';

export const ARCHETYPES: Record<string, ArchetypeDetails> = {
  'Cyber Mage': {
    id: 'Cyber Mage',
    name: 'Cyber Mage',
    title: 'Architect of Logic & Neural Code',
    role: 'Intellect Specialist',
    description: 'Masters of deep concentration, complex problem solving, and analytical study. Converts cognitive mastery into arcane power.',
    primaryAttribute: 'Intellect',
    secondaryAttribute: 'Discipline',
    avatar: '/avatars/mage.png',
    color: '#06B6D4', // Cyan
    accentGlow: 'rgba(6, 182, 212, 0.4)',
    lore: 'Channeling the infinite stream of binary knowledge, Cyber Mages weave algorithms into reality and conquer cognitive challenges.',
    perk: '+15% bonus Intellect XP on Work & Learning quests.',
    starterQuests: [
      {
        title: 'Deep Work Protocol (90 mins)',
        description: 'Complete 90 minutes of undistracted coding or focused intellectual deep work.',
        category: 'Work',
        difficulty: 'Hard',
        attribute: 'Intellect',
      },
      {
        title: 'Neural Architecture Research',
        description: 'Read 20 pages of technical documentation or a non-fiction book.',
        category: 'Learning',
        difficulty: 'Medium',
        attribute: 'Intellect',
      },
      {
        title: 'Morning Brain Calibration',
        description: 'Review day priorities before opening social media.',
        category: 'Habit',
        difficulty: 'Easy',
        attribute: 'Discipline',
      },
    ],
  },
  'Iron Titan': {
    id: 'Iron Titan',
    name: 'Iron Titan',
    title: 'Vanguard of Physical Mastery',
    role: 'Strength & Vitality Specialist',
    description: 'Relentless warriors who forge their bodies and endurance through grueling workouts and physical discipline.',
    primaryAttribute: 'Strength',
    secondaryAttribute: 'Vitality',
    avatar: '/avatars/titan.png',
    color: '#EF4444', // Crimson
    accentGlow: 'rgba(239, 68, 68, 0.4)',
    lore: 'Born in the fires of heavy iron and relentless endurance, Titans push physical thresholds beyond human limits.',
    perk: '+15% bonus Strength & Vitality XP on Fitness & Health quests.',
    starterQuests: [
      {
        title: 'Iron Forge Heavy Workout',
        description: 'Complete 45+ minutes of high-intensity resistance training or lifting.',
        category: 'Fitness',
        difficulty: 'Hard',
        attribute: 'Strength',
      },
      {
        title: 'Optimal Hydration Protocol',
        description: 'Drink 3.5 Liters of water throughout the day.',
        category: 'Habit',
        difficulty: 'Easy',
        attribute: 'Vitality',
      },
      {
        title: '10,000 Step Patrol',
        description: 'Hit 10k daily steps to maintain aerobic vitality.',
        category: 'Fitness',
        difficulty: 'Medium',
        attribute: 'Vitality',
      },
    ],
  },
  'Shadow Rogue': {
    id: 'Shadow Rogue',
    name: 'Shadow Rogue',
    title: 'Infiltrator of Deadlines & Precision',
    role: 'Creativity & Speed Specialist',
    description: 'Stealthy operators who dismantle huge backlogs with surgical precision and creative ingenuity.',
    primaryAttribute: 'Creativity',
    secondaryAttribute: 'Intellect',
    avatar: '/avatars/rogue.png',
    color: '#A855F7', // Purple
    accentGlow: 'rgba(168, 85, 247, 0.4)',
    lore: 'Moving silently through the shadows of chaos, Rogues eliminate backlogs before anyone notices.',
    perk: '+15% bonus Gold reward on all Medium & Hard quests.',
    starterQuests: [
      {
        title: 'Inbox Zero Infiltration',
        description: 'Clear out all pending emails, DMs, and notifications to zero.',
        category: 'Work',
        difficulty: 'Medium',
        attribute: 'Discipline',
      },
      {
        title: 'Rapid Prototype Creation',
        description: 'Draft or prototype a new creative concept or user interface in 60 mins.',
        category: 'Creative',
        difficulty: 'Hard',
        attribute: 'Creativity',
      },
      {
        title: 'Silent Task Elimination',
        description: 'Knock out 3 annoying micro-tasks on your to-do list without procrastinating.',
        category: 'Habit',
        difficulty: 'Medium',
        attribute: 'Discipline',
      },
    ],
  },
  'Bio Hacker': {
    id: 'Bio Hacker',
    name: 'Bio Hacker',
    title: 'Optimizer of Human Biology & Focus',
    role: 'Vitality & Discipline Specialist',
    description: 'Scientific perfectionists tuning sleep cycles, nutrition, circadian rhythms, and mental stamina.',
    primaryAttribute: 'Vitality',
    secondaryAttribute: 'Discipline',
    avatar: '/avatars/hacker.png',
    color: '#10B981', // Emerald
    accentGlow: 'rgba(16, 185, 129, 0.4)',
    lore: 'Rewiring the human operating system with cold showers, clean fuel, and optimized recovery protocols.',
    perk: '+20% longer Streak retention window & bonus Vitality multiplier.',
    starterQuests: [
      {
        title: 'Circadian Sunlight Exposure',
        description: 'Get 15 minutes of direct sunlight within 30 minutes of waking.',
        category: 'Habit',
        difficulty: 'Easy',
        attribute: 'Vitality',
      },
      {
        title: 'Clean Fuel Nutrition Day',
        description: 'Zero processed sugar and eat 3 whole-food nutrient-dense meals.',
        category: 'Fitness',
        difficulty: 'Medium',
        attribute: 'Vitality',
      },
      {
        title: 'Digital Sunset & Sleep Prep',
        description: 'No screens 45 minutes before sleep + 8 hours in bed.',
        category: 'Habit',
        difficulty: 'Medium',
        attribute: 'Discipline',
      },
    ],
  },
  'Astral Sage': {
    id: 'Astral Sage',
    name: 'Astral Sage',
    title: 'Weaver of Imagination & Culture',
    role: 'Creativity & Charisma Specialist',
    description: 'Visionaries who bring compelling stories, art, designs, and transformative ideas into the world.',
    primaryAttribute: 'Creativity',
    secondaryAttribute: 'Charisma',
    avatar: '/avatars/sage.png',
    color: '#F59E0B', // Amber
    accentGlow: 'rgba(245, 158, 11, 0.4)',
    lore: 'Drawing inspiration from celestial planes to craft timeless art, influential writing, and culture.',
    perk: '+20% bonus XP for Creative & Social quests.',
    starterQuests: [
      {
        title: 'Creative Output Sprint',
        description: 'Write 500 words of an essay/article or design a new creative artwork.',
        category: 'Creative',
        difficulty: 'Hard',
        attribute: 'Creativity',
      },
      {
        title: 'Mindful Meditation Synthesis',
        description: '15 minutes of uninterrupted mindfulness / breathwork.',
        category: 'Habit',
        difficulty: 'Easy',
        attribute: 'Discipline',
      },
      {
        title: 'Community Connection',
        description: 'Send a thoughtful, supportive message or mentorship note to a colleague/friend.',
        category: 'Social',
        difficulty: 'Medium',
        attribute: 'Charisma',
      },
    ],
  },
  'Nova Paladin': {
    id: 'Nova Paladin',
    name: 'Nova Paladin',
    title: 'Guardian of Community & Leadership',
    role: 'Charisma & Strength Specialist',
    description: 'Charismatic leaders who inspire teams, elevate others, and drive high-impact public initiatives.',
    primaryAttribute: 'Charisma',
    secondaryAttribute: 'Strength',
    avatar: '/avatars/paladin.png',
    color: '#3B82F6', // Blue
    accentGlow: 'rgba(59, 130, 246, 0.4)',
    lore: 'Radiating magnetic energy and fearless presence, Paladins lead the charge in team triumphs.',
    perk: '+25% bonus Charisma XP on networking and leadership quests.',
    starterQuests: [
      {
        title: 'High-Stakes Presentation / Pitch',
        description: 'Lead a team sync, client presentation, or public speaking session.',
        category: 'Social',
        difficulty: 'Epic',
        attribute: 'Charisma',
      },
      {
        title: 'Team Unblocking Session',
        description: 'Proactively help 2 team members resolve obstacles or mentor a peer.',
        category: 'Work',
        difficulty: 'Medium',
        attribute: 'Charisma',
      },
      {
        title: 'Morning Posture & Voice Drill',
        description: '5 minutes of vocal resonance and posture alignment exercise.',
        category: 'Habit',
        difficulty: 'Easy',
        attribute: 'Charisma',
      },
    ],
  },
};

export const ARCHETYPE_LIST = Object.values(ARCHETYPES);
