import styles from "./gameGallery.module.scss"
import {useState} from "react";
import {ScreenshotsSlider} from "../../../components/screenshotsSlider/screenshotsSlider";

type Props = {
    gameScreenshots: string[]
}

export const GameGallery = ({gameScreenshots}: Props) => {
    const [isShowAll, setIsShowAll] = useState(false)
    const [activeIndex, setActiveIndex] = useState<null | number>(null)
    return (
        <div>
            <h3 className={styles.heading}>Скриншоты игры ({gameScreenshots.length})</h3>
            <div className={styles.items}>
                {gameScreenshots.slice(0, isShowAll ? gameScreenshots.length : 5).map((screenshot, index) =>
                    <div onClick={() => setActiveIndex(index + 1)} key={screenshot} className={styles.imgWrapper}><img
                        src={screenshot}
                        alt="error"/>
                    </div>)}
            </div>
            {gameScreenshots.length > 5 &&
            <button onClick={() => setIsShowAll(pre => !pre)} className={styles.showAllBtn}>
                <span>{isShowAll ? "скрыть" : "все скриншоты"}</span>
            </button>}
            {activeIndex &&
            <ScreenshotsSlider screenshots={gameScreenshots} initialIndex={activeIndex} setIsActive={setActiveIndex}/>}
        </div>
    );
};

