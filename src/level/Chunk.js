import * as THREE from 'three';
import { TILETYPE_ID_SPAWN, TILETYPE_ID_TRAP, TILETYPE_ID_VISION, TILE_HEIGHT, VISION_MARKER_GEOMETRY, VISION_MARKER_MATERIAL } from "../constants";
import { Tile } from "./Tile";

export class Chunk {
    constructor({ world, tileMapData, x, y, id }) {
        this.world = world;
        this.tileMapData = tileMapData;
        this.x = x;
        this.y = y;
        this.id = id;
        this.tiles = [];

        this.isFalling = false;
        this.fallingTimer = 0.0;

        this.parseTileMap();
    }

    parseTileMap() {

        const tilesLayer = this.tileMapData.layers
            .find(layer => layer.name === 'tiles');
        const width = tilesLayer.width;
        const height = tilesLayer.height;
        const data = tilesLayer.data;

        this.rowCount = height;
        this.colCount = width;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const tileId = data[y * width + x];

                let tile = new Tile({ level: this, row: y + this.y, col: x + this.x, type: tileId, award: null, chunkId: this.id });
                this.tiles.push(tile);
            }
        }

    }

    move([x, y]) {
        this.x = x;
        this.y = y;
        this.tiles.forEach((tile, tileIndex) => {
            const tileX = tileIndex % this.colCount;
            const tileY = Math.floor(tileIndex / this.colCount);
            tile.move([tileX + x, tileY + y]);
        });
    }

    addToScene(scene) {
        this.tiles.filter(tile => !!tile.mesh)
            .forEach(tile => scene.add(tile.mesh));
        this.tiles.filter(tile => !!tile.topMesh)
            .forEach(tile => scene.add(tile.topMesh));
    }

    removeFromScene(scene) {
        this.tiles.filter(tile => !!tile.mesh)
            .forEach(tile => {
                scene.remove(tile.mesh);
            });
        this.tiles.filter(tile => !!tile.topMesh)
            .forEach(tile => {
                scene.remove(tile.topMesh);
            });
        this.tiles.filter(tile => !!tile.flower)
            .forEach(tile => {
                scene.remove(tile.flower);
            });

        this.visionMarkers.forEach(marker => {
            scene.remove(marker);
        });
    }

    tileAt([x, y]) {
        return this.tiles[y * this.colCount + x];
    }

    makeTilesFall() {
        this.isFalling = true;
        this.fallingTimer = 0.0;
        this.tiles.forEach(tile => {
            tile.makeFall();
        });
    }

    updateFalling(dt) {
        if (!this.isFalling) {
            return;
        }
        this.fallingTimer += dt;
        this.tiles.forEach(
            tile => tile.updateFalling(dt)
        );
    }

}