import React, {useEffect} from 'react';
import {SideBar} from "../../components/sideBar/sideBar";
import {observer} from "mobx-react-lite";
import newsStore from "../../store/newsStore";
import styles from "./newsItemDetail.module.scss"
import NewsItemContent from "./newsItemContent/newsItemContent";
import {useParams} from "react-router-dom";
import Loader from "../../components/loader/loader";
import {Game} from "../games/game/game";


export const NewsItemDetail = observer(() => {
        const params = useParams<{ newsId: string }>()
        useEffect(() => {
            newsStore.fetchCategoriesAndNewsItemDetail(params.newsId)
            // eslint-disable-next-line
        }, [])
        return (
            <>
                <div style={{backgroundColor: "white"}} className={styles.newsItemDetail}>
                    {newsStore.isLoadingCategoriesAndNewsItemDetail ? <Loader/> :
                        <>
                            <SideBar categories={newsStore.categories}/>
                            <div className={styles.wrapper}>
                                <div className={styles.content}>
                                    <NewsItemContent newsItemDetail={newsStore.newsItemDetail}/>
                                </div>
                                <section className={styles.gameForNews}>
                                    <h2>Игра из новости:</h2>
                                    <Game className={styles.gameCard} game={newsStore.newsItemDetail.game}/>
                                </section>
                            </div>
                        </>
                    }
                </div>
            </>
        );
    }
);

