import {makeAutoObservable, runInAction} from "mobx";
import {NewsItemType} from "../types/NewsItemType";
import {CategoryType} from "../types/CategoryType";
import {NewsItemContentType} from "../types/NewsItemContentType";
import {dateConversion} from "../utils/dateConversion";
import {getCategories, getNews, getNewsItemDetail} from "../api/NewsService";

class NewsStore {
    news = [] as NewsItemType[]
    categories = [] as CategoryType[]
    isLoading = false
    error = ''
    index = 0
    newsItemContent = {} as NewsItemContentType

    constructor() {
        makeAutoObservable(this)
        this.fetchCategories()
    }

    fetchNews(slug: string) {
        this.isLoading = true
        getNews(slug)
            .then(res => {
                res.data.forEach(item => dateConversion(item))
                runInAction(() => this.news = res.data)
            })
            .catch(e => this.error = e.message)
            .finally(() => this.isLoading = false)
    }

    fetchCategories() {
        this.isLoading = true
        getCategories()
            .then(res => runInAction(() => this.categories = res.data))
            .catch(e => this.error = e.message)
            .finally(() => this.isLoading = false)
    }

    fetchNewsItemDetail(newsId: string) {
        this.isLoading = true
        getNewsItemDetail(newsId)
            .then(res => {
                dateConversion(res.data)
                runInAction(() => this.newsItemContent = res.data)
            })
            .catch(e => this.error = e.message)
            .finally(() => this.isLoading = false)
    }
}

export default new NewsStore()

