import {api} from "../http";
import {ProfileResponse} from "../types/Users/ProfileResponse";
import {ProfileEditData} from "../types/Users/ProfileEditData";

export const getUserProfile = (login: string) => {
    return api.get<ProfileResponse>(`users/profile/${login}/`)
}

export const putProfileEdit = (data: ProfileEditData) => {
    return api.put<ProfileEditData>('users/profile/edit/', data)
}