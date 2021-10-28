import {api} from "../http";
import {GameType} from "../types/Games/GameType";


export const getGames = () => {
    return api.get<GameType[]>('/games/list/games/')
}