import * as THREE from 'three';

import _TUTORIAL_LEVEL_DATA from '../assets/levels/tutorial.json';

import _LEVEL_TEST1_DATA from '../assets/levels/test1.json';
import _LEVEL_TEST2_DATA from '../assets/levels/test2.json';

import _IMAGE_ICON_HEART_BROKEN from '../assets/icons/heart_broken.png';
import _IMAGE_ICON_HEART_FULL from '../assets/icons/heart_full.png';

import _IMAGE_MANDALA_1 from '../assets/mandala/mandalak-01.png';
import _IMAGE_MANDALA_2 from '../assets/mandala/mandalak-02.png';
import _IMAGE_MANDALA_3 from '../assets/mandala/mandalak-03.png';
import _IMAGE_MANDALA_4 from '../assets/mandala/mandalak-04.png';
import _IMAGE_MANDALA_5 from '../assets/mandala/mandalak-05.png';
import _IMAGE_MANDALA_6 from '../assets/mandala/mandalak-06.png';
import _IMAGE_MANDALA_7 from '../assets/mandala/mandalak-07.png';
import _IMAGE_MANDALA_8 from '../assets/mandala/mandalak-08.png';
import _IMAGE_MANDALA_9 from '../assets/mandala/mandalak-09.png';
import _IMAGE_MANDALA_10 from '../assets/mandala/mandalak-10.png';

import _IMAGE_MANDALA_SPAWN from '../assets/mandala/spawn.png';
import _IMAGE_MANDALA_TRAP from '../assets/mandala/trap.png';
import _IMAGE_MANDALA_VISION from '../assets/mandala/vision.png';

import _SVG_BACKGROUND_ROOM from '../assets/background/room.svg';

const textureLoader = new THREE.TextureLoader();

export const TILE_SIZE = 0.2;
export const TILE_HEIGHT = 0.05;
export const TILE_SPACING = TILE_SIZE * 1.1;
export const TILE_STAIRS_OFFSET = TILE_SIZE * 0.125;
export const TILE_TOP_SIZE = 0.75 * TILE_SIZE;
export const PLAYER_SIZE = 0.1;
export const PLAYER_POSITION_Y = PLAYER_SIZE;
export const CAMERA_START_POSITION = new THREE.Vector3(-25, 25, -25);
export const TILE_GEOMETRY = new THREE.BoxGeometry(TILE_SIZE, TILE_HEIGHT, TILE_SIZE);
export const TILE_WALL_GEOMETRY = new THREE.BoxGeometry(TILE_SIZE, TILE_HEIGHT * 4, TILE_SIZE);
export const PLAYER_GEOMETRY = new THREE.SphereGeometry(PLAYER_SIZE);
export const PLAYER_MATERIAL = new THREE.MeshStandardMaterial({ color: 0xffaa33 });
export const WALKABLE_TILE_MARKER_GEOMETRY = new THREE.TorusGeometry(TILE_SIZE * 0.4, TILE_SIZE * 0.05);
export const WALKABLE_TILE_MARKER_MATERIAL = new THREE.MeshBasicMaterial({ color: 0x00ffff });
export const VISION_MARKER_GEOMETRY = new THREE.TorusGeometry(TILE_SIZE * 0.4, TILE_SIZE * 0.05);
export const VISION_MARKER_MATERIAL = new THREE.MeshBasicMaterial({ color: 0xff0000 });
export const TILE_TOP_GEOMETRY = new THREE.PlaneGeometry(TILE_TOP_SIZE, TILE_TOP_SIZE);

export const TILETYPE_ID_TRAP = 1;
export const TILETYPE_ID_NORMAL = 2;
export const TILETYPE_ID_AWARD = 3;
export const TILETYPE_ID_WALL = 4;
export const TILETYPE_ID_VISION = 5;
export const TILETYPE_ID_CHECKPOINT = 8;
export const TILETYPE_ID_EXIT_NORTH = 9;
export const TILETYPE_ID_EXIT_EAST = 10;
export const TILETYPE_ID_EXIT_SOUTH = 11;
export const TILETYPE_ID_EXIT_WEST = 12;
export const TILETYPE_ID_SPAWN = 63;
export const TILETYPE_ID_AIR = 64;

export const TILE_MATERIAL_ROUGHNESS = 0.05;


export const TILE_MATERIALS = {
    [TILETYPE_ID_TRAP]: new THREE.MeshStandardMaterial({ color: 0xbfb29c, roughness: TILE_MATERIAL_ROUGHNESS }),
    [TILETYPE_ID_NORMAL]: new THREE.MeshStandardMaterial({ color: 0xbfb29c, roughness: TILE_MATERIAL_ROUGHNESS }),
    [TILETYPE_ID_AWARD]: new THREE.MeshStandardMaterial({ color: 0xbfb29c, roughness: TILE_MATERIAL_ROUGHNESS }),
    [TILETYPE_ID_WALL]: new THREE.MeshStandardMaterial({ color: 0xbfb29c, roughness: TILE_MATERIAL_ROUGHNESS }),
    [TILETYPE_ID_SPAWN]: new THREE.MeshStandardMaterial({ color: 0xbfb29c, roughness: TILE_MATERIAL_ROUGHNESS }),
    [TILETYPE_ID_VISION]: new THREE.MeshStandardMaterial({ color: 0xbfb29c, roughness: TILE_MATERIAL_ROUGHNESS }),
    [TILETYPE_ID_CHECKPOINT]: new THREE.MeshStandardMaterial({ color: 0xbfb29c, roughness: TILE_MATERIAL_ROUGHNESS }),
    [TILETYPE_ID_EXIT_NORTH]: new THREE.MeshStandardMaterial({ color: 0xbfb29c, roughness: TILE_MATERIAL_ROUGHNESS }),
    [TILETYPE_ID_EXIT_EAST]: new THREE.MeshStandardMaterial({ color: 0xbfb29c, roughness: TILE_MATERIAL_ROUGHNESS }),
    [TILETYPE_ID_EXIT_SOUTH]: new THREE.MeshStandardMaterial({ color: 0xbfb29c, roughness: TILE_MATERIAL_ROUGHNESS }),
    [TILETYPE_ID_EXIT_WEST]: new THREE.MeshStandardMaterial({ color: 0xbfb29c, roughness: TILE_MATERIAL_ROUGHNESS }),
}
export const TILE_MATERIAL_UNKNOWN = new THREE.MeshStandardMaterial({ color: 0xbfb29c });

export const LIGHT_COLOR_SUN = 0xffedd0;
export const LIGHT_COLOR_FILL = 0x807768;
export const LIGHT_COLOR_AMBIENT = 0xffffff;
export const LIGHT_INTENSITY_SUN = 4.0;
export const LIGHT_INTENSITY_FILL = 4.0;
export const LIGHT_INTENSITY_AMBIENT = 0.25;
export const LIGHT_SUN_DIRECTION = new THREE.Vector3(10, -6, 0).negate().normalize();
export const LIGHT_FILL_DIRECTION = new THREE.Vector3(0, -6, 10).negate().normalize();

export const TUTORIAL_LEVEL_DATA = _TUTORIAL_LEVEL_DATA;

export const LEVEL_DATAS = [
    _LEVEL_TEST1_DATA,
    _LEVEL_TEST2_DATA
];

export const IMAGE_ICON_HEART_BROKEN = _IMAGE_ICON_HEART_BROKEN;
export const IMAGE_ICON_HEART_FULL = _IMAGE_ICON_HEART_FULL;

export const IMAGE_MANDALAS = [
    _IMAGE_MANDALA_1,
    _IMAGE_MANDALA_2,
    _IMAGE_MANDALA_3,
    _IMAGE_MANDALA_4,
    _IMAGE_MANDALA_5,
    _IMAGE_MANDALA_6,
    _IMAGE_MANDALA_7,
    _IMAGE_MANDALA_8,
    _IMAGE_MANDALA_9,
    _IMAGE_MANDALA_10,
];

export const SVG_BACKGROUND_ROOM = _SVG_BACKGROUND_ROOM;

export const TEXTURE_MANDALA_1 = textureLoader.load(_IMAGE_MANDALA_1);
export const TEXTURE_MANDALA_2 = textureLoader.load(_IMAGE_MANDALA_2);
export const TEXTURE_MANDALA_3 = textureLoader.load(_IMAGE_MANDALA_3);
export const TEXTURE_MANDALA_4 = textureLoader.load(_IMAGE_MANDALA_4);
export const TEXTURE_MANDALA_5 = textureLoader.load(_IMAGE_MANDALA_5);
export const TEXTURE_MANDALA_6 = textureLoader.load(_IMAGE_MANDALA_6);
export const TEXTURE_MANDALA_7 = textureLoader.load(_IMAGE_MANDALA_7);
export const TEXTURE_MANDALA_8 = textureLoader.load(_IMAGE_MANDALA_8);
export const TEXTURE_MANDALA_9 = textureLoader.load(_IMAGE_MANDALA_9);
export const TEXTURE_MANDALA_10 = textureLoader.load(_IMAGE_MANDALA_10);
export const TEXTURE_MANDALA_SPAWN = textureLoader.load(_IMAGE_MANDALA_SPAWN);
export const TEXTURE_MANDALA_TRAP = textureLoader.load(_IMAGE_MANDALA_TRAP);
export const TEXTURE_MANDALA_VISION = textureLoader.load(_IMAGE_MANDALA_VISION);

export const TEXTURE_MANDALAS = [
    TEXTURE_MANDALA_1,
    TEXTURE_MANDALA_2,
    TEXTURE_MANDALA_3,
    TEXTURE_MANDALA_4,
    TEXTURE_MANDALA_5,
    TEXTURE_MANDALA_6,
    TEXTURE_MANDALA_7,
    TEXTURE_MANDALA_8,
    TEXTURE_MANDALA_9,
    TEXTURE_MANDALA_10
];

export const TILE_FALLING_ACCELERATION = 15.0;
export const TILE_UNVISITED_FALLING_MAX_TIME = 0.5;
export const TILE_VISITED_FALLING_MAX_TIME = 0.25;
export const TILE_APPEARING_MAX_OFFSET_VARIANCE = 100.0;
export const TILE_APPEARING_SPEED = 2.0;