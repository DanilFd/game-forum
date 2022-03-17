import styles from "./scoreForCommentRating.module.scss"
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/all";
import {useCallback} from "react";
import {observer} from "mobx-react-lite";

type Props = {
    rating: number
    rate: 'Like' | 'Dislike' | null
    rateFunc: (rateType: 'Like' | 'Dislike') => void
}

export const ScoreForCommentRating = observer(({rating, rate, rateFunc}: Props) => {
    const backgroundColorForScore = useCallback(() => {
        if (rating > 0)
            return "#008000"
        if (rating < 0)
            return "#ed0d11"
        return "#606060"
    }, [rating])
    return (
        <div className={styles.wrapper}>
            <AiOutlineMinus onClick={() => rateFunc('Dislike')} className={styles.dec}
                            style={{color: rate === 'Dislike' ? "red" : ''}}/>
            <div className={styles.score} style={{backgroundColor: backgroundColorForScore()}}>
                <span>{rating > 0 && '+'}{rating}</span>
            </div>
            <AiOutlinePlus onClick={() => rateFunc('Like')} className={styles.inc}
                           style={{color: rate === 'Like' ? "green" : ''}}/>
        </div>
    );
});

