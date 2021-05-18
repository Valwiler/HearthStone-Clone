//Structure : - Oppenent side (occupe )
var images = new Map();
var inGameMessage = new Map([
    ["INVALID_ACTION", "Action invalide"],
    ["WRONG_TURN", "Ce n'est pas votre tour"],
    ["ACTION_IS_NOT_AN_OBJECT", "Mauvaise structure de données"],
    ["NOT_ENOUGH_ENERGY", "La carte coûte trop cher à jouer"],
    ["BOARD_IS_FULL ", "Pas assez de place pour la carte"],
    ["CARD_NOT_IN_HAND", "La carte n’est pas dans votre main"],
    ["CARD_IS_SLEEPING", "Carte ne peut être jouée ce tour-ci"],
    ["MUST_ATTACK_TAUNT_FIRST", "Une carte taunt empêche ce coup"],
    ["OPPONENT_CARD_NOT_FOUND", "La carte attaquée n’est pas présente sur le jeu"],
    ["OPPONENT_CARD_HAS_STEALTH", "La carte ne peut être attaquée directement tant qu’elle possède « stealth »"],
    ["CARD_NOT_FOUND", "La carte cherchée (uid) n’est pas présente"],
    ["ERROR_PROCESSING_ACTION", "Erreur interne, ne devrait pas se produire"],
    ["INTERNAL_ACTION_ERROR", "Autre erreur interne, ne devrait pas se produire"],
    ["HERO_POWER_ALREADY_USED", "Pouvoir déjà utilisé pour ce tour"],
    ["GAME_NOT_FOUND", "Partie Absente ou terminée"],
]);
class page {

    constructor() {
        images = new ImageLoader().imageList;
        this.create_common_element();
        this.PlayerSide = new side("Player");
        this.Player = null;
        this.OpponentSide = new side("Opponent");
        this.Opponent = null;
        document.body.append(this.PlayerSide.node);
        document.body.append(this.OpponentSide.node);
    }
    create_common_element() {

        //Add show chat Option to Menu
        this.Menu_button = document.createElement("button");
        this.Menu_button.addEventListener("click", function() {
            this.navbar = document.getElementById("navbar");
            if (this.navbar.style.display === "none" || this.navbar.style.display === "") {
                this.navbar.style.display = "block";
            } else {
                this.navbar.style.display = "none";
            }
        });
        this.Menu_button.style.position = "absolute";
        this.Menu_button.style.top = "50%";
        this.Menu_button.style.right = "0";
        this.Menu_button.style.zIndex = 5;
        this.Menu_button.innerHTML = "Menu";

        this.Cancel_button = document.createElement("button");
        this.Cancel_button.addEventListener("click", this._clickHandler = () =>
            this.reset_Turn_variable(), false);

        this.Cancel_button.style.position = "absolute";
        this.Cancel_button.style.top = "55%";
        this.Cancel_button.style.right = "0";
        this.Cancel_button.style.zIndex = 5;
        this.Cancel_button.innerHTML = "Cancel";

        this.TurnTracker = document.createElement("div");
        this.TurnTracker.className = "loading-div";
        this.TurnTracker.style.position = "absolute";
        this.TurnTracker.style.top = "45%";
        this.TurnTracker.style.right = "5px";
        this.TurnTracker.style.zIndex = 5;
        this.TurnTracker.style.width = "3em"
        this.TurnTracker.style.height = "0.5em";
        this.TurnText = document.createElement("div");
        this.TurnText.className = "text-node";
        this.TurnText.style.fontSize = "10px";

        this.Chrono = document.createElement("div");
        this.Chrono.className = "loading-icon";
        this.Chrono.style.position = "absolute";
        this.Chrono.style.top = "60%";
        this.Chrono.style.right = "5px";
        this.Chrono.style.animation = "none";
        this.Chrono.style.zIndex = 5;
        this.ChronoText = document.createElement("div");
        this.ChronoText.className = "text-node";

        this.TurnTracker.append(this.TurnText);
        this.Chrono.appendChild(this.ChronoText);

        document.body.append(this.Cancel_button);
        document.body.append(this.Menu_button);
        document.body.append(this.TurnTracker);
        document.body.append(this.Chrono);

    }

    update_common_element() {
        this.TurnText.innerHTML = this.Player.isTurn ? "Player" : "Opponent";
        this.ChronoText.innerHTML = this.Player.RemainingTime;
    }

    update_page(data) {
        if (this.Player === null) {
            this.Player = new Player("Player", data);
            this.PlayerSide.Player = this.Player;
        }
        if (this.Opponent === null) {
            this.Opponent = new Player("Opponent", data["opponent"]);
            this.OpponentSide.Player = this.Opponent;
        }
        this.Player.update_info(data);
        this.Opponent.update_info(data["opponent"]);
        this.PlayerSide.update_side(this.Player);
        this.OpponentSide.update_side(this.Opponent);
        this.update_common_element();
        this.verify_action_condition();
    }

    verify_action_condition() {
        let answer = [];
        let Pcard = this.Player.cardSelected;
        let Ocard = this.Opponent.cardSelected;
        let Pboard = this.Player.boardSelected;
        let Oboard = this.Opponent.boardSelected;
        let data = [];
        if (this.Player.isTurn === true) {
            if (Pcard != null && Ocard != null) {
                console.log("P1 attacks");
                answer = sendAjaxRequest("Attack", Pcard, Ocard).then((e) => {
                    console.log(e);
                    if (inGameMessage.has(e)) {
                        this.notif = new Alert(inGameMessage.get(e), "notif");
                    }
                });
                this.reset_Turn_variable();
            } else if (Pcard != null && Pboard == true) {
                console.log("P1 plays card")
                answer = sendAjaxRequest("Play", Pcard, null).then((e) => {
                    console.log(e);
                    if (inGameMessage.has(e)) {
                        this.notif = new Alert(inGameMessage.get(e), "notif");
                    }
                });
                this.reset_Turn_variable();
            } else if (Pcard != null && Oboard == true) {
                if (this.OpponentSide.BoardCards.length === 0) {
                    console.log("P1 attacks player")
                    answer = sendAjaxRequest("Attack", Pcard, 0).then((e) => {
                        console.log(e);
                        if (inGameMessage.has(e)) {
                            this.notif = new Alert(inGameMessage.get(e), "notif");
                        }
                    });
                    this.reset_Turn_variable();
                }
            }
        }
        //if (inGameMessage.has(answer)) {
        //    this.notif = new Alert(inGameMessage.get(answer), "notif")
        //}
    }

    reset_Turn_variable() {
        this.Player.cardSelected = null;
        this.Opponent.cardSelected = null;
        this.Player.boardSelected = false;
        this.Opponent.boardSelected = false;
    }

}



class Player {

    constructor(Owner, data) {
        this.Owner = Owner;
        this.cardSelected = null;
        this.boardSelected = null;
        this.Board = [];
        this.hp = 0;
        this.maxhp = 30;
        this.mp = 0;
        this.maxmp = 0;
        this.class = data["heroClass"];
        this.welcomeText = data["welcomeText"];
        this.DeckCount = 0;

        if (this.Owner === "Opponent") {
            this.Username = data["username"];
            this.handSize = 0;
        } else {
            this.Hand = [];
            this.RemainingTime = 0;
            this.PowerUsed = false;
            this.isTurn = false;
        }
    }

    update_info(data) {
        this.Board = data["board"];
        this.hp = parseInt(data["hp"]);

        this.maxhp = this.hp > this.maxhp ? this.hp : this.maxhp;
        this.mp = parseInt(data["mp"]);
        if (data.hasOwnProperty("maxMp")) {
            this.maxmp = parseInt(data["maxMp"]);
        } else {
            this.maxmp = (this.mp > this.maxmp) ? this.mp : this.maxmp;
        }

        this.DeckCount = parseInt(data["remainingCardsCount"]);
        if (data.hasOwnProperty("hand")) {
            this.Hand = data["hand"];
            this.RemainingTime = data["remainingTurnTime"];
            this.PowerUsed = data["heroPowerAlreadyUsed"];
            this.isTurn = data["yourTurn"];
        } else {
            this.handSize = data["handSize"];
        }

    }

}