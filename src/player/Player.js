import * as THREE from 'three';
import { PLAYER_GEOMETRY, PLAYER_MATERIAL, PLAYER_POSITION_Y, PLAYER_SIZE, TILE_SPACING, TILE_STAIRS_OFFSET } from "../constants";

export class Player {
    constructor({ world }) {
        this.world = world;
        this.position = [1, 0];
        this.score = 0;
        this.moves = 20;
        this.lives = 3;
        this.mesh = new THREE.Mesh(
            PLAYER_GEOMETRY,
            PLAYER_MATERIAL
        );
        this.mesh.castShadow = true;
        this.mesh.position.copy(this.worldPosition());
    }

    worldPosition() {
        return new THREE.Vector3(
            this.position[0] * TILE_SPACING,
            PLAYER_POSITION_Y + this.position[1] * TILE_STAIRS_OFFSET,
            this.position[1] * TILE_SPACING
        );
    }

    addToScene(scene) {
        scene.add(this.mesh);
    }

    moveTo([x, y]) {
        this.moves--;
        this.teleportTo([x, y]);
        if (!this.world.tileAt([x, y]).visited) {
            this.score += this.world.tileAt(this.position).score;
            this.world.dispatchEvent("player-score-changed", this.score);
            this.world.tileAt([x, y]).visited = true;
        }
        this.world.dispatchEvent("player-moves-changed", this.moves);
        const dmg = this.world.tileAt([x, y]).damage;
        if (dmg) {
            this.lives -= dmg;
            this.world.dispatchEvent("player-lives-changed", this.lives);
        }
    }

    teleportTo([x, y]) {
        this.position = [x, y];
        this.mesh.position.copy(this.worldPosition());
    }
}