import { getHero, HEROES } from "./heroes.js";
import { getPlayerProfile, savePlayerProfile } from "./profileRepository.js";

export function render(container) {
    const playerCharacterContainer =
        `<aside class="selection-menu-container hidden">
                    <a class="selection-unit" href="#"><img src="assets/heroes/hero-icons/ArchMage-icon.webp"
                            alt="Arch Mage"></a><a class="selection-unit" href="#"><img
                            src="assets/icons/AcceptButtonIcon.webp" alt="Arch Mage"></a>
                </aside>
        <div class="player-character-container">
                    <div class="player-character-top">
                        <div class="player-character-top-left">
                            <img class="playerHeroIcon icon-hoverable icon-clickable"
                                src="assets/heroes/hero-icons/Wisp-icon.webp" alt="Choose Your Hero">
                        </div>
                        <div class="player-character-top-right">
                            <b><span class="playerName">Name</span></b>
                            <div class="score"><span class="success">WINS: <span class="wins-counter">0</span></span> |
                                <span class="failure">LOSES: <span class="loses-counter">0</span></span> <br> TOTAL:
                                <span class="total-counter">0</span>
                            </div>
                        </div>
                    </div>
                    <div class="player-character-bottom">
                        <div class="player-character-bottom-left">
                            <div class="hero-model-container"><img class="hero-model"
                                    src="assets/heroes/hero-models/Wisp-model.webp" alt="Choose Your Hero"></div>
                        </div>
                        <div class="player-character-bottom-right">
                            <div>
                                <p class="character-name neutral-style">Choose Your Hero</p>
                            </div>
                            <div class="character-description-container">
                                <p class="character-description">Click on the icon to choose your character.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    container.innerHTML = playerCharacterContainer;

    const playerNameEl = container.querySelector(".playerName");

    const playerWinsCounterEl = container.querySelector(".wins-counter");
    const playerLosesCounterEl = container.querySelector(".loses-counter");
    const playerTotalCounterEl = container.querySelector(".total-counter");

    const playerHeroIconEl = container.querySelector(".playerHeroIcon");
    const playerHeroModelEl = container.querySelector(".hero-model");
    const playerHeroNameEl = container.querySelector(".character-name");
    const playerHeroDescriptionEl = container.querySelector(".character-description");

    const selectionMenuEl = container.querySelector(".selection-menu-container");

    let areSelectionMenuBuilded = false;

    const BASE = 'assets/heroes/';
    const ICONS = BASE + 'hero-icons/';
    const MODELS = BASE + 'hero-models/';




    // INIT
    // profile and states
    const playerProfle = getPlayerProfile();
    console.log(playerProfle);
    let currentHeroId = playerProfle.hero;
    let previewHeroId = currentHeroId;



    function applyProfileToView() {
        playerNameEl.textContent = playerProfle.name;

        playerWinsCounterEl.textContent = playerProfle.wins;
        playerLosesCounterEl.textContent = playerProfle.loses;
        playerTotalCounterEl.textContent = playerProfle.loses + playerProfle.wins;
        applyHeroToView(currentHeroId);
    }

    function applyHeroToView(heroId) {
        const h = getHero(heroId);
        if (!h) return;
        playerHeroIconEl.src = h.icon_path; playerHeroIconEl.alt = h.name;
        playerHeroModelEl.src = h.model_path; playerHeroModelEl.alt = h.name;
        playerHeroNameEl.textContent = h.name;
        playerHeroNameEl.classList.remove("elf-style", "orc-style", "human-style", "undead-style", "neutral-style")
        playerHeroNameEl.classList.add({
            elf: "elf-style",
            orc: "orc-style",
            human: "human-style",
            undead: "undead-style"
        }[h.race] || 'neutral-style');
        playerHeroDescriptionEl.textContent = h.description;
    }

    applyProfileToView();

    playerHeroIconEl.addEventListener("click", (e) => { // ловит нажатие на иконку героя и открывает менюху для выбора авы
        e.preventDefault();
        if (selectionMenuEl.classList.contains('hidden')) {
            if (!areSelectionMenuBuilded) {
                selectionMenuEl.innerHTML = '';
                buildSelectionMenu(HEROES, selectionMenuEl);
            }
            selectionMenuEl.classList.remove("hidden")
            return;
        }
        selectionMenuEl.classList.add("hidden")
    })

    selectionMenuEl.addEventListener('mouseover', (e) => { // когда наводимся иконку героя он рендерится в превьюшку
        const a = e.target.closest("a.selection-unit[data-heroid]");
        if (!a) return;
        if (selectionMenuEl.querySelector(".selected")) return;
        const heroId = a.dataset.heroid;
        previewHeroId = heroId;
        applyHeroToView(previewHeroId);
    })

    selectionMenuEl.addEventListener('mouseleave', () => { // когда мышь покидает меюн выбора то герой возвращается который был до
        previewHeroId = currentHeroId;
        applyHeroToView(previewHeroId);
    })

    selectionMenuEl.addEventListener('click', (e) => { // выбор героя + селект ему дается
        const a = e.target.closest("a.selection-unit[data-heroid]");
        if (!a) return;
        e.preventDefault();
        selectionMenuEl.querySelectorAll(".selection-unit img.selected").forEach(img => img.classList.remove("selected"))
        const img = a.querySelector("img");
        if (img) img.classList.add("selected");
        previewHeroId = a.dataset.heroid;
        applyHeroToView(previewHeroId);
        console.log(previewHeroId + ' selected');
    })

    selectionMenuEl.addEventListener('click', (e) => { // логика кнопки подтвердить
        const a = e.target.closest("a.confirm");
        if (!a) return;
        e.preventDefault();
        selectionMenuEl.querySelectorAll(".selection-unit img.selected").forEach(img => img.classList.remove("selected"))
        currentHeroId = previewHeroId;
        savePlayerProfile({ "hero": currentHeroId })
        selectionMenuEl.classList.add("hidden")
        // + добавить хуйню чтоб цвет ника менялся соотвественно расе
    })


    function buildSelectionMenu(heroes, container) {
        const heroesWithoutWisp = Object.fromEntries(
            Object.entries(heroes).filter(([key]) => key !== "wisp")
        );
        const sortedByRace = Object.values(heroesWithoutWisp).sort((a, b) => a.race.localeCompare(b.race));
        sortedByRace.forEach(e => {

            const a = document.createElement('a');
            a.classList.add('selection-unit');
            a.href = "#";
            a.dataset.heroid = e.id;

            const img = document.createElement('img');
            img.classList.add("icon-hoverable", "icon-clickable")
            img.src = e.icon_path;
            img.alt = e.name;

            a.appendChild(img);
            container.appendChild(a);
        });

        const a = document.createElement('a')
        a.classList.add('confirm');
        a.href = '#';

        const img = document.createElement('img');
        img.id = "confirm"
        img.classList.add("icon-hoverable", "icon-clickable")
        img.src = "assets/icons/AcceptButtonIcon.webp"
        img.alt = 'confirm';

        a.appendChild(img);
        container.appendChild(a);
    }
}