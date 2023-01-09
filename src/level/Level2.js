import * as THREE from "three";

import { LEVEL_DATAS, TILETYPE_ID_AIR, TILETYPE_ID_AWARD, TILETYPE_ID_EXIT_EAST, TILETYPE_ID_EXIT_NORTH, TILETYPE_ID_EXIT_SOUTH, TILETYPE_ID_EXIT_WEST, TILETYPE_ID_NORMAL, TILETYPE_ID_SPAWN, TILETYPE_ID_TRAP, TILETYPE_ID_VISION, TILETYPE_ID_WALL, TILE_HEIGHT, TILE_MATERIALS, TUTORIAL_LEVEL_DATA, WALKABLE_TILE_MARKER_GEOMETRY, WALKABLE_TILE_MARKER_MATERIAL } from "../constants";
import { Chunk } from "./Chunk";

function matchingExitFor({ tile, nextChunk }) {
    const nextChunkExits = nextChunk.tiles.filter(tile => tile.isExit);

    switch (tile.type) {
        case TILETYPE_ID_EXIT_NORTH:
            return nextChunkExits.find(exit => exit.type === TILETYPE_ID_EXIT_SOUTH);
        case TILETYPE_ID_EXIT_SOUTH:
            return nextChunkExits.find(exit => exit.type === TILETYPE_ID_EXIT_NORTH);
        case TILETYPE_ID_EXIT_EAST:
            return nextChunkExits.find(exit => exit.type === TILETYPE_ID_EXIT_WEST);
        case TILETYPE_ID_EXIT_WEST:
            return nextChunkExits.find(exit => exit.type === TILETYPE_ID_EXIT_EAST);
        default:
            return null;
    }
}

function nextChunkOffsetForExit({ tile, nextChunk }) {
    switch (tile.type) {
        case TILETYPE_ID_EXIT_NORTH:
            return [0, -1];
        case TILETYPE_ID_EXIT_SOUTH:
            return [0, nextChunk.rowCount];
        case TILETYPE_ID_EXIT_EAST:
            return [1, 0];
        case TILETYPE_ID_EXIT_WEST:
            return [-1, 0];
    }
}

export class Level2 {
    constructor({ world }) {
        this.world = world;
        this.chunks = [];
        this.fallingChunks = [];
        this.nextChunkId = 0;

        this.generateInitialChunk();
        this.generateNewChunk();

        this.world.addEventListener("player-chunk-changed", this.onPlayerChunkChanged.bind(this));
        this.world.addEventListener("player-moved-to", this.onPlayerMoved.bind(this));

        console.log(this);
    }

    addToScene(scene) {
    }

    generateInitialChunk() {
        let chunk = new Chunk({ world: this.world, x: 0, y: 0, tileMapData: TUTORIAL_LEVEL_DATA, id: this.nextChunkId++ });
        this.chunks.push(chunk);
        chunk.addToScene(this.world.scene);

        const spawnTile = chunk.tiles.find(tile => tile.type === TILETYPE_ID_SPAWN);
        this.world.spawnPosition = [spawnTile.col, spawnTile.row];
    }

    generateNewChunk(exceptExit) {

        const lastChunk = this.chunks[this.chunks.length - 1];
        const chunkExits = lastChunk.tiles.filter(tile => tile.isExit);
        let randomExit = chunkExits[Math.floor(Math.random() * chunkExits.length)];
        if (exceptExit) {
            while (randomExit === exceptExit) {
                randomExit = chunkExits[Math.floor(Math.random() * chunkExits.length)];
            }
        }
        const possibleChunkDatas = LEVEL_DATAS;
        const randomChunkData = possibleChunkDatas[Math.floor(Math.random() * possibleChunkDatas.length)];
        const nextChunk = new Chunk({ world: this.world, x: 0, y: 0, tileMapData: randomChunkData, id: this.nextChunkId++ });
        const matchingExit = matchingExitFor({ tile: randomExit, nextChunk });

        let nextChunkOffsetX = 0;
        let nextChunkOffsetY = 0;

        switch (randomExit.type) {
            case TILETYPE_ID_EXIT_NORTH:
                nextChunkOffsetY = lastChunk.y - nextChunk.rowCount;
                nextChunkOffsetX = randomExit.col - matchingExit.col;
                break;
            case TILETYPE_ID_EXIT_SOUTH:
                nextChunkOffsetY = lastChunk.y + lastChunk.rowCount;
                nextChunkOffsetX = randomExit.col - matchingExit.col;
                break;
            case TILETYPE_ID_EXIT_EAST:
                nextChunkOffsetX = lastChunk.x + lastChunk.colCount;
                nextChunkOffsetY = randomExit.row - matchingExit.row;
                break;
            case TILETYPE_ID_EXIT_WEST:
                nextChunkOffsetX = lastChunk.x - nextChunk.colCount;
                nextChunkOffsetY = randomExit.row - matchingExit.row;
                break;
        }

        nextChunk.move([
            nextChunkOffsetX,
            nextChunkOffsetY
        ]);

        this.chunks.push(nextChunk);
        nextChunk.addToScene(this.world.scene);

    }

    tileAt([x, y]) {
        const chunk = this.chunks.find(
            chunk => chunk.x <= x && chunk.x + chunk.colCount > x && chunk.y <= y && chunk.y + chunk.rowCount > y
        );
        if (!chunk) {
            return null;
        }
        return chunk.tileAt([x - chunk.x, y - chunk.y]);
    }

    walkableTiles() {
        const tiles = [];

        tiles.push(
            this.tileAt([this.world.player.position[0] - 1, this.world.player.position[1]])
        );

        tiles.push(
            this.tileAt([this.world.player.position[0] + 1, this.world.player.position[1]])
        );

        tiles.push(
            this.tileAt([this.world.player.position[0], this.world.player.position[1] - 1])
        );

        tiles.push(
            this.tileAt([this.world.player.position[0], this.world.player.position[1] + 1])
        );

        return tiles.filter(tile => !!tile).filter(tile => tile.walkable);
    }

    updateFallingChunks(dt) {
        this.fallingChunks.forEach(chunk => chunk.updateFalling(dt));
        const fallenChunks = this.fallingChunks.filter(chunk => chunk.isFalling && chunk.fallingTimer > 15.0);
        fallenChunks.forEach(chunk => chunk.removeFromScene(this.world.scene));
        this.fallingChunks = this.fallingChunks.filter(chunk => fallenChunks.indexOf(chunk) === -1);
    }

    onPlayerChunkChanged(newChunkId) {

        const removeChunks = this.chunks.filter(chunk => chunk.id !== newChunkId);
        this.chunks = this.chunks.filter(chunk => chunk.id === newChunkId);
        removeChunks.forEach(chunk => chunk.makeTilesFall());
        this.fallingChunks.push(...removeChunks);
        this.generateNewChunk(
            this.tileAt(this.world.player.position)
        );

        console.log(this);

    }

    onPlayerMoved(toPosition) {
        const newTile = this.tileAt(toPosition);
        if (newTile.type === TILETYPE_ID_VISION) {
            this.chunks.forEach(
                chunk => chunk.tiles.filter(tile => tile.type === TILETYPE_ID_TRAP)
                    .forEach(tile => tile.topMesh.visible = true)
            );
        } else {
            this.chunks.forEach(
                chunk => chunk.tiles.filter(tile => tile.type === TILETYPE_ID_TRAP)
                    .forEach(tile => tile.topMesh.visible = false)
            );
        }
    }

    fixAwardTiles() {
        this.chunks.forEach(
            chunk => chunk.tiles.filter(tile => tile.type === TILETYPE_ID_AWARD)
                .forEach(
                    tile => {
                        const progress = this.world.player.mandalaProgress[tile.mandalaType];
                        if (progress >= 5) {
                            tile.type = TILETYPE_ID_NORMAL;
                            tile.topMesh.visible = false;
                            tile.mesh.material = TILE_MATERIALS[TILETYPE_ID_NORMAL];
                        }
                    }
                )
        );
    }

    floweredTilesInLine(point, dir) {
        let x = point[0];
        let y = point[1];
        const tiles = [];

        while (true) {
            x += dir[0];
            y += dir[1];
            const tile = this.tileAt([x, y]);
            if (!tile
                || tile.type === TILETYPE_ID_WALL
                || tile.type === TILETYPE_ID_AIR
                || tile.flowerPoints < 1) {
                break;
            }
            tiles.push(tile);
        }

        return tiles;
    }

}