type Game = {
    id: number,
    title: string
}

export type NewsItemType = {
    id: number
    title: string,
    img: string,
    creation_date: string
    categories?: [
        {
            title: string
            slug: string
        }
    ]
    games: Game[]
    comments_count: number
}