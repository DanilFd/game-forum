import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from "./newsItem.module.scss"
import {FaRegComment} from "react-icons/all";
import {NewsItemType} from "../../../types/News/NewsItemType";

type Game = {
    id: number,
    title: string
}

type Props = {
    item: NewsItemType
    categorySlug?: string
    games?: Game[]
}

export const NewsItem = ({item, categorySlug, games}: Props) => {
        return (
            <div className={styles.newsItem}>
                <NavLink className={styles.articleImg}
                         to={`/news/${categorySlug ? categorySlug : "all"}/${item.id}`}>
                    <img src={item.img} alt=""/>
                </NavLink>
                <div className={styles.articleDescription}>
                    <div className={styles.description}>
                        <NavLink
                            to={`/news/${categorySlug ? categorySlug : "all"}/${item.id}`}>{item.title}</NavLink>
                    </div>
                    <div className={styles.articleInfo}>
                        <span>{item.creation_date}</span>
                        <span className={styles.commentsInfo}>{item.comments_count}<FaRegComment/></span>
                    </div>
                    <div className={styles.categories}>
                        {item.categories?.map((category, index) =>
                            <React.Fragment key={category.slug}>
                                <NavLink
                                    to={`/news/${category.slug}`}>{category.title}</NavLink>
                                {index !== item.categories!.length - 1 && <span>, </span>}
                            </React.Fragment>)}
                        {games?.map((game, index) =>
                            <React.Fragment key={game.id}>
                                <NavLink
                                    to={`#`}>{game.title}</NavLink>
                                {index !== games.length - 1 && <span>, </span>}
                            </React.Fragment>)}
                    </div>
                </div>
            </div>
        );
    }
;

