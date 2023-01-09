import { useState } from "react";
import { IMAGE_MANDALAS } from "../../constants";

function MandalaProgress({
    variant,
    progress
}) {
    if (progress === 0) {
        return <div className="mandala-progress-empty">
        </div>;
    }
    return <div className="mandala-progress">
        <img src={IMAGE_MANDALAS[variant][progress - 1]} />
    </div>;
}

export function UILeft({ world }) {
    let [mandalaAProgress, setMandalaAProgress] = useState(0);
    let [mandalaBProgress, setMandalaBProgress] = useState(0);
    let [mandalaCProgress, setMandalaCProgress] = useState(0);
    let [mandalaDProgress, setMandalaDProgress] = useState(0);
    let [mandalaEProgress, setMandalaEProgress] = useState(0);
    let [mandalaFProgress, setMandalaFProgress] = useState(0);
    let [mandalaGProgress, setMandalaGProgress] = useState(0);

    world.addEventListener("mandala-collected", ({ type, progress }) => {
        switch (type) {
            case "A": setMandalaAProgress(progress); break;
            case "B": setMandalaBProgress(progress); break;
            case "C": setMandalaCProgress(progress); break;
            case "D": setMandalaDProgress(progress); break;
            case "E": setMandalaEProgress(progress); break;
            case "F": setMandalaFProgress(progress); break;
            case "G": setMandalaGProgress(progress); break;
        }
    });

    return <div className="game-ui-left-root">

        <div className="mandala-container">

            <MandalaProgress variant="A" progress={mandalaAProgress} />
            <MandalaProgress variant="B" progress={mandalaBProgress} />
            <MandalaProgress variant="C" progress={mandalaCProgress} />
            <MandalaProgress variant="D" progress={mandalaDProgress} />
            <MandalaProgress variant="E" progress={mandalaEProgress} />
            <MandalaProgress variant="F" progress={mandalaFProgress} />
            <MandalaProgress variant="G" progress={mandalaGProgress} />

        </div>

    </div>
}