import * as THREE from 'three';

import _TUTORIAL_LEVEL_DATA from '../assets/levels/tutorial.json';

export const TILE_SIZE = 0.2;
export const TILE_HEIGHT = 0.05;
export const TILE_SPACING = TILE_SIZE * 1.1;
export const TILE_STAIRS_OFFSET = TILE_SIZE * 0.25;
export const PLAYER_SIZE = 0.1;
export const PLAYER_POSITION_Y = PLAYER_SIZE;
export const CAMERA_START_POSITION = new THREE.Vector3(-25, 25, -25);
export const TILE_GEOMETRY = new THREE.BoxGeometry(TILE_SIZE, TILE_HEIGHT, TILE_SIZE);
export const TILE_WALL_GEOMETRY = new THREE.BoxGeometry(TILE_SIZE, TILE_HEIGHT * 4, TILE_SIZE);
export const PLAYER_GEOMETRY = new THREE.SphereGeometry(PLAYER_SIZE);
export const PLAYER_MATERIAL = new THREE.MeshStandardMaterial({ color: 0xffaa33 });
export const WALKABLE_TILE_MARKER_GEOMETRY = new THREE.TorusGeometry(TILE_SIZE * 0.4, TILE_SIZE * 0.05);
export const WALKABLE_TILE_MARKER_MATERIAL = new THREE.MeshBasicMaterial({ color: 0x00ffff });

export const TILETYPE_ID_TRAP = 1;
export const TILETYPE_ID_NORMAL = 2;
export const TILETYPE_ID_AWARD = 3;
export const TILETYPE_ID_WALL = 4;
export const TILETYPE_ID_SPAWN = 63;
export const TILETYPE_ID_AIR = 64;

export const TILE_MATERIALS = {
    [TILETYPE_ID_TRAP]: new THREE.MeshStandardMaterial({ color: 0x33ffaa }),
    [TILETYPE_ID_NORMAL]: new THREE.MeshStandardMaterial({ color: 0x33ffaa }),
    [TILETYPE_ID_AWARD]: new THREE.MeshStandardMaterial({ color: 0x33aaff }),
    [TILETYPE_ID_WALL]: new THREE.MeshStandardMaterial({ color: 0x333333 }),
    [TILETYPE_ID_SPAWN]: new THREE.MeshStandardMaterial({ color: 0x33ffaa }),
}
export const TILE_MATERIAL_UNKNOWN = new THREE.MeshStandardMaterial({ color: 0xff00ff });

export const TUTORIAL_LEVEL_DATA = _TUTORIAL_LEVEL_DATA;