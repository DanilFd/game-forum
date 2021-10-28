import {api} from "../http";
import {CategoryType} from "../types/News/CategoryType";
import {NewsItemContentType} from "../types/News/NewsItemContentType";
import {PaginatedNewsItems} from "../types/PaginatedNewsItems";

export const getNews = (slug: string, page = 1) => {
    return api.get<PaginatedNewsItems>('news/list/news/',
        {params: {category: slug, page:page}})
}

export const getCategories = () => {
    return api.get<CategoryType[]>('news/list/categories/')
}

export const getNewsItemDetail = (newsId: string) => {
    return api.get<NewsItemContentType>(`news/detail/news-item/${newsId}`)
}