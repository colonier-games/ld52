import { UIBottom } from "./UIBottom";
import { UILeft } from "./UILeft";
import { UIRight } from "./UIRight";
import { UITop } from "./UITop";

export function UIApp({
    world
}) {

    return <div className="game-ui-root">
        <UITop world={world} />
        <UILeft world={world} />
        <UIRight world={world} />
        <UIBottom world={world} />
    </div>
}