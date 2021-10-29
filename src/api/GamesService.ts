import {api} from "../http";
import {PaginatedGame} from "../types/Games/PaginatedGame";


export const getGames = (page = 1) => {
    return api.get<PaginatedGame>('/games/list/games/', {
        params: {
            page
        }
    })
}