export function mount(container) {
    const mainAppHtml = `<header class="underborder">
                <div class="header-left-side">Main</div>
                <div class="header-right-side">
                    <nav>
                        <ul>
                            <li><a href="#" data-view="main"><img class="icon-hoverable icon-clickable"
                                        src="assets/icons/BTNHoldPosition.webp" alt="main"></a></li>
                            <li><a href="#" data-view="character"><img class="icon-hoverable icon-clickable"
                                        src="assets/icons/BTNSleep.webp" alt="character"></a></li>
                            <li><a href="#" data-view="settings"><img class="icon-hoverable icon-clickable"
                                        src="assets/icons/BTNHumanBuild.webp" alt="settings"></a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <div class="content flexcenter">
            </div>
`;

    container.innerHTML = mainAppHtml;
    const content = container.querySelector(".content");
    const title = container.querySelector(".header-left-side")

    function renderView(view) {
        content.innerHTML = "";

        if (view === "main") {
            content.innerHTML = `<button id="fight-button">FIGHT!</button>`;
            const fightButton = container.querySelector("#fight-button");
            fightButton.addEventListener("click", () => {
                import("./fight.js").then(module => {
                    module.render(content);
                })
            });
            title.innerHTML = "Main";
            return;
        }

        if (view === "character") {
            import("./characterView.js").then(module => {
                module.render(content)
            });
            title.innerHTML = "Character";
            return;
        }

        if (view === 'settings') {
            content.innerHTML = `<h1>settings</h1>`
            title.innerHTML = "Settings";
            return;
        }
    }

    container.addEventListener("click", (e) => {
        const a = e.target.closest('a[data-view]');
        if (!a) return;
        e.preventDefault();
        renderView(a.dataset.view);
    });

    renderView("character");
}