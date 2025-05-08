// 📁 src/config/metrics.js

export const METRIC_GROUPS = {
  Skills: [
    'overall',
    'attack',
    'defence',
    'strength',
    'hitpoints',
    'ranged',
    'prayer',
    'magic',
    'cooking',
    'woodcutting',
    'fletching',
    'fishing',
    'firemaking',
    'crafting',
    'smithing',
    'mining',
    'herblore',
    'agility',
    'thieving',
    'slayer',
    'farming',
    'runecrafting',
    'hunter',
    'construction'
  ],
  Activities: [
    'league_points',
    'bounty_hunter_hunter',
    'bounty_hunter_rogue',
    'clue_scrolls_all',
    'clue_scrolls_beginner',
    'clue_scrolls_easy',
    'clue_scrolls_medium',
    'clue_scrolls_hard',
    'clue_scrolls_elite',
    'clue_scrolls_master',
    'last_man_standing',
    'pvp_arena',
    'soul_wars_zeal',
    'guardians_of_the_rift',
    'colosseum_glory',
    'collections_logged'
  ],
  Bosses: [
    'abyssal_sire',
    'alchemical_hydra',
    'amoxliatl',
    'araxxor',
    'artio',
    'barrows_chests',
    'bryophyta',
    'callisto',
    'calvarion',
    'cerberus',
    'chambers_of_xeric',
    'chambers_of_xeric_challenge_mode',
    'chaos_elemental',
    'chaos_fanatic',
    'commander_zilyana',
    'corporeal_beast',
    'crazy_archaeologist',
    'dagannoth_prime',
    'dagannoth_rex',
    'dagannoth_supreme',
    'deranged_archaeologist',
    'duke_sucellus',
    'general_graardor',
    'giant_mole',
    'grotesque_guardians',
    'hespori',
    'kalphite_queen',
    'king_black_dragon',
    'kraken',
    'kreearra',
    'kril_tsutsaroth',
    'lunar_chests',
    'mimic',
    'nex',
    'nightmare',
    'phosanis_nightmare',
    'obor',
    'phantom_muspah',
    'sarachnis',
    'scorpia',
    'scurrius',
    'skotizo',
    'sol_heredit',
    'spindel',
    'tempoross',
    'the_gauntlet',
    'the_corrupted_gauntlet',
    'the_hueycoatl',
    'the_leviathan',
    'the_royal_titans',
    'the_whisperer',
    'theatre_of_blood',
    'theatre_of_blood_hard_mode',
    'thermonuclear_smoke_devil',
    'tombs_of_amascut',
    'tombs_of_amascut_expert',
    'tzkal_zuk',
    'tztok_jad',
    'vardorvis',
    'venenatis',
    'vetion',
    'vorkath',
    'wintertodt',
    'zalcano',
    'zulrah'
  ],
  Computed: ['ehp', 'ehb']
};

export const getMetricType = metric => {
  if (METRIC_GROUPS.Skills.includes(metric)) return 'skill';
  if (METRIC_GROUPS.Bosses.includes(metric)) return 'boss';
  if (METRIC_GROUPS.Activities.includes(metric)) return 'activity';
  if (METRIC_GROUPS.Computed.includes(metric)) return 'computed';
  return 'unknown';
};

export const getEmojiPath = metric => `/assets/emojis/${metric}.webp`;

export const getSkillOrBossPath = metric => `/assets/skills_bosses/${metric}.webp`;

export const metricGroups = Object.entries(METRIC_GROUPS).map(([group, metrics]) => ({
  group,
  options: metrics.map(m => ({
    label: m.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    value: m
  }))
}));

export const isSkillOrBoss = metric =>
  METRIC_GROUPS.Skills.includes(metric) || METRIC_GROUPS.Bosses.includes(metric);
