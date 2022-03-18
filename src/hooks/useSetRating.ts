import {useEffect, useState} from "react";

export const useSetRating = (initialRating: number, initialRate: "Like" | "Dislike" | null,) => {
    const [rate, setRate] = useState<"Like" | "Dislike" | null>(null)
    const [rating, setRating] = useState<number>(0)
    useEffect(() => {
        setRate(initialRate)
        setRating(initialRating)
    }, [initialRating, initialRate])
    return {rate, rating, setRating, setRate}
}