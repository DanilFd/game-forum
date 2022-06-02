import styles from "./lastNewsCard.module.scss"
import {LastNewsForHomePage} from "../../../../types/News/ModestNewsItem";
import {NavLink} from "react-router-dom";
import {FaRegComments} from "react-icons/all";

type Props = {
    item: LastNewsForHomePage
}

export const LastNewsCard = ({item}: Props) => {
    return (
        <NavLink to={`/news/all/${item.id}`} className={styles.newsCard}>
            <img className={styles.img} src={item.img} alt=""/>
            <div className={styles.content}>
                <div className={styles.info}>
                    <span>{item.creation_date}</span>
                    <div className={styles.commentsCount}>
                        <FaRegComments/>
                        <span>{item.comments_count}</span>
                    </div>
                </div>
                <span className={styles.title}>{item.title}</span>
            </div>
        </NavLink>
    );
};

