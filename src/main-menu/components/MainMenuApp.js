import { useEffect, useRef, useState } from "react";
import { GameAudio } from "../../audio/GameAudio";
import { AnimatedBackground } from "../../bg/AnimatedBackground";
import { IMAGE_ICON_BTN_CREDITS, IMAGE_ICON_BTN_START, IMAGE_ICON_BTN_TUTORIAL, SVG_BACKGROUNDS, SVG_LOGO } from "../../constants";
import { Credits } from "./Credits";
import { Tutorial } from "./Tutorial";

export function MainMenuApp({
    onStartGame
}) {

    let animBgDiv = useRef();
    let [showTutorial, setShowTutorial] = useState(false);
    let [showCredits, setShowCredits] = useState(false);

    useEffect(
        () => {

            let achievementLevel = 0;
            if (localStorage.getItem("achievement-level")) {
                achievementLevel = parseInt(localStorage.getItem("achievement-level"));
            }

            const bg = new AnimatedBackground({ el: animBgDiv.current });

            bg.applyBackground({
                svgUrl: achievementLevel === 0 ? SVG_LOGO : SVG_BACKGROUNDS[achievementLevel],
                speed: 500
            });

            new GameAudio({}).playMenuMusic();

        },
        []
    )

    function onTutorial() {
        setShowTutorial(true);
    }

    function onCredits() {
        setShowCredits(true);
    }

    const children = [];

    if (showTutorial) {
        children.push(
            <Tutorial key="tutorial" onClose={() => setShowTutorial(false)} />
        );
    }

    if (showCredits) {
        children.push(
            <Credits key="credits" onClose={() => setShowCredits(false)} />
        );
    }

    return <div className="game-main-menu">

        <div className="game-animated-background"
            ref={animBgDiv}
            style={{ alignItems: 'flex-start', opacity: showTutorial || showCredits ? 0 : 1 }}
        ></div>

        <div className="main-menu-buttons" style={{ opacity: showTutorial || showCredits ? 0 : 1 }}>
            <img src={IMAGE_ICON_BTN_START} onClick={onStartGame}></img>
            <img src={IMAGE_ICON_BTN_TUTORIAL} onClick={onTutorial}></img>
            <img src={IMAGE_ICON_BTN_CREDITS} onClick={onCredits}></img>
        </div>

        {children}

    </div>
}