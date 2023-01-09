import { TILETYPE_ID_AWARD, TILETYPE_ID_VISION } from "../constants";

export class GameAudio {
    constructor({ world }) {
        this.world = world;

        this.musicMenu = document.getElementById("audio-music-menu");
        this.musicMain = document.getElementById("audio-music-main");
        this.musicMain.volume = 0.6;
        this.musicMenu.volume = 0.6;
        this.sfxReveal = document.getElementById("audio-sfx-reveal");
        this.sfxFlower = document.getElementById("audio-sfx-flower");
        this.sfxStep0 = document.getElementById("audio-sfx-step0");
        this.sfxStep1 = document.getElementById("audio-sfx-step1");
        this.sfxStep2 = document.getElementById("audio-sfx-step2");
        this.sfxStep3 = document.getElementById("audio-sfx-step3");
        this.sfxStep4 = document.getElementById("audio-sfx-step4");
        this.sfxSteps = [this.sfxStep0, this.sfxStep1, this.sfxStep2, this.sfxStep3, this.sfxStep4];
        this.sfxTrap = document.getElementById("audio-sfx-trap");
        this.sfxCut = document.getElementById("audio-sfx-cut");
        this.sfxGrowing = document.getElementById("audio-sfx-growing");
        this.sfxGrowing.volume = 0.8;
        this.sfxWatering0 = document.getElementById("audio-sfx-watering0");
        this.sfxWatering1 = document.getElementById("audio-sfx-watering1");
        this.sfxWateringSounds = [this.sfxWatering0, this.sfxWatering1];
        this.sfxDeath = document.getElementById("audio-sfx-death");
        this.sfxFalling = document.getElementById("audio-sfx-falling");
        this.sfxLevelStart = document.getElementById("audio-sfx-level-start");
        this.sfxMandalaCompleted = document.getElementById("audio-sfx-mandala");

        if (world) {
            this.world.addEventListener("player-moved-to", this.playSfxStep.bind(this));
            this.world.addEventListener("player-died", this.onPlayerDied.bind(this));
            this.world.addEventListener("player-cut", this.playSfxCut.bind(this));
            this.world.addEventListener("player-watered", this.playSfxWatering.bind(this));
            this.world.addEventListener("player-grew", this.playSfxGrowing.bind(this));
            this.world.addEventListener("player-chunk-changed", this.playSfxFalling.bind(this));
            this.world.addEventListener("mandala-completed", this.playSfxMandalaCompleted.bind(this));
        }
    }

    playMainMusic() {
        this.musicMenu.pause();
        this.musicMenu.currentTime = 0;
        this.musicMain.currentTime = 0;
        this.musicMain.play();
    }

    playMenuMusic() {
        this.musicMain.pause();
        this.musicMain.currentTime = 0;
        this.musicMenu.currentTime = 0;
        this.musicMenu.play();
    }

    playSfxReveal() {
        const clone = this.sfxReveal.cloneNode();
        clone.play();
    }

    playSfxFlower() {
        const clone = this.sfxFlower.cloneNode();
        clone.play();
    }

    playSfxTrap() {
        const clone = this.sfxTrap.cloneNode();
        clone.play();
    }

    playSfxStep([x, y]) {
        const tile = this.world.tileAt([x, y]);
        if (tile.damage > 0) {
            this.playSfxTrap();
        } else if (tile.type === TILETYPE_ID_VISION) {
            this.playSfxReveal();
        } else if (tile.type === TILETYPE_ID_AWARD && !tile.visited) {
            this.playSfxFlower();
        } else {
            const stepSound = this.sfxSteps[Math.floor(Math.random() * this.sfxSteps.length)];
            const clone = stepSound.cloneNode();
            clone.play();
        }
    }

    playSfxCut() {
        const clone = this.sfxCut.cloneNode();
        clone.play();
    }

    playSfxGrowing() {
        const clone = this.sfxGrowing.cloneNode();
        clone.play();
    }

    playSfxWatering() {
        const wateringSound = this.sfxWateringSounds[Math.floor(Math.random() * this.sfxWateringSounds.length)];
        const clone = wateringSound.cloneNode();
        clone.play();
    }

    playSfxDeath() {
        const clone = this.sfxDeath.cloneNode();
        clone.play();
    }

    playSfxFalling() {
        const clone = this.sfxFalling.cloneNode();
        clone.play();
    }

    playSfxLevelStart() {
        const clone = this.sfxLevelStart.cloneNode();
        clone.play();
    }

    playSfxMandalaCompleted() {
        const clone = this.sfxMandalaCompleted.cloneNode();
        clone.play();
    }

    onPlayerDied() {

        this.musicMain.pause();
        this.musicMenu.currentTime = 0;
        this.musicMenu.play();

    }

}