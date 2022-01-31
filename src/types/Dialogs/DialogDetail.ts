import {Message} from "./Message";

export type DialogDetail = {
    title: string
    messages: Message[]
    user_that_deleted: number
}