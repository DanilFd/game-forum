type Game = {
    id: number,
    title: string
}

export type NewsItemType = {
    id: number
    title: string,
    image: string,
    creation_date: string
    categories: [
        {
            title: string
            slug: string
        }
    ]
    games: Game[]
}