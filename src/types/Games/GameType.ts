import {GenreType} from "./GenreType";
import {PlatformType} from "./PlatformType";

export type GameType = {
    id: number
    img: string
    title: string,
    platforms: PlatformType[],
    genres: GenreType[]
    release_date: string,
    rating: number
    is_following: boolean
    slug: string
    developer: string
    user_rating: number
    rating_of_other_users: {
        users_count: number,
        users_rating: number
    }
}