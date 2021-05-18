class card {

    constructor() {
        this.uid = 0;
        this.id = 0;
        this.cost = 0;
        this.hp = 0;
        this.baseHP = 0;
        this.atk = 0;
        this.mechanics = [];
        this.state = "";
        this.cardSelected = false;

        this.Card = document.createElement("div");
        this.Card.className = "card";

        this.HpIcon = document.createElement("div");
        this.HpIcon.className = "vie";
        this.HpText = this.create_text_node();
        this.HpIcon.appendChild(this.HpText);

        this.AttackIcon = document.createElement("div");
        this.AttackIcon.className = "attack";
        this.AttackText = this.create_text_node();
        this.AttackIcon.appendChild(this.AttackText);

        this.CostIcon = document.createElement("div");
        this.CostIcon.className = "cost";
        this.CostText = this.create_text_node();
        this.CostIcon.appendChild(this.CostText);

        this.CardText = document.createElement("div");
        this.CardText.className = "card-text";
        this.CardTextContent = this.create_text_node();
        this.CardText.appendChild(this.CardTextContent);


        this.SleepDiv = this.create_sleepy();
        this.Card.appendChild(this.SleepDiv);
        this.Card.appendChild(this.HpIcon);
        this.Card.appendChild(this.CostIcon);
        this.Card.appendChild(this.AttackIcon);
        this.Card.appendChild(this.CardText);
        this.Card.addEventListener("click", this._clickHandler = () =>
            this.get_Card_id(), false);

    }


    get_Card_id() {

        if (this.cardSelected === false) {
            if (this.owner !== null) {
                this.cardSelected = true;
                this.owner.cardSelected = this.uid;
                console.log("Card Selected ");
                console.log("cette carte a taunt: " + this.mechanics.includes('Taunt'));
            }
        } else {

            this.cardSelected = false;
            this.owner.cardSelected = null;
            console.log("Card Unselected ");
        }

    }

    update_card(cardInfo, images, Owner) {
        if (cardInfo["uid"] === 0) {
            this.Card.style.display = "none";
        }
        if (cardInfo["uid"] !== 0) {
            this.Card.style.display = "block";
        }
        this.owner = Owner;
        if (cardInfo["uid"] !== this.uid) {
            this.uid = cardInfo["uid"];
            this.Card.id = this.uid;
            this.id = cardInfo["id"];
            this.cost = cardInfo["cost"];
            this.baseHP = cardInfo["baseHp"];
            this.atk = cardInfo["atk"];
            this.CostText.innerHTML = this.cost;
            this.AttackText.innerHTML = this.atk;

            if (!images.has(this.id)) {
                this.image = (this.id > 50) ? images.get("MajorDefault") : images.get("MinorDefault");
            } else {
                this.image = images.get(this.id);
            }
            this.Card.style.backgroundImage = "url('" + this.image.src + "')";

        }

        this.hp = cardInfo["hp"];
        this.mechanics = cardInfo["mechanics"];


        this.HpText.innerHTML = this.hp;
        this.CardText.innerHTML = this.mechanics;

        if (this.cardSelected === true) {
            this.Card.style.border = "thin solid rgb(13, 255, 53)";
            this.Card.style.animation = "pulse 1s infinite ease-in";
        } else {
            this.Card.style.border = "thin solid black";
            this.Card.style.animation = "none";
        }

        if (this.mechanics.length > 0) {

            if (this.mechanics.includes('Stealth')) {

                this.Card.style.border = "thick solid rgb(146, 61, 216)";
                this.Card.style.animation = "Invisible_pulse 6s infinite ease-in";
            } else if (this.mechanics.includes('Taunt')) {
                this.Card.style.border = "thick solid rgb(255, 196, 68)";
                this.Card.style.animation = "pulse 1s infinite ease-in";
            } else if (this.mechanics.includes('Charge')) {
                this.Card.style.border = "thick solid rgb(255, 68, 68)";
                this.Card.style.animation = "shake 3s infinite";
            } else {
                this.Card.style.border = "thin solid black";
                this.Card.style.animation = "none";
            }

        } else {
            this.Card.style.border = "thin solid black";
            this.Card.style.animation = "none";
        }

        if (cardInfo.hasOwnProperty('state')) {
            this.state = cardInfo["state"];
            if (this.state === "SLEEP") {

                this.SleepDiv.style.display = "block";


            } else {
                this.SleepDiv.style.display = "none";
            }
        }



    }
    create_sleepy() {
        let Sleep = document.createElement("div");
        Sleep.className = "sleepContainer";

        let div1 = document.createElement("div");
        div1.className = "zzz zzz-z";

        let div2 = document.createElement("div");
        div2.className = "zzz zzz-zz";

        let div3 = document.createElement("div");
        div3.className = "zzz zzz-zzz";

        Sleep.appendChild(div1);
        Sleep.appendChild(div2);
        Sleep.appendChild(div3);

        return Sleep;

    }

    create_text_node() {
        let textZone = document.createElement("div");
        textZone.className = "text-node";

        return textZone;
    }

    delete_card() {
        this.Card.style.display = "none";
        this.uid = 0;
        this.id = 0;
        this.cost = 0;
        this.hp = 0;
        this.baseHP = 0;
        this.atk = 0;
        this.mechanics = [];
        this.state = "";

    }
}