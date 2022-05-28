import React, {useEffect} from 'react';
import {SideBar} from "../news/sideBar/sideBar";
import {observer} from "mobx-react-lite";
import newsStore from "../../store/newsStore";
import styles from "./newsItemDetail.module.scss"
import NewsItemContent from "./newsItemContent/newsItemContent";
import {useParams} from "react-router-dom";
import Loader from "../../components/loader/loader";
import {Game} from "../games/game/game";
import {Comments} from "../../components/comments/comments";
import commentsStore from "../../store/commentsStore";
import {useErrorRedirect} from "../../hooks/useErrorRedirect";


export const NewsItemDetail = observer(() => {
    const params = useParams<{ newsId: string }>()
    useEffect(() => {
        newsStore.fetchCategoriesAndNewsItemDetail(params.newsId)
        // eslint-disable-next-line
    }, [])
    useErrorRedirect(newsStore.error, newsStore.clearErrorNewsItemDetail)
    return (
        <>
            <div style={{backgroundColor: "white"}} className={styles.newsItemDetail}>
                {newsStore.isLoadingCategoriesAndNewsItemDetail ? <Loader/> :
                    <>
                        <SideBar categories={newsStore.categories} showAllNewsLink={true} url="news"/>
                        {
                            newsStore.newsItemDetail &&
                            <div className={styles.wrapper}>
                                <div className={styles.content}>
                                    <NewsItemContent newsItemDetail={newsStore.newsItemDetail}/>
                                </div>
                                {
                                    !!newsStore.newsItemDetail.games?.length &&
                                    <section className={styles.gameForNews}>
                                        <h2>{newsStore.newsItemDetail.games.length > 1 ?
                                            "Игры из новости" : "Игра из новости"}
                                        </h2>
                                        {newsStore.newsItemDetail.games.map(game => <Game key={game.id}
                                                                                          className={styles.gameCard}
                                                                                          item={game}/>)}
                                    </section>
                                }
                                <Comments isSendingComment={commentsStore.isSendingComment}
                                          isLoading={commentsStore.isLoading}
                                          paginatedComments={commentsStore.paginatedComments!}
                                          itemId={+params.newsId}
                                          totalPages={commentsStore.totalPages}
                                          isNews={true}
                                />
                            </div>
                        }
                    </>
                    }
                </div>
            </>
        );
    }
);

