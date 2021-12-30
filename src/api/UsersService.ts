import {api} from "../http";
import {ProfileResponse} from "../types/Users/ProfileResponse";
import {ProfileEditData} from "../types/Users/ProfileEditData";
import {DataForSetUserPassword} from "../types/Users/DataForSetUserPassword";

export const getUserProfile = (login: string) => {
    return api.get<ProfileResponse>(`users/profile/${login}/`)
}

export const putProfileEdit = (data: FormData) => {
    return api.put<ProfileEditData>('users/profile/edit/', data)
}

export const postSetUserPassword = (data: DataForSetUserPassword) => {
    return api.post<void>('users/auth/users/set_password/', data)
}