import {makeAutoObservable} from "mobx";
import {UserRegisterCredential} from "../types/Users/UserRegisterCredential";
import {registerUser} from "../api/UsersService";

class UsersStore {
    constructor() {
        makeAutoObservable(this)
    }


    registerUser(userRegisterCredential: UserRegisterCredential) {
        registerUser(userRegisterCredential)
            .then()
            .catch()
            .finally()
    }
}

export default new UsersStore()