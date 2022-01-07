import {AuthorOfNewsType} from "../News/AuthorOfNewsType";

export type Dialog = {
    id: number
    title: string
    interlocutor: AuthorOfNewsType
    creation_date: string
    last_message: {
        content: string
        is_me: boolean
    }
    messages_count: number
}