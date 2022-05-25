import styles from "./commentCard.module.scss"
import {CommentWithSource} from "../../../../../../types/Comments/CommentType";
import {NavLink} from "react-router-dom";
import {useCallback} from "react";

type Props = {
    item: CommentWithSource
}

export const CommentCard = ({item}: Props) => {
    const backgroundColorForScore = useCallback(() => {
        if (item.rating > 0)
            return "#008000"
        if (item.rating < 0)
            return "#ed0d11"
        return "#606060"
    }, [item.rating])
    return (
        <div className={styles.comment}>
            <div className={styles.info}>
                <div className={styles.userInfo}>
                    <img className={styles.img} src={item.creator.profile_img} alt=""/>
                    <span className={styles.login}>{item.creator.login}</span>
                </div>
                <span className={styles.creationDate}>{item.creation_date}</span>
            </div>
            <div className={styles.source}>
                <NavLink className={styles.sourceLink}
                         to={`/${item.source.is_news_comment ? 'news/all/' : 'blogs/new/'}${item.source.id}`}>
                    {item.source.title}
                </NavLink>
            </div>
            <div className={styles.content}>
                <p>{item.content}</p>
            </div>
            <div className={styles.rating} style={{backgroundColor: backgroundColorForScore()}}>
                <span>{item.rating > 0 && '+'}{item.rating}</span>
            </div>
        </div>
    );
};