import * as THREE from 'three';
import { PLAYER_POSITION_Y, SEED_SIZE, TEXTURE_ICON_SEED, TILE_SPACING, TILE_STAIRS_OFFSET } from '../constants';

export class PopSeed {
    constructor({ world, position }) {
        this.world = world;
        this.position = position;
        this.timer = 0.0;
        this.alive = true;
        this.sprite = new THREE.Sprite(new THREE.SpriteMaterial({
            map: TEXTURE_ICON_SEED,
            transparent: true,
            depthTest: true
        }));
        this.sprite.scale.setScalar(SEED_SIZE);
    }

    addToScene(scene) {
        scene.add(this.sprite);
    }

    removeFromScene(scene) {
        scene.remove(this.sprite);
    }

    update(dt) {
        this.timer += dt * 3.0;
        if (this.timer >= 1.0) {
            this.timer = 1.0;
            this.alive = false;
        }
        this.sprite.position.set(
            this.position[0] * TILE_SPACING,
            PLAYER_POSITION_Y + this.position[1] * TILE_STAIRS_OFFSET + Math.sin(this.timer * Math.PI) * PLAYER_POSITION_Y,
            this.position[1] * TILE_SPACING
        );
    }
}