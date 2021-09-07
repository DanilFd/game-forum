import {api} from "../http";
import {NewsItemType} from "../types/NewsItemType";
import {CategoryType} from "../types/CategoryType";
import {NewsItemContentType} from "../types/NewsItemContentType";

export const getNews = (slug: string) => {
    return api.get<NewsItemType[]>('news/list/news/',
        {params: {category: slug}})
}

export const getCategories = () => {
    return api.get<CategoryType[]>('news/list/categories/')
}

export const getNewsItemDetail = (newsId:string) =>{
    return api.get<NewsItemContentType>(`news/detail/news-item/${newsId}`)
}