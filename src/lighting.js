import * as THREE from 'three';

export function createLights() {
    const sun = new THREE.DirectionalLight(0xffac23, 1.0);
    sun.position.set(10, 10, -10);
    sun.lookAt(0, 0, 0);
    sun.castShadow = true;

    const backLight = new THREE.DirectionalLight(0x23acff, 0.25);
    backLight.position.set(-10, 10, 10);
    backLight.lookAt(0, 0, 0);

    return [
        new THREE.AmbientLight(0xffffff, 0.1),
        sun,
        backLight
    ]
}