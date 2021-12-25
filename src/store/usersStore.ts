import {makeAutoObservable, runInAction} from "mobx";
import {getUserProfile, putProfileEdit} from "../api/UsersService";
import {ProfileResponse} from "../types/Users/ProfileResponse";
import {convertToTodayYesterday} from "../utils/convertToTodayYesterday";
import {ProfileEditData} from "../types/Users/ProfileEditData";

class UsersStore {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    isLoadingProfile = true
    isLoadingEdit = false
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
}

export default new UsersStore()