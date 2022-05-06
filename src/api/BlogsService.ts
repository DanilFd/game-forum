import {api} from "../http";
import {PaginatedBlogs} from "../types/Blogs/BlogItem";
import {BlogsType} from "../pages/blogs/blogs";
import authStore from "../store/authStore";
import {when} from "mobx";

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