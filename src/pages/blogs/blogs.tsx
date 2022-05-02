import styles from "./blogs.module.scss";
import {SideBar} from "../news/sideBar/sideBar";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import blogStore from "../../store/blogStore";
import {useError} from "../../hooks/useError";
import Loader from "../../components/loader/loader";
import {BlogList} from "./blogsList/blogList";
import {useQuery} from "../../hooks/useQuery";

const blogsCategories = [
    {id: 1, title: "Новое", slug: "new"},
    {id: 2, title: "Топ", slug: 'best'},
    {id: 3, title: "Создать тему", slug: "create"},
    {id: 4, title: "Мои темы", slug: "my"},

]

export const Blogs = observer(() => {
    const {allBlogs, isLoading, error, totalPages, getAllBlogs} = blogStore
    const page = useQuery().get('page')
    useError(error)
    useEffect(() => {
        getAllBlogs(page ? +page : 1)
        // eslint-disable-next-line
    }, [page])
    return (
        <div className={styles.blogs}>
            <SideBar categories={blogsCategories} url="blogs" showAllNewsLink={false}/>
            <main className={styles.content}>
                <section>
                    <h1 className={styles.header}>Игровые блоги</h1>
                    {isLoading ? <Loader/> : <BlogList totalPages={totalPages!} blogs={allBlogs!.results}/>}
                </section>
            </main>
        </div>
    );
});

