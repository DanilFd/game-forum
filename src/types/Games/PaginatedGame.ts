import {GameType} from "./GameType";

export type PaginatedGame = {
    count: number
    next: null | string
    previous: null | string
    results: GameType[]
    min_date:number
    max_date:number
}