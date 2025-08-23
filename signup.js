export function mount(container, onComplete) {
    const signupContainer = document.createElement('div');
    signupContainer.classList.add('signup-container', 'flexcenter');

    const form = document.createElement('form');
    form.classList.add('signup-form');

    const title = document.createElement('h2');
    title.textContent = "Create Your Character";
    title.classList.add("center");
    form.appendChild(title);

    const createFieldContainer = document.createElement("div");
    createFieldContainer.classList.add("create-field-container");
    form.appendChild(createFieldContainer);

    const label = document.createElement("label");
    label.classList.add("character-name-label");
    label.setAttribute('for', 'character-name');
    label.textContent = "Enter your character's name:";
    createFieldContainer.appendChild(label);

    const input = document.createElement("input");
    input.id = "character-name";
    input.classList.add("input-text");
    input.type = "text";
    input.setAttribute('maxlength', 22)
    createFieldContainer.appendChild(input);

    const signupButton = document.createElement('button');
    signupButton.classList.add("darker", "disabled");
    signupButton.id = "signup-button";
    signupButton.setAttribute('disabled', 'true');
    signupButton.textContent = "Create Character";
    form.appendChild(signupButton);

    signupContainer.appendChild(form);
    container.appendChild(signupContainer);

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = input.value.trim();

        if (name == "") {
            input.classList.add("error-border");
            setTimeout(() => {
                input.classList.remove("error-border");
            }, 2000);
            return;
        }

        const playerProfile = {
            name: name,
            hero: "wisp",
            wins: 0,
            loses: 0
        }

        localStorage.setItem("playerProfile", JSON.stringify(playerProfile));

        if (typeof onComplete === "function") {
            onComplete(playerProfile)
        }

    });

    input.addEventListener('input', () => {
        if (input.value !== "") {
            signupButton.classList.remove('disabled');
            signupButton.removeAttribute('disabled');
        }
        else {
            signupButton.classList.add('disabled');
            signupButton.setAttribute('disabled', 'true');
        }
    });
}
