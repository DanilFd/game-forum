
export type ModestNews = {
    id: number
    title: string
    image: string
    creation_date: string
}

export type PaginatedModestNews = {
    count: number
    results: ModestNews[]
}