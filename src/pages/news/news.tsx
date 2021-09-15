import React, {useEffect} from 'react';
import styles from "./news.module.scss"
import {NewsItem} from "./newsItem/newsItem";
import {observer} from "mobx-react-lite";
import newsStore from "../../store/newsStore";
import {SideBar} from "../../components/sideBar/sideBar";
import {useParams} from 'react-router-dom';
import {Loader} from "../../components/loader/loader";

export const News = observer(() => {
    const params = useParams<{ categorySlug: string }>()
    useEffect(() => {
        newsStore.fetchNews(params.categorySlug)
    }, [params.categorySlug])
    return (
        <div style={{backgroundColor: "white"}} className={styles.news}>
            <SideBar categories={newsStore.categories}/>
            {newsStore.isLoading ? <Loader/> :
            <div className={styles.content}>
                <section className={styles.header}>
                    <h1>{params.categorySlug ? "новости " + newsStore.categories.find(category =>
                        category.slug === params.categorySlug)?.title : "Игровые новости"}</h1>
                </section>
                <section>
                        <div className={styles.wrapper}>
                            <div className={styles.items}>
                                {newsStore.news.map(item => <NewsItem categorySlug={params.categorySlug} key={item.id} item={item}/>)}
                            </div>
                            <div className={styles.pagination}>
                            </div>
                        </div>
                </section>
            </div>
            }
        </div>
    );
});

