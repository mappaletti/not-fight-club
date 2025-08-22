export function mount(container) {
    const mainAppHtml = `<header class="underborder">
            <div class="header-left-side">Main</div>
            <div class="header-right-side">
                <nav>
                    <ul>
                        <li><a href="#"><img src="assets/icons/BTNHoldPosition.webp" alt="main"></a></li>
                        <li><a href="#"><img src="assets/icons/BTNSleep.webp" alt="character"></a></li>
                        <li><a href="#"><img src="assets/icons/BTNHumanBuild.webp" alt="settings"></a></li>
                    </ul>
                </nav>
            </div>
        </header>

        <div class="content flexcenter">
            <button id="fight-button">FIGHT!</button>
        </div>`;

    container.innerHTML = mainAppHtml;
}