import {makeAutoObservable, runInAction} from "mobx";
import {getHomePageInformation} from "../api/homePageService";
import {BestNewsForMonth} from "../types/homePage/bestNewsForMonth";
import {BestBlogForWeek} from "../types/homePage/bestBlogForWeek";
import {LastNewsForHomePage} from "../types/News/ModestNewsItem";

class HomePageStore {

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    isLoading = false
    bestsNewsForMonth = [] as BestNewsForMonth[]
    bestsBlogsForWeek = [] as BestBlogForWeek[]
    lastsNews = [] as LastNewsForHomePage[]
    discussedNews = [] as BestBlogForWeek[]
    error = ''
    getHomePageInformation = () => {
        this.isLoading = true
        getHomePageInformation()
            .then(([bestsNews, bestsBlogs, lastsNews, discussedNews]) => runInAction(() => {
                this.bestsNewsForMonth = bestsNews.data
                this.bestsBlogsForWeek = bestsBlogs.data
                this.lastsNews = lastsNews.data
                this.discussedNews = discussedNews.data
            }))
            .catch(err => runInAction(() => this.error = err))
            .finally(() => runInAction(() => this.isLoading = false))
    }
}

export default new HomePageStore()