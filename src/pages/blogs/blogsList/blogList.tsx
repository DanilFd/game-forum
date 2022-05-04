import {BlogItem} from "../../../types/Blogs/BlogItem";
import {BlogCard} from "./blogCard/blogCard";
import {Pagination} from "../../../components/pagination/pagination";

type Props = {
    blogs: BlogItem[]
    totalPages: number
}

export const BlogList = ({blogs, totalPages}: Props) => {
    return (
        <div>
            {blogs.map(blog => <BlogCard key={blog.id} blog={blog}/>)}
            <Pagination pagesCount={totalPages}/>
        </div>
    );
}

