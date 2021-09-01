import React, {useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import styles from "./news.module.scss"
import {NewsItem} from "./newsItem/newsItem";
import {observer} from "mobx-react-lite";
import newsStore from "../../store/newsStore";

export const News = observer(() => {
    useEffect(() => {
        newsStore.fetchNews()
    }, [])
    return (
        <div style={{backgroundColor: "white"}} className={styles.news}>
            <div className={styles.aside}>
                <nav className={styles.navigation}>
                    <h3>Новости</h3>
                    <ul>
                        <li><span>Все</span></li>
                        <li><NavLink to="news/pc"><span>PC</span></NavLink></li>
                        <li><NavLink to="news/console"><span>Консоли</span></NavLink></li>
                        <li><NavLink to="news/mobile"><span>Мобильные</span></NavLink></li>
                    </ul>
                </nav>
            </div>
            <div className={styles.content}>
                <section className={styles.header}>
                    <h1>Игровые новости</h1>
                </section>
                <section>
                    <div className={styles.wrapper}>
                        <div className={styles.items}>
                            {newsStore.news.map(item => <NewsItem key={item.id} item={item}/>)}
                        </div>
                        <div className={styles.pagination}>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
});

