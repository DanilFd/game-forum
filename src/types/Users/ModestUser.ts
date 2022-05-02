import {FoundUser} from "./FoundUser";

export type ModestUser = FoundUser & { date_joined: string, rating: number, comments_count: number }
export type ModestUserForBlog = { login: string, profile_img: string }

export type PaginatedModestUsers = {
    count: number
    results: ModestUser[]
}