import React, {useState} from 'react';
import {Rating} from "../../../../components/rating/rating";
import usersStore from "../../../../store/usersStore";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";

type Props = {
    score: number
    initialRate: 'Like' | 'Dislike' | null
}

export const UserRating = observer(({score, initialRate}: Props) => {
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
        <div>
            <Rating rating={rating} rate={rate} rateFunc={rateUser}/>
        </div>
    );
});

