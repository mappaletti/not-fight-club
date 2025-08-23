import { getHero } from "./heroes.js";

export function render(container) {
    const playerCharacterContainer =
        `<div class="player-character-container">
            <div class="player-character-top">
                <div class="player-character-top-left">
                    <img class="playerHeroIcon" src="assets/heroes/hero-icons/Wisp-icon.webp" alt="Choose Your Hero">
                </div>
                <div class="player-character-top-right">
                    <b><span class="playerName">Big Dick</span></b>
                    <div class="score"><span class="success">WINS: <span class="wins-counter">0</span></span> | <span class="failure">LOSES: <span class="loses-counter">0</span></span> <br> TOTAL: <span class="total-counter">0</span></div>
                </div>
            </div>
            <div class="player-character-bottom">
                <div class="player-character-bottom-left">
                    <div class="hero-model-container"><img class="hero-model" src="assets/heroes/hero-models/Wisp-model.webp" alt="Choose Your Hero"></div>
                </div>
                <div class="player-character-bottom-right">
                    <div>
                        <p class="character-name neutral-style">Choose Your Hero</p>
                    </div>
                    <div class="character-description-container">
                        <p class="character-description">Click on icon or model to choose your character.</p>
                    </div>
                </div>
            </div>
        </div>`;

    container.innerHTML = playerCharacterContainer;

    const playerHeroIconEl = container.querySelector(".playerHeroIcon");
    const playerNameEl = container.querySelector(".playerName");

    const playerWinsCounterEl = container.querySelector(".wins-counter");
    const playerLosesCounterEl = container.querySelector(".loses-counter");
    const playerTotalCounterEl = container.querySelector(".total-counter");

    const playerHeroModelEl = container.querySelector(".hero-model");
    const playerHeroNameEl = container.querySelector(".character-name");
    const playerHeroDescriptionEl = container.querySelector(".character-description");

    // INIT
    const playerProfleJSON = localStorage.getItem("playerProfile");
    const playerProfle = JSON.parse(playerProfleJSON);
    console.log(playerProfle);

    playerNameEl.textContent = playerProfle.name;

    playerWinsCounterEl.textContent = playerProfle.wins;
    playerLosesCounterEl.textContent = playerProfle.loses;
    playerTotalCounterEl.textContent = playerProfle.loses + playerProfle.wins;



    const hero = getHero(playerProfle.hero)

    playerHeroIconEl.src = hero.icon_path; playerHeroIconEl.alt = hero.name;
    playerHeroModelEl.src = hero.model_path; playerHeroModelEl.alt = hero.name;
    playerHeroNameEl.textContent = hero.name;
    let raceClass = {
        elf: "elf-style",
        orc: "orc-style",
        human: "human-style",
        undead: "undead-style"
    }[hero.race] || "neutral-style";
    playerHeroNameEl.classList.add(raceClass);
    playerHeroDescriptionEl.textContent = hero.description;



}