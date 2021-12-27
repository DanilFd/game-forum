import {makeAutoObservable, runInAction} from "mobx";
import {login, refreshToken} from "../api/AuthService";
import {UserLoginDetails} from "../types/Auth/AuthRequest";
import {accountActivation, registerUser, resetPassword, resetPasswordConfirm} from "../api/AuthService";
import {AuthenticatedUser} from "../types/Auth/AuthenticatedUser";
import jwtDecode from "jwt-decode";
import {DecodedToken} from "../types/Auth/DecodedToken";
import {UserRegisterCredential} from "../types/Auth/UserRegisterCredential";
import {AccountActivationData} from "../types/Auth/AccountActivationData";
import {PasswordResetData} from "../types/Auth/PasswordResetData";
import {AuthResponse} from "../types/Auth/AuthResponse";

export const ACCESS_TOKEN = 'access_token'
export const REFRESH_TOKEN = 'refresh_token'

const isDeprecated = (exp: number) => exp * 1000 < Date.now()

class AuthStore {

    user = null as null | AuthenticatedUser
    isLoading = true
    isLoadingBetweenForms = false

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    get isAuth() {
        return !!this.user
    }

    login(data: UserLoginDetails) {
        return login(data)
            .then(res => {
                    runInAction(() => {
                        localStorage.setItem(ACCESS_TOKEN, res.data.access)
                        localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                        this.loginByToken(res.data.access)
                    })
                }
            )
    }

    loginAfterRegistration(tokens: AuthResponse) {
        localStorage.setItem(ACCESS_TOKEN, tokens.access)
        localStorage.setItem(REFRESH_TOKEN, tokens.refresh)
        this.loginByToken(tokens.access)

    }

    logout() {
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)
        this.user = null
        this.isLoading = false
    }

    loginByToken(token: string) {
        const {login, user_id, role, exp, profile_img} = jwtDecode<DecodedToken>(token)
        if (isDeprecated(exp)) {
            return true
        }
        this.user = {id: user_id, login, role, profile_img}
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
            .catch(this.logout)
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
        this.isLoadingBetweenForms = true
        return registerUser(userRegisterCredential)
            .finally(() => this.isLoadingBetweenForms = false)
    }

    accountActivation(data: AccountActivationData) {
        this.isLoadingBetweenForms = true
        return accountActivation(data)
            .finally(() => this.isLoadingBetweenForms = false)
    }

    resetPassword(data: { email: string }) {
        this.isLoadingBetweenForms = true
        return resetPassword(data)
            .finally(() => this.isLoadingBetweenForms = false)
    }

    resetPasswordConfirm(passwordResetData: PasswordResetData) {
        this.isLoadingBetweenForms = true
        return resetPasswordConfirm(passwordResetData)
            .finally(() => this.isLoadingBetweenForms = false)
    }
}

export default new AuthStore()