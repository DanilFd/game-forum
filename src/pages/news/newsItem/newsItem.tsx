import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from "./newsItem.module.scss"
import {FaRegComment} from "react-icons/all";
import {NewsItemType} from "../../../types/News/NewsItemType";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

type Props = {
    item: NewsItemType
    categorySlug: string
}

export const NewsItem = ({item, categorySlug}: Props) => {
    return (
        <div className={styles.newsItem}>
            <NavLink className={styles.articleImg} to={`/news/${categorySlug ? categorySlug : "all"}/${item.id}`}>
                <img src={item.image} alt=""/>
            </NavLink>
            <div className={styles.articleDescription}>
                <div className={styles.description}>
                    <NavLink to={`/news/${categorySlug ? categorySlug : "all"}/${item.id}`}>{item.title}</NavLink>
                </div>
                <div className={styles.articleInfo}>
                    <span>{item.creation_date}</span>
                    <span className={styles.commentsInfo}> <FaRegComment/></span>
                </div>
                <div className={styles.categories}>
                    {item.categories.map((category, index) =>
                        <React.Fragment key={generateUniqueID()}>
                        <NavLink
                            to={`/news/${category.slug}`}>{category.title}</NavLink>
                            {index !== item.categories.length - 1 && <span>, </span>}
                        </React.Fragment>)}
                </div>
            </div>
        </div>
    );
};

