import styles from "./blogCard.module.scss"
import {BlogItem} from "../../../../types/Blogs/BlogItem";
import {NavLink} from "react-router-dom";
import React, {useCallback} from "react";
import {FaRegComment} from "react-icons/all";

type Props = {
    item: BlogItem
    slug?: string
}

export const BlogCard = ({item, slug}: Props) => {
    const backgroundColorForScore = useCallback(() => {
        if (item.rating > 0)
            return "#008000"
        if (item.rating < 0)
            return "#ed0d11"
        return "#626262FF"
    }, [item.rating])
    return (
        <div className={styles.card}>
            <NavLink to={`/blogs/${slug}/${item.id}`} className={styles.img}>
                <span style={{backgroundColor: backgroundColorForScore()}}
                      className={styles.rating}>{item.rating > 0 && '+'}{item.rating}</span>
                <img src={item.img} alt=""/>
            </NavLink>
            <div className={styles.description}>
                <div>
                    <NavLink to={`/blogs/${slug}/${item.id}`} className={styles.title}>
                        {item.title}
                    </NavLink>
                </div>
                <div className={styles.info}>
                    <div className={styles.user}>
                        <img src={item.creator.profile_img} alt=""/>
                        <span>Блог</span>
                        <span>{item.creator.login}</span>
                    </div>
                    <span className={styles.creationDate}>{item.creation_date}</span>
                    <div className={styles.commentsCount}>
                        <FaRegComment/>
                        <span>0</span>
                    </div>
                </div>
                <span className={styles.articleBeginning}>
                    <div
                        dangerouslySetInnerHTML={{__html: item.content.replaceAll(/<iframe.*>.*?<\/iframe>|<ul.*>.*?<\/ul>|<ol.*>.*?<\/ol>|<img.*\/>|<blockquote.*>.*?<\/blockquote>\s-\s[\w\s]*/g, '')}}/></span>
            </div>
        </div>
    );
};

