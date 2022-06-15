import styles from "./cardFowWidget.module.scss"
import {NavLink} from "react-router-dom";
import {BestBlogForWeek} from "../../../../types/homePage/bestBlogForWeek";
import {FaRegComments} from "react-icons/all";

type Props = {
    item: BestBlogForWeek
    isNews:boolean
}

export const CardFowWidget = ({item,isNews}: Props) => {
    return (
        <NavLink to={`/${isNews ? 'news/all' : 'blogs/new'}/${item.id}`} className={styles.blogCard}>
            <img className={styles.img} src={item.img} alt=""/>
            <span className={styles.creationDate}>{item.creation_date}</span>
            <span className={styles.title}>{item.title}</span>
            <div className={styles.cardBottom}>
                <span>{item.creator}</span>
                <div className={styles.commentsCountWrapper}>
                    <FaRegComments/>
                    <span>{item.comments_count}</span>
                </div>
            </div>
        </NavLink>
    );
};

