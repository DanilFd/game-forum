import styles from "./screenshotsSlider.module.scss"
import React, {useState} from "react";
import {RiArrowLeftSLine, RiArrowRightSLine} from "react-icons/all";
import {SetState} from "../../types/utils/utils";
import {MouseEvent} from "react";

type Props = {
    screenshots: string[]
    initialIndex: number
    setIsActive: SetState<null | number>
}

export const ScreenshotsSlider = ({screenshots, initialIndex, setIsActive}: Props) => {
    const [slideIndex, setSlideIndex] = useState(initialIndex)
    const nextSlide = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        if (slideIndex !== screenshots.length) {
            return setSlideIndex(slideIndex + 1)
        }
        setSlideIndex(1)
    }
    const prevSlide = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        if (slideIndex !== 1) {
            return setSlideIndex(slideIndex - 1)
        }
        setSlideIndex(screenshots.length)
    }
    return (
        <div className={styles.container} onClick={() => setIsActive(null)}>
            <button onClick={prevSlide} className={styles.leftArrow}><RiArrowLeftSLine/></button>
            {screenshots.map((screenshot, index) => {
                return (
                    <div key={screenshot}
                         className={slideIndex === index + 1 ? `${styles.slide} ${styles.slideActive} ` : `${styles.slide}`}>
                        <img src={screenshot} alt=""/>
                    </div>
                )
            })}
            <button onClick={nextSlide} className={styles.rightArrow}><RiArrowRightSLine/></button>
        </div>
    );
};

