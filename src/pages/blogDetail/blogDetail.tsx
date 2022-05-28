import styles from "./blogDetail.module.scss"
import {observer} from "mobx-react-lite";
import {SideBar} from "../news/sideBar/sideBar";
import {blogsCategories} from "../../utils/blogsCategories";
import {useEffect} from "react";
import {BlogContent} from "./blogContent/blogContent";
import {useParams} from "react-router-dom";
import blogStore from "../../store/blogStore";
import Loader from "../../components/loader/loader";
import {Comments} from "../../components/comments/comments";
import commentsStore from "../../store/commentsStore";
import {useErrorRedirect} from "../../hooks/useErrorRedirect";

export const BlogDetail = observer(() => {
    const params = useParams<{ blogId: string }>()
    const {error, isLoadingBlogDetail, blogDetail, getBlogDetail, clearError} = blogStore
    useEffect(() => {
        getBlogDetail(params.blogId)
        // eslint-disable-next-line
    }, [])
    useErrorRedirect(error, clearError)
    return (
        <div className={styles.blogDetail}>
            {
                isLoadingBlogDetail ? <Loader/> :
                    <>
                        <SideBar isNews={false} categories={blogsCategories} url="blogs" showAllNewsLink={false}/>
                        {
                            blogDetail &&
                            <main className={styles.content}>
                                <BlogContent blogContent={blogDetail}/>
                                <Comments paginatedComments={commentsStore.paginatedComments!} itemId={+params.blogId}
                                          isLoading={commentsStore.isLoading}
                                          isSendingComment={commentsStore.isSendingComment}
                                          totalPages={commentsStore.totalPages} isNews={false}/>
                            </main>
                        }
                    </>
            }
        </div>
    );
});

