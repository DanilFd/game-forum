import {GameType} from "./GameType";

export type ModestGame = Omit<GameType, 'genres' | 'is_following'>

export type PaginatedModestGames = {
    count: number
    result: ModestGame[]
}