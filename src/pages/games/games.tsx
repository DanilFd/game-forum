import React, {useEffect} from 'react';
import styles from "./games.module.scss"
import {Game} from "./game/game";
import {observer} from "mobx-react-lite";
import gamesStore from "../../store/gamesStore";
import Loader from "../../components/loader/loader";

export const Games = observer(() => {
    useEffect(() => {
        gamesStore.fetchGames()
    }, [])
    return (
        <>
            {gamesStore.isLoading ? <Loader/> :
                <main className={styles.layout}>
                    <section className={styles.filters}>

                    </section>
                    <section className={styles.items}>
                        {
                            gamesStore.games.map(game => <Game game={game} key={game.id}/>)
                        }
                    </section>
                    <section>
                    </section>
                </main>
            }
        </>
    );
}
);

