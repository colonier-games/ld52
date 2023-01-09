import * as THREE from 'three';
import { GLTF_FLOWERS, PLAYER_GEOMETRY, PLAYER_ITEM_GEOMETRY, PLAYER_ITEM_OFFSET_Y, PLAYER_MATERIAL, PLAYER_POSITION_Y, PLAYER_SIZE, PLAYER_SPRITE_SCALE, SEED_SIZE, SVG_BACKGROUND_ROOM, TEXTURE_ICON_CHARACTER, TEXTURE_ICON_SCISSORS, TEXTURE_ICON_SEED, TEXTURE_ICON_WATERING_CAN, TILETYPE_ID_NORMAL, TILETYPE_ID_SCISSORS, TILETYPE_ID_WATERING_CAN, TILE_SPACING, TILE_STAIRS_OFFSET } from "../constants";

export class Player {
    constructor({ world }) {
        this.world = world;
        this.position = [1, 0];
        this.previousPosition = [1, 0];
        this.mandalaProgress = {
            A: 0,
            B: 0,
            C: 0,
            D: 0,
            E: 0,
            F: 0,
            G: 0,
        };
        this.moves = 50;
        this.maxLives = 3;
        this.lives = this.maxLives;
        this.checkpoint = [1, 0];
        this.movementTimer = 0.0;
        /* this.mesh = new THREE.Mesh(
            PLAYER_GEOMETRY,
            PLAYER_MATERIAL
        ); */
        this.mesh = new THREE.Sprite(
            new THREE.SpriteMaterial({
                map: TEXTURE_ICON_CHARACTER,
                transparent: true,
                depthTest: true
            })
        );
        this.mesh.scale.setScalar(PLAYER_SIZE * PLAYER_SPRITE_SCALE);
        this.mesh.castShadow = true;
        this.mesh.position.copy(this.worldPosition());
        this.seedSprites = [];
        this.addSeeds(this.moves);
        this.seedTimer = 0.0;
        this.currentItem = null;
        this.itemMesh = new THREE.Mesh(
            PLAYER_ITEM_GEOMETRY,
            new THREE.MeshBasicMaterial({ map: TEXTURE_ICON_SCISSORS, transparent: true, side: THREE.DoubleSide })
        );
        this.itemMesh.visible = false;
        this.itemTimer = 0.0;
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
        scene.add(this.itemMesh);
    }

    moveTo([x, y]) {
        if (this.moves <= 0) {
            return;
        }
        const currentChunkId = this.world.tileAt(this.position).chunkId;
        // this.world.tileAt(this.position).showMandala();
        this.teleportTo([x, y]);
        const newChunkId = this.world.tileAt([x, y]).chunkId;
        if (!this.world.tileAt([x, y]).visited) {
            this.moves--;
            if (this.moves < 0) {
                this.moves = 0;
            }
            if (this.world.tileAt(this.position).mandalaType) {
                this.world.takeAward(this.position);
            }
            this.world.tileAt([x, y]).visited = true;
        }
        if (this.world.tileAt([x, y]).isCheckpoint) {
            this.saveCheckpoint();
        }
        if (!this.world.tileAt(this.previousPosition).flower) {
            this.world.addPopSeed(this.previousPosition);
        }
        this.world.dispatchEvent("player-moves-changed", this.moves);
        const dmg = this.world.tileAt([x, y]).damage;
        if (dmg) {
            this.kill();
        }

        if (currentChunkId !== newChunkId) {
            this.world.dispatchEvent("player-chunk-changed", newChunkId);
            this.saveCheckpoint();
        }

        if (this.world.tileAt([x, y]).flowerPoints > 0) {
            if (this.currentItem === "scissors") {
                this.cutFlowers();
            } else if (this.currentItem === "watering_can") {
                this.waterFlowers();
            }
        }
    }

    cutFlowers() {
        const dx = this.position[0] - this.previousPosition[0];
        const dy = this.position[1] - this.previousPosition[1];

        if (dx === 0 && dy === 0) {
            return;
        }

        const tilesInLine = this.world.level.floweredTilesInLine(this.previousPosition, [dx, dy]);
        let total = 0;
        for (const tile of tilesInLine) {
            total += tile.flowerPoints;
            tile.flowerPoints = 0;
            this.world.scene.remove(tile.flower);
            tile.flower = null;
        }

        this.moves += total;
        this.changeItemTo(null);
        this.world.dispatchEvent("player-cut", null);
    }

    waterFlowers() {
        const dx = this.position[0] - this.previousPosition[0];
        const dy = this.position[1] - this.previousPosition[1];

        if (dx === 0 && dy === 0) {
            return;
        }

        const tilesInLine = this.world.level.floweredTilesInLine(this.previousPosition, [dx, dy]);

        for (const tile of tilesInLine) {
            tile.flowerPoints = 2;
            this.world.scene.remove(tile.flower);
            const randomFlower = GLTF_FLOWERS[Math.floor(Math.random() * GLTF_FLOWERS.length)];
            tile.flower = randomFlower.scene.clone();
            tile.updateMesh();
            this.world.scene.add(tile.flower);
        }

        this.changeItemTo(null);
        this.world.dispatchEvent("player-watered", null);
    }

    changeItemTo(item) {
        this.currentItem = item;
        if (item === null) {
            this.itemMesh.visible = false;
            return;
        }
        this.itemMesh.visible = true;
        switch (item) {
            case "scissors":
                this.itemMesh.material.map = TEXTURE_ICON_SCISSORS;
                break;
            case "watering_can":
                this.itemMesh.material.map = TEXTURE_ICON_WATERING_CAN;
                break;
        }
        this.world.addAwardItem({
            position: [...this.position],
            texture: this.itemMesh.material.map,
        });
    }

    teleportTo([x, y]) {
        this.previousPosition = [...this.position];
        this.position = [x, y];
        this.movementTimer = 0.0;
        this.world.dispatchEvent("player-moved-to", this.position);

        const newTile = this.world.tileAt(this.position);
        if (newTile.type === TILETYPE_ID_SCISSORS) {
            this.changeItemTo("scissors");
            newTile.changeTo(TILETYPE_ID_NORMAL);
            newTile.hideMandala();
        } else if (newTile.type === TILETYPE_ID_WATERING_CAN) {
            this.changeItemTo("watering_can");
            newTile.changeTo(TILETYPE_ID_NORMAL);
            newTile.hideMandala();
        }
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

    update(dt) {

        this.movementTimer += dt;
        if (this.movementTimer > 1.0) {
            this.movementTimer = 1.0;
        }
        this.mesh.position.lerp(this.worldPosition(), this.movementTimer);

        this.itemTimer += dt;
        this.itemMesh.position.copy(this.mesh.position);
        this.itemMesh.position.y += PLAYER_ITEM_OFFSET_Y;
        this.itemMesh.setRotationFromAxisAngle(new THREE.Vector3(0, 1, 0), this.itemTimer * 2.0);

        this.seedTimer += dt;

        while (this.seedSprites.length < this.moves) {
            this.addSeeds(1);
        }
        while (this.seedSprites.length > this.moves) {
            this.removeSeeds(1);
        }

        const dAlpha = 2.0 * Math.PI / this.seedSprites.length;
        this.seedSprites.forEach((sprite, i) => {
            sprite.position.copy(this.mesh.position);
            sprite.position.x += Math.sin(this.seedTimer * 2.0 + i * dAlpha) * PLAYER_SIZE * 2.0;
            sprite.position.y += PLAYER_SIZE * 0.5 + Math.sin(this.seedTimer * 2.0 + 2.0 * i) * SEED_SIZE;
            sprite.position.z += Math.cos(this.seedTimer * 2.0 + i * dAlpha) * PLAYER_SIZE * 2.0;
            sprite.updateMatrix();
        });

        if (this.moves === 0) {
            this.world.dispatchEvent("player-died", {
                score: this.score,
                moves: this.moves
            })
        }

    }

    addSeeds(count) {
        for (let i = 0; i < count; i++) {
            const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
                map: TEXTURE_ICON_SEED,
                transparent: true,
                depthTest: true,
            }));
            sprite.position.copy(this.mesh.position);
            sprite.position.y += PLAYER_SIZE * 0.5;
            sprite.scale.setScalar(SEED_SIZE);
            this.seedSprites.push(sprite);
            this.world.scene.add(sprite);
        }
    }

    removeSeeds(count) {
        for (let i = 0; i < count; i++) {
            if (this.seedSprites.length === 0) return;
            const sprite = this.seedSprites.pop();
            this.world.scene.remove(sprite);
        }
    }
}