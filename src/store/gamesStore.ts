import {makeAutoObservable, runInAction, toJS} from "mobx";
import {GameType} from "../types/Games/GameType";
import {getGames, getGenresAndPlatforms} from "../api/GamesService";
import {CalcNumberPages} from "../utils/CalcNumberPages";
import {PlatformType} from "../types/Games/PlatformType";
import {GenreType} from "../types/Games/GenreType";

class GamesStore {
    games = [] as GameType[]
    isLoadingGames = false
    isLoadingGnsAndPls = false
    error = ''
    totalPages = null as number | null
    platforms = [] as PlatformType[]
    genres = [] as GenreType[]
    orderings = [
        {id: 1, title: 'По дате добавления', value: ''},
        {id: 2, title: 'По дате выхода ↓', value: '-release_date'},
        {id: 3, title: 'По дате выхода ↑', value: 'release_date'},
        {id: 4, title: 'По оценкам ↓', value: '-score'},
        {id: 5, title: 'По оценкам ↑', value: 'score'},
    ]
    selectedGenres = ['']
    selectedPlatforms = ['']
    selectedOrdering = 'По дате добавления' as null | string
    yearValue = {
        min: 2010,
        max: 2021
    }
    selectedYearFilter = {
        min: '' as null | string,
        max: '' as null | string
    }

    constructor() {
        makeAutoObservable(this)
    }

    fetchGames(page: number) {
        runInAction(() => this.isLoadingGames = true)
        console.log('из стора', toJS(this.selectedYearFilter))
        getGames(
            page,
            this.selectedGenres,
            this.selectedPlatforms,
            this.selectedOrdering,
            this.selectedYearFilter.min,
            this.selectedYearFilter.max
        )
            .then(res => {
                runInAction(() => {
                    this.totalPages = CalcNumberPages(res.data.count)
                    this.games = res.data.results
                    this.yearValue.min = res.data.min_date
                    this.yearValue.max = res.data.max_date
                })
            })
            .catch(e => this.error = e.message)
            .finally(() => runInAction(() => this.isLoadingGames = false))
    }

    fetchGenresAndPlatforms() {
        runInAction(() => this.isLoadingGnsAndPls = true)
        getGenresAndPlatforms()
            .then(([genres, platforms]) => runInAction(() => {
                this.genres = genres
                this.platforms = platforms
            }))
            .catch(e => this.error = e.message)
            .finally(() => runInAction(() => this.isLoadingGnsAndPls = false))
    }

    setGenres = (genres: string[]) => {
        this.selectedGenres = genres
    }
    setPlatforms = (platforms: string[]) => {
        this.selectedPlatforms = platforms
    }
    setOrdering = (ordering: string | null) => {
        this.selectedOrdering = ordering
    }
    setDate = (min: string | null, max: string | null) => {
        this.selectedYearFilter.min = min
        this.selectedYearFilter.max = max
    }
}


export default new GamesStore()