import React, {useMemo} from 'react';
import {NavLink} from 'react-router-dom';
import styles from "./game.module.scss"
import {GameType} from "../../../types/Games/GameType";
import {Switch} from "../../../components/switch/switch";

type Props = {
    game: GameType
}

export const Game = ({game}: Props) => {
    const backColorForScore = useMemo(() => {
        return game.score > 4.0 ?
            game.score > 7.5 ? "green" : "#fb9400"
            :
            game.score > 0 ? "red" : "#ddd"
    }, [game.score])
    return (
        <div className={styles.item}>
            <NavLink to="#" className={styles.img}>
                <img src={game.img} alt=""/>
            </NavLink>
            <div className={styles.info}>
                <div>
                    <NavLink to="">
                        {game.title}
                    </NavLink>
                </div>
                <div className={styles.detail}>
                    <div>
                        Платформа: {game.platform.map(p => <NavLink to="#" key={p.id}>{p.title}</NavLink>)}
                    </div>
                    <div>
                        Жанр: {game.genre.map(g => <NavLink to="#" key={g.id}>{g.title}</NavLink>)}
                    </div>
                    <div>
                        Дата выхода: {game.release_date}
                    </div>
                </div>
                <div className={styles.score}>
                    <span style={{backgroundColor: backColorForScore}}>{game.score}</span>
                </div>
                <div className={styles.subForGame}>
                    <span>Следить за игрой:</span>
                    <Switch/>
                </div>
            </div>
        </div>
    );
};

