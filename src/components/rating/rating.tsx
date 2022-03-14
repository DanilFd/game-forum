import styles from "./rating.module.scss"
import {Score} from "./score/score";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/all";
import {observer} from "mobx-react-lite";

type Props = {
    rating: number
    rate: 'Like' | 'Dislike' | null
    rateFunc: (rateType: 'Like' | 'Dislike') => void
}

export const Rating = observer(({rating, rate, rateFunc}: Props) => {
    return (
        <div className={styles.wrapper}>
            <AiOutlineMinus onClick={() => rateFunc('Dislike')} className={styles.dec}
                            style={{color: rate === 'Dislike' ? "red" : ''}}/>
            <Score score={rating}/>
            <AiOutlinePlus onClick={() => rateFunc('Like')} className={styles.inc}
                           style={{color: rate === 'Like' ? "green" : ''}}/>
        </div>
    );
});

