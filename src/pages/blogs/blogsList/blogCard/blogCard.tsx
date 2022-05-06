import styles from "./blogCard.module.scss"
import {BlogItem} from "../../../../types/Blogs/BlogItem";
import {NavLink} from "react-router-dom";
import {useCallback} from "react";
import {FaRegComment} from "react-icons/all";

type Props = {
    blog: BlogItem
}

export const BlogCard = ({blog}: Props) => {
    const backgroundColorForScore = useCallback(() => {
        if (blog.rating > 0)
            return "#008000"
        if (blog.rating < 0)
            return "#ed0d11"
        return "#626262FF"
    }, [blog.rating])
    return (
        <div className={styles.card}>
            <NavLink to="#" className={styles.img}>
                <span style={{backgroundColor: backgroundColorForScore()}}
                      className={styles.rating}>{blog.rating > 0 && '+'}{blog.rating}</span>
                <img src={blog.img} alt=""/>
            </NavLink>
            <div className={styles.description}>
                <div>
                    <NavLink to="#" className={styles.title}>
                        {blog.title}
                    </NavLink>
                </div>
                <div className={styles.info}>
                    <div className={styles.user}>
                        <img src={blog.creator.profile_img} alt=""/>
                        <span>Блог</span>
                        <span>{blog.creator.login}</span>
                    </div>
                    <span className={styles.creationDate}>{blog.creation_date}</span>
                    <div className={styles.commentsCount}>
                        <FaRegComment/>
                        <span>0</span>
                    </div>
                </div>
                <span className={styles.articleBeginning}>{}</span>
            </div>
        </div>
    );
};

