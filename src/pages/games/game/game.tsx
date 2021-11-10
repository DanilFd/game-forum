import React, {useMemo} from 'react';
import {NavLink} from 'react-router-dom';
import styles from "./game.module.scss"
import {GameType} from "../../../types/Games/GameType";
import {Switch} from "../../../components/switch/switch";
import {toast} from "react-toastify";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

type Props = {
    game: GameType
}

export const Game = ({game}: Props) => {
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
                    <div>
                        Платформа: {game.platforms.map((p, index) => <React.Fragment key={generateUniqueID()}>
                        <NavLink to="#" key={p.id}>{p.title}</NavLink>
                        {index !== game.platforms.length - 1 && <span>, </span>}
                    </React.Fragment>)}
                    </div>
                    <div>
                        Жанр: {game.genres.map((g,index) => <React.Fragment key={generateUniqueID()}>
                        <NavLink to="#" key={g.id}>{g.title}</NavLink>
                        {index !== game.genres.length - 1 && <span>, </span>}
                    </React.Fragment>)}
                    </div>
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

