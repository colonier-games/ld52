import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import _TUTORIAL_LEVEL_DATA from '../assets/levels/tutorial.json';

import _LEVEL_TEST1_DATA from '../assets/levels/test1.json';
import _LEVEL_TEST2_DATA from '../assets/levels/test2.json';
import _LEVEL_TEST3_DATA from '../assets/levels/test3.json';
import _LEVEL_TEST4_DATA from '../assets/levels/test4.json';
import _LEVEL_TEST5_DATA from '../assets/levels/test5.json';
import _LEVEL_TEST6_DATA from '../assets/levels/test6.json';
import _LEVEL_TEST7_DATA from '../assets/levels/test7.json';
import _LEVEL_TEST8_DATA from '../assets/levels/test8.json';
import _LEVEL_TEST9_DATA from '../assets/levels/test9.json';

import _IMAGE_ICON_HEART_BROKEN from '../assets/icons/heart_broken.png';
import _IMAGE_ICON_HEART_FULL from '../assets/icons/heart_full.png';
import _IMAGE_ICON_SEED from '../assets/icons/seed.png';
import _IMAGE_ICON_SCISSORS from '../assets/icons/scissors.png';
import _IMAGE_ICON_WATERING_CAN from '../assets/icons/watering_can.png';

import _IMAGE_ICON_BTN_START from '../assets/icons/btn_start.png';
import _IMAGE_ICON_BTN_TUTORIAL from '../assets/icons/btn_tutorial.png';
import _IMAGE_ICON_BTN_CREDITS from '../assets/icons/btn_credits.png';
import _IMAGE_ICON_BTN_BACK from '../assets/icons/btn_back.png';
import _IMAGE_ICON_BTN_ARROWLEFT from '../assets/icons/btn_arrowleft.png';
import _IMAGE_ICON_BTN_ARROWRIGHT from '../assets/icons/btn_arrowright.png';

import _IMAGE_ICON_CHARACTER from '../assets/icons/character.png';

import _IMAGE_MANDALA_TILE from '../assets/mandala/tile.png';

import _IMAGE_MANDALA_SPAWN from '../assets/mandala/spawn.png';
import _IMAGE_MANDALA_TRAP from '../assets/mandala/trap.png';
import _IMAGE_MANDALA_VISION from '../assets/mandala/vision.png';
import _IMAGE_MANDALA_SCISSORS from '../assets/mandala/scissors.png';
import _IMAGE_MANDALA_WATERING_CAN from '../assets/mandala/watering_can.png';


import _IMAGE_MANDALA_A_1 from '../assets/mandala/A/a-1.png';
import _IMAGE_MANDALA_A_2 from '../assets/mandala/A/a-2.png';
import _IMAGE_MANDALA_A_3 from '../assets/mandala/A/a-3.png';
import _IMAGE_MANDALA_A_4 from '../assets/mandala/A/a-4.png';
import _IMAGE_MANDALA_A_5 from '../assets/mandala/A/a-5.png';

import _IMAGE_MANDALA_B_1 from '../assets/mandala/B/b-1.png';
import _IMAGE_MANDALA_B_2 from '../assets/mandala/B/b-2.png';
import _IMAGE_MANDALA_B_3 from '../assets/mandala/B/b-3.png';
import _IMAGE_MANDALA_B_4 from '../assets/mandala/B/b-4.png';
import _IMAGE_MANDALA_B_5 from '../assets/mandala/B/b-5.png';

import _IMAGE_MANDALA_C_1 from '../assets/mandala/C/c-1.png';
import _IMAGE_MANDALA_C_2 from '../assets/mandala/C/c-2.png';
import _IMAGE_MANDALA_C_3 from '../assets/mandala/C/c-3.png';
import _IMAGE_MANDALA_C_4 from '../assets/mandala/C/c-4.png';
import _IMAGE_MANDALA_C_5 from '../assets/mandala/C/c-5.png';

import _IMAGE_MANDALA_D_1 from '../assets/mandala/D/d-1.png';
import _IMAGE_MANDALA_D_2 from '../assets/mandala/D/d-2.png';
import _IMAGE_MANDALA_D_3 from '../assets/mandala/D/d-3.png';
import _IMAGE_MANDALA_D_4 from '../assets/mandala/D/d-4.png';
import _IMAGE_MANDALA_D_5 from '../assets/mandala/D/d-5.png';

import _IMAGE_MANDALA_E_1 from '../assets/mandala/E/e-1.png';
import _IMAGE_MANDALA_E_2 from '../assets/mandala/E/e-2.png';
import _IMAGE_MANDALA_E_3 from '../assets/mandala/E/e-3.png';
import _IMAGE_MANDALA_E_4 from '../assets/mandala/E/e-4.png';
import _IMAGE_MANDALA_E_5 from '../assets/mandala/E/e-5.png';

import _IMAGE_MANDALA_F_1 from '../assets/mandala/F/f-1.png';
import _IMAGE_MANDALA_F_2 from '../assets/mandala/F/f-2.png';
import _IMAGE_MANDALA_F_3 from '../assets/mandala/F/f-3.png';
import _IMAGE_MANDALA_F_4 from '../assets/mandala/F/f-4.png';
import _IMAGE_MANDALA_F_5 from '../assets/mandala/F/f-5.png';

import _IMAGE_MANDALA_G_1 from '../assets/mandala/G/g-1.png';
import _IMAGE_MANDALA_G_2 from '../assets/mandala/G/g-2.png';
import _IMAGE_MANDALA_G_3 from '../assets/mandala/G/g-3.png';
import _IMAGE_MANDALA_G_4 from '../assets/mandala/G/g-4.png';
import _IMAGE_MANDALA_G_5 from '../assets/mandala/G/g-5.png';

import _SVG_BACKGROUND_1 from '../assets/background/1.svg';
import _SVG_BACKGROUND_2 from '../assets/background/2.svg';
import _SVG_BACKGROUND_3 from '../assets/background/3.svg';
import _SVG_BACKGROUND_4 from '../assets/background/4.svg';
import _SVG_BACKGROUND_5 from '../assets/background/5.svg';
import _SVG_LOGO from '../assets/background/logo.svg';


import _GIF_TUTORIAL_MOVEMENT from '../assets/tutorial/movement.gif';
import _GIF_TUTORIAL_TRAPS from '../assets/tutorial/traps.gif';
import _GIF_TUTORIAL_WATERING_CAN from '../assets/tutorial/watering.gif';
import _GIF_TUTORIAL_SCISSORS from '../assets/tutorial/scissors.gif';

const textureLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();

export const TILE_SIZE = 0.2;
export const TILE_HEIGHT = 0.05;
export const TILE_SPACING = TILE_SIZE * 1.1;
export const TILE_STAIRS_OFFSET = TILE_SIZE * 0.125;
export const TILE_TOP_SIZE = 0.75 * TILE_SIZE;
export const PLAYER_SIZE = 0.025;
export const PLAYER_SPRITE_SCALE = 4.0;
export const PLAYER_ITEM_SIZE = 0.1;
export const SEED_SIZE = 0.03;
export const PLAYER_POSITION_Y = PLAYER_SIZE * 4;
export const MANDALA_POSITION_Y = TILE_HEIGHT;
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
export const AWARD_ITEM_GEOMETRY = new THREE.PlaneGeometry(TILE_TOP_SIZE, TILE_TOP_SIZE);
export const PLAYER_ITEM_GEOMETRY = new THREE.PlaneGeometry(PLAYER_ITEM_SIZE, PLAYER_ITEM_SIZE);
export const PLAYER_ITEM_OFFSET_Y = PLAYER_SIZE * 3;

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
export const TILETYPE_ID_AXE = 13;
export const TILETYPE_ID_TREE = 14;
export const TILETYPE_ID_WATERING_CAN = 15;
export const TILETYPE_ID_SEEDS = 16;
export const TILETYPE_ID_SCISSORS = 17;
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
    [TILETYPE_ID_AXE]: new THREE.MeshStandardMaterial({ color: 0xbfb29c, roughness: TILE_MATERIAL_ROUGHNESS }),
    [TILETYPE_ID_TREE]: new THREE.MeshStandardMaterial({ color: 0xbfb29c, roughness: TILE_MATERIAL_ROUGHNESS }),
    [TILETYPE_ID_WATERING_CAN]: new THREE.MeshStandardMaterial({ color: 0xbfb29c, roughness: TILE_MATERIAL_ROUGHNESS }),
    [TILETYPE_ID_SEEDS]: new THREE.MeshStandardMaterial({ color: 0xbfb29c, roughness: TILE_MATERIAL_ROUGHNESS }),
    [TILETYPE_ID_SCISSORS]: new THREE.MeshStandardMaterial({ color: 0xbfb29c, roughness: TILE_MATERIAL_ROUGHNESS }),
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
    _LEVEL_TEST2_DATA,
    _LEVEL_TEST3_DATA,
    _LEVEL_TEST4_DATA,
    _LEVEL_TEST5_DATA,
    _LEVEL_TEST6_DATA,
    _LEVEL_TEST7_DATA,
    _LEVEL_TEST8_DATA,
    _LEVEL_TEST9_DATA,
];

export const IMAGE_MANDALA_SPAWN = _IMAGE_MANDALA_SPAWN;
export const IMAGE_MANDALA_TRAP = _IMAGE_MANDALA_TRAP;
export const IMAGE_MANDALA_WATERING_CAN = _IMAGE_MANDALA_WATERING_CAN;
export const IMAGE_MANDALA_SCISSORS = _IMAGE_MANDALA_SCISSORS;

export const IMAGE_ICON_HEART_BROKEN = _IMAGE_ICON_HEART_BROKEN;
export const IMAGE_ICON_HEART_FULL = _IMAGE_ICON_HEART_FULL;
export const IMAGE_ICON_SEED = _IMAGE_ICON_SEED;

export const IMAGE_ICON_BTN_START = _IMAGE_ICON_BTN_START;
export const IMAGE_ICON_BTN_TUTORIAL = _IMAGE_ICON_BTN_TUTORIAL;
export const IMAGE_ICON_BTN_CREDITS = _IMAGE_ICON_BTN_CREDITS;
export const IMAGE_ICON_BTN_BACK = _IMAGE_ICON_BTN_BACK;
export const IMAGE_ICON_BTN_ARROWRIGHT = _IMAGE_ICON_BTN_ARROWRIGHT;
export const IMAGE_ICON_BTN_ARROWLEFT = _IMAGE_ICON_BTN_ARROWLEFT;

export const IMAGE_ICON_CHARACTER = _IMAGE_ICON_CHARACTER;

export const IMAGE_MANDALAS = {
    A: [_IMAGE_MANDALA_A_1, _IMAGE_MANDALA_A_2, _IMAGE_MANDALA_A_3, _IMAGE_MANDALA_A_4, _IMAGE_MANDALA_A_5],
    B: [_IMAGE_MANDALA_B_1, _IMAGE_MANDALA_B_2, _IMAGE_MANDALA_B_3, _IMAGE_MANDALA_B_4, _IMAGE_MANDALA_B_5],
    C: [_IMAGE_MANDALA_C_1, _IMAGE_MANDALA_C_2, _IMAGE_MANDALA_C_3, _IMAGE_MANDALA_C_4, _IMAGE_MANDALA_C_5],
    D: [_IMAGE_MANDALA_D_1, _IMAGE_MANDALA_D_2, _IMAGE_MANDALA_D_3, _IMAGE_MANDALA_D_4, _IMAGE_MANDALA_D_5],
    E: [_IMAGE_MANDALA_E_1, _IMAGE_MANDALA_E_2, _IMAGE_MANDALA_E_3, _IMAGE_MANDALA_E_4, _IMAGE_MANDALA_E_5],
    F: [_IMAGE_MANDALA_F_1, _IMAGE_MANDALA_F_2, _IMAGE_MANDALA_F_3, _IMAGE_MANDALA_F_4, _IMAGE_MANDALA_F_5],
    G: [_IMAGE_MANDALA_G_1, _IMAGE_MANDALA_G_2, _IMAGE_MANDALA_G_3, _IMAGE_MANDALA_G_4, _IMAGE_MANDALA_G_5],
}

export const SVG_BACKGROUND_1 = _SVG_BACKGROUND_1;
export const SVG_BACKGROUND_2 = _SVG_BACKGROUND_2;
export const SVG_BACKGROUND_3 = _SVG_BACKGROUND_3;
export const SVG_BACKGROUND_4 = _SVG_BACKGROUND_4;
export const SVG_BACKGROUND_5 = _SVG_BACKGROUND_5;
export const SVG_BACKGROUNDS = [SVG_BACKGROUND_1, SVG_BACKGROUND_2, SVG_BACKGROUND_3, SVG_BACKGROUND_4, SVG_BACKGROUND_5];
export const SVG_LOGO = _SVG_LOGO;


export const GIF_TUTORIAL_MOVEMENT = _GIF_TUTORIAL_MOVEMENT;
export const GIF_TUTORIAL_TRAPS = _GIF_TUTORIAL_TRAPS;
export const GIF_TUTORIAL_WATERING = _GIF_TUTORIAL_WATERING_CAN;
export const GIF_TUTORIAL_SCISSORS = _GIF_TUTORIAL_SCISSORS;


export const TEXTURE_ICON_SEED = textureLoader.load(_IMAGE_ICON_SEED);
export const TEXTURE_ICON_SCISSORS = textureLoader.load(_IMAGE_ICON_SCISSORS);
export const TEXTURE_ICON_WATERING_CAN = textureLoader.load(_IMAGE_ICON_WATERING_CAN);
export const TEXTURE_ICON_CHARACTER = textureLoader.load(_IMAGE_ICON_CHARACTER);

export const TEXTURE_MANDALA_TILE = textureLoader.load(_IMAGE_MANDALA_TILE);
export const TEXTURE_MANDALA_SPAWN = textureLoader.load(_IMAGE_MANDALA_SPAWN);
export const TEXTURE_MANDALA_TRAP = textureLoader.load(_IMAGE_MANDALA_TRAP);
export const TEXTURE_MANDALA_VISION = textureLoader.load(_IMAGE_MANDALA_VISION);
export const TEXTURE_MANDALA_SCISSORS = textureLoader.load(_IMAGE_MANDALA_SCISSORS);
export const TEXTURE_MANDALA_WATERING_CAN = textureLoader.load(_IMAGE_MANDALA_WATERING_CAN);

export const TEXTURE_MANDALAS = {
    A: [
        textureLoader.load(_IMAGE_MANDALA_A_1),
        textureLoader.load(_IMAGE_MANDALA_A_2),
        textureLoader.load(_IMAGE_MANDALA_A_3),
        textureLoader.load(_IMAGE_MANDALA_A_4),
        textureLoader.load(_IMAGE_MANDALA_A_5),
    ],
    B: [
        textureLoader.load(_IMAGE_MANDALA_B_1),
        textureLoader.load(_IMAGE_MANDALA_B_2),
        textureLoader.load(_IMAGE_MANDALA_B_3),
        textureLoader.load(_IMAGE_MANDALA_B_4),
        textureLoader.load(_IMAGE_MANDALA_B_5),
    ],
    C: [
        textureLoader.load(_IMAGE_MANDALA_C_1),
        textureLoader.load(_IMAGE_MANDALA_C_2),
        textureLoader.load(_IMAGE_MANDALA_C_3),
        textureLoader.load(_IMAGE_MANDALA_C_4),
        textureLoader.load(_IMAGE_MANDALA_C_5),
    ],
    D: [
        textureLoader.load(_IMAGE_MANDALA_D_1),
        textureLoader.load(_IMAGE_MANDALA_D_2),
        textureLoader.load(_IMAGE_MANDALA_D_3),
        textureLoader.load(_IMAGE_MANDALA_D_4),
        textureLoader.load(_IMAGE_MANDALA_D_5),
    ],
    E: [
        textureLoader.load(_IMAGE_MANDALA_E_1),
        textureLoader.load(_IMAGE_MANDALA_E_2),
        textureLoader.load(_IMAGE_MANDALA_E_3),
        textureLoader.load(_IMAGE_MANDALA_E_4),
        textureLoader.load(_IMAGE_MANDALA_E_5),
    ],
    F: [
        textureLoader.load(_IMAGE_MANDALA_F_1),
        textureLoader.load(_IMAGE_MANDALA_F_2),
        textureLoader.load(_IMAGE_MANDALA_F_3),
        textureLoader.load(_IMAGE_MANDALA_F_4),
        textureLoader.load(_IMAGE_MANDALA_F_5),
    ],
    G: [
        textureLoader.load(_IMAGE_MANDALA_G_1),
        textureLoader.load(_IMAGE_MANDALA_G_2),
        textureLoader.load(_IMAGE_MANDALA_G_3),
        textureLoader.load(_IMAGE_MANDALA_G_4),
        textureLoader.load(_IMAGE_MANDALA_G_5),
    ],
};

export const TILE_FALLING_ACCELERATION = 15.0;
export const TILE_UNVISITED_FALLING_MAX_TIME = 0.5;
export const TILE_VISITED_FALLING_MAX_TIME = 0.25;
export const TILE_APPEARING_MAX_OFFSET_VARIANCE = 100.0;
export const TILE_APPEARING_SPEED = 2.0;

export var GLTF_FLOWER_BEIGE_1 = null;
export var GLTF_FLOWER_BEIGE_2 = null;
export var GLTF_FLOWER_BEIGE_3 = null;
export var GLTF_FLOWER_BLUE_1 = null;
export var GLTF_FLOWER_BLUE_2 = null;
export var GLTF_FLOWER_BLUE_3 = null;
export var GLTF_FLOWER_RED_1 = null;
export var GLTF_FLOWER_RED_2 = null;
export var GLTF_FLOWER_RED_3 = null;
export var GLTF_GRASS_1 = null;
export var GLTF_GRASS_2 = null;
export var GLTF_FLOWERS = [];
export var GLTF_GRASSES = [];

export async function loadGltfModels() {

    GLTF_FLOWER_BEIGE_1 = await gltfLoader.loadAsync(
        new URL("../assets/models/flower_beige1.gltf", import.meta.url) + "",
    );
    GLTF_FLOWER_BEIGE_2 = await gltfLoader.loadAsync(
        new URL("../assets/models/flower_beige2.gltf", import.meta.url) + "",
    );
    GLTF_FLOWER_BEIGE_3 = await gltfLoader.loadAsync(
        new URL("../assets/models/flower_beige3.gltf", import.meta.url) + "",
    );
    GLTF_FLOWER_BLUE_1 = await gltfLoader.loadAsync(
        new URL("../assets/models/flower_blue1.gltf", import.meta.url) + "",
    );
    GLTF_FLOWER_BLUE_2 = await gltfLoader.loadAsync(
        new URL("../assets/models/flower_blue2.gltf", import.meta.url) + "",
    );
    GLTF_FLOWER_BLUE_3 = await gltfLoader.loadAsync(
        new URL("../assets/models/flower_blue3.gltf", import.meta.url) + "",
    );
    GLTF_FLOWER_RED_1 = await gltfLoader.loadAsync(
        new URL("../assets/models/flower_red1.gltf", import.meta.url) + "",
    );
    GLTF_FLOWER_RED_2 = await gltfLoader.loadAsync(
        new URL("../assets/models/flower_red2.gltf", import.meta.url) + "",
    );
    GLTF_FLOWER_RED_3 = await gltfLoader.loadAsync(
        new URL("../assets/models/flower_red3.gltf", import.meta.url) + "",
    );

    GLTF_GRASS_1 = await gltfLoader.loadAsync(
        new URL("../assets/models/grass.gltf", import.meta.url) + "",
    );
    GLTF_GRASS_2 = await gltfLoader.loadAsync(
        new URL("../assets/models/grass_dense.gltf", import.meta.url) + "",
    );

    GLTF_FLOWERS = [
        GLTF_FLOWER_BEIGE_1,
        GLTF_FLOWER_BEIGE_2,
        GLTF_FLOWER_BEIGE_3,
        GLTF_FLOWER_BLUE_1,
        GLTF_FLOWER_BLUE_2,
        GLTF_FLOWER_BLUE_3,
        GLTF_FLOWER_RED_1,
        GLTF_FLOWER_RED_2,
        GLTF_FLOWER_RED_3,
    ];

    GLTF_GRASSES = [
        GLTF_GRASS_1,
        GLTF_GRASS_2,
    ];

}