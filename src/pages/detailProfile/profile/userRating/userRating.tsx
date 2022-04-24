import {Rating} from "../../../../components/rating/rating";
import usersStore from "../../../../store/usersStore";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {AxiosError} from "axios";
import {useSetRating} from "../../../../hooks/useSetRating";
import authStore from "../../../../store/authStore";

type Props = {
    score: number
    initialRate: 'Like' | 'Dislike' | null
}

export const UserRating = observer(({score, initialRate}: Props) => {
    const params = useParams<{ login: string }>()
    const {rate, rating, setRating, setRate} = useSetRating(score, initialRate)
    const rateUser = (rateType: 'Dislike' | 'Like') => {
        if (!authStore.isAuth) {
            return toast.info('Для этого необходимо авторизоваться.')
        }
        const newRate = rate === rateType ? null : rateType
        usersStore.rateUser({login: params.login, rate: newRate})
            .then(res => {
                setRating(res.data.rating)
                setRate(res.data.rate)
                toast.success(`Ваша оценка принята. Ваш лимит голосов в сутки - ${res.data.available_rate_count}`)

            })
            .catch((e: AxiosError<{ detail?: string }>) => toast.error(e.response ? e.response.data.detail :
                'Произошла непредвиденная ошибка.'))
    }
    return (
        <div>
            <Rating rating={rating} rate={rate} rateFunc={rateUser}/>
        </div>
    );
});

