import * as THREE from 'three';

function mouseEventToNdc(event) {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    return new THREE.Vector2(x, y);
}

export class MouseInput {
    constructor({ renderer, world }) {
        this.renderer = renderer;
        this.world = world;

        this.raycaster = new THREE.Raycaster();

        renderer.domElement.addEventListener('click', this.onClick.bind(this));

    }

    onClick(event) {
        console.log(event);

        const ndc = mouseEventToNdc(event);
        this.raycaster.setFromCamera(ndc, this.world.camera);
        const walkableTiles = this.world.level.walkableTiles();
        const intersects = this.raycaster.intersectObjects(walkableTiles.map(tile => tile.mesh));
        if (intersects.length > 0) {
            const intersectedObject = intersects[0].object;
            if (intersectedObject.userData.tileXY) {
                this.world.player.moveTo(intersectedObject.userData.tileXY);
            }
        }

    }
}