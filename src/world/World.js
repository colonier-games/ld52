import * as THREE from 'three';
import { CAMERA_START_POSITION, GLTF_FLOWERS, GLTF_FLOWER_BEIGE_1, GLTF_GRASSES, TEXTURE_MANDALAS, TILETYPE_ID_NORMAL, TUTORIAL_LEVEL_DATA } from '../constants';
import { Level2 } from '../level/Level2';
import { createLights } from '../lighting';
import { Player } from '../player/Player';
import { RENDERER } from '../renderer';
import { AwardItem } from './AwardItem';
import { PopSeed } from './PopSeed';

function createOrthoCamera(pos) {
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 1000);
    camera.position.copy(pos);
    camera.lookAt(0, 0, 0);
    return camera;
}

function createPerspectiveCamera(pos) {
    const camera = new THREE.PerspectiveCamera(3, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.copy(pos);
    camera.lookAt(0, 0, 0);
    return camera;
}

export class World {
    constructor() {
        this.scene = new THREE.Scene();

        this.eventListeners = {};
        this.lastT = 0.0;
        this.camera = createOrthoCamera(CAMERA_START_POSITION);
        // this.camera = createPerspectiveCamera(CAMERA_START_POSITION);
        this.lights = createLights();
        this.lights.forEach(light => this.scene.add(light));

        this.spawnPosition = [0, 0];
        this.awardItems = [];
        this.popSeeds = [];

        this.level = new Level2({ world: this });
        // this.level.addToScene(this.scene);

        this.player = new Player({ world: this });
        this.player.addToScene(this.scene);

        this.player.teleportTo(this.spawnPosition);
        this.player.saveCheckpoint();

    }

    tileAt([x, y]) {
        return this.level.tileAt([x, y]);
    }

    addEventListener(type, listener) {
        if (!this.eventListeners[type]) {
            this.eventListeners[type] = [];
        }
        this.eventListeners[type].push(listener);
    }

    dispatchEvent(type, data) {
        if (this.eventListeners[type]) {
            this.eventListeners[type].forEach(listener => listener(data));
        }
    }

    update(time) {
        const dt = (time - this.lastT) / 1000.0;
        this.lastT = time;
        this.camera.position.set(
            CAMERA_START_POSITION.x + this.player.mesh.position.x,
            CAMERA_START_POSITION.y,
            CAMERA_START_POSITION.z + this.player.mesh.position.z
        );
        this.camera.lookAt(this.player.mesh.position);
        this.level.updateFallingChunks(dt);
        this.player.update(dt);

        this.awardItems.forEach(awardItem => awardItem.update(dt));
        this.awardItems.filter(awardItem => !awardItem.alive).forEach(awardItem => awardItem.removeFromScene(this.scene));
        this.awardItems = this.awardItems.filter(awardItem => awardItem.alive);

        this.popSeeds.forEach(popSeed => popSeed.update(dt));
        this.popSeeds.filter(popSeed => !popSeed.alive).forEach(popSeed => {
            popSeed.removeFromScene(this.scene);
            const tile = this.tileAt(popSeed.position);
            if (tile) {
                const randomFlower = GLTF_GRASSES[Math.floor(Math.random() * GLTF_GRASSES.length)];
                const mesh = randomFlower.scene.clone();
                mesh.castShadow = true;
                tile.flower = mesh;
                tile.flowerPoints = 1;
                tile.updateMesh();
                this.scene.add(mesh);
                this.dispatchEvent("player-grew", null);
            }
        });
        this.popSeeds = this.popSeeds.filter(popSeed => popSeed.alive);

        RENDERER.render(this.scene, this.camera);
    }

    addAwardItem({ position, variant, progress, texture }) {
        const awardItem = new AwardItem({
            world: this,
            texture: texture || TEXTURE_MANDALAS[variant][progress],
            position
        });
        awardItem.addToScene(this.scene);
        this.awardItems.push(awardItem);
    }

    takeAward(pos) {
        const mandalaType = this.tileAt(pos).mandalaType;
        this.tileAt(pos).changeTo(TILETYPE_ID_NORMAL);
        this.tileAt(pos).hideMandala();
        this.addAwardItem({
            position: [...pos],
            variant: mandalaType,
            progress: this.player.mandalaProgress[mandalaType]
        });
        this.player.mandalaProgress[mandalaType]++;
        if (this.player.mandalaProgress[mandalaType] >= 5) {
            this.player.mandalaProgress[mandalaType] = 0;
            this.dispatchEvent('mandala-completed', mandalaType);
        }
        this.dispatchEvent('mandala-collected', { type: mandalaType, progress: this.player.mandalaProgress[mandalaType] });
    }

    addPopSeed(pos) {
        const seed = new PopSeed({ world: this, position: [...pos] });
        this.popSeeds.push(
            seed
        );
        seed.addToScene(this.scene);
    }
}