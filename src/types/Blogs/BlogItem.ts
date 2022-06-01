import {ModestUserForBlog} from "../Users/ModestUser";

export type BlogItem = {
    id: number
    title: string
    img: string
    creation_date: string
    rating: number
    vies_count: number
    content: string
    creator: ModestUserForBlog
    comments_count: number

}

export type PaginatedBlogs = {
    count: number
    results: BlogItem[]
}