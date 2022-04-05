import styles from "./gameDetail.module.scss"
import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import gamesStore from "../../store/gamesStore";
import {useParams} from "react-router-dom";
import Loader from "../../components/loader/loader";
import {Switch} from "../../components/switch/switch";
import authStore from "../../store/authStore";
import {toast} from "react-toastify";

export const GameDetail = observer(() => {
    const params = useParams<{ gameSlug: string }>()
    useEffect(() => {
        gamesStore.getGameDetail(params.gameSlug)
    }, [params.gameSlug])
    return (
        <main className={styles.layout}>
            {
                gamesStore.isLoadingGameDetail ?
                    <Loader/> :
                    <>
                        <section className={styles.gameOverview}>
                            <div className={styles.gameDetails}>
                                <h1 className={styles.gameTitle}>{gamesStore.gameDetail?.title}</h1>
                                <div className={styles.gameSpecs}>
                                    <span>Платформы: {gamesStore.gameDetail!.platforms.map(p => <span
                                        key={p.id}>{p.title}</span>)}</span>
                                    <span>Жанры: {gamesStore.gameDetail!.genres.map(g => <span
                                        key={g.id}>{g.title}</span>)}</span>
                                </div>
                            </div>
                            <div className={styles.gameImg}>
                                <div className={styles.switch}>
                                    <span>Следить за игрой:</span>
                                    <Switch
                                        isChecked={gamesStore.gameDetail!.is_following}
                                        toggle={() => authStore.isAuth ? gamesStore.toggleFollowing(gamesStore.gameDetail!) :
                                            toast.info('Для этого необходимо авторизоваться.')}/>
                                </div>
                            </div>
                        </section>
                    </>
            }
        </main>
    );
});

