import {FoundUser} from "./FoundUser";

export type ModestUser = FoundUser & { date_joined: string, rating: number, comments_count: number }


export type PaginatedModestUsers = {
    count: number
    results: ModestUser[]
}