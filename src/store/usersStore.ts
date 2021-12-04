import {makeAutoObservable} from "mobx";
import {UserRegisterCredential} from "../types/Users/UserRegisterCredential";
import {registerUser} from "../api/UsersService";

class UsersStore {
    constructor() {
        makeAutoObservable(this)
    }

    registerUser(userRegisterCredential: UserRegisterCredential) {
        return registerUser(userRegisterCredential)
    }
}

export default new UsersStore()