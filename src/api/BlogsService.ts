import {api} from "../http";
import {PaginatedBlogs} from "../types/Blogs/BlogItem";
import {BlogsType} from "../pages/blogs/blogs";
import authStore from "../store/authStore";
import {when} from "mobx";
import {PaginatedBlogsItem} from "../types/Blogs/PaginatedBlogsItem";
import {BlogDetail} from "../types/Blogs/BlogDetail";
import {RateBlogData} from "../types/Blogs/RateBlogData";

export const getAllBlogs = async (page: number, blogsType: BlogsType) => {
    const date = new Date()
    if (blogsType === "my")
        await when(() => !!authStore.user?.login)
    const foundType = {
        week: {
            creation_date_after: new Date(date.setDate(date.getDate() - 7)).toLocaleDateString(),
            ordering: '-rating'
        },
        top: {ordering: '-rating'},
        my: {creator: authStore.user?.login},
        new: {}
    }[blogsType]
    return api.get<PaginatedBlogs>('blogs/list/all/', {
        params: {
            page: page,
            ...foundType
        }
    })
}

export const createBlog = (data: any) => {
    return api.post('blogs/create/', data)
}

export const searchBlogs = (title: string, page: number) => {
    return api.get<PaginatedBlogsItem>('blogs/search/',
        {params: {search: title, page}}
    )
}

export const getBlogDetail = (blogId: string) => {
    return api.get<BlogDetail>(`blogs/detail/${blogId}/`)
}

export const rateBlog = (data: RateBlogData) => {
    return api.put<{ rating: number, rate: 'Like' | 'Dislike' | null, available_rate_count: number }>(`blogs/rate/${data.blog}/`, {rate: data.rate})
}