const BASE = 'assets/creeps/';
const ICONS = BASE + 'creep-icons/';
const MODELS = BASE + 'creep-models/';

export const CREEPS = Object.freeze({
    // ───── Tier 1 ─────
    grunt: Object.freeze({
        id: "grunt",
        tier: 1,
        hp: 100,
        damage: 10,
        crit_damage: 15,
        crit_chance: 15,
        attack_count: 1,
        defend_count: 1,
        name: "Grunt",
        race: "orc",
        icon_path: ICONS + "Grunt-icon.webp",
        model_path: MODELS + "Grunt-model.webp",
    }),

    footman: Object.freeze({
        id: "footman",
        tier: 1,
        hp: 95,
        damage: 9,
        crit_damage: 14,
        crit_chance: 15,
        attack_count: 1,
        defend_count: 2, // щит
        name: "Footman",
        race: "human",
        icon_path: ICONS + "Footman-icon.webp",
        model_path: MODELS + "Footman-model.webp",
    }),

    archer: Object.freeze({
        id: "archer",
        tier: 1,
        hp: 85,
        damage: 11,
        crit_damage: 17,
        crit_chance: 20, // повыше крит
        attack_count: 1,
        defend_count: 1,
        name: "Archer",
        race: "elf",
        icon_path: ICONS + "Archer-icon.webp",
        model_path: MODELS + "Archer-model.webp",
    }),

    ghoul: Object.freeze({
        id: "ghoul",
        tier: 1,
        hp: 90,
        damage: 10,
        crit_damage: 16,
        crit_chance: 18,
        attack_count: 1,
        defend_count: 1,
        name: "Ghoul",
        race: "undead",
        icon_path: ICONS + "Ghoul-icon.webp",
        model_path: MODELS + "Ghoul-model.webp",
    }),

    // ───── Tier 2 ─────
    headhunter: Object.freeze({
        id: "headhunter",
        tier: 2,
        hp: 120,
        damage: 14,
        crit_damage: 22,
        crit_chance: 20,
        attack_count: 1,
        defend_count: 2,
        name: "Headhunter",
        race: "orc",
        icon_path: ICONS + "Headhunter-icon.webp",
        model_path: MODELS + "Headhunter-model.webp",
    }),

    rifleman: Object.freeze({
        id: "rifleman",
        tier: 2,
        hp: 125,
        damage: 15,
        crit_damage: 23,
        crit_chance: 20,
        attack_count: 1,
        defend_count: 2,
        name: "Rifleman",
        race: "human",
        icon_path: ICONS + "Rifleman-icon.webp",
        model_path: MODELS + "Rifleman-model.webp",
    }),

    huntress: Object.freeze({
        id: "huntress",
        tier: 2,
        hp: 115,
        damage: 13,
        crit_damage: 20,
        crit_chance: 22,
        attack_count: 1,
        defend_count: 2,
        name: "Huntress",
        race: "elf",
        icon_path: ICONS + "Huntress-icon.webp",
        model_path: MODELS + "Huntress-model.webp",
    }),

    cryptFiend: Object.freeze({
        id: "cryptFiend",
        tier: 2,
        hp: 130,
        damage: 16,
        crit_damage: 24,
        crit_chance: 20,
        attack_count: 1,
        defend_count: 2,
        name: "Crypt Fiend",
        race: "undead",
        icon_path: ICONS + "CryptFiend-icon.webp",
        model_path: MODELS + "CryptFiend-model.webp",
    }),

    // ───── Tier 3 ─────
    tauren: Object.freeze({
        id: "tauren",
        tier: 3,
        hp: 180,
        damage: 22,
        crit_damage: 33,
        crit_chance: 25,
        attack_count: 1, // медленный, но больно
        defend_count: 3,
        name: "Tauren",
        race: "orc",
        icon_path: ICONS + "Tauren-icon.webp",
        model_path: MODELS + "Tauren-model.webp",
    }),

    knight: Object.freeze({
        id: "knight",
        tier: 3,
        hp: 170,
        damage: 20,
        crit_damage: 30,
        crit_chance: 25,
        attack_count: 1,
        defend_count: 3,
        name: "Knight",
        race: "human",
        icon_path: ICONS + "Knight-icon.webp",
        model_path: MODELS + "Knight-model.webp",
    }),

    druidClaw: Object.freeze({
        id: "druidClaw",
        tier: 3,
        hp: 160,
        damage: 18,
        crit_damage: 28,
        crit_chance: 25,
        attack_count: 2, // два удара послабее
        defend_count: 2,
        name: "Druid of the Claw",
        race: "elf",
        icon_path: ICONS + "DruidOfTheClaw-icon.webp",
        model_path: MODELS + "DruidOfTheClaw-model.webp",
    }),

    abomination: Object.freeze({
        id: "abomination",
        tier: 3,
        hp: 175,
        damage: 21,
        crit_damage: 32,
        crit_chance: 25,
        attack_count: 2,
        defend_count: 2,
        name: "Abomination",
        race: "undead",
        icon_path: ICONS + "Abomination-icon.webp",
        model_path: MODELS + "Abomination-model.webp",
    }),
});

export const CREEPS_IDS = Object.freeze(Object.keys(CREEPS));
export const getCreep = (id) => CREEPS[id] || null;
