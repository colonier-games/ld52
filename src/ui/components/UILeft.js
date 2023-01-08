export function UILeft({ world }) {
    return <div className="game-ui-left-root">
        <p>Score: {world.player.score}</p>
    </div>
}