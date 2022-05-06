import styles from "./modestBlogItem.module.scss"
import {SetState} from "../../../../types/utils/utils";
import {NavLink} from "react-router-dom";
import {ModestBlogItem as BlogItemType} from "../../../../types/Blogs/PaginatedBlogsItem";

type Props = {
    item: BlogItemType
    setIsSearchActive: SetState<boolean>
}

export const ModestBlogItem = ({item, setIsSearchActive}: Props) => {
    return (
        <NavLink to={`/blogs/all/${item.id}`} onClick={() => setIsSearchActive(false)} className={styles.card}>
            <img className={styles.image} src={item.img} alt=""/>
            <div className={styles.info}>
                <span className={styles.cardType}>Блог</span>
                <h3 className={styles.title}>{item.title}</h3>
                <span className={styles.creationDate}>{item.creation_date}</span>
            </div>
        </NavLink>
    );
};

