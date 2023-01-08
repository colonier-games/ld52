import * as THREE from 'three';
import { TILETYPE_ID_AIR, TILETYPE_ID_AWARD, TILETYPE_ID_NORMAL, TILETYPE_ID_SPAWN, TILETYPE_ID_TRAP, TILETYPE_ID_WALL, TILE_GEOMETRY, TILE_MATERIALS, TILE_MATERIAL_UNKNOWN, TILE_SIZE, TILE_SPACING, TILE_STAIRS_OFFSET, TILE_WALL_GEOMETRY } from '../constants';
import { TileRow } from './TileRow';

function isWalkableType(type) {
    return type === TILETYPE_ID_NORMAL
        || type === TILETYPE_ID_AWARD
        || type === TILETYPE_ID_SPAWN
        || type === TILETYPE_ID_TRAP;
}

function isAirType(type) {
    return type === TILETYPE_ID_AIR;
}

function isWallType(type) {
    return type === TILETYPE_ID_WALL;
}

function scoreOf(type) {
    if (type === TILETYPE_ID_NORMAL || type === TILETYPE_ID_SPAWN) {
        return 1;
    } else if (type === TILETYPE_ID_AWARD) {
        return 5;
    }

    return 0;
}

function damageOf(type) {
    if (type === TILETYPE_ID_TRAP) {
        return 1;
    }

    return 0;
}

export class Tile {
    constructor({ row, col, type, award }) {
        /** @type {TileRow} */
        this.row = row;
        this.col = col;
        this.type = type;
        this.award = award;
        this.walkable = isWalkableType(type);
        this.score = scoreOf(type);
        this.damage = damageOf(type);
        if (!isAirType(type)) {
            this.mesh = new THREE.Mesh(
                isWallType(type) ? TILE_WALL_GEOMETRY : TILE_GEOMETRY,
                TILE_MATERIALS[this.type] || TILE_MATERIAL_UNKNOWN
            );
            this.mesh.userData.tileXY = [this.col, this.row.index];
            this.mesh.position.set(
                this.col * TILE_SPACING,
                this.row.index * TILE_STAIRS_OFFSET,
                this.row.index * TILE_SPACING
            );
            if (isWallType(type)) {
                this.mesh.position.y += TILE_SIZE * 0.25;
            }
            this.mesh.receiveShadow = true;
            this.mesh.updateMatrix();
        } else {
            this.mesh = null;
        }
    }
}