import styles from "./rating.module.scss"
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/all";
import {observer} from "mobx-react-lite";
import {useCallback} from "react";

type Props = {
    rating: number
    rate: 'Like' | 'Dislike' | null
    rateFunc: (rateType: 'Like' | 'Dislike') => void
}

export const Rating = observer(({rating, rate, rateFunc}: Props) => {
    const backColorForScore = useCallback(() => {
        if (rating > 100)
            return 'green'
        if (rating > 50)
            return "#FCBE64"
        if (rating > 0)
            return "#fb9400"
        if (rating < 0)
            return "red"
        return "#606060"
    }, [rating])
    return (
        <div className={styles.wrapper}>
            <AiOutlineMinus onClick={() => rateFunc('Dislike')} className={styles.dec}
                            style={{color: rate === 'Dislike' ? "red" : ''}}/>
            <div className={styles.score} style={{backgroundColor: backColorForScore()}}>
                <span>{(+rating).toFixed(2)}</span>
            </div>
            <AiOutlinePlus onClick={() => rateFunc('Like')} className={styles.inc}
                           style={{color: rate === 'Like' ? "green" : ''}}/>
        </div>
    );
});

