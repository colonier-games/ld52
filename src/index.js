import * as THREE from 'three';
import { MouseInput } from './input/MouseInput';
import { RENDERER } from './renderer';
import { UserInterface } from './ui/UserInterface';
import { World } from './world/World';

const world = new World();
const mouseInput = new MouseInput({ renderer: RENDERER, world });
const ui = new UserInterface({ world });

RENDERER.setSize(window.innerWidth, window.innerHeight);
RENDERER.setAnimationLoop(world.update.bind(world));

document.body.appendChild(RENDERER.domElement);
ui.mount();