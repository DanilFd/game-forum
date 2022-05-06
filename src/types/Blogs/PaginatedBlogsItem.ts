import {BlogItem} from "./BlogItem";

export type ModestBlogItem = Omit<BlogItem, 'rating' | 'vies_count' | 'content' | 'creator'>

export type PaginatedBlogsItem = {
    count: number
    results: ModestBlogItem[]
}