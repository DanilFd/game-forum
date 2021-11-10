import React, {useEffect} from 'react';
import styles from "./games.module.scss"
import {Game} from "./game/game";
import {observer} from "mobx-react-lite";
import gamesStore from "../../store/gamesStore";
import Loader from "../../components/loader/loader";
import {Pagination} from "../../components/pagination/pagination";
import {useQuery} from "../../hooks/useQuery";
import {useError} from "../../hooks/useError";

export const Games = observer(() => {
        const page = useQuery().get('page')
        useEffect(() => {
            gamesStore.fetchGames(page ? +page : 1)
        }, [page])
    useError(gamesStore.error)
    return (
            <>
                {gamesStore.isLoading ? <Loader/> :
                    <main  className={styles.layout}>
                        <section className={styles.filters}>

                        </section>
                        <section className={styles.items}>
                            {
                                gamesStore.games.map(game => <Game game={game} key={game.id}/>)
                            }
                        </section>
                        <section>
                            <Pagination pagesCount={gamesStore.totalPages}/>
                        </section>
                    </main>

                }
            </>
        );
    }
);
