import * as THREE from 'three';
import { LEVEL_DATAS, TILETYPE_ID_EXIT_EAST, TILETYPE_ID_EXIT_NORTH, TILETYPE_ID_EXIT_SOUTH, TILETYPE_ID_EXIT_WEST, TILETYPE_ID_SPAWN, TILETYPE_ID_TRAP, TILETYPE_ID_VISION, TILE_HEIGHT, TILE_SIZE, VISION_MARKER_GEOMETRY, VISION_MARKER_MATERIAL, WALKABLE_TILE_MARKER_GEOMETRY, WALKABLE_TILE_MARKER_MATERIAL } from '../constants';
import { Tile } from './Tile';
import { TileRow } from './TileRow';

function exitTileTypeIdForDirection(direction) {
    switch (direction) {
        case 'north':
            return TILETYPE_ID_EXIT_NORTH;
        case 'south':
            return TILETYPE_ID_EXIT_SOUTH;
        case 'east':
            return TILETYPE_ID_EXIT_EAST;
        case 'west':
            return TILETYPE_ID_EXIT_WEST;
        default:
            return TILETYPE_ID_EXIT_NORTH;
    }
}

export class Level {
    constructor({ world, tileMapData }) {
        this.world = world;
        this.rows = [];
        this.tileMapData = tileMapData;
        this.nextChunkId = 0;

        this.parseChunk(this.tileMapData);
        this.createWalkableMarkers();
        this.createVisionMarkers();

        this.world.addEventListener('player-exit-level', this.onPlayerExitLevel.bind(this));
    }

    createWalkableMarkers() {
        this.leftWalkableMarker = new THREE.Mesh(
            WALKABLE_TILE_MARKER_GEOMETRY,
            WALKABLE_TILE_MARKER_MATERIAL
        );
        this.leftWalkableMarker.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
        this.leftWalkableMarker.visible = false;

        this.rightWalkableMarker = new THREE.Mesh(
            WALKABLE_TILE_MARKER_GEOMETRY,
            WALKABLE_TILE_MARKER_MATERIAL
        );
        this.rightWalkableMarker.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
        this.rightWalkableMarker.visible = false;

        this.forwardWalkableMarker = new THREE.Mesh(
            WALKABLE_TILE_MARKER_GEOMETRY,
            WALKABLE_TILE_MARKER_MATERIAL
        );
        this.forwardWalkableMarker.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
        this.forwardWalkableMarker.visible = false;

        this.backwardWalkableMarker = new THREE.Mesh(
            WALKABLE_TILE_MARKER_GEOMETRY,
            WALKABLE_TILE_MARKER_MATERIAL
        );
        this.backwardWalkableMarker.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
        this.backwardWalkableMarker.visible = false;
    }

    createVisionMarkers() {
        if (this.visionMarkers && this.visionMarkers.length > 0) {
            this.visionMarkers.forEach(marker => {
                this.scene.remove(marker);
                marker.dispose();
            });
            return;
        }
        this.visionMarkers = [];
        this.rows.forEach(
            row => row.tiles.filter(tile => tile.type === TILETYPE_ID_TRAP).forEach(
                tile => {
                    const marker = new THREE.Mesh(
                        VISION_MARKER_GEOMETRY,
                        VISION_MARKER_MATERIAL
                    );
                    marker.position.copy(tile.mesh.position);
                    marker.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
                    marker.position.add(
                        new THREE.Vector3(0, TILE_HEIGHT, 0)
                    )
                    marker.visible = false;
                    this.visionMarkers.push(marker);
                }
            )
        );
    }

    parseChunk(chunkData) {

        const tilesLayer = chunkData.layers
            .find(layer => layer.name === 'tiles');
        const width = tilesLayer.width;
        const height = tilesLayer.height;
        const data = tilesLayer.data;

        this.rowCount = height;
        this.colCount = width;

        for (let y = 0; y < height; y++) {
            let row = new TileRow({ level: this, index: y, chunkId: this.nextChunkId });
            for (let x = 0; x < width; x++) {
                const tileId = data[y * width + x];

                if (tileId === TILETYPE_ID_SPAWN) {
                    this.world.spawnPosition = [x, y];
                }

                let tile = new Tile({ level: this, row, col: x, type: tileId, award: null });
                row.tiles.push(tile);
            }

            this.rows.push(row);
        }

        this.nextChunkId++;

    }

    addToScene(scene) {

        this.rows.forEach(row => {
            row.addToScene(scene);
        });

        scene.add(this.leftWalkableMarker);
        scene.add(this.rightWalkableMarker);
        scene.add(this.forwardWalkableMarker);
        scene.add(this.backwardWalkableMarker);

        this.visionMarkers.forEach(marker => scene.add(marker));

    }

    walkableTiles() {
        const tiles = [];
        if (this.world.player.position[0] > 0) {
            tiles.push(
                this.rows[this.world.player.position[1]].tiles[this.world.player.position[0] - 1]
            );
        }
        if (this.world.player.position[0] < this.rowCount - 1) {
            tiles.push(
                this.rows[this.world.player.position[1]].tiles[this.world.player.position[0] + 1]
            );
        }
        if (this.world.player.position[1] > 0) {
            tiles.push(
                this.rows[this.world.player.position[1] - 1].tiles[this.world.player.position[0]]
            );
        }
        if (this.world.player.position[1] < this.colCount - 1) {
            tiles.push(
                this.rows[this.world.player.position[1] + 1].tiles[this.world.player.position[0]]
            );
        }

        return tiles.filter(tile => tile.walkable);
    }

    updateWalkableMarkers() {
        const walkableTiles = this.walkableTiles();
        this.leftWalkableMarker.visible = false;
        this.rightWalkableMarker.visible = false;
        this.forwardWalkableMarker.visible = false;
        this.backwardWalkableMarker.visible = false;

        walkableTiles.forEach(tile => {
            if (tile.col < this.world.player.position[0]) {
                this.leftWalkableMarker.position.copy(tile.mesh.position);
                this.leftWalkableMarker.position.add(
                    new THREE.Vector3(0, TILE_HEIGHT, 0)
                );
                this.leftWalkableMarker.visible = true;
            } else if (tile.col > this.world.player.position[0]) {
                this.rightWalkableMarker.position.copy(tile.mesh.position);
                this.rightWalkableMarker.position.add(
                    new THREE.Vector3(0, TILE_HEIGHT, 0)
                );
                this.rightWalkableMarker.visible = true;
            } else if (tile.row.index < this.world.player.position[1]) {
                this.forwardWalkableMarker.position.copy(tile.mesh.position);
                this.forwardWalkableMarker.position.add(
                    new THREE.Vector3(0, TILE_HEIGHT, 0)
                );
                this.forwardWalkableMarker.visible = true;
            } else if (tile.row.index > this.world.player.position[1]) {
                this.backwardWalkableMarker.position.copy(tile.mesh.position);
                this.backwardWalkableMarker.position.add(
                    new THREE.Vector3(0, TILE_HEIGHT, 0)
                );
                this.backwardWalkableMarker.visible = true;
            }
        });

        this.leftWalkableMarker.updateMatrix();
        this.rightWalkableMarker.updateMatrix();
        this.forwardWalkableMarker.updateMatrix();
        this.backwardWalkableMarker.updateMatrix();

    }

    updateVisionMarkers() {
        const standingTile = this.tileAt(
            this.world.player.position[0],
            this.world.player.position[1]
        );
        if (standingTile.type === TILETYPE_ID_VISION) {
            this.visionMarkers.forEach(marker => marker.visible = true);
        } else {
            this.visionMarkers.forEach(marker => marker.visible = false);
        }
    }

    tileAt(x, y) {
        return this.rows[y].tiles[x];
    }

    findExitForChunk({ chunkId, direction }) {
        const chunkRows = this.rows.filter(row => row.chunkId === chunkId);
        const exitTile = chunkRows.flatMap(row => row.tiles)
            .find(tile => tile.type === exitTileTypeIdForDirection(direction));
        return exitTile;
    }

}