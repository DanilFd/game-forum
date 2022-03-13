import styles from "./score.module.scss";
import {useMemo} from "react";
import {observer} from "mobx-react-lite";

type Props = {
    score: number
}

export const Score = observer(({score}: Props) => {
    const backColorForScore = useMemo(() => {
        return score > 40 ?
            score > 75 ? "green" : "#fb9400"
            :
            score > -20 ? "red" : "#ddd"
    }, [score])
    return (
        <div className={styles.score} style={{backgroundColor: backColorForScore}}>
            <span>{(+score).toFixed(2)}</span>
        </div>
    )
})
