import {api} from "../http";
import {CategoryType} from "../types/News/CategoryType";
import {NewsItemDetailType} from "../types/News/NewsItemDetailType";
import {PaginatedNewsItems} from "../types/News/PaginatedNewsItems";
import {NewsItemType} from "../types/News/NewsItemType";

export const getNews = (slug: string, page = 1) => {
    return api.get<PaginatedNewsItems>('news/list/news/',
        {params: {category: slug, page: page}})
}

export const getCategories = () => {
    return api.get<CategoryType[]>('news/list/categories/')
}

export const getCategoriesAndNewsItemDetail = (newsId: string) => {
    return Promise.all([
        api.get<CategoryType[]>('news/list/categories/'),
        api.get<NewsItemDetailType>(`news/detail/news-item/${newsId}/`)
    ])
}

export const getFavoritesNews = () => {
    return api.get<PaginatedNewsItems>('news/list/favorites-news/')
}
export const getNewsForGameDetail = (gameId: number) => {
    return api.get<NewsItemType[]>(`news/list/news-for-game/${gameId}/`)
}