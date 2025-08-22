const appRoot = document.getElementById("app")
const playerProfile = localStorage.getItem("playerProfile");

if (playerProfile === null) {
    import("./signup.js").then(module => {
        console.log('signup.js module has been imported');
        module.mount(appRoot, (profile) => {
            localStorage.setItem("playerProfile", JSON.stringify(profile));
            appRoot.innerHTML = "";
            import("./app.js").then(app => {
                console.log("app.js module has been imported");
                app.mount(appRoot);
            })
        })
    })
} else {
    import("./app.js").then(app => {
        console.log("app.js module has been imported");
        app.mount(appRoot);
    })
}