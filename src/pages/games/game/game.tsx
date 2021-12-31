import React, {useMemo} from 'react';
import {NavLink} from 'react-router-dom';
import styles from "./game.module.scss"
import {GameType} from "../../../types/Games/GameType";
import {Switch} from "../../../components/switch/switch";
import {toast} from "react-toastify";
import {Genres} from "./genres/genres";
import {Platforms} from './platforms/platforms';
import gamesStore from "../../../store/gamesStore";
import {observer} from "mobx-react-lite";
import {useError} from "../../../hooks/useError";

type Props = {
    game: GameType
    className?: string
}
export const subNotify = () => toast.info("Вы добавили игру в избранное")
export const unsubNotify = () => toast.info("Вы удалили игру из избранного")
export const Game = observer(({game, className}: Props) => {
    const backColorForScore = useMemo(() => {
        return game.score > 4.0 ?
            game.score > 7.5 ? "green" : "#fb9400"
            :
            game.score > 0 ? "red" : "#ddd"
    }, [game.score])
    useError(gamesStore.error)
    console.log(game.is_following)
    return (
        <div className={`${styles.item} ${className}`}>
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
                    <Switch isChecked={game.is_following}
                            toggle={() => gamesStore.toggleFollowing(game)}
                    />
                </div>
            </div>
        </div>
    );
});

