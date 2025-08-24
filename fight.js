import { CREEPS } from "./creeps.js";
import { getHero } from "./heroes.js";
import { getPlayerProfile } from "./profileRepository.js";

export function render(container) {
    const fightContainer = `<div class="fight-container">
                <!-- PLAYER -->
                <div class="info-container">
                    <div class="hero-icon-container">
                        <img id="player-hero-icon" src="" alt="wisp">
                        <div class="name-and-hpbar-container">
                            <b id="player-name" class="name">Player</b>
                            <div class="hero-hpbar">
                                <span id="player-hpbar-counter" class="hpbar-counter">100%</span>
                                <div class="hpbar-fill" id="player-hero-hpbar"></div>
                            </div>
                        </div>
                    </div>
                    <div class="fight-hero-model-container">
                        <img id="player-hero-model" src="" alt="wisp">
                    </div>
                    <div class="hero-name-container">
                        <p id="player-character-name" class="character-name neutral-style">Wisp</p>
                    </div>
                </div>

                <div class="battle-controls">
                    <p>Please pick 1 Attack zone and 2 Defence Zones</p>
                    <div class="zone-picker">
                        <div class="zones">
                            <p>Attack zones</p>
                            <div class="checkbox-checkbox-container">
                                <label class="checkbox-checkbox-label" for="attack-checkbox-head">Head</label>
                                <input id="attack-checkbox-head" class="checkbox-checkbox-input" type="checkbox">
                            </div>
                            <div class="checkbox-checkbox-container">
                                <label class="checkbox-checkbox-label" for="attack-checkbox-neck">Neck</label>
                                <input id="attack-checkbox-neck" class="checkbox-checkbox-input" type="checkbox">
                            </div>
                            <div class="checkbox-checkbox-container">
                                <label class="checkbox-checkbox-label" for="attack-checkbox-body">Body</label>
                                <input id="attack-checkbox-body" class="checkbox-checkbox-input" type="checkbox">
                            </div>
                            <div class="checkbox-checkbox-container">
                                <label class="checkbox-checkbox-label" for="attack-checkbox-belly">Belly</label>
                                <input id="attack-checkbox-belly" class="checkbox-checkbox-input" type="checkbox">
                            </div>
                            <div class="checkbox-checkbox-container">
                                <label class="checkbox-checkbox-label" for="attack-checkbox-legs">Legs</label>
                                <input id="attack-checkbox-legs" class="checkbox-checkbox-input" type="checkbox">
                            </div>
                        </div>
                        <div class="separator"></div>
                        <div class="zones def-zones">
                            <p>Defence zones</p>
                            <div class="checkbox-checkbox-container checkbox-def">
                                <label class="checkbox-checkbox-label" for="defend-checkbox-head">Head</label>
                                <input id="defend-checkbox-head" class="checkbox-checkbox-input" type="checkbox">
                            </div>
                            <div class="checkbox-checkbox-container checkbox-def">
                                <label class="checkbox-checkbox-label" for="defend-checkbox-neck">Neck</label>
                                <input id="defend-checkbox-neck" class="checkbox-checkbox-input" type="checkbox">
                            </div>
                            <div class="checkbox-checkbox-container checkbox-def">
                                <label class="checkbox-checkbox-label" for="defend-checkbox-body">Body</label>
                                <input id="defend-checkbox-body" class="checkbox-checkbox-input" type="checkbox">
                            </div>
                            <div class="checkbox-checkbox-container checkbox-def">
                                <label class="checkbox-checkbox-label" for="defend-checkbox-belly">Belly</label>
                                <input id="defend-checkbox-belly" class="checkbox-checkbox-input" type="checkbox">
                            </div>
                            <div class="checkbox-checkbox-container checkbox-def">
                                <label class="checkbox-checkbox-label" for="defend-checkbox-legs">Legs</label>
                                <input id="defend-checkbox-legs" class="checkbox-checkbox-input" type="checkbox">
                            </div>
                        </div>
                    </div>
                    <div class="button-attacak-container">
                        <button class="attack-button  disabled">Attack</button>
                    </div>
                    <div class="logs-container">

                    </div>
                </div>
                <!-- ENEMY -->
                <div class="info-container">
                    <div class="hero-icon-container enemy-hero-icon-container">
                        <img id="enemy-hero-icon" src="" alt="wisp">
                        <div class="name-and-hpbar-container enemy-name-and-hpbar-container">
                            <b id="enemy-name" class="name">Enemy</b>
                            <div class="hero-hpbar enemy-hero-hpbar">
                                <span id="enemy-hpbar-counter" class="hpbar-counter">100%</span>
                                <div class="hpbar-fill" id="enemy-hero-hpbar"></div>
                            </div>
                        </div>
                    </div>
                    <div class="fight-hero-model-container">
                        <img id="enemy-hero-model" src="" alt="wisp">
                    </div>
                    <div class="hero-name-container">
                        <p id="enemy-character-name" class="character-name neutral-style">Ghoul</p>
                    </div>
                </div>
            </div>`;
    container.innerHTML = fightContainer;

    const fightRoot = document.querySelector(".fight-container");
    const $ = (sel) => fightRoot.querySelector(sel);
    const $$ = (sel) => Array.from(fightRoot.querySelectorAll(sel));

    const DOM = {
        root: fightRoot,

        logs: $(".logs-container"),
        zonePicker: $(".zone-picker"),
        attackButton: $(".attack-button"),

        player: {
            icon: $("#player-hero-icon"),
            name: $("#player-name"),
            hpText: $("#player-hpbar-counter"),
            hpFill: $("#player-hero-hpbar"),
            model: $("#player-hero-model"),
            charName: $("#player-character-name"),
        },

        enemy: {
            icon: $("#enemy-hero-icon"),
            name: $("#enemy-name"),
            hpText: $("#enemy-hpbar-counter"),
            hpFill: $("#enemy-hero-hpbar"),
            model: $("#enemy-hero-model"),
            charName: $("#enemy-character-name"),
        },

        zones: {
            attack: {
                head: $("#attack-checkbox-head"),
                neck: $("#attack-checkbox-neck"),
                body: $("#attack-checkbox-body"),
                belly: $("#attack-checkbox-belly"),
                legs: $("#attack-checkbox-legs"),
                all: $$('input[id^="attack-checkbox-"]'),
            },
            defend: {
                head: $("#defend-checkbox-head"),
                neck: $("#defend-checkbox-neck"),
                body: $("#defend-checkbox-body"),
                belly: $("#defend-checkbox-belly"),
                legs: $("#defend-checkbox-legs"),
                all: $$('input[id^="defend-checkbox-"]'),
            },
        },
    };

    function matchmaking(enemies) {
        const race = getHero(getPlayerProfile("hero")).race;
        const wins = getPlayerProfile("wins");

        const enemiesListWithoutPlayerRace = Object.values(enemies).filter(c => c.race != race);
        const enemiesListWithoutHighTier = Object.values(enemiesListWithoutPlayerRace).filter(c => c.tier <= wins + 1);
        const enemy = enemiesListWithoutHighTier[Math.floor(Math.random() * enemiesListWithoutHighTier.length)];
        return enemy
    }

    function fight(enemy) {
        const playerOb = getPlayerProfile();
        const playerHeroOb = getHero(playerOb.hero);
        DOM.player.icon.src = playerHeroOb.icon_path;
        DOM.player.icon.alt = playerHeroOb.name;
        DOM.player.model.src = playerHeroOb.model_path;
        DOM.player.model.alt = playerHeroOb.name;

        DOM.player.charName.textContent = playerHeroOb.name;
        DOM.player.name.textContent = playerOb.name;
        const raceClass = {
            elf: "elf-style",
            orc: "orc-style",
            human: "human-style",
            undead: "undead-style",
        }[playerHeroOb.race] || "neutral-style";
        DOM.player.charName.classList.add(raceClass);
        DOM.player.name.classList.add(raceClass);

        DOM.enemy.icon.src = enemy.icon_path;
        DOM.enemy.icon.alt = enemy.name;
        DOM.enemy.model.src = enemy.model_path;
        DOM.enemy.charName.textContent = enemy.name;
        const enemyRaceClass = {
            elf: "elf-style",
            orc: "orc-style",
            human: "human-style",
            undead: "undead-style",
        }[enemy.race] || "neutral-style";
        DOM.enemy.charName.classList.add(enemyRaceClass);
        DOM.enemy.name.classList.add(enemyRaceClass);

        console.log(playerOb);
        console.log(enemy);
    }

    function saveBattle{ }



    fight(matchmaking(CREEPS))


}