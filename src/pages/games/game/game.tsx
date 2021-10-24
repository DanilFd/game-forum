import React, {useMemo} from 'react';
import {NavLink} from 'react-router-dom';
import styles from "./game.module.scss"

export const Game = () => {
    const score = 5.5
    const backcolorForScore = useMemo(() => {
        return score > 4.0 ?
            score > 7.5 ? "green" : "#fb9400"
            :
            score > 0 ? "red" : "#ddd"
    }, [score])
    return (
        <div className={styles.item}>
            <NavLink to="#" className={styles.img}>
                <img src="https://www.radtkesports.com/wp-content/uploads/7193_120_tbellsaw16x20.png" alt=""/>
            </NavLink>
            <div className={styles.info}>
                <div>
                    <NavLink to="">
                        Saw v
                    </NavLink>
                </div>
                <div className={styles.detail}>
                    <div>
                        Платформа: Linux, Mac, PC
                    </div>
                    <div>
                        Жанр: arcade
                    </div>
                    <div>
                        Дата выхода: 16 июля 2020 г.
                    </div>
                </div>
                <div className={styles.score}>
                    <span style={{backgroundColor: backcolorForScore}}>{score}</span>
                </div>
            </div>
        </div>
    );
};

