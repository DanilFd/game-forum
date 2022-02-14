export type SendingCommentRequest = {
    content: string
    news_item: number
    parent?: number
}