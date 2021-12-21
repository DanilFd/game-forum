import styles from "./score.module.scss";
import {useMemo} from "react";

type Props = {
    score: number
}

export const Score = ({score}: Props) => {
    const backColorForScore = useMemo(() => {
        return score > 40 ?
            score > 75 ? "green" : "#fb9400"
            :
            score > 0 ? "red" : "#ddd"
    }, [score])
    return (
        <div className={styles.score} style={{backgroundColor: backColorForScore}}>
            <span>{score}</span>
        </div>
    )
}
