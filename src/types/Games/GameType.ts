import {GenreType} from "./GenreType";
import {PlatformType} from "./PlatformType";

export type GameType = {
    id: number
    img: string
    title: string,
    platforms: PlatformType[],
    genres: GenreType[]
    release_date: string,
    score: number
}