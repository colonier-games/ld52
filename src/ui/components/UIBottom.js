import { IMAGE_ICON_BTN_BACK } from "../../constants";

export function UIBottom({ world }) {

    function onReturnToMenu() {
        console.log("***")
        world.dispatchEvent('return-to-menu');
    }

    return <div className="game-ui-bottom-root">
        <div className="game-ui-bottom-content">
            <img src={IMAGE_ICON_BTN_BACK} className="back-button" onClick={onReturnToMenu}></img>
        </div>
    </div>
}