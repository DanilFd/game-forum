import styles from "./score.module.scss"
import {useMemo} from "react";

type Props = {
    score: number
}

export const Score = ({score}: Props) => {
        const colorForScore = useMemo(() => {
            return score > 0 ? "green" : "red"
        }, [score])

        return (
            <div className={styles.score}>
                <span style={{color: colorForScore}}>{(+score).toFixed(2)}</span>
            </div>
        );
    }
;

