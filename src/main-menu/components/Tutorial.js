import { useState } from "react";
import { GIF_TUTORIAL_MOVEMENT, IMAGE_MANDALA_SPAWN, IMAGE_ICON_BTN_ARROWLEFT, IMAGE_ICON_BTN_ARROWRIGHT, IMAGE_ICON_BTN_BACK } from "../../constants";

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
        title: "Page title",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel ultricies lacinia, nunc nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl. Sed euismod, nunc vel ultricies lacinia, nunc nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl.",
        gifSrc: GIF_TUTORIAL_MOVEMENT,
        mandalaSrc: IMAGE_MANDALA_SPAWN
    },
    {
        title: "Page title",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel ultricies lacinia, nunc nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl. Sed euismod, nunc vel ultricies lacinia, nunc nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl.",
        gifSrc: GIF_TUTORIAL_MOVEMENT,
        mandalaSrc: IMAGE_MANDALA_SPAWN
    },
    {
        title: "Page title",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel ultricies lacinia, nunc nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl. Sed euismod, nunc vel ultricies lacinia, nunc nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl.",
        gifSrc: GIF_TUTORIAL_MOVEMENT,
        mandalaSrc: IMAGE_MANDALA_SPAWN
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