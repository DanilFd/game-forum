import {api} from "../http";
import {ProfileResponse} from "../types/Users/ProfileResponse";

export const getUserProfile = (login: string) => {
    return api.get<ProfileResponse>(`users/profile/${login}/`)
}