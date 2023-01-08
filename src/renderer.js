import * as THREE from 'three';

export const RENDERER = new THREE.WebGLRenderer({
    alpha: true
});

RENDERER.setClearColor(0x000000, 0);