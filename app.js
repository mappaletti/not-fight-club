export function mount(container) {
    const mainAppHtml = `<header class="underborder">
            <div class="header-left-side">Main</div>
            <div class="header-right-side">
                <nav>
                    <ul>
                        <li><a href="#" data-view="main"><img src="assets/icons/BTNHoldPosition.webp" alt="main"></a></li>
                        <li><a href="#" data-view="character"><img src="assets/icons/BTNSleep.webp" alt="character"></a></li>
                        <li><a href="#" data-view="settings"><img src="assets/icons/BTNHumanBuild.webp" alt="settings"></a></li>
                    </ul>
                </nav>
            </div>
        </header>

        <div class="content flexcenter">
            
        </div>`;

    container.innerHTML = mainAppHtml;
    const content = container.querySelector(".content");

    function renderView(view) {
        content.innerHTML = "";

        if (view === "main") {
            content.innerHTML = `<button id="fight-button">FIGHT!</button>`
            return;
        }

        if (view === "character") {
            import("./characterView.js").then(module => {
                module.render(content)
            });
            return;
        }

        if (view === 'settings') {
            content.innerHTML = `<h1>settings</h1>`
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