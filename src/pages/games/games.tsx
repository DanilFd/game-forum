import React, {useEffect} from 'react';
import styles from "./games.module.scss"
import {Game} from "./game/game";
import {observer} from "mobx-react-lite";
import gamesStore from "../../store/gamesStore";
import Loader from "../../components/loader/loader";
import {Pagination} from "../../components/pagination/pagination";
import {useQuery} from "../../hooks/useQuery";
import {useError} from "../../hooks/useError";
import {Filters} from "./filters/filters";
import {Suspense} from "react";

export const Games = observer(() => {
        const page = useQuery().get('page')
        const genres = useQuery()
        useEffect(() => {
            gamesStore.fetchGames(page ? +page : 1)
            // eslint-disable-next-line
        }, [`${genres.getAll('genre')}`, page])
        useEffect(() => {
            gamesStore.fetchGenresAndPlatforms()
        }, [])
        useError(gamesStore.error)
        return (
            <>
                <main className={styles.layout}>
                    {gamesStore.isLoadingGnsAndPls ? <Loader/> :
                    <section className={styles.filters}>
                        <Filters/>
                    </section>
                    }
                    <>
                        <section className={styles.items}>
                            {

                                gamesStore.games.map(game => <Game game={game} key={game.id}/>)
                            }
                        </section>
                        <section>
                            <Pagination pagesCount={gamesStore.totalPages}/>
                        </section>
                    </>

                </main>
            </>
        );
    }
);
