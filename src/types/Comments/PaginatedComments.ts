import {CommentType, NewCommentType} from "./CommentType";

export type PaginatedComments = {
    results: NewCommentType[]
    comments_count: number
}

export type PaginatedCommentTree = {
    results: CommentType[]
    comments_count: number
}