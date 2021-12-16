import {makeAutoObservable, runInAction} from "mobx";
import {login, refreshToken} from "../api/AuthService";
import {UserLoginDetails} from "../types/Auth/AuthRequest";
import {accountActivation, registerUser, resetPassword, resetPasswordConfirm} from "../api/AuthService";
import {AuthenticatedUser} from "../types/Auth/AuthenticatedUser";
import jwtDecode from "jwt-decode";
import {DecodedToken} from "../types/Auth/DecodedToken";
import {UserRegisterCredential} from "../types/Users/UserRegisterCredential";
import {AccountActivationData} from "../types/Users/AccountActivationData";
import {PasswordResetData} from "../types/Users/PasswordResetData";

export const ACCESS_TOKEN = 'access_token'
export const REFRESH_TOKEN = 'refresh_token'

const isDeprecated = (exp: number) => exp * 1000 < Date.now()

class AuthStore {

    user = null as null | AuthenticatedUser
    isLoading = true

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    get isAuth() {
        return !!this.user
    }

    login(data: UserLoginDetails) {
        login(data)
            .then(res => {
                    runInAction(() => {
                        localStorage.setItem(ACCESS_TOKEN, res.data.access)
                        localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                        this.loginByToken(res.data.access)
                    })
                }
            )
            .catch(e => console.log(e.message))
    }

    logout() {
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)
        this.user = null
        this.isLoading = false
    }

    loginByToken(token: string) {
        const {login, user_id, role, exp} = jwtDecode<DecodedToken>(token)
        if (isDeprecated(exp)) {
            return true
        }
        this.user = {id: user_id, login, role}
        this.isLoading = false
        setTimeout(this.refresh, 1000 * 60 * 29)
    }

    refresh() {
        return refreshToken(localStorage.getItem(REFRESH_TOKEN) || '')
            .then(res => {
                runInAction(() => {

                    localStorage.setItem(ACCESS_TOKEN, res.data.access)
                    this.loginByToken(res.data.access)
                })
            })
            .catch(() => runInAction(() => this.isLoading = false))
    }

    checkAuth() {
        this.isLoading = true
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            this.isLoading = false
            return
        }
        const tokenDeprecated = this.loginByToken(token)
        tokenDeprecated && this.refresh()
    }

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

export default new AuthStore()