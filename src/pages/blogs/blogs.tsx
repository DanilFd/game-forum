import styles from "./blogs.module.scss";
import {SideBar} from "../news/sideBar/sideBar";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import blogStore from "../../store/blogStore";
import {useError} from "../../hooks/useError";
import Loader from "../../components/loader/loader";
import {BlogList} from "./blogsList/blogList";
import {useQuery} from "../../hooks/useQuery";
import {Redirect, useParams} from "react-router-dom";

const blogsCategories = [
    {id: 1, title: "Новое", slug: "new"},
    {id: 2, title: "Топ за неделю", slug: 'week'},
    {id: 3, title: "Топ за все время", slug: 'top'},
]
export type BlogsType = 'new' | 'week' | 'top' | 'my'

export const Blogs = observer(() => {
    const {allBlogs, isLoading, error, totalPages, getAllBlogs} = blogStore
    const {slug} = useParams<{ slug: BlogsType }>()
    const page = useQuery().get('page')
    useError(error)
    useEffect(() => {
        if (slug === 'new')
            return getAllBlogs(page ? +page : 1, 'new')
        if (slug === 'top')
            return getAllBlogs(page ? +page : 1, 'top')
        if (slug === 'week')
            return getAllBlogs(page ? +page : 1, 'week')
        return getAllBlogs(page ? +page : 1, 'my')
        // eslint-disable-next-line
    }, [page, slug])
    if (slug !== 'my' && slug !== 'new' && slug !== 'top' && slug !== 'week')
        return <Redirect to={'/blogs/new'}/>
    return (
        <div className={styles.blogs}>
            <SideBar isNews={false} categories={blogsCategories} url="blogs" showAllNewsLink={false}/>
            <main className={styles.content}>
                <section>
                    <h1 className={styles.header}>Игровые блоги</h1>
                    {isLoading ? <Loader/> : <BlogList totalPages={totalPages!} blogs={allBlogs!.results}/>}
                </section>
            </main>
        </div>
    );
});

