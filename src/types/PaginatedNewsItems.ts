import {NewsItemType} from "./News/NewsItemType";

export type PaginatedNewsItems = {
    count:number
    next: string | null
    previous: string | null
    results: NewsItemType[]
}