import {SideBar} from "../../components/sideBar/sideBar";
import styles from "./feed.module.scss"
import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import newsStore from "../../store/newsStore";
import {NewsItem} from "../news/newsItem/newsItem";
import {Pagination} from "../../components/pagination/pagination";
import Loader from "../../components/loader/loader";
import {useError} from "../../hooks/useError";

export const Feed = observer(() => {
    useEffect(() => {
        newsStore.fetchFavoritesNews()
    }, [])
    useError(newsStore.error)
    return (
        <div className={styles.sidebarLayout}>
            <SideBar/>
            {
                newsStore.isLoading ? <Loader/> : <main className={styles.content}>
                    <h1 className={styles.header}>Твоя лента обновлений</h1>
                    <section>
                        {newsStore.news.map(item => <NewsItem key={item.id} item={item}/>)}
                    </section>
                    <div>
                        {
                            newsStore.news.length !== 0 ?
                                <Pagination pagesCount={newsStore.totalPages}/> :
                                <span className={styles.nothing}>Нет активности по играм.</span>
                        }
                    </div>
                </main>
            }
        </div>
    )
})
