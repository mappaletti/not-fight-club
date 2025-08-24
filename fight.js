import { CREEPS } from "./creeps.js";
import { getHero } from "./heroes.js";
import { getPlayerProfile, savePlayerProfile } from "./profileRepository.js";
import { playerStats } from "./playerStats.js";

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
                    <p class="helptext">Please pick 1 Attack zone and 2 Defence Zones</p>
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

    const ZONES = ["head", "neck", "body", "belly", "legs"]
    const DOM = {
        root: fightRoot,

        logs: $(".logs-container"),
        zonePicker: $(".zone-picker"),
        attackButton: $(".attack-button"),
        helptext: $(".helptext"),

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

    function setupAttackButtonValidation(DOM) {
        const helptext = DOM.helptext;
        const btn = DOM.attackButton;
        const attackInputs = DOM.zones.attack.all;
        const defendInputs = DOM.zones.defend.all;

        function isValid() {
            const a = attackInputs.filter(i => i.checked).length;
            const d = defendInputs.filter(i => i.checked).length;
            return a === 1 && d === 2;
        }

        function updateButton() {
            if (isValid()) {
                btn.classList.remove('disabled');
                btn.removeAttribute('disabled');
                btn.classList.add('attack-button-active')
                helptext.innerHTML = '<br>';
            } else {
                btn.classList.add('disabled');
                btn.classList.remove('attack-button-active')
                btn.setAttribute('disabled', 'true');
                helptext.textContent = 'Pick 1 attack and 2 defence zones';
            }
        }

        [...attackInputs, ...defendInputs].forEach(i => i.addEventListener('change', updateButton));

        btn.addEventListener('click', (e) => {
            if (!isValid()) {
                e.preventDefault();
                e.stopPropagation();
            }
        });

        updateButton();
    }



    function matchmaking(enemies) {

        const saved = loadBattle()
        if (saved) {
            console.log(saved);
            return saved;
        }
        const playerOb = getPlayerProfile();
        const playerHeroOb = getHero(playerOb.hero);

        const race = getHero(getPlayerProfile("hero")).race;
        const wins = getPlayerProfile("wins");

        const enemiesPool = Object.values(enemies).filter(c => c.race != race).filter(c => c.tier <= wins + 1)
        const enemyHero = enemiesPool[Math.floor(Math.random() * enemiesPool.length)];

        const battleInfo = {
            round: 0,
            playerHp: playerStats.hp,
            enemyHp: enemyHero.hp,
            status: "active",
            log: []
        }

        const state = {
            playerOb,
            playerHeroOb,
            playerStats,
            enemyHero,
            battleInfo
        }

        saveBattle(playerHeroOb, playerStats, enemyHero, battleInfo);

        return state
    }

    function fight(enemy, playerHero, playerStats, battleInfo) {
        const playerOb = getPlayerProfile();
        const playerHeroOb = playerHero;
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
        DOM.player.charName.classList.remove("elf-style", "orc-style", "human-style", "undead-style", "neutral-style")
        DOM.player.charName.classList.add(raceClass);
        DOM.player.name.classList.remove("elf-style", "orc-style", "human-style", "undead-style", "neutral-style")
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
        DOM.enemy.charName.classList.remove("elf-style", "orc-style", "human-style", "undead-style", "neutral-style")
        DOM.enemy.charName.classList.add(enemyRaceClass);
        DOM.enemy.name.classList.remove("elf-style", "orc-style", "human-style", "undead-style", "neutral-style")
        DOM.enemy.name.classList.add(enemyRaceClass);

        setHp(DOM.player.hpText, DOM.player.hpFill, battleInfo.playerHp, playerStats.hp);
        setHp(DOM.enemy.hpText, DOM.enemy.hpFill, battleInfo.enemyHp, enemy.hp);

        battleInfo.log.forEach(l => {
            DOM.logs.innerHTML = l + DOM.logs.innerHTML;
        });
    }

    function saveBattle(playerHero, playerStats, enemyHero, battleInfo) {
        const prev = JSON.parse(localStorage.getItem("activeBattle")) || {};

        const state = {
            playerHero: playerHero ?? prev.playerHero,
            playerStats: playerStats ?? prev.playerStats,
            enemyHero: enemyHero ?? prev.enemyHero,
            battleInfo: {
                ...prev.battleInfo,
                ...battleInfo,
                log: battleInfo && "log" in battleInfo
                    ? battleInfo.log
                    : prev.battleInfo?.log
            }
        };

        localStorage.setItem("activeBattle", JSON.stringify(state));
    }

    function addBattleLog(logLine) {
        const data = JSON.parse(localStorage.getItem("activeBattle"));
        if (!data) return;

        data.battleInfo.log.unshift(logLine);
        console.log("addlog");
        localStorage.setItem("activeBattle", JSON.stringify(data));
    }

    function loadBattle() {
        const state = localStorage.getItem("activeBattle");
        return state ? JSON.parse(state) : null
    }

    function clearBattle() {
        localStorage.removeItem("activeBattle")
    }

    const battle = matchmaking(CREEPS);
    fight(battle.enemyHero, battle.playerHeroOb, battle.playerStats, battle.battleInfo);
    setupAttackButtonValidation(DOM);
    setupAttackHandler(DOM, battle);


    function setupAttackHandler(DOM, state) {
        DOM.attackButton.addEventListener('click', (e) => {
            if (DOM.attackButton.hasAttribute('disabled')) return;
            if (state.battleInfo.status !== "active") return;

            startRound(DOM, state);
        })
    }

    function startRound(DOM, state) {
        console.log('round started');
        let overed = false;

        const playerHero = state.playerHero;
        const playerStats = state.playerStats;
        const enemyHero = state.enemyHero;
        const battleInfo = state.battleInfo;

        const playerSelectedAttackZones = DOM.zones.attack.all.filter(i => i.checked).map(i => i.id.replace("attack-checkbox-", ""))
        const playerSelectedDefendZones = DOM.zones.defend.all.filter(i => i.checked).map(i => i.id.replace("defend-checkbox-", ""))

        const enemySelectedAttackZones = getRandomZones(ZONES, enemyHero.attack_count);
        const enemySelectedDefendZones = getRandomZones(ZONES, enemyHero.defend_count);

        battleInfo.enemyHp = toAttack(playerHero, playerStats, playerSelectedAttackZones, enemyHero, enemyHero, enemySelectedDefendZones, battleInfo.enemyHp, DOM.enemy.hpText, DOM.enemy.hpFill, state.battleInfo);
        battleInfo.playerHp = toAttack(enemyHero, enemyHero, enemySelectedAttackZones, playerHero, playerStats, playerSelectedDefendZones, battleInfo.playerHp, DOM.player.hpText, DOM.player.hpFill, state.battleInfo);

        if (!overed) {
            saveBattle(playerHero, playerStats, enemyHero, {
                enemyHp: battleInfo.enemyHp,
                playerHp: battleInfo.playerHp,
                round: battleInfo.round,
                status: battleInfo.status
            })
        }

        //    вспомогательные функции для боя
        function getRandomZones(zones, count) {
            const zonesCopy = [...zones]
            const result = [];

            for (let i = 0; i < count && zonesCopy.length > 0; i++) {
                const randIndex = Math.floor(Math.random() * zonesCopy.length)
                result.push(zonesCopy.splice(randIndex, 1)[0])
            }
            return result;
        }

        function getRandomPercent() {
            return +(Math.random() * 100).toFixed(2);
        }

        function toAttack(offensiveOb, offensiveStatsOb, attackZones, defensiveOb, defensiveStatsOb, defendZones, defensiveHp, defensiveHpText, defensiveHpFill, battleState) {
            let resultDefensiveHp = defensiveHp;
            attackZones.forEach(attackZone => {
                const isLucky = getRandomPercent() <= offensiveStatsOb.crit_chance ? true : false;
                const logOb = {
                    status: null,
                    offensiveOb: offensiveOb,
                    defensiveOb: defensiveOb,
                    damage: null,
                    zone: attackZone,
                }


                if (defendZones.includes(attackZone)) {
                    if (!isLucky) {
                        logOb.status = "block";
                        Log(logOb, battleState);
                        return;
                    }
                    logOb.status = "blockAndCrit"; logOb.damage = offensiveStatsOb.crit_damage;
                    resultDefensiveHp -= offensiveStatsOb.crit_damage;
                    if (resultDefensiveHp <= 0) over(offensiveOb);
                    setHp(defensiveHpText, defensiveHpFill, resultDefensiveHp, defensiveStatsOb.hp)
                    Log(logOb, battleState);
                    return;
                }
                if (!isLucky) {
                    logOb.status = "hit"; logOb.damage = offensiveStatsOb.damage;
                    resultDefensiveHp -= offensiveStatsOb.damage;
                    if (resultDefensiveHp <= 0) over(offensiveOb);
                    setHp(defensiveHpText, defensiveHpFill, resultDefensiveHp, defensiveStatsOb.hp)
                    Log(logOb, battleState);
                    return;
                }
                logOb.status = "crit"; logOb.damage = offensiveStatsOb.crit_damage;
                resultDefensiveHp -= offensiveStatsOb.crit_damage;
                if (resultDefensiveHp <= 0) over(offensiveOb);
                setHp(defensiveHpText, defensiveHpFill, resultDefensiveHp, defensiveStatsOb.hp)
                Log(logOb, battleState);
                return;
            });
            return resultDefensiveHp;
        }

        function over(won) {
            overed = true;
            DOM.root.innerHTML = ``;
            const playerHeroId = loadBattle().playerHero.id;
            console.log(loadBattle().playerHero.id);
            console.log(won.id);
            if (won.id == playerHeroId) {
                DOM.root.innerHTML = `won`
                savePlayerProfile({ wins: getPlayerProfile("wins") + 1 })
            }
            else {
                DOM.root.innerHTML = `los`
                savePlayerProfile({ loses: getPlayerProfile("loses") + 1 })
            }
            clearBattle();
        }

        function Log(logOb, battleState) {
            const box = DOM.logs;
            const atBottom = box.scrollTop + box.clientHeight >= box.scrollHeight - 4;

            const raceClass = (race) => ({
                elf: 'elf-style',
                orc: 'orc-style',
                human: 'human-style',
                undead: 'undead-style',
            }[race] || 'neutral-style');

            const cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

            const offName = `<span class="${raceClass(logOb.offensiveOb.race)}">${logOb.offensiveOb.name}</span>`;
            const defName = `<span class="${raceClass(logOb.defensiveOb.race)}">${logOb.defensiveOb.name}</span>`;
            const zone = `<span class="marked">${cap(logOb.zone)}</span>`;
            const dmgMark = (n, isCrit = false) => `<span class="marked${isCrit ? ' crit' : ''}">${isCrit ? 'crit' : ''} ${n} damage</span>`;

            let line = '';

            switch (logOb.status) {
                case 'block':
                    line = `&gt;&gt;&gt; ${offName} attacked ${defName} to ${zone} but ${defName} was able to <span class="marked">protect</span>.`;
                    break;

                case 'hit':
                    line = `&gt;&gt;&gt; ${offName} attacked ${defName} to ${zone} and deal ${dmgMark(logOb.damage)}.`;
                    break;

                case 'crit':
                    line = `&gt;&gt;&gt; ${offName} attacked ${defName} to ${zone} and ${dmgMark(logOb.damage, true)}.`;
                    break;

                case 'blockAndCrit':
                    line = `&gt;&gt;&gt; ${offName} attacked ${defName} to ${zone} and ${defName} tries to block but ${offName} was very lucky and ${dmgMark(logOb.damage, true)}.`;
                    break;

                default:
                    line = `&gt;&gt;&gt; ${offName} acted on ${defName} to ${zone}.`;
            }

            addBattleLog(`<p>${line}</p>`);
            const p = document.createElement('p');
            p.innerHTML = line;
            box.appendChild(p);

            if (atBottom) box.scrollTop = box.scrollHeight;
        }
    }
    function setHp(hpText, hpFill, hp, hpMax) {
        hpText.textContent = `${hp} / ${hpMax}`;
        hpFill.style.width = `${toPercent(hp, hpMax)}%`;
    }

    function toPercent(value, max) {
        if (max === 0) return 0;
        return Math.round((value / max) * 100);
    }
}