import {AuthorOfNewsType} from "../News/AuthorOfNewsType";

export type CommentType = {
    id: number
    creator: AuthorOfNewsType
    creation_date: string
    content: string
    children: CommentType[]
    parent?: null | number
    is_owner: boolean
}