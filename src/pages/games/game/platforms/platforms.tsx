import React from "react";
import {GameType} from "../../../../types/Games/GameType";
import {usePushQuery} from "../../../../hooks/usePushQuery";
import styles from './platforms.module.scss'

type Props = {
    game: GameType
    navigation: boolean
}

export const Platforms = ({game, navigation}: Props) => {
    const pushQuery = usePushQuery()
    return (
        <div>
            Платформа: {game.platforms?.map((p, index) =>
            <React.Fragment key={p.slug}>
                            <span onClick={() => navigation && pushQuery('platform', p.slug)}
                                  className={styles.platform}
                                  key={p.id}>{p.title}</span>
                {index !== game.platforms.length - 1 && <span>, </span>}
            </React.Fragment>)}
        </div>
    )
}
