import {makeAutoObservable, runInAction} from "mobx";
import {GameType} from "../types/Games/GameType";
import {getGames} from "../api/GamesService";

class GamesStore {
    games = [] as GameType[]
    isLoading = false
    error = ''

    constructor() {
        makeAutoObservable(this)
    }

    fetchGames() {
        runInAction(() => this.isLoading = true)
            getGames()
                .then(res => {
                    runInAction(() => this.games = res.data)
                })
                .catch(e => this.error = e.message)
                .finally(() => this.isLoading = false)
    }
}

export default new GamesStore()