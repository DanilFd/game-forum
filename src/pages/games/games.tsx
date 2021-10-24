import React from 'react';
import styles from "./games.module.scss"
import {Game} from "./game/game";

export const Games = () => {
    return (
        <main className={styles.layout}>
            <section className={styles.filters}>

            </section>
            <section className={styles.items}>
                <Game/>
                <Game/>
                <Game/>
                <Game/>
                <Game/>
                <Game/>
            </section>
            <section>

            </section>
        </main>
    );
};

