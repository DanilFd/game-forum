import {NavLink} from "react-router-dom";
import styles from "./modestNewsItem.module.scss"
import {ModestNews} from "../../../../types/News/ModestNewsItem";
import {SetState} from "../../../../types/utils/utils";


type Props = {
    item: ModestNews
    setIsSearchActive: SetState<boolean>
}

export const ModestNewsItem = ({item, setIsSearchActive}: Props) => {
    return (
        <NavLink to={`/news/all/${item.id}`} onClick={() => setIsSearchActive(false)} className={styles.card}>
            <img className={styles.image} src={item.image} alt=""/>
            <div className={styles.info}>
                <span className={styles.cardType}>Новость</span>
                <h3 className={styles.title}>{item.title}</h3>
                <span className={styles.creationDate}>{item.creation_date}</span>
            </div>
        </NavLink>
    );
};

