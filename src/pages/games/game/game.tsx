import React, {useMemo} from 'react';
import {NavLink} from 'react-router-dom';
import styles from "./game.module.scss"
import {GameType} from "../../../types/Games/GameType";
import {Switch} from "../../../components/switch/switch";
import {toast} from "react-toastify";
import {Genres} from "./genres/genres";
import {Platforms} from './platforms/platforms';

type Props = {
    game: GameType
}
export const Game = ({game}: Props) => {
    console.log('из гейма:', game)
    const subNotify = () => toast.info("Вы добавили игру в избранное")
    const unsubNotify = () => toast.info("Вы удалили игру из избранного")
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
                    <Platforms game={game}/>
                    <Genres game={game}/>
                    <div>
                        Дата выхода: {game.release_date}
                    </div>
                </div>
                <div className={styles.score}>
                    <span style={{backgroundColor: backColorForScore}}>{game.score}</span>
                </div>
                <div className={styles.subForGame}>
                    <span>Следить за игрой</span>
                    <Switch onCheck={subNotify} onUnCheck={unsubNotify}/>
                </div>
            </div>
        </div>
    );
};

