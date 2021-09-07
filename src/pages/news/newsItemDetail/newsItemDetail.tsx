import React, {useEffect} from 'react';
import {SideBar} from "../../../components/sideBar/sideBar";
import {observer} from "mobx-react-lite";
import newsStore from "../../../store/newsStore";
import styles from "./newsItemDetail.module.scss"
import NewsItemContent from "./newsItemContent/newsItemContent";
import {useParams} from "react-router-dom";

export const NewsItemDetail = observer(() => {
    const params = useParams<{ newsId:string }>()

    useEffect(() => {
        newsStore.fetchNewsItemDetail(params.newsId)
    }, [params.newsId])
    return (
        <div style={{backgroundColor: "white"}} className={styles.newsItemDetail}>
            <SideBar categories={newsStore.categories}/>
            <div className={styles.content}>
                <NewsItemContent newsItemDetail={newsStore.newsItemContent}/>
            </div>

        </div>
    );
});

