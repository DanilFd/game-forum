import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import commentsStore from "../../../../store/commentsStore";
import {observer} from "mobx-react-lite";
import {ScoreForCommentRating} from "../scoreForCommentRating/scoreForCommentRating";

type Props = {
    score: number
    initialRate: 'Like' | 'Dislike' | null
    commentId: number
}

export const CommentRating = observer(({initialRate, score, commentId}: Props) => {
    const [rate, setRate] = useState<"Like" | "Dislike" | null>(initialRate)
    const [rating, setRating] = useState<number>(score)
    useEffect(() => {
        setRate(initialRate)
        setRating(score)
    }, [score, initialRate])
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
            <ScoreForCommentRating rating={rating} rate={rate} rateFunc={rateComment}/>
        </div>
    );
});

