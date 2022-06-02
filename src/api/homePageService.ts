import {api} from "../http";
import {BestNewsForMonth} from "../types/homePage/bestNewsForMonth";
import {BestBlogForWeek} from "../types/homePage/bestBlogForWeek";
import {LastNewsForHomePage} from "../types/News/ModestNewsItem";


export const getHomePageInformation = () => {
    return Promise.all([
        api.get<BestNewsForMonth[]>('/news/list/best-for-month/'),
        api.get<BestBlogForWeek[]>('/blogs/list/best-for-week/'),
        api.get<LastNewsForHomePage[]>('news/list/lasts-news/'),
        api.get<BestBlogForWeek[]>('news/list/discussed-news/')
    ])
}