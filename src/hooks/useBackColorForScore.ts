import {useMemo} from "react";

export const useBackColorForScore = (rating: number) => {
    return useMemo(() => {
        return rating > 4.0 ?
            rating > 7.5 ? "green" : "#fb9400"
            :
            rating > 0 ? "red" : "#CACACAFF"
    }, [rating])
}