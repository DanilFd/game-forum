import React from "react";
import styles from './genres.module.scss'
import {GameType} from "../../../../types/Games/GameType";
import {usePushQuery} from "../../../../hooks/usePushQuery";

type Props = {
    game: GameType
}

export const Genres = ({game}: Props) => {
    const pushQuery = usePushQuery()
    return (
        <div>
            Жанр: {game.genres.map((g, index) =>
            <React.Fragment key={g.slug}>
                            <span onClick={() => pushQuery('genre', g.slug)} className={styles.genre}
                                  key={g.id}>{g.title}</span>
                {index !== game.genres.length - 1 && <span>, </span>}
            </React.Fragment>)}
        </div>
    )
}
