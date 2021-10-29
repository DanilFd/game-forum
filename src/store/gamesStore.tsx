import {makeAutoObservable, runInAction} from "mobx";
import {GameType} from "../types/Games/GameType";
import {getGames} from "../api/GamesService";
import {CalcNumberPages} from "../utils/CalcNumberPages";

class GamesStore {
    games = [] as GameType[]
    isLoading = false
    error = ''
    totalPages = 0

    constructor() {
        makeAutoObservable(this)
    }

    fetchGames(page: number) {
        runInAction(() => this.isLoading = true)
        getGames(page)
            .then(res => {
                runInAction(() => {
                    this.totalPages = CalcNumberPages(res.data.count)
                    this.games = res.data.results
                })
            })
            .catch(e => this.error = e.message)
            .finally(() => runInAction(() => this.isLoading = false))
    }
}

export default new GamesStore()