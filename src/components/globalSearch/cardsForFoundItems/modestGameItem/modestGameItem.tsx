import styles from "./modestGameItem.module.scss"
import {ModestGame} from "../../../../types/Games/ModestGame";
import {NavLink} from "react-router-dom";
import {useBackColorForScore} from "../../../../hooks/useBackColorForScore";
import {SetState} from "../../../../types/utils/utils";
import React from "react"

type Props = {
    item: ModestGame
    setIsSearchActive: SetState<boolean>

}

export const ModestGameItem = ({item, setIsSearchActive}: Props) => {
    return (
        <NavLink to={`/game/${item.slug}`} onClick={() => setIsSearchActive(false)} className={styles.card}>
            <div className={styles.cardTop}>
                <img className={styles.image} src={item.img} alt=""/>
                <div className={styles.backgroundOverlay}/>
                <span style={{backgroundColor: useBackColorForScore(item.rating)}}
                      className={styles.rating}>{item.rating}</span>
                <h3 className={styles.title}>{item.title}</h3>
            </div>
            <div className={styles.cardBottom}>
                <div>
                    <span className={styles.infoTitle}>Платформы:</span>
                    <div className={styles.infoValue}>
                        {item.platforms?.map((p, i) =>
                            <React.Fragment key={p.id}>
                                <span>{p.title}</span>
                                {i !== item.platforms.length - 1 && <span>, </span>}
                            </React.Fragment>
                        )}
                    </div>
                </div>
                <div>
                    <span className={styles.infoTitle}>Дата выхода:</span>
                    <div className={styles.infoValue}>
                        {item.release_date}
                    </div>
                </div>
            </div>
        </NavLink>
    );
};

