import {AuthorOfNewsType} from "../News/AuthorOfNewsType";

type Comment = {
    id: number
    creator: AuthorOfNewsType
    creation_date: string
    content: string
    parent: null | number
    is_owner: boolean
    is_deleted: boolean
    rating: number
    rate: 'Like' | 'Dislike' | null
}

export type CommentType = Comment & { children: CommentType[] }

export type NewCommentType = Comment