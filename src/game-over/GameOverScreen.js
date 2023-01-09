import { createRoot } from "react-dom/client";
import { GameOver } from "./components/GameOver";

export class GameOverScreen {
    constructor({ world, onReturnToMenu }) {
        this.world = world;
        this.onReturnToMenu = onReturnToMenu;

        this.domElement = document.createElement("div");
        this.domElement.className = "game-over-screen-root";
    }

    mount() {
        document.body.appendChild(this.domElement);

        this.root = createRoot(this.domElement);
        this.root.render(<GameOver world={this.world} onReturnToMenu={this.onReturnToMenu} />);
    }

    unmount() {
        this.root.unmount();
        this.domElement.remove();
    }
}