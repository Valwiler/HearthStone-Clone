var RoundData = null;
var relevantData = null;
let response = ["WAITING", "LAST_GAME_WON", "LAST_GAME_LOST", "INVALID_KEY"];

const state = () => {
    fetch("./ajax-state.php", { // Il faut créer cette page et son contrôleur appelle 
            method: "POST", // l’API (games/state)
            credentials: "include"
        })
        .then(response =>
            response.json())
        .then(data => {
            RoundData = data;
            setTimeout(state, 1000);
        })
}

let pageJeu = null;
let errors = null;
var RunningTimeOut = null;
const notif = new Map();
window.addEventListener("load", () => {
    clearTimeout()
    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
    pageJeu = new page();
    loading_sequence();
    RunningTimeOut = setTimeout(update_page, 50);

});

window.onbeforeunload = function() {
    clearTimeout(RunningTimeOut);

}

const loading_sequence = () => {

    if (response.includes(RoundData)) {
        errors = true;
        if (!notif.has(RoundData)) {
            switch (RoundData) {
                case "INVALID_KEY":
                    notif.set(RoundData, new Alert("Invalid key", "error"));
                    break;
                case "WAITING":
                    notif.set(RoundData, new Alert("Waiting for Opponent ...", "loading"));
                    break;
                default:
                    notif.set(RoundData, new Alert(RoundData, "notif"));
                    break;
            }
        } else {
            notif.forEach((values, keys) => {
                if (keys != RoundData || notif.get(keys).Alive === false) {
                    // notif.get(keys).delete_this();
                    notif.delete(keys)
                }
            })
        }
    } else {
        if (notif.size > 0) {
            notif.forEach((values, keys) => {
                notif.get(keys).delete_this();
            })
            notif.clear();

        }
        errors = false;
        relevantData = RoundData;
    }
}

const update_page = () => {

    loading_sequence();

    if (relevantData !== null) {
        pageJeu.update_page(relevantData);
    }
    //window.requestAnimationFrame(update_page);
    RunningTimeOut = setTimeout(update_page, 50);
}