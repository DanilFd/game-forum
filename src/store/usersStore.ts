import {makeAutoObservable, runInAction} from "mobx";
import {
    getUserActions,
    getUserProfile,
    postSetUserPassword,
    putProfileEdit,
    rateUser,
    usersSearch
} from "../api/UsersService";
import {ProfileResponse} from "../types/Users/ProfileResponse";
import {convertToTodayYesterday} from "../utils/convertToTodayYesterday";
import {DataForSetUserPassword} from "../types/Users/DataForSetUserPassword";
import {FoundUser} from "../types/Users/FoundUser";
import {RateUserData} from "../types/Users/RateUserData";
import {AvailableUserActions} from "../types/Users/AvailableUserActions";

class UsersStore {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    isLoadingProfile = true
    isLoadingEdit = false
    isLoadingSetPassword = false
    userProfile = {} as ProfileResponse
    error = ''
    foundUsers = [] as FoundUser[]
    userActions = null as null | AvailableUserActions

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
    profileEdit = (data: FormData) => {
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
    usersSearch = (login: string) => {
        return usersSearch(login)
            .then(res => runInAction(() => {
                this.foundUsers = res.data
            }))
    }
    clearUserList = () => {
        this.foundUsers.length = 0
    }
    rateUser = (data: RateUserData) => {
        return rateUser(data)
    }
    getUserActions = () => {
        getUserActions()
            .then(res => runInAction(() => {
                this.userActions = res.data
            }))
            .catch(e => runInAction(() => this.error = e.message))
    }
}

export default new UsersStore()