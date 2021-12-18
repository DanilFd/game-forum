import {GameType} from "../Games/GameType";

export type  NewsItemDetailType = {
    id: number,
    title: string,
    content: string
    views_count: number
    creation_date: string
    game: GameType
}