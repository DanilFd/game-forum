import styles from "./lastsNews.module.scss"
import homePageStore from "../../../store/homePageStore";
import {LastNewsCard} from "../cards/lastNewsCard/lastNewsCard";

export const LastsNews = () => {
    return (
        <div className={styles.lastsNews}>
            <h2 className={styles.header}>Последние новости</h2>
            <div className={styles.newsList}>
                {
                    homePageStore.lastsNews.map(news => <LastNewsCard key={news.id} item={news}/>)
                }
            </div>
        </div>
    );
};

