import {makeAutoObservable, runInAction} from "mobx";
import {searchNews} from "../api/NewsService";
import {searchGames} from "../api/GamesService";
import {calcNumberPages} from "../utils/calcNumberPages";
import {AxiosResponse} from "axios";
import {searchUsers} from "../api/UsersService";
import {searchBlogs} from "../api/BlogsService";


class SearchStore {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    paginatedFoundItems = null as null | any
    error = ''
    isSearching = false
    totalPages = 0
    isLoading = false
    currentPage = 1

    searchItems = (searchFunc: (title: string, page: number) => Promise<AxiosResponse>, title: string) => {
        this.isSearching = true
        return searchFunc(title, this.currentPage)
            .then(res => runInAction(() => {
                this.totalPages = calcNumberPages(res.data.count)
                if (this.currentPage === 1) {
                    return this.paginatedFoundItems = res.data
                }
                this.paginatedFoundItems.results = [...this.paginatedFoundItems.results, ...res.data.results]
            }))
            .catch(e => runInAction(() => this.error = e.message))
            .finally(() => runInAction(() => this.isSearching = false))
    }
    searchGame = (title: string) => {
        return this.searchItems(searchGames, title)
    }
    searchNews = (title: string) => {
        return this.searchItems(searchNews, title)
    }
    searchUsers = (login: string) => {
        return this.searchItems(searchUsers, login)
    }
    searchBlogs = (title: string) => {
        return this.searchItems(searchBlogs, title)
    }
    clearSearchItems = () => {
        if (this.paginatedFoundItems)
            this.paginatedFoundItems.results = []
    }
    setCurrentPage = (page: number) => {
        this.currentPage = page
    }
}


export default new SearchStore()