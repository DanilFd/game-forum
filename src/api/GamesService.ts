import {api} from "../http";
import {PaginatedGame} from "../types/Games/PaginatedGame";
import {GenreType} from "../types/Games/GenreType";
import {PlatformType} from "../types/Games/PlatformType";


export const getGames = (page = 1,
                         genres: string[],
                         platforms: string[],
                         ordering: string | null,
                         year_start: string | null,
                         year_end: string | null) => {
    const params = [genres?.map(item => `genre=${item}`).join('&'), platforms?.map(item => `platform=${item}`).join('&')].filter(param => param !== '').join('&')
    return api.get<PaginatedGame>(`/games/list/games/?${params}`, {
        params: {
            page,
            ordering,
            year_start,
            year_end
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