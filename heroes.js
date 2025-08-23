const BASE = 'assets/heroes/';
const ICONS = BASE + 'hero-icons/';
const MODELS = BASE + 'hero-models/';

export const HEROES = Object.freeze({
    demonHunter: Object.freeze({
        id: "demonHunter",
        name: "Demon Hunter",
        description: `Elusive melee hero who wields twin warblades and channels demonic power.`,
        icon_path: ICONS + `DemonHunter-icon.webp`,
        model_path: MODELS + `DemonHunter-model.webp`,
        race: "elf",
    }),

    archmage: Object.freeze({
        id: "archmage",
        name: "Archmage",
        description: `Master of arcane arts who controls elements and supports armies with powerful auras.`,
        icon_path: ICONS + `Archmage-icon.webp`,
        model_path: MODELS + `Archmage-model.webp`,
        race: "human",
    }),

    bladeMaster: Object.freeze({
        id: "bladeMaster",
        name: "Blademaster",
        description: `Swift orc duelist who relies on critical strikes, mirror images, and stealth.`,
        icon_path: ICONS + `Blademaster-icon.webp`,
        model_path: MODELS + `Blademaster-model.webp`,
        race: "orc",
    }),

    bloodmage: Object.freeze({
        id: "bloodmage",
        name: "Blood Mage",
        description: `Praxis of blood and flame; drains mana, banishes foes, and rains down fire.`,
        icon_path: ICONS + `Bloodmage-icon.webp`,
        model_path: MODELS + `Bloodmage-model.webp`,
        race: "human",
    }),

    farSeer: Object.freeze({
        id: "farSeer",
        name: "Far Seer",
        description: `Prophetic orc shaman who commands wolves and lightning from afar.`,
        icon_path: ICONS + `Farseer-icon.webp`,
        model_path: MODELS + `Farseer-model.webp`,
        race: "orc",
    }),

    leshrack: Object.freeze({
        id: "leshrack",
        name: "Leshrack",
        description: `Tormented soul that unleashes relentless pulses of magical energy.`,
        icon_path: ICONS + `Leshrack-icon.webp`,
        model_path: MODELS + `Leshrack-model.webp`,
        race: "elf",
    }),

    mirana: Object.freeze({
        id: "mirana",
        name: "Mirana",
        description: `Moon-blessed huntress famed for precise sacred arrows and lunar magic.`,
        icon_path: ICONS + `Mirana-icon.webp`,
        model_path: MODELS + `Mirana-model.webp`,
        race: "elf",
    }),

    mountainKing: Object.freeze({
        id: "mountainKing",
        name: "Mountain King",
        description: `Stalwart dwarven champion who stuns foes and cleaves through lines.`,
        icon_path: ICONS + `MountainKing-icon.webp`,
        model_path: MODELS + `MountainKing-model.webp`,
        race: "human",
    }),

    paladin: Object.freeze({
        id: "paladin",
        name: "Paladin",
        description: `Holy warrior who heals allies, shields them with divine light, and smites undead.`,
        icon_path: ICONS + `Paladin-icon.webp`,
        model_path: MODELS + `Paladin-model.webp`,
        race: "human",
    }),

    shadowHunter: Object.freeze({
        id: "shadowHunter",
        name: "Shadow Hunter",
        description: `Tribal witch doctor who hexes enemies and mends allies with voodoo.`,
        icon_path: ICONS + `ShadowHunter-icon.webp`,
        model_path: MODELS + `ShadowHunter-model.webp`,
        race: "orc",
    }),

    tauren: Object.freeze({
        id: "tauren",
        name: "Tauren Chieftain",
        description: `Massive war leader who commands the battlefield with shockwaves and war songs.`,
        icon_path: ICONS + `Tauren-icon.webp`,
        model_path: MODELS + `Tauren-model.webp`,
        race: "orc",
    }),

    warden: Object.freeze({
        id: "warden",
        name: "Warden",
        description: `Silent night-elf assassin who hunts targets with shadows and spectral blades.`,
        icon_path: ICONS + `Warden-icon.webp`,
        model_path: MODELS + `Warden-model.webp`,
        race: "elf",
    }),

    wisp: Object.freeze({
        id: "wisp",
        name: "Choose Your Hero",
        description: `Click on the icon to choose your character.`,
        icon_path: ICONS + `Wisp-icon.webp`,
        model_path: MODELS + `Wisp-model.webp`,
        race: "aaa",
    }),
});


export const HERO_IDS = Object.freeze(Object.keys(HEROES));
export const getHero = (id) => HEROES[id] || null;
