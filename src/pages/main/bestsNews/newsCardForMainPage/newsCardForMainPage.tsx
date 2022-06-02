import styles from "./newsCardForMainPage.module.scss"
import {NewsForMainPage} from "../../../../types/News/ModestNewsItem";
import {NavLink} from "react-router-dom";
import {AiOutlineEye, FaRegComments} from "react-icons/all";

type Props = {
    item: NewsForMainPage
    cardType: 'normal' | 'big' | 'mobile'
}

export const NewsCardForMainPage = ({item, cardType}: Props) => {
    return (
        <NavLink to={`/news/all/${item.id}`} className={`${styles.newsCard} ${styles[cardType]}`}>
            <img className={styles.cover} src={item.img} alt=""/>
            <div className={styles.backgroundOverlay}/>
            <div className={styles.cardBottom}>
                <span className={styles.title}>{item.title}</span>
                <div className={styles.info}>
                    <span>{item.creation_date}</span>
                    <div className={styles.countsInfo}>
                        <div className={styles.countsWrapper}>
                            <FaRegComments/>
                            <span>{item.comments_count}</span>
                        </div>
                        <div className={styles.countsWrapper}>
                            <AiOutlineEye/>
                            <span>{item.views_count}</span>
                        </div>
                    </div>
                </div>
            </div>
        </NavLink>
    );
};

