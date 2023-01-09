import * as THREE from 'three';
import { GameAudio } from './audio/GameAudio';
import { AnimatedBackground } from './bg/AnimatedBackground';
import { MouseInput } from './input/MouseInput';
import { RENDERER } from './renderer';
import { GameOverScreen } from './ui/GameOverScreen';
import { UserInterface } from './ui/UserInterface';
import { World } from './world/World';

function gameOver({ ui, world }) {

    RENDERER.setAnimationLoop(null);
    RENDERER.domElement.remove();
    ui.unmount();

    const gameOverScreen = new GameOverScreen({
        world,
        onReturnToMenu: () => {
            gameOverScreen.unmount();
            newGame();
        }
    });

    gameOverScreen.mount();

}

function newGame() {

    const world = new World();
    const mouseInput = new MouseInput({ renderer: RENDERER, world });
    const ui = new UserInterface({ world });
    const bg = new AnimatedBackground({ world });
    const gameAudio = new GameAudio({ world });

    RENDERER.setSize(window.innerWidth, window.innerHeight);
    RENDERER.setAnimationLoop(world.update.bind(world));

    document.body.appendChild(RENDERER.domElement);
    ui.mount();

    world.addEventListener("player-died", ({ score, moves }) => {
        gameOver({ ui, world });
    });
}

newGame();
