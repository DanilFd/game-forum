import {makeAutoObservable, runInAction} from "mobx";
import {NewsItemType} from "../types/News/NewsItemType";
import {CategoryType} from "../types/News/CategoryType";
import {NewsItemDetailType} from "../types/News/NewsItemDetailType";
import {convertToTodayYesterday} from "../utils/convertToTodayYesterday";
import {getCategories, getCategoriesAndNewsItemDetail, getFavoritesNews, getNews} from "../api/NewsService";
import {calcNumberPages} from "../utils/calcNumberPages";

class NewsStore {
    news = [] as NewsItemType[]
    categories = [] as CategoryType[]
    isLoading = false
    isLoadingCategoriesAndNewsItemDetail = true
    error = ''
    newsItemDetail = null as null | NewsItemDetailType
    totalPages = null as number | null

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    fetchNews(slug: string, page: number) {
        this.isLoading = true
        getNews(slug, page)
            .then(res => {
                res.data.results.forEach(item => item.creation_date = convertToTodayYesterday(item.creation_date))
                runInAction(() => {
                    this.news = res.data.results
                    this.totalPages = calcNumberPages(res.data.count)
                })
            })
            .catch(e => runInAction(() => this.error = e.message))
            .finally(() => runInAction(() => this.isLoading = false))
    }

    fetchCategories() {
        this.isLoading = true
        getCategories()
            .then(res => runInAction(() => this.categories = res.data))
            .catch(e => runInAction(() => this.error = e.message))
            .finally(() => runInAction(() => this.isLoading = false))
    }

    fetchCategoriesAndNewsItemDetail(newsId: string) {
        this.isLoadingCategoriesAndNewsItemDetail = true
        getCategoriesAndNewsItemDetail(newsId)
            .then(([categories, newsItemDetail]) => {
                newsItemDetail.data.creation_date = convertToTodayYesterday(newsItemDetail.data.creation_date)
                runInAction(() => {
                    this.newsItemDetail = newsItemDetail.data
                    this.categories = categories.data
                })
            })
            .catch(e => runInAction(() => this.error = e.message))
            .finally(() => runInAction(() => this.isLoadingCategoriesAndNewsItemDetail = false))
    }

    fetchFavoritesNews = () => {
        this.isLoading = true
        getFavoritesNews()
            .then(res => {
                res.data.results.forEach(item => item.creation_date = convertToTodayYesterday(item.creation_date))
                runInAction(() => {
                    this.news = res.data.results
                    this.totalPages = calcNumberPages(res.data.count)
                })
            })
            .catch(e => runInAction(() => this.error = e.message))
            .finally(() => runInAction(() => this.isLoading = false))
    }
    clearErrorNewsItemDetail = () => this.error = ''
}

export default new NewsStore()

