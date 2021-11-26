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

export const Games = observer(() => {
        const page = useQuery().get('page')
        const query = useQuery()
        useEffect(() => {
            gamesStore.fetchGames(page ? +page : 1)
        }, [
            // eslint-disable-next-line
            query.getAll('genre').toString(), query.getAll('platform').toString(), query.get('ordering'), query.get('year_start'), query.get('year_end'), page
        ])
        useEffect(() => {
            gamesStore.fetchGenresAndPlatforms()
        }, [])
        useError(gamesStore.error)
        return (
            <div>
                <main className={styles.layout}>
                    {gamesStore.isLoadingGnsAndPls || gamesStore.isLoadingGames ? <Loader/> :
                        <section className={styles.filters}>
                            <Filters/>
                        </section>
                    }
                    {gamesStore.isLoadingGames ? <Loader/> :
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
                    }
                </main>
            </div>
        );
    }
);
