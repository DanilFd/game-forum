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
import {useParams} from "react-router-dom";

export const Games = observer(() => {
        const page = useQuery().get('page')
        const params = useParams<{ genre: string }>()
        useEffect(() => {
            gamesStore.fetchGames(page ? +page : 1)
        }, [params.genre, page])
        useEffect(() => {
            gamesStore.fetchGenresAndPlatforms()
        }, [])
        useError(gamesStore.error)
        return (
            <>
                {gamesStore.isLoadingGames ? <Loader/> :
                    <main className={styles.layout}>
                        <section className={styles.filters}>
                            <Filters/>
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
