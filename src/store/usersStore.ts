import {makeAutoObservable, runInAction} from "mobx";
import {getUserProfile} from "../api/UsersService";
import {ProfileResponse} from "../types/Users/ProfileResponse";

class UsersStore {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    isLoadingProfile = true
    userProfile = {} as ProfileResponse
    error = ''

    getProfile = (login: string) => {
        return getUserProfile(login)
            .then(res => {
                runInAction(() => {
                    this.userProfile = res.data
                })
            })
            .finally(() => runInAction(() => this.isLoadingProfile = false))
    }
}

export default new UsersStore()