import * as THREE from 'three';
import { Award } from '../award/Award';
import { Tile } from './Tile';

function randomTile({ row, col }) {

    let roll = Math.floor(Math.random() * 100.0);
    let rollMod3 = roll % 3;

    switch (rollMod3) {
        case 0:
            return new Tile({ row, col, type: 'normal' });
        case 1:
            return new Tile({ row, col, type: 'award', award: new Award({ type: 'star' }) });
        case 2:
            return new Tile({ row, col, type: 'trap' });
        default:
            return new Tile({ row, col, type: 'normal' });
    }

}

export class TileRow {
    constructor({ index, chunkId, offset }) {
        this.index = index;
        this.offset = offset;
        this.chunkId = chunkId;
        this.tiles = [];
    }

    addToScene(scene) {
        this.tiles
            .filter(tile => !!tile.mesh)
            .forEach(tile => {
                scene.add(tile.mesh);
            });
    }
}