import { createRoot } from "react-dom/client";
import { MainMenuApp } from "./components/MainMenuApp";

export class MainMenu {
    constructor({ onStartGame }) {
        this.onStartGame = onStartGame;

        this.domElement = document.createElement("div");
        this.domElement.classList.add("game-main-menu-root");
    }

    mount() {
        document.body.appendChild(this.domElement);

        this.root = createRoot(this.domElement);
        this.root.render(<MainMenuApp onStartGame={this.onAppStartGame.bind(this)} />);
    }

    onAppStartGame() {
        this.onStartGame();
    }

    unmount() {
        this.root.unmount();
        this.domElement.remove();
    }
}