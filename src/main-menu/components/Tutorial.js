import { useState } from "react";
import { GIF_TUTORIAL_MOVEMENT, IMAGE_MANDALA_SPAWN, IMAGE_ICON_BTN_ARROWLEFT, IMAGE_ICON_BTN_ARROWRIGHT, IMAGE_ICON_BTN_BACK, GIF_TUTORIAL_TRAPS, IMAGE_MANDALA_TRAP, GIF_TUTORIAL_WATERING, IMAGE_MANDALA_WATERING_CAN, GIF_TUTORIAL_SCISSORS, IMAGE_MANDALA_SCISSORS, IMAGE_MANDALA_VISION } from "../../constants";

function TutorialPage({
    title,
    text,
    gifSrc,
    mandalaSrc
}) {
    return <div className="tutorial-page">
        <div className="tutorial-page-description">
            <h1>{title}</h1>
            <p>{text}</p>
            <div className="tutorial-mandala">
                <img src={mandalaSrc}></img>
            </div>
        </div>
        <div className="tutorial-page-gif">
            <div className="tutorial-gif">
                <img src={gifSrc}></img>
            </div>
        </div>
    </div>
}

const TUTORIAL_PAGES = [
    {
        title: "Basics",
        text: "In our game, you must control Rose to collect flower pieces. On a computer, you can use the left mouse button to move through the tracks, while on a mobile phone, you can only use your finger. The character can be moved in 4 directions.",
        gifSrc: GIF_TUTORIAL_MOVEMENT,
        mandalaSrc: IMAGE_MANDALA_SPAWN
    },
    {
        title: "Goal of the game",
        text: "On the tracks, we have to collect as many seeds as possible with Rose before we run out of steps. It is worth paying attention to the mandalas on the left, as the work is really worth it when you have collected all five components from each flower When she gets tired, so she has no more steps, Rose gets tired and stops. Poor thing, you didn't pay enough attention to how much she likes to collect mandala flowers and seeds.",
        gifSrc: GIF_TUTORIAL_MOVEMENT,
        mandalaSrc: IMAGE_MANDALA_VISION
    },
    {
        title: "Traps",
        text: "We have to pay close attention to where we step, because we don't manage to plant and grow flowers everywhere. Very ugly plants are sprouting somewhere. These plants badly injure Rose, who is very enthusiastic, but after the third one, her patience finally runs out. These ugly plants however reveal themselves, if Rose steps on one of the nicely decorated tiles.",
        gifSrc: GIF_TUTORIAL_TRAPS,
        mandalaSrc: IMAGE_MANDALA_TRAP
    },
    {
        title: "Scissors",
        text: "A really useful tool in the game. By entering a scissor field, you can shape your plants, so you get more seeds, which you can use to continue planting.",
        gifSrc: GIF_TUTORIAL_SCISSORS,
        mandalaSrc: IMAGE_MANDALA_SCISSORS
    },
    {
        title: "Can",
        text: "Watering your plants is essential. Yes, you should water here too. Stepping onto the can, watering the lawn in a single strip, so that beautiful flowers grow. While you only get one seed back from the grass, you get two from the beautiful flowers.",
        gifSrc: GIF_TUTORIAL_WATERING,
        mandalaSrc: IMAGE_MANDALA_WATERING_CAN
    }
]

export function Tutorial({ onClose }) {
    let [currentPage, setCurrentPage] = useState(0);

    function onPrevPage() {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    function onNextPage() {
        if (currentPage < TUTORIAL_PAGES.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }

    let children = [];

    if (currentPage > 0) {
        children.push(
            <img key="prev-page" className="tutorial-page-button" src={IMAGE_ICON_BTN_ARROWLEFT} onClick={onPrevPage}></img>
        );
    } else {
        children.push(
            <div key="prev-page" className="tutorial-page-button"></div>
        );
    }

    children.push(
        <div className="tutorial-overlay">
            <TutorialPage title={TUTORIAL_PAGES[currentPage].title}
                text={TUTORIAL_PAGES[currentPage].text}
                gifSrc={TUTORIAL_PAGES[currentPage].gifSrc}
                mandalaSrc={TUTORIAL_PAGES[currentPage].mandalaSrc}
            />
        </div>
    );

    if (currentPage < TUTORIAL_PAGES.length - 1) {
        children.push(
            <img key="next-page" className="tutorial-page-button" src={IMAGE_ICON_BTN_ARROWRIGHT} onClick={onNextPage}></img>
        );
    } else {
        children.push(
            <div key="next-page" className="tutorial-page-button"></div>
        );
    }

    return <div className="tutorial-container">
        <div className="tutorial-row">
            {children}
        </div>
        <img src={IMAGE_ICON_BTN_BACK} className="tutorial-close-button" onClick={onClose}></img>
    </div>
}