import { IMAGE_ICON_BTN_BACK } from "../../constants";

export function GameOver({ world, onReturnToMenu }) {
    return <div className="game-over-root">
        <div className="game-over-text">
            <h1>Game Over</h1>

            <img src={IMAGE_ICON_BTN_BACK} onClick={onReturnToMenu}></img>
        </div>
    </div>
}