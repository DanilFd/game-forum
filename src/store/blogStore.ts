import {makeAutoObservable, runInAction} from "mobx";
import {PaginatedBlogs} from "../types/Blogs/BlogItem";
import {createBlog, getAllBlogs, getBlogDetail, rateBlog} from "../api/BlogsService";
import {convertToTodayYesterday} from "../utils/convertToTodayYesterday";
import {calcNumberPages} from "../utils/calcNumberPages";
import {BlogsType} from "../pages/blogs/blogs";
import {BlogDetail} from "../types/Blogs/BlogDetail";
import {RateBlogData} from "../types/Blogs/RateBlogData";

class BlogStore {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    allBlogs = null as null | PaginatedBlogs
    isLoading = true
    error = ''
    totalPages = null as null | number
    isLoadingBlogDetail = true
    blogDetail = null as null | BlogDetail
    getAllBlogs = (page: number, blogsType: BlogsType) => {
        this.isLoading = true
        getAllBlogs(page, blogsType)
            .then(res => {
                res.data.results.forEach(item => item.creation_date = convertToTodayYesterday(item.creation_date))
                runInAction(() => {
                    this.allBlogs = res.data
                    this.totalPages = calcNumberPages(res.data.count)
                })
            })
            .catch(e => runInAction(() => this.error = e.message))
            .finally(() => runInAction(() => this.isLoading = false))
    }
    createBlog = (data: any) => {
        return createBlog(data)
    }
    getBlogDetail = (blogId: string) => {
        this.isLoadingBlogDetail = true
        getBlogDetail(blogId)
            .then(res => runInAction(() => {
                this.blogDetail = res.data
            }))
            .catch(e => runInAction(() => this.error = e.message))
            .finally(() => runInAction(() => this.isLoadingBlogDetail = false))
    }
    rateBlog = (data: RateBlogData) => {
        return rateBlog(data)
    }

}

export default new BlogStore()