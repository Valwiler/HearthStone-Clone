class Alert {
    constructor(message, type) {
        this.type = type;
        this.Alive = true;
        this.node = document.createElement("div");
        if (type === "error") {
            this.node.className = "error-div";
        } else if (type === "notif") {
            this.node.className = "notif-div";
        } else {
            this.node.className = "loading-div";
        }
        this.node.style.width = "240px";
        this.node.style.height = "100px";
        this.node.style.zIndex = 10;
        this.node.style.left = ((window.innerWidth / 2) - 120) + "px";
        this.node.style.top = ((window.innerHeight / 2) - 50) + "px";
        this.node.innerText = message;
        if (type !== "loading") {
            this.CancelButton = document.createElement("button");
            this.CancelButton.innerHTML = "X";
            this.CancelButton.addEventListener("click", () => {
                this.delete_this();
                this.Alive = false;

            });
            this.node.appendChild(this.CancelButton);
        } else {
            this.Icon = document.createElement("div");
            this.Icon.className = "loading-icon";
            this.node.appendChild(this.Icon);
        }
        document.body.append(this.node);

    }

    delete_this() {
        this.node.parentNode.removeChild(this.node);
    }

}