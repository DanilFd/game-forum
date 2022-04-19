import {makeAutoObservable, runInAction} from "mobx";
import {GameType} from "../types/Games/GameType";
import {followUnfollowGame, getGameDetail, getGames, getGenresAndPlatforms, rateGame} from "../api/GamesService";
import {calcNumberPages} from "../utils/calcNumberPages";
import {PlatformType} from "../types/Games/PlatformType";
import {GenreType} from "../types/Games/GenreType";
import {subNotify, unsubNotify} from "../pages/games/game/game";
import {GameDetailType} from "../types/Games/GameDetailType";

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
        {id: 2, title: 'По дате выхода 🡣', value: '-release_date'},
        {id: 3, title: 'По дате выхода 🡡', value: 'release_date'},
        {id: 4, title: 'По оценкам 🡣', value: '-score'},
        {id: 5, title: 'По оценкам 🡡', value: 'score'},
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
    isLoadingGameDetail = true
    gameDetail = null as null | GameDetailType
    isLoadingRateGame = false

    constructor() {
        makeAutoObservable(this)
    }

    fetchGames(page: number) {
        runInAction(() => this.isLoadingGames = true)
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
                    this.totalPages = calcNumberPages(res.data.count)
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
    toggleFollowing = (game: GameType) => {
        game.is_following = !game.is_following
        followUnfollowGame(game.id, game.is_following)
            .then(res => {
                runInAction(() => game.is_following = res.data.is_following)
                game.is_following ? subNotify() : unsubNotify()
            })
            .catch(e => {
                runInAction(() => this.error = e.message)
                game.is_following = !game.is_following
            })
    }

    getGameDetail = (gameSlug: string) => {
        this.isLoadingGameDetail = true
        getGameDetail(gameSlug)
            .then(res => runInAction(() => {
                this.gameDetail = res.data
            }))
            .catch(e => runInAction(() => {
                this.error = e.message
            }))
            .finally(() => runInAction(() => this.isLoadingGameDetail = false))
    }
    setUserRating = (rating: number) => {
        this.gameDetail!.user_rating = rating
    }
    rateGame = (game_id: number, rating: number) => {
        this.isLoadingRateGame = true
        return rateGame(game_id, rating)
            .then(res => runInAction(() => {
                this.gameDetail!.rating = res.data.game_rating
            }))
            .finally(() => runInAction(() => this.isLoadingRateGame = false))
    }

}


export default new GamesStore()