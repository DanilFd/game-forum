import {GameType} from "../Games/GameType";
import {AuthorOfNewsType} from "./AuthorOfNewsType";

export type  NewsItemDetailType = {
    id: number,
    title: string,
    content: string
    views_count: number
    comments_count: number
    creation_date: string
    games: GameType[]
    creator: AuthorOfNewsType
}