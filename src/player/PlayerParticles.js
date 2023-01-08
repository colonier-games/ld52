import * as THREE from 'three';

const MAX_PARTICLE_COUNT = 1000;

export class PlayerParticles {
    constructor() {
        this.geometry = new THREE.BufferGeometry();
        this.vertices = [];
        this.colors = [];
        for(let i = 0; i < MAX_PARTICLE_COUNT; i++) {
            this.vertices.push(0, 0, 0);
            this.colors.push(0, 0, 0, 0);
        }
        this.geometry.setAttribute("position", new THREE.Float32BufferAttribute(this.vertices, 3));
        this.geometry.setAttribute("color", new THREE.Float32BufferAttribute(this.vertices, 4));
        this.material = new THREE.PointsMaterial({
            size: 0.1,
            sizeAttenuation: true,
            transparent: true,
            depthTest: true
        });
        this.points = new THREE.Points(this.geometry, this.material);
    }

    addToScene(scene) {
        scene.add(this.points);
    }

    update(dt) {
        this.points.
    }
}