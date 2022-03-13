import {api} from "../http";
import {ProfileResponse} from "../types/Users/ProfileResponse";
import {ProfileEditData} from "../types/Users/ProfileEditData";
import {DataForSetUserPassword} from "../types/Users/DataForSetUserPassword";
import {FoundUser} from "../types/Users/FoundUser";
import {RateUserData} from "../types/Users/RateUserData";
import {AvailableUserActions} from "../types/Users/AvailableUserActions";

export const getUserProfile = (login: string) => {
    return api.get<ProfileResponse>(`users/profile/${login}/`)
}

export const putProfileEdit = (data: FormData) => {
    return api.put<ProfileEditData>('users/profile/edit/', data)
}

export const postSetUserPassword = (data: DataForSetUserPassword) => {
    return api.post<void>('users/auth/users/set_password/', data)
}

export const usersSearch = (login: string) => {
    return api.get<FoundUser[]>('users/find/', {
        params: {search: login}
    })
}

export const rateUser = (data: RateUserData) => {
    return api.put<{ rating: number, rate: 'Like' | 'Dislike' | null }>(`users/rate/${data.login}/`, {rate: data.rate})
}

export const getUserActions = () => {
    return api.get<AvailableUserActions>('users/actions/')
}