import {api} from "../http";
import {PaginatedGame} from "../types/Games/PaginatedGame";
import {GenreType} from "../types/Games/GenreType";
import {PlatformType} from "../types/Games/PlatformType";


export const getGames = (page = 1, genres: string[]) => {
    return api.get<PaginatedGame>(`/games/list/games/?${genres?.map(item => `genre=${item}`)?.join('&')}`, {
        params: {
            page
        }
    })
}
export const getGenresAndPlatforms = () => {
    return Promise.all([
        api.get<GenreType[]>('/games/list/genres/',
        )
            .then(res => res.data),
        api.get<PlatformType[]>('/games/list/platforms/')
            .then(res => res.data)
    ])
}