import {BlogItem} from "../../../types/Blogs/BlogItem";
import {BlogCard} from "./blogCard/blogCard";
import {Pagination} from "../../../components/pagination/pagination";

type Props = {
    blogs: BlogItem[]
    totalPages: number
    slug: string
}

export const BlogList = ({blogs, totalPages, slug}: Props) => {
    return (
        <div>
            {blogs.map(blog => <BlogCard slug={slug} key={blog.id} blog={blog}/>)}
            <Pagination pagesCount={totalPages}/>
        </div>
    );
}

