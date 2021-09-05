import {makeAutoObservable, runInAction} from "mobx";
import {NewsItemType} from "../types/NewsItemType";
import {api} from "../http";
import {CategoryType} from "../types/CategoryType";

class NewsStore {
    news = [] as NewsItemType[]
    categories = [] as CategoryType[]
    isLoading = false
    error = ''
    index = 0


    constructor() {
        makeAutoObservable(this)
    }

    fetchNews(slug: string) {
        this.isLoading = true
        api.get<NewsItemType[]>('news/list/news/',
            {params: {category: slug}})
            .then(res => {
                res.data.forEach(item => {
                    item.creation_date = new Date(item.creation_date).toLocaleDateString()
                    if (new Date().toLocaleDateString() === item.creation_date) {
                        item.creation_date = "Сегодня"
                    } else if (new Date(new Date().setDate(new Date().getDate() - 1))
                        .toLocaleDateString() === item.creation_date) {
                        item.creation_date = "Вчера"
                    }
                })
                runInAction(() => this.news = res.data)
            })
            .catch(e => this.error = e.message)
            .finally(() => this.isLoading = false)
    }

    fetchCategories() {
        this.isLoading = true
        api.get<CategoryType[]>('news/list/categories/')
            .then(res => runInAction(() => this.categories = res.data ) )
            .catch(e => this.error = e.message)
            .finally(() => this.isLoading = false)
    }
}

export default new NewsStore()

