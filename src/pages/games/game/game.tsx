import React, {useMemo} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import styles from "./game.module.scss"
import {GameType} from "../../../types/Games/GameType";
import {Switch} from "../../../components/switch/switch";
import {toast} from "react-toastify";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

type Props = {
    game: GameType
}

export const Game = ({game}: Props) => {
    const history = useHistory()
    const subNotify = () => toast.info("Вы добавили игру в избранное")
    const unsubNotify = () => toast.info("Вы удалили игру из избранного")
    const backColorForScore = useMemo(() => {
        return game.score > 4.0 ?
            game.score > 7.5 ? "green" : "#fb9400"
            :
            game.score > 0 ? "red" : "#ddd"
    }, [game.score])
    const pushQuery = (query: string, value: string) => {
        history.push({
            search: `${query}=${value}&page=1`
        })
    }
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
                        Платформа: {game.platforms.map((p, index) =>
                        <React.Fragment key={generateUniqueID()}>
                            <span onClick={() => pushQuery('platform', p.slug)} className={styles.platform}
                                  key={p.id}>{p.title}</span>
                            {index !== game.platforms.length - 1 && <span>, </span>}
                        </React.Fragment>)}
                    </div>
                    <div>
                        Жанр: {game.genres.map((g, index) =>
                        <React.Fragment key={generateUniqueID()}>
                            <span onClick={() => pushQuery('genre', g.slug)} className={styles.genre}
                                  key={g.id}>{g.title}</span>
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

