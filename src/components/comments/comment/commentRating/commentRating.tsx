import React, {useState} from 'react';
import {Rating} from "../../../rating/rating";
import {toast} from "react-toastify";
import commentsStore from "../../../../store/commentsStore";
import {observer} from "mobx-react-lite";

type Props = {
    score: number
    initialRate: 'Like' | 'Dislike' | null
    commentId: number
}

export const CommentRating = observer(({initialRate, score, commentId}: Props) => {
    const [rate, setRate] = useState<"Like" | "Dislike" | null>(initialRate)
    const [rating, setRating] = useState<number>(score)
    const rateComment = (rateType: 'Dislike' | 'Like') => {
        const newRate = rate === rateType ? null : rateType
        commentsStore.rateComment({comment: commentId, rate: newRate})
            .then(res => {
                setRating(res.data.rating)
                setRate(res.data.rate)
            })
            .catch(() => toast.error('Произошла непредвиденная ошибка.'))
    }
    return (
        <div>
            <Rating rating={rating} rate={rate} rateFunc={rateComment}/>
        </div>
    );
});

