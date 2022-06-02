export type ModestNews = {
    id: number
    title: string
    img: string
    creation_date: string
}

export type PaginatedModestNews = {
    count: number
    results: ModestNews[]
}

export type NewsForMainPage = ModestNews & { comments_count: number, views_count: number }

export type LastNewsForHomePage = ModestNews & { comments_count: number }