import * as THREE from 'three';
import { AWARD_ITEM_GEOMETRY, MANDALA_POSITION_Y, TEXTURE_MANDALAS, TILE_SPACING, TILE_STAIRS_OFFSET } from '../constants';

export class AwardItem {
    constructor({ world, texture, position }) {
        this.world = world;
        this.position = position;
        this.mesh = new THREE.Mesh(
            AWARD_ITEM_GEOMETRY,
            new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                side: THREE.DoubleSide
            })
        );
        this.mesh.position.set(
            this.position[0] * TILE_SPACING,
            MANDALA_POSITION_Y + this.position[1] * TILE_STAIRS_OFFSET,
            this.position[1] * TILE_SPACING
        );
        // this.mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
        this.timer = 0.0;
        this.alive = true;
    }

    update(dt) {
        this.timer += dt;
        if (this.timer >= 1.0) {
            this.timer = 1.0;
            this.alive = false;
        }
        this.mesh.position.y = MANDALA_POSITION_Y + this.position[1] * TILE_STAIRS_OFFSET + Math.sin(this.timer * Math.PI) * 0.5;
        this.mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), dt * 10.0);
    }

    addToScene(scene) {
        scene.add(this.mesh);
    }

    removeFromScene(scene) {
        scene.remove(this.mesh);
    }
}