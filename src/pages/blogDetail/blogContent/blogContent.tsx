import styles from "./blogContent.module.scss"
import {CompactProfile} from "../../../components/compactProfile/compactProfile";
import {AiOutlineEye, BsBookmark, FaRegComment} from "react-icons/all";
import React from "react";
import {BlogDetail} from "../../../types/Blogs/BlogDetail";
import {BlogRating} from "./blogRating/blogRating";

type Props = {
    blogContent: BlogDetail
}

export const BlogContent = ({blogContent}: Props) => {
    return (
        <div className={styles.wrapper}>
            <section className={styles.header}>
                <h1>{blogContent.title}</h1>
                <div className={styles.info}>
                    <div className={styles.infoWrapper}>
                        <CompactProfile user={blogContent.creator}/>
                        <div className={styles.creationDate}><span>{blogContent.creation_date}</span></div>
                        <div className={styles.comments}><span>{blogContent.comments_count}</span> <FaRegComment/></div>
                        <div className={styles.views}><span>{blogContent.views_count}</span> <AiOutlineEye/></div>
                        <div className={styles.favorite}><BsBookmark/><span>Избранное(0)</span></div>
                    </div>
                    <div className={styles.ratingWrapper}>
                        <BlogRating score={blogContent.rating} initialRate={blogContent.rate} blogId={blogContent.id}/>
                    </div>
                </div>
            </section>
            <section className={styles.content} dangerouslySetInnerHTML={{__html: blogContent.content}}/>
        </div>
    );
};

