import * as THREE from 'three';
import { CAMERA_START_POSITION, TUTORIAL_LEVEL_DATA } from '../constants';
import { Level2 } from '../level/Level2';
import { createLights } from '../lighting';
import { Player } from '../player/Player';
import { RENDERER } from '../renderer';

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
        this.player.updateMovement(dt);
        RENDERER.render(this.scene, this.camera);
    }
}