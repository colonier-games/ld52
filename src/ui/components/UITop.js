import { useState } from "react"
import { IMAGE_ICON_HEART_BROKEN, IMAGE_ICON_HEART_FULL } from "../../constants";

export function UITop({ world }) {
    let [score, setScore] = useState(world.player.score);
    let [lives, setLives] = useState(world.player.lives);
    let [moves, setMoves] = useState(world.player.moves);

    world.addEventListener("player-score-changed", setScore);
    world.addEventListener("player-lives-changed", setLives);
    world.addEventListener("player-moves-changed", setMoves);

    let heartChildren = [];

    const missing = world.player.maxLives - world.player.lives;
    const full = world.player.lives;
    for (let i = 0; i < missing; i++) {
        heartChildren.push(
            <img src={IMAGE_ICON_HEART_BROKEN} key={`hm-${i}`} style={{ width: "40px", height: "40px" }} />
        );
    }
    for (let i = 0; i < full; i++) {
        heartChildren.push(
            <img src={IMAGE_ICON_HEART_FULL} key={`hf-${i}`} style={{ width: "40px", height: "40px" }} />
        );
    }

    return <div className="game-ui-top-root">
        <div className="game-ui-top-left-root">
        </div>
        <div className="game-ui-top-center-root">
        </div>
        <div className="game-ui-top-right-root">
            {heartChildren}
        </div>
    </div>
}