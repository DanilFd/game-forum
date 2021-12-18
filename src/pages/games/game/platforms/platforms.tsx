import React from "react";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {GameType} from "../../../../types/Games/GameType";
import {usePushQuery} from "../../../../hooks/usePushQuery";
import styles from './platforms.module.scss'

type Props = {
    game: GameType
}

export const Platforms = ({game}: Props) => {
    const pushQuery = usePushQuery()
    return (
        <div>
            Платформа: {game.platforms.map((p, index) =>
            <React.Fragment key={generateUniqueID()}>
                            <span onClick={() => pushQuery('platform', p.slug)} className={styles.platform}
                                  key={p.id}>{p.title}</span>
                {index !== game.platforms.length - 1 && <span>, </span>}
            </React.Fragment>)}
        </div>
    )
}
