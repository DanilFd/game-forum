import {makeAutoObservable} from "mobx";
import {UserRegisterCredential} from "../types/Users/UserRegisterCredential";
import {registerUser, resetPassword} from "../api/UsersService";

class UsersStore {
    constructor() {
        makeAutoObservable(this)
    }

    registerUser(userRegisterCredential: UserRegisterCredential) {
        return registerUser(userRegisterCredential)
    }

    resetPassword(email: { email: string }) {
        return resetPassword(email)
    }
}

export default new UsersStore()