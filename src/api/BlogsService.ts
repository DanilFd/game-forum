import {api} from "../http";
import {PaginatedBlogs} from "../types/Blogs/BlogItem";

export const getAllBlogs = ( page: number) => {
    return api.get<PaginatedBlogs>('blogs/list/all/', {
        params: {page: page}
    })
}