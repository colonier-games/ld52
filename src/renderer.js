import * as THREE from 'three';

export const RENDERER = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
});

RENDERER.setClearColor(0x000000, 0);
RENDERER.shadowMap.enabled = true;
RENDERER.shadowMap.type = THREE.PCFSoftShadowMap;
RENDERER.physicallyCorrectLights = true;