import { IMAGE_ICON_BTN_BACK, SVG_LOGO } from "../../constants";

export function Credits({ onClose }) {
    return <div className="credits-container">

        <div className="credits-overlay">
            <p>This game was brought to you with love by</p>
            <ul>
                <li>
                    <div className="credits-line">
                        <div className="credits-left">
                            <b>Game Design:</b>
                        </div>
                        <div className="credits-right">
                            <span>Macibacsi</span>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="credits-line">
                        <div className="credits-left">
                            <b>Art:</b>
                        </div>
                        <div className="credits-right">
                            <span>Little Maow</span>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="credits-line">
                        <div className="credits-left">
                            <b>Sound:</b>
                        </div>
                        <div className="credits-right">
                            <span>Kisagyszony</span>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="credits-line">
                        <div className="credits-left">
                            <b>Programming:</b>
                        </div>
                        <div className="credits-right">
                            <span>tthe</span>
                        </div>
                    </div>
                </li>
            </ul>

            <div>
                <img src={SVG_LOGO} style={{ width: "50%" }}></img>
            </div>

            <img onClick={onClose} src={IMAGE_ICON_BTN_BACK} style={{maxWidth: "100%"}}></img>

        </div>
    </div>;
}