import { useState } from "react"

export function UITop({ world }) {
    let [score, setScore] = useState(world.player.score);
    let [lives, setLives] = useState(world.player.lives);
    let [moves, setMoves] = useState(world.player.moves);

    world.addEventListener("player-score-changed", setScore);
    world.addEventListener("player-lives-changed", setLives);
    world.addEventListener("player-moves-changed", setMoves);

    return <div className="game-ui-top-root">
        <p>Score: <b>{score}</b> | Lives: <b>{lives}</b> | Moves: <b>{moves}</b></p>
    </div>
}