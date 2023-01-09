import * as THREE from 'three';
import { GameAudio } from './audio/GameAudio';
import { AnimatedBackground } from './bg/AnimatedBackground';
import { loadGltfModels } from './constants';
import { MouseInput } from './input/MouseInput';
import { RENDERER } from './renderer';
import { GameOverScreen } from './game-over/GameOverScreen';
import { MainMenu } from './main-menu/MainMenu';
import { UserInterface } from './ui/UserInterface';
import { World } from './world/World';

function onMandalaCompleted() {
    let achievementLevel = 0;
    if (localStorage.getItem("achievement-level")) {
        achievementLevel = parseInt(localStorage.getItem("achievement-level"));
    }
    achievementLevel++;
    if (achievementLevel > 5) {
        achievementLevel = 5;
    }
    localStorage.setItem("achievement-level", achievementLevel);
}

function gameOver({ ui, world }) {

    RENDERER.setAnimationLoop(null);
    RENDERER.domElement.remove();
    ui.unmount();

    const gameOverScreen = new GameOverScreen({
        world,
        onReturnToMenu: () => {
            gameOverScreen.unmount();
            mainMenu();
        }
    });

    gameOverScreen.mount();

}

function newGame() {

    const world = new World();
    const mouseInput = new MouseInput({ renderer: RENDERER, world });
    const ui = new UserInterface({ world });
    const bg = new AnimatedBackground({ el: document.getElementById("animated-background") });
    const gameAudio = new GameAudio({ world });
    gameAudio.playMainMusic();
    gameAudio.playSfxLevelStart();

    RENDERER.setSize(window.innerWidth, window.innerHeight);
    RENDERER.setAnimationLoop(world.update.bind(world));

    document.body.appendChild(RENDERER.domElement);
    ui.mount();

    world.addEventListener("player-died", ({ score, moves }) => {
        gameOver({ ui, world });
    });
    world.addEventListener("return-to-menu", () => {

        RENDERER.setAnimationLoop(null);
        RENDERER.domElement.remove();
        ui.unmount();
        mainMenu();

    })
    world.addEventListener("mandala-completed", () => {
        onMandalaCompleted();
    });
}

function mainMenu() {

    // const bg = new AnimatedBackground({ el: document.getElementById("animated-background") });
    const menu = new MainMenu({
        // bg,
        onStartGame: () => {
            menu.unmount();
            newGame();
        }
    });
    menu.mount();

}

loadGltfModels().then(() => {
    mainMenu();
});
