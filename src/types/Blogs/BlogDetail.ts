import {AuthorOfNewsType} from "../News/AuthorOfNewsType";

export type BlogDetail = {
    id: number,
    title: string,
    content: string
    views_count: number
    comments_count: number
    creation_date: string
    creator: AuthorOfNewsType,
    rating: number
    rate: 'Like' | 'Dislike' | null
}