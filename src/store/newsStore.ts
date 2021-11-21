import {makeAutoObservable, runInAction} from "mobx";
import {NewsItemType} from "../types/News/NewsItemType";
import {CategoryType} from "../types/News/CategoryType";
import {NewsItemContentType} from "../types/News/NewsItemContentType";
import {convertToTodayYesterday} from "../utils/convertToTodayYesterday";
import {getCategories, getNews, getNewsItemDetail} from "../api/NewsService";
import {CalcNumberPages} from "../utils/CalcNumberPages";

class NewsStore {
    news = [] as NewsItemType[]
    categories = [] as CategoryType[]
    isLoading = false
    error = ''
    newsItemContent = {} as NewsItemContentType
    totalPages = null as number | null

    constructor() {
        makeAutoObservable(this)
        this.fetchCategories()
    }

    fetchNews(slug: string, page: number) {
        this.isLoading = true
        getNews(slug, page)
            .then(res => {
                res.data.results.forEach(item => convertToTodayYesterday(item))
                runInAction(() => {
                    this.news = res.data.results
                    this.totalPages = CalcNumberPages(res.data.count)
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

    fetchNewsItemDetail(newsId: string) {
        this.isLoading = true
        getNewsItemDetail(newsId)
            .then(res => {
                convertToTodayYesterday(res.data)
                runInAction(() => this.newsItemContent = res.data)
            })
            .catch(e => runInAction(() => this.error = e.message))
            .finally(() => runInAction(() => this.isLoading = false))
    }
}

export default new NewsStore()

