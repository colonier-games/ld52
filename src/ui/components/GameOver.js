export function GameOver({ world, onReturnToMenu }) {
    return <div className="game-over-root">
        <div className="game-over-text">
            <h1>Game Over</h1>

            <p>Score: <b>{world.player.score}</b></p>
            <p>Moves left: <b>{world.player.moves}</b></p>

            <button onClick={onReturnToMenu}>Return to menu</button>
        </div>
    </div>
}