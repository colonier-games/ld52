import { createRoot } from "react-dom/client";
import { UIApp } from "./components/UIApp";

export class UserInterface {
    constructor({ world }) {
        this.world = world;

        this.domElement = document.createElement("div");
    }

    mount() {
        document.body.appendChild(this.domElement);

        this.root = createRoot(this.domElement);
        this.root.render(<UIApp world={this.world} />);
    }

    umount() {
        this.root.unmount();
        this.domElement.remove();
    }
}