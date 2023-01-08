import * as THREE from 'three';
import { PLAYER_GEOMETRY, PLAYER_MATERIAL, PLAYER_POSITION_Y, PLAYER_SIZE, SVG_BACKGROUND_ROOM, TILE_SPACING, TILE_STAIRS_OFFSET } from "../constants";

export class Player {
    constructor({ world }) {
        this.world = world;
        this.position = [1, 0];
        this.previousPosition = [1, 0];
        this.score = 0;
        this.moves = 20;
        this.maxLives = 3;
        this.lives = this.maxLives;
        this.checkpoint = [1, 0];
        this.movementTimer = 0.0;
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
        const currentChunkId = this.world.tileAt(this.position).chunkId;
        this.world.tileAt(this.position).showMandala();
        this.moves--;
        this.teleportTo([x, y]);
        const newChunkId = this.world.tileAt([x, y]).chunkId;
        if (!this.world.tileAt([x, y]).visited) {
            this.score += this.world.tileAt(this.position).score;
            if (this.world.tileAt(this.position).score > 1) {
                this.world.dispatchEvent("apply-background", SVG_BACKGROUND_ROOM);
            }
            this.world.dispatchEvent("player-score-changed", this.score);
            this.world.tileAt([x, y]).visited = true;
        }
        if (this.world.tileAt([x, y]).isCheckpoint) {
            this.saveCheckpoint();
        }
        this.world.dispatchEvent("player-moves-changed", this.moves);
        const dmg = this.world.tileAt([x, y]).damage;
        if (dmg) {
            this.kill();
        }

        if (currentChunkId !== newChunkId) {
            this.world.dispatchEvent("player-chunk-changed", newChunkId);
        }
    }

    teleportTo([x, y]) {
        this.previousPosition = [...this.position];
        this.position = [x, y];
        this.movementTimer = 0.0;
        this.world.dispatchEvent("player-moved-to", this.position);
    }

    saveCheckpoint() {
        this.checkpoint = [...this.position];
    }

    kill() {
        this.lives--;
        this.world.dispatchEvent("player-lives-changed", this.lives);
        if (this.lives <= 0) {
            this.world.dispatchEvent("player-died", {
                score: this.score,
                moves: this.moves
            });
        }
        this.teleportTo(this.checkpoint);
    }

    updateMovement(dt) {
        this.movementTimer += dt;
        if (this.movementTimer > 1.0) {
            this.movementTimer = 1.0;
        }
        this.mesh.position.lerp(this.worldPosition(), this.movementTimer);
    }
}