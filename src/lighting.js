import * as THREE from 'three';
import { LIGHT_COLOR_AMBIENT, LIGHT_COLOR_FILL, LIGHT_COLOR_SUN, LIGHT_FILL_DIRECTION, LIGHT_INTENSITY_AMBIENT, LIGHT_INTENSITY_FILL, LIGHT_INTENSITY_SUN, LIGHT_SUN_DIRECTION } from './constants';

export function createLights() {
    const sun = new THREE.DirectionalLight(LIGHT_COLOR_SUN, LIGHT_INTENSITY_SUN);
    sun.position.copy(LIGHT_SUN_DIRECTION);
    sun.castShadow = true;
    sun.shadow.mapSize.x = 2048;
    sun.shadow.mapSize.y = 2048;

    const backLight = new THREE.DirectionalLight(LIGHT_COLOR_FILL, LIGHT_INTENSITY_FILL);
    backLight.position.copy(LIGHT_FILL_DIRECTION);
    backLight.castShadow = false;
    
    return [
        new THREE.AmbientLight(LIGHT_COLOR_AMBIENT, LIGHT_INTENSITY_AMBIENT),
        sun,
        backLight
    ]
}