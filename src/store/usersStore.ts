import {makeAutoObservable, runInAction} from "mobx";
import {getUserProfile, postSetUserPassword, putProfileEdit} from "../api/UsersService";
import {ProfileResponse} from "../types/Users/ProfileResponse";
import {convertToTodayYesterday} from "../utils/convertToTodayYesterday";
import {ProfileEditData} from "../types/Users/ProfileEditData";
import {DataForSetUserPassword} from "../types/Users/DataForSetUserPassword";

class UsersStore {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    isLoadingProfile = true
    isLoadingEdit = false
    isLoadingSetPassword = false
    userProfile = {} as ProfileResponse
    error = ''

    getProfile = (login: string) => {
        return getUserProfile(login)
            .then(res => {
                runInAction(() => {
                    res.data.last_visit = convertToTodayYesterday(res.data.last_visit)
                    this.userProfile = res.data
                })
            })
            .finally(() => runInAction(() => this.isLoadingProfile = false))
    }
    profileEdit = (data: ProfileEditData) => {
        this.isLoadingEdit = true
        return putProfileEdit(data)
            .finally(() => runInAction(() => this.isLoadingEdit = false))
    }
    setUserPassword = (data: DataForSetUserPassword) => {
        this.isLoadingSetPassword = true
        return postSetUserPassword(data)
            .finally(() => runInAction(() => this.isLoadingSetPassword = false))
    }
    setAdditionalInfoInProfile = (
        gender: 'Не указан' | 'Мужской' | 'Женский',
        about_custom_user: null | string,
        birthday_date: null | string,
        discord: null | string
    ) => {
        this.userProfile.gender = gender
        this.userProfile.about_custom_user = about_custom_user
        this.userProfile.birthday_date = birthday_date
        this.userProfile.discord = discord
    }
}

export default new UsersStore()