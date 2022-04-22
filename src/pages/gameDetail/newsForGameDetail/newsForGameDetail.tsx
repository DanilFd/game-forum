import styles from "./newsForGameDetail.module.scss"
import {NewsItem} from "../../news/newsItem/newsItem";
import {useEffect} from "react";
import gamesStore from "../../../store/gamesStore";
import {FormLoader} from "../../../components/header/formLoader/formLoader";
import {observer} from "mobx-react-lite";
import {useError} from "../../../hooks/useError";

type Props = {
    news_id: number
}


export const NewsForGameDetail = observer(({news_id}: Props) => {
        useEffect(() => {
            gamesStore.getNewsForGameDetail(news_id)
        }, [news_id])
        useError(gamesStore.error)
        return (
            <>
                {gamesStore.isLoadingNewsForGame ?
                    <FormLoader/> :
                    <div className={styles.wrapper}>
                        {gamesStore.newsForGameDetail.map(n => <NewsItem key={n.id} item={n}/>)}
                    </div>
                }
            </>
        );
    })
;

