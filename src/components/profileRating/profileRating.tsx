import styles from "./profileRating.module.scss"
import {Score} from "../../pages/detailProfile/profile/score/score";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/all";
import {useState} from "react";
import {useParams} from "react-router-dom";
import usersStore from "../../store/usersStore";
import {observer} from "mobx-react-lite";
import {toast} from "react-toastify";

type Props = {
    score: number
    initialRate: 'Like' | 'Dislike' | null
}

export const ProfileRating = observer(({score, initialRate}: Props) => {
    const params = useParams<{ login: string }>()
    const [rate, setRate] = useState<"Like" | "Dislike" | null>(initialRate)
    const [rating, setRating] = useState<number>(score)
    const rateUser = (rateType: 'Dislike' | 'Like') => {
        const newRate = rate === rateType ? null : rateType
        usersStore.rateUser({login: params.login, rate: newRate})
            .then(res => {
                setRating(res.data.rating)
                setRate(res.data.rate)
            })
            .catch(() => toast.error('Произошла непредвиденная ошибка.'))
    }
    return (
        <div className={styles.wrapper}>
            <AiOutlineMinus onClick={() => rateUser('Dislike')} className={styles.dec}
                            style={{color: rate === 'Dislike' ? "red" : ''}}/>
            <Score score={rating}/>
            <AiOutlinePlus onClick={() => rateUser('Like')} className={styles.inc}
                           style={{color: rate === 'Like' ? "green" : ''}}/>
        </div>
    );
});

