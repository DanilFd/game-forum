import {makeAutoObservable} from "mobx";
import {UserRegisterCredential} from "../types/Users/UserRegisterCredential";
import {accountActivation, registerUser, resetPassword, resetPasswordConfirm} from "../api/UsersService";
import {PasswordResetData} from "../types/Users/PasswordResetData";
import {AccountActivationData} from "../types/Users/AccountActivationData";

class UsersStore {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    isLoading = false

    registerUser(userRegisterCredential: UserRegisterCredential) {
        this.isLoading = true
        return registerUser(userRegisterCredential)
            .finally(() => this.isLoading = false)
    }

    accountActivation(data: AccountActivationData) {
        this.isLoading = true
        return accountActivation(data)
            .finally(() => this.isLoading = false)
    }

    resetPassword(email: { email: string }) {
        this.isLoading = true
        return resetPassword(email)
            .finally(() => this.isLoading = false)
    }

    resetPasswordConfirm(passwordResetData: PasswordResetData) {
        this.isLoading = true
        return resetPasswordConfirm(passwordResetData)
            .finally(() => this.isLoading = false)
    }
}

export default new UsersStore()