
export class AnimatedBackground {
    constructor({ world }) {
        this.world = world;

        this.container = document.getElementById("animated-background");
        this.container.classList.add("background-invisible");
        this.world.addEventListener("apply-background", this.applyBackground.bind(this));
    }

    applyBackground(svgUrl) {
        this.container.classList.add("background-invisible");
        for (let i = 0; i < this.container.children.length; i++) {
            const element = this.container.children[i];
            element.remove();
        }
        this.objectElement = document.createElement("object");
        this.objectElement.setAttribute("type", "image/svg+xml");
        this.objectElement.setAttribute("data", svgUrl);
        this.objectElement.onload = () => {
            const doc = this.objectElement.contentDocument;
            const svg = doc.querySelector("svg");
            const allPaths = svg.querySelectorAll("path");
            const allPolygons = svg.querySelectorAll("polygon");
            const allRects = svg.querySelectorAll("rect");

            let styleContent = ``
            let animationSpeed = 4000;

            const allSvgElements = [...allPaths, ...allPolygons, ...allRects];

            this.svgContentDocument = doc;
            this.svg = svg;
            this.allSvgElements = allSvgElements;

            for (let i = 0; i < allSvgElements.length; i++) {
                const element = allSvgElements[i];

                element.classList.add(`elem${i}`);
                const elemLength = element.getTotalLength();
                const animationDuration = elemLength / animationSpeed;
                styleContent += `
.elem${i} {
    stroke-dasharray: ${elemLength}!important;
    stroke-dashoffset: ${elemLength};
    stroke: white;
    stroke-width: 4px;
    fill-opacity: 0;
    animation: elemanim${i} ${animationDuration}s ease-in;
    animation-fill-mode: forwards;
}

@keyframes elemanim${i} {
    from {
        stroke-dashoffset: ${elemLength};
        fill-opacity: 0;
    }
    to {
        stroke-dashoffset: 0;
        fill-opacity: 1;
    }
}
                `;
            }

            const style = doc.createElementNS("http://www.w3.org/2000/svg", "style");
            style.innerHTML = styleContent;
            svg.appendChild(style);

            this.container.classList.remove("background-invisible");

        };

        this.container.appendChild(this.objectElement);
    }
}