import {AuthorOfNewsType} from "../News/AuthorOfNewsType";

export type Message = {
    id: number
    dialog: number
    content: string
    sender: AuthorOfNewsType
    sending_date: string
    is_first: boolean
}