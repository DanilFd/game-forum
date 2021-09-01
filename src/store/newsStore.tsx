import {makeAutoObservable} from "mobx";
import {NewsItemType} from "../types/NewsItemType";
import axios from "axios";

class NewsStore {
    news = [] as NewsItemType[]

    constructor() {
        makeAutoObservable(this)
    }

    fetchNews() {
        axios.get<NewsItemType[]>("http://127.0.0.1:8000/api/news/")
            .then(res => this.news = res.data)
    }
}

export default new NewsStore()