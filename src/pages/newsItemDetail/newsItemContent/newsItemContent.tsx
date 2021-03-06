import React from 'react';
import styles from "./newsItemContent.module.scss"
import {NewsItemDetailType} from "../../../types/News/NewsItemDetailType";
import {AiOutlineEye, BsBookmark, FaRegComment} from "react-icons/all";
import {CompactProfile} from "../../../components/compactProfile/compactProfile";

type Props = {
    newsItemDetail: NewsItemDetailType
}

const NewsItemContent = ({newsItemDetail}: Props) => {
    return (
        <div className={styles.wrapper}>
            <section className={styles.header}>
                <h1>{newsItemDetail.title}</h1>
                <div className={styles.info}>
                    <CompactProfile user={newsItemDetail.creator}/>
                    <div><span>{newsItemDetail.creation_date}</span></div>
                    <div className={styles.comments}><span>{newsItemDetail.comments_count}</span> <FaRegComment/></div>
                    <div className={styles.views}><span>{newsItemDetail.views_count}</span> <AiOutlineEye/></div>
                    <div className={styles.favorite}><BsBookmark/><span>Избранное(0)</span></div>
                </div>
            </section>
            <section className={styles.content} dangerouslySetInnerHTML={{__html: newsItemDetail.content}}/>
        </div>
    );
};

export default NewsItemContent;