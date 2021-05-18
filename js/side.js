class side {
    constructor(Owner) {
        this.Owner = Owner;
        this.Player = null;
        this.node = document.createElement("div");

        if (this.Owner === "Opponent") {
            this.node.className = "Opponent-Container";
            this.sectionSize = 1 / 3;
            this.InfoRatio = [(1 / 2), (1 / 2)];
            this.HandRatio = [(1 / 2), (1 / 2)];
        } else {
            this.node.className = "Player-Container";
            this.sectionSize = 2 / 3;
            this.InfoRatio = [(1 / 3), (1 / 2)];
            this.HandRatio = [(2 / 3), (1 / 2)];
        }

        this.BoardRatio = [1, (1 / 2)];

        this.Hand = document.createElement("div");
        this.Hand.className = "hand";

        if (this.Owner === "Opponent") {
            this.handSize = document.createElement("div");
            this.handSize.className = "Hand-size-icon";
            this.Hand.appendChild(this.handSize);
        } else {
            this.create_hand();
        }

        this.createBoard();

        this.Info = document.createElement("div");
        this.Info.className = "info";

        this.RemainingCards = document.createElement("div");
        this.RemainingCards.className = "Deck-size-icon";
        this.CardNumber = document.createElement("div");
        this.CardNumber.className = "text-node";
        this.RemainingCards.appendChild(this.CardNumber);
        this.Info.appendChild(this.RemainingCards);

        this.Health = document.createElement("div");
        this.Health.className = "HP-icon";
        this.Info.appendChild(this.Health);
        this.MagicPoints = document.createElement("div");
        this.MagicPoints.className = "MP-icon";
        this.create_MP__HP_Bubbles();
        this.Info.appendChild(this.MagicPoints);


        if (this.Owner === "Player") {
            this.create_PlayerInfoSection();
            this.notif = null;
        }

        this.node.appendChild(this.Hand);
        this.node.appendChild(this.Info);
        this.node.appendChild(this.Board);

    }

    create_PlayerInfoSection() {
        this.PowerCanBePlayed = true;
        this.ButtonDiv = document.createElement("div");
        this.ButtonDiv.className = "Button-section";

        this.PowerButton = document.createElement("button");
        this.PowerButton.innerHTML = "Hero Power";
        this.PowerButton.name = "Power";
        this.PowerButton.style.height = "40px";
        this.PowerButton.addEventListener("click", function() {
            let answer = sendAjaxRequest("HeroPower", null).then((e) => {
                console.log(e);
                if (inGameMessage.has(e)) {
                    this.notif = new Alert(inGameMessage.get(e), "notif");
                }
            });
        });
        this.EndOfTurn = document.createElement("button");
        this.EndOfTurn.innerHTML = "End of Turn";
        this.EndOfTurn.name = "Turn";
        this.EndOfTurn.style.height = "40px";
        this.EndOfTurn.addEventListener("click", function() {
            let answer = sendAjaxRequest("EndOfTurn", null, null).then((e) => {
                console.log(e);
                if (inGameMessage.has(e)) {
                    this.notif = new Alert(inGameMessage.get(e), "notif");
                }
            });

        });
        this.ButtonDiv.appendChild(this.PowerButton);
        this.ButtonDiv.appendChild(this.EndOfTurn);
        this.Info.appendChild(this.ButtonDiv);
    }

    createBoard() {
        this.Board = document.createElement("div");
        this.Board.className = "board";
        this.BoardCards = [];
        for (let i = 0; i < 7; i++) {
            this.BoardCards.push(new card());
            this.Board.appendChild(this.BoardCards[i].Card);
        }
        this.Board.addEventListener("click", this._clickHandler = () =>
            this.getBoard(), false);
    }

    getBoard() {
        if (this.Player != null) {
            if ((this.Player.Owner === "Opponent" && this.Player.Board.length === 0) || this.Player.Owner === "Player") {
                if (this.Player.boardSelected === false) {
                    console.log("Board selected: " + this.Player.Owner);
                    this.Player.boardSelected = true;
                } else {
                    console.log("Board Unselected: " + this.Player.Owner);
                    this.Player.boardSelected = false;
                }
            }
        }
    }

    create_hand() {
        this.HandCard = [];

        for (let i = 0; i < 10; i++) {
            this.HandCard.push(new card());
            this.Hand.appendChild(this.HandCard[i].Card);
        }
    }

    create_MP__HP_Bubbles() {

        this.HealthAnimation = document.createElement("div");
        this.HealthAnimation.className = "liquid";
        this.HealthBubbles = document.createElement("div");
        this.HealthBubbles.className = "bubbles";
        this.HealthAnimation.appendChild(this.HealthBubbles);
        this.Health.appendChild(this.HealthAnimation);
        this.HealthText = document.createElement("div");
        this.HealthText.className = "text-node";
        this.Health.appendChild(this.HealthText);
        for (let i = 0; i <= 10; i++) {
            this.createBubble(this.HealthBubbles);
        }

        this.MagicAnimation = document.createElement("div");
        this.MagicAnimation.className = "liquid";
        this.MagicBubbles = document.createElement("div");
        this.MagicBubbles.className = "bubbles";
        this.MagicAnimation.appendChild(this.MagicBubbles);
        this.MagicPoints.appendChild(this.MagicAnimation);
        this.MagicText = document.createElement("div");
        this.MagicText.className = "text-node";
        this.MagicPoints.appendChild(this.MagicText);
        for (let i = 0; i <= 10; i++) {
            this.createBubble(this.MagicBubbles);
        }
    }

    update_side(player) {
        if (this.Player === null && (player.Owner === this.Owner)) {
            this.Player = player;
        }

        if (window.innerWidth !== this.Width || window.innerHeight !== this.Height) {
            this.Width = window.innerWidth;
            this.Height = window.innerHeight;
            this.update_info_position();
            this.update_board_position();
            this.update_hand_position();
        }

        this.update_info_data(player);
        this.update_board_data(player);
        this.update_hand_data(player);
    }

    updateNodePosition(node, SectionRatio, Origin) {
        node.style.width = (this.Width * SectionRatio[0]) + "px";
        node.style.height = (this.Height * this.sectionSize * SectionRatio[1]) + "px";
        node.style.left = Origin[0] + "px";
        node.style.top = Origin[1] + "px";

    }

    update_info_position() {
        let Origin = [0, 0];
        if (this.Owner === "Opponent") {
            Origin = [this.Width / 2, 0];

        } else {
            Origin = [(this.Width / 3) * 2, 2 * (this.Height / 3)];
        }
        this.updateNodePosition(this.Info, this.InfoRatio, Origin);
    }

    update_hand_position() {
        let Origin = [0, 0];
        if (this.Owner === "Opponent") {
            Origin = [0, 0];
        } else {
            Origin = [0, 2 * (this.Height / 3)];
        }
        this.updateNodePosition(this.Hand, this.HandRatio, Origin);
    }

    update_board_position() {
        let Origin = [0, 0];
        if (this.Owner === "Opponent") {
            Origin = [0, (this.Height / 3) / 2];
        } else {
            Origin = [0, this.Height / 3];
        }
        this.updateNodePosition(this.Board, this.BoardRatio, Origin);

    }

    createBubble(node) {
        var bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.style.bottom = (Math.random() * 20) + '%';
        bubble.style.left = (Math.random() * 100) + '%';
        node.appendChild(bubble);
    }

    update_info_data(player) {
        this.update_MP_HP_level(player);
        this.CardNumber.innerHTML = player.DeckCount;
        if (player.Owner === "Player") {
            if (player.PowerUsed === true) {
                this.PowerButton.style.backgroundColor = "background-color: rgb(158, 158, 158)";
            } else {
                this.PowerButton.style.backgroundColor = "background-color: rgb(221, 221, 221)";
            }
            if (player.isTurn === true) {
                this.EndOfTurn.style.backgroundColor = "background-color: rgb(221, 221, 221)";
            } else {
                this.EndOfTurn.style.backgroundColor = "background-color: rgb(158, 158, 158)";
                this.PowerButton.style.backgroundColor = "background-color: rgb(158, 158, 158)";
            }
        }
    }

    update_MP_HP_level(player) {
        this.HealthAnimation.style.top = 100 - (100 * (player.hp / player.maxhp)) + "%";
        this.HealthText.innerHTML = player.hp + "/" + player.maxhp;
        this.MagicAnimation.style.top = 100 - (100 * (player.mp / player.maxmp)) + "%";
        this.MagicText.innerHTML = player.mp + "/" + player.maxmp;
    }

    //todo : finish this
    update_board_data(player) {
        if (this.Board !== null) {
            if (player.boardSelected === true) {
                this.Board.style.border = "thin solid rgb(13, 255, 53)";
                this.Board.style.animation = "pulse 1s infinite ease-in";
            } else {
                this.Board.style.border = "none";
                this.Board.style.animation = "none";
            }
            for (let i = 0; i < this.BoardCards.length; i++) {
                if (i < player.Board.length) {
                    this.BoardCards[i].update_card(player.Board[i], images, player);
                } else {
                    this.BoardCards[i].delete_card();
                }
            }
        }
    }

    update_hand_data(player) {
        if (this.Owner === "Player") {

            for (let i = 0; i < this.HandCard.length; i++) {
                if (i < player.Hand.length) {
                    this.HandCard[i].update_card(player.Hand[i], images, player);
                } else {
                    this.HandCard[i].delete_card();
                }
            }
        }
    }
}