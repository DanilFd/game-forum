import React, {useEffect} from 'react';
import styles from "./news.module.scss"
import {NewsItem} from "./newsItem/newsItem";
import {observer} from "mobx-react-lite";
import newsStore from "../../store/newsStore";
import {SideBar} from "../../components/sideBar/sideBar";
import {useParams} from 'react-router-dom';
import {Pagination} from "../../components/pagination/pagination";
import Loader from "../../components/loader/loader";
import {useQuery} from "../../hooks/useQuery";
import {useError} from "../../hooks/useError";
import {Toaster} from "react-hot-toast";

export const News = observer(() => {
    const params = useParams<{ categorySlug: string }>()
    const page = useQuery().get('page')
    useEffect(() => {
        newsStore.fetchNews(params.categorySlug, page ? +page : 1)
        newsStore.fetchCategories()
        // eslint-disable-next-line
    }, [params.categorySlug, page])
    useError(newsStore.error)
    return (
        <>
            {newsStore.isLoading ? <Loader/> :
                <div style={{backgroundColor: "white"}} className={styles.news}>
                    <SideBar categories={newsStore.categories}/>
                    <main className={styles.content}>
                        <section className={styles.header}>
                            <h1>{params.categorySlug ? "новости " + newsStore.categories.find(category =>
                                category.slug === params.categorySlug)?.title : "Игровые новости"}</h1>
                        </section>
                        <section>
                            <div className={styles.wrapper}>
                                <div className={styles.items}>
                                    {newsStore.news.map(item => <NewsItem categorySlug={params.categorySlug}
                                                                          key={item.id}
                                                                          item={item}/>)}
                                </div>
                                <div>
                                    {
                                        !newsStore.isLoading && <Pagination
                                            pagesCount={newsStore.totalPages}
                                        />
                                    }
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            }
            <Toaster position={"top-right"} toastOptions={{duration:2000}}/>
        </>
    );
});

