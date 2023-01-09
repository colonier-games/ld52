import * as THREE from 'three';
import { TEXTURE_MANDALAS, TEXTURE_MANDALA_SCISSORS, TEXTURE_MANDALA_SPAWN, TEXTURE_MANDALA_TILE, TEXTURE_MANDALA_TRAP, TEXTURE_MANDALA_VISION, TEXTURE_MANDALA_WATERING_CAN, TILETYPE_ID_AIR, TILETYPE_ID_AWARD, TILETYPE_ID_AXE, TILETYPE_ID_CHECKPOINT, TILETYPE_ID_EXIT_EAST, TILETYPE_ID_EXIT_NORTH, TILETYPE_ID_EXIT_SOUTH, TILETYPE_ID_EXIT_WEST, TILETYPE_ID_NORMAL, TILETYPE_ID_SCISSORS, TILETYPE_ID_SEEDS, TILETYPE_ID_SPAWN, TILETYPE_ID_TRAP, TILETYPE_ID_TREE, TILETYPE_ID_VISION, TILETYPE_ID_WALL, TILETYPE_ID_WATERING_CAN, TILE_APPEARING_MAX_DELAY, TILE_APPEARING_MAX_OFFSET_VARIANCE, TILE_APPEARING_PROGRESS_MAX_VARIANCE, TILE_APPEARING_PROGRESS_START, TILE_APPEARING_SPEED, TILE_FALLING_ACCELERATION, TILE_GEOMETRY, TILE_MATERIALS, TILE_MATERIAL_UNKNOWN, TILE_SIZE, TILE_SPACING, TILE_STAIRS_OFFSET, TILE_TOP_GEOMETRY, TILE_UNVISITED_FALLING_MAX_TIME, TILE_VISITED_FALLING_MAX_TIME, TILE_WALL_GEOMETRY } from '../constants';
import { TileRow } from './TileRow';

function isWalkableType(type) {
    return type === TILETYPE_ID_NORMAL
        || type === TILETYPE_ID_AWARD
        || type === TILETYPE_ID_SPAWN
        || type === TILETYPE_ID_TRAP
        || type === TILETYPE_ID_VISION
        || type === TILETYPE_ID_CHECKPOINT
        || type === TILETYPE_ID_EXIT_NORTH
        || type === TILETYPE_ID_EXIT_SOUTH
        || type === TILETYPE_ID_EXIT_EAST
        || type === TILETYPE_ID_EXIT_WEST
        || type === TILETYPE_ID_AXE
        || type === TILETYPE_ID_TREE
        || type === TILETYPE_ID_WATERING_CAN
        || type === TILETYPE_ID_SEEDS
        || type === TILETYPE_ID_SCISSORS;
}

function isAirType(type) {
    return type === TILETYPE_ID_AIR;
}

function isWallType(type) {
    return type === TILETYPE_ID_WALL;
}

function isExitType(type) {
    return type === TILETYPE_ID_EXIT_NORTH
        || type === TILETYPE_ID_EXIT_SOUTH
        || type === TILETYPE_ID_EXIT_EAST
        || type === TILETYPE_ID_EXIT_WEST;
}

function damageOf(type) {
    if (type === TILETYPE_ID_TRAP) {
        return 1;
    }

    return 0;
}

function isMandalaAlwaysShownFor(type) {
    return type === TILETYPE_ID_SPAWN
        || type === TILETYPE_ID_VISION
        || type === TILETYPE_ID_AWARD
        || type === TILETYPE_ID_SCISSORS
        || type === TILETYPE_ID_WATERING_CAN;
}

export class Tile {
    constructor({ row, col, type, award, chunkId }) {
        /** @type {TileRow} */
        this.row = row;
        this.col = col;
        this.type = type;
        this.award = award;
        this.chunkId = chunkId;
        this.walkable = isWalkableType(type);
        this.damage = damageOf(type);
        this.providesVision = type === TILETYPE_ID_VISION;
        this.isCheckpoint = type === TILETYPE_ID_CHECKPOINT;
        this.isExit = isExitType(type);
        this.visited = false;
        this.fallingVelocity = 0.0;
        this.fallingTimer = 0.0;
        this.fallingProgress = 0.0;
        this.isFalling = false;
        this.appearingProgress = 0.0;
        this.appearingRandomOffset = Math.random() * TILE_APPEARING_MAX_OFFSET_VARIANCE;
        this.isAppearing = true;

        if (this.type === TILETYPE_ID_AWARD) {
            const mandalaTypes = Object.keys(TEXTURE_MANDALAS);
            // this.mandalaType = mandalaTypes[Math.floor(Math.random() * mandalaTypes.length)];
            this.mandalaType = 'A';
        }

        this.flower = null;

        if (!isAirType(type)) {
            this.mesh = new THREE.Mesh(
                isWallType(type) ? TILE_WALL_GEOMETRY : TILE_GEOMETRY,
                TILE_MATERIALS[this.type] || TILE_MATERIAL_UNKNOWN
            );
            this.mesh.receiveShadow = true;
            this.mesh.castShadow = true;

            this.topMeshMaterial = new THREE.MeshBasicMaterial({
                map: TEXTURE_MANDALAS[Math.floor(Math.random() * TEXTURE_MANDALAS.length)],
                side: THREE.DoubleSide,
                transparent: true,
            });
            this.topMesh = new THREE.Mesh(
                TILE_TOP_GEOMETRY,
                this.topMeshMaterial
            );
            if (this.type === TILETYPE_ID_SPAWN) {
                this.topMeshMaterial.map = TEXTURE_MANDALA_SPAWN;
            } else if (this.type === TILETYPE_ID_TRAP) {
                this.topMeshMaterial.map = TEXTURE_MANDALA_TRAP;
                this.topMeshMaterial.color = new THREE.Color(0xff2222);
            } else if (this.type === TILETYPE_ID_VISION) {
                this.topMeshMaterial.map = TEXTURE_MANDALA_VISION;
            } else if (this.type === TILETYPE_ID_AWARD) {
                this.topMeshMaterial.map = TEXTURE_MANDALAS[this.mandalaType][0];
            } else if (this.type === TILETYPE_ID_SCISSORS) {
                this.topMeshMaterial.map = TEXTURE_MANDALA_SCISSORS;
            } else if (this.type === TILETYPE_ID_WATERING_CAN) {
                this.topMeshMaterial.map = TEXTURE_MANDALA_WATERING_CAN;
            }
            this.topMesh.visible = isMandalaAlwaysShownFor(this.type);

            this.updateMesh();
        } else {
            this.mesh = null;
        }

    }

    move([x, y]) {
        this.row = y;
        this.col = x;

        if (this.mesh) {
            this.updateMesh();
        }
    }

    changeTo(newType) {
        this.type = newType;
        this.walkable = isWalkableType(newType);
        this.damage = damageOf(newType);
        this.providesVision = newType === TILETYPE_ID_VISION;
        this.isCheckpoint = newType === TILETYPE_ID_CHECKPOINT;
        this.isExit = isExitType(newType);

        if (this.mesh) {
            this.mesh.material = TILE_MATERIALS[newType] || TILE_MATERIAL_UNKNOWN;
            this.mesh.visible = true;
            this.updateMesh();
        }
    }

    updateMesh() {
        if (this.mesh) {
            this.mesh.userData.tileXY = [this.col, this.row];
            this.mesh.position.set(
                this.col * TILE_SPACING,
                this.row * TILE_STAIRS_OFFSET - this.fallingProgress,
                this.row * TILE_SPACING
            );
            if (isWallType(this.type)) {
                this.mesh.position.y += TILE_SIZE * 0.25;
            }
            this.mesh.updateMatrix();

            this.topMesh.position.copy(this.mesh.position);
            this.topMesh.position.y += TILE_SIZE * 0.125 + 0.0001;
            this.topMesh.setRotationFromAxisAngle(new THREE.Vector3(1, 0, 0), 0.5 * Math.PI);
            this.topMesh.updateMatrix();

            if (this.flower) {
                this.flower.position.copy(this.mesh.position);
                // prop.position.y += TILE_SIZE * 8;
                this.flower.scale.setScalar(0.5);
                this.flower.visible = true;
                this.flower.updateMatrix();
            }
        }
    }

    showMandala() {
        if (this.topMesh) {
            this.topMesh.visible = true;
        }
    }

    hideMandala() {
        if (this.topMesh) {
            this.topMesh.visible = false;
        }
    }

    updateFalling(dt) {
        if (this.isFalling) {
            if (this.fallingTimer > 0.0) {
                this.fallingTimer -= dt;
                return;
            }
            this.fallingVelocity += TILE_FALLING_ACCELERATION * dt;
            this.fallingProgress += this.fallingVelocity * dt;
            this.updateMesh();
        }
    }

    updateAppearing(dt) {
        if (!this.isAppearing) {
            return;
        }

        if (this.appearingProgress >= 1.0) {
            this.isAppearing = false;
            return;
        }

        this.appearingProgress += dt * TILE_APPEARING_SPEED;
    }

    makeFall() {
        this.isFalling = true;
        this.fallingTimer = Math.random() * TILE_UNVISITED_FALLING_MAX_TIME;
        if (this.visited) {
            this.fallingTimer = TILE_UNVISITED_FALLING_MAX_TIME + Math.random() * TILE_VISITED_FALLING_MAX_TIME;
        }
    }
}