import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from "./newsItem.module.scss"
import {FaRegComment} from "react-icons/all";
import {NewsItemType} from "../../../types/NewsItemType";

type Props = {
    item:NewsItemType
}

export const NewsItem = ({item}: Props) => {
    return (
        <div className={styles.newsItem}>
            <NavLink className={styles.articleImg} to="/">
                <img src={item.image} alt=""/>
            </NavLink>
            <div className={styles.articleDescription}>
                <div className={styles.description}>
                    <NavLink to="/">{item.title}</NavLink>
                </div>
                <div className={styles.articleInfo}>
                    <span>{item.creationDate}</span>
                    <span className={styles.commentsInfo}> <FaRegComment/></span>
                </div>
            </div>
        </div>
    );
};

