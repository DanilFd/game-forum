import React from 'react';
import styles from "./newsItemContent.module.scss"
import {NewsItemContentType} from "../../../../types/NewsItemContentType";

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
                        Жмищенко
                    </div>
                    <div>1  </div>
                </div>
            </section>
            <section className={styles.content}>
                <div dangerouslySetInnerHTML={{__html: newsItemDetail.content}} />

            </section>
        </div>
    );
};

export default NewsItemContent;