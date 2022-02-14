import {CommentType} from "./CommentType";

export type PaginatedComments = {
    count: number
    next: string | null
    previous: string | null
    results: CommentType[]
    comments_count: number
}