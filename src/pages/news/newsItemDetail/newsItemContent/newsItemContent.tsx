import React from 'react';
import styles from "./newsItemContent.module.scss"
import {NewsItemContentType} from "../../../../types/News/NewsItemContentType";
import {AiOutlineEye, BsBookmark, FaRegComment} from "react-icons/all";

type Props = {
    newsItemDetail: NewsItemContentType
}

const NewsItemContent = ({newsItemDetail}: Props) => {
    return (
        <div className={styles.wrapper}>
            <section className={styles.header}>
                <h1>{newsItemDetail.title}</h1>
                <div className={styles.info}>
                    <div className={styles.user}>
                        <img
                            src="https://yt3.ggpht.com/ytc/AKedOLSDfkyRyvD8wZlHqtlKyNqE5H5BqUI2CxqOKU7wAg=s900-c-k-c0x00ffffff-no-rj"
                            alt=""/>
                        <span>Жмищенко Олег</span>
                    </div>
                    <div><span>{newsItemDetail.creation_date}</span></div>
                    <div className={styles.comments}><span>0</span> <FaRegComment/></div>
                    <div className={styles.views}><span>{newsItemDetail.views_count}</span> <AiOutlineEye/></div>
                    <div className={styles.favorite}><BsBookmark/><span>Избранное(0)</span></div>
                </div>
            </section>
            <section className={styles.content} dangerouslySetInnerHTML={{__html: newsItemDetail.content}}/>
        </div>
    );
};

export default NewsItemContent;