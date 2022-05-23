export type SendingCommentRequest = {
    content: string
    news_item?: number
    blog_item?: number
    parent?: number
}