import { TILETYPE_ID_AWARD, TILETYPE_ID_VISION } from "../constants";

export class GameAudio {
    constructor({ world }) {
        this.world = world;

        this.musicMainIntro = document.getElementById("audio-music-main-intro");
        this.musicMainLoop = document.getElementById("audio-music-main-loop");
        this.musicMainModestLoop = document.getElementById("audio-music-main-modest-loop");
        this.musicLoops = [this.musicMainLoop, this.musicMainModestLoop];
        this.musicMainOutro = document.getElementById("audio-music-main-outro");
        this.sfxReveal = document.getElementById("audio-sfx-reveal");
        this.sfxFlower = document.getElementById("audio-sfx-flower");
        this.sfxStep0 = document.getElementById("audio-sfx-step0");
        this.sfxStep1 = document.getElementById("audio-sfx-step1");
        this.sfxStep2 = document.getElementById("audio-sfx-step2");
        this.sfxStep3 = document.getElementById("audio-sfx-step3");
        this.sfxStep4 = document.getElementById("audio-sfx-step4");
        this.sfxSteps = [this.sfxStep0, this.sfxStep1, this.sfxStep2, this.sfxStep3, this.sfxStep4];
        this.sfxTrap = document.getElementById("audio-sfx-trap");

        this.world.addEventListener("player-moved-to", this.playSfxStep.bind(this));
        this.world.addEventListener("player-died", this.onPlayerDied.bind(this));

        this.musicMainIntro.addEventListener("ended", this.onMusicMainIntroEnded.bind(this));
        this.musicMainLoop.addEventListener("ended", this.onLoopEnded.bind(this));
        this.musicMainModestLoop.addEventListener("ended", this.onLoopEnded.bind(this));

        window.addEventListener("DOMContentLoaded", () => {
            this.musicMainIntro.volume = 1;
            this.musicLoops.forEach(sfx => sfx.volume = 1);

            this.musicMainIntro.currentTime = 0;
            setTimeout(
                () => {
                    this.musicMainIntro.play();
                },
                5000
            );
        });

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

    playNextMusicLoop() {
        let nextLoop = this.musicLoops[Math.floor(Math.random() * this.musicLoops.length)];
        nextLoop.play();
    }

    onMusicMainIntroEnded() {
        this.playNextMusicLoop();
    }

    onPlayerDied() {

        let fadeOutInterval = setInterval(() => {
            if (this.musicMainIntro.volume > 0) {
                this.musicMainIntro.volume = Math.max(0, this.musicMainIntro.volume - 0.1);
                this.musicLoops.forEach(sfx => sfx.volume = Math.max(0, sfx.volume - 0.1));
            } else {
                clearInterval(fadeOutInterval);
                this.musicMainIntro.pause();
                this.musicMainIntro.currentTime = 0;
                this.musicMainIntro.volume = 1;
                this.musicLoops.forEach(sfx => {
                    sfx.pause();
                    sfx.currentTime = 0;
                    sfx.volume = 1;
                });
                this.musicMainOutro.play();
            }
        }, 100);

    }

    onLoopEnded() {
        this.playNextMusicLoop();
    }
}