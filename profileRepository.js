export function savePlayerProfile(update) {
    // достаём текущий профиль из localStorage или создаём пустой
    const stored = localStorage.getItem("playerProfile");
    const currentProfile = stored ? JSON.parse(stored) : {};

    // если передан целиком объект профиля
    if (update && update.name && update.hero && update.wins !== undefined && update.loses !== undefined) {
        localStorage.setItem("playerProfile", JSON.stringify(update));
        return;
    }

    // если переданы только отдельные поля
    const newProfile = { ...currentProfile, ...update };

    localStorage.setItem("playerProfile", JSON.stringify(newProfile));
}

export function getPlayerProfile(key) {
    const stored = localStorage.getItem("playerProfile");
    if (!stored) return null;

    const profile = JSON.parse(stored);

    if (!key) {
        // ничего не указано → возвращаем весь объект
        return profile;
    }

    // если параметр есть → вернём его, если нет → undefined
    return profile[key];
}
