import { useState } from "react";

export function UILeft({ world }) {
    let [score, setScore] = useState(world.player.score);

    world.addEventListener("player-score-changed", (newScore) => {
        setScore(newScore);
    });

    return <div className="game-ui-left-root">
        <p>Score: {score}</p>
    </div>
}