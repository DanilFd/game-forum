import React, {useEffect, useState} from "react";
import authStore from "../../../../store/authStore";
import {toast} from "react-toastify";
import {AxiosError} from "axios";
import {ScoreForCommentRating} from "../../../../components/comments/comment/scoreForCommentRating/scoreForCommentRating";
import blogStore from "../../../../store/blogStore";

type Props = {
    score: number
    initialRate: 'Like' | 'Dislike' | null
    blogId: number
}

export const BlogRating = ({initialRate, score, blogId}: Props) => {
    const [rate, setRate] = useState<"Like" | "Dislike" | null>(initialRate)
    const [rating, setRating] = useState<number>(score)
    useEffect(() => {
        setRate(initialRate)
        setRating(score)
    }, [score, initialRate])
    const rateBlog = (rateType: 'Dislike' | 'Like') => {
        if (!authStore.isAuth) {
            return toast.info('Для этого необходимо авторизоваться.')
        }
        const newRate = rate === rateType ? null : rateType
        blogStore.rateBlog({blog: blogId, rate: newRate})
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
            <ScoreForCommentRating rating={rating} rate={rate} rateFunc={rateBlog}/>
        </div>
    );
};

