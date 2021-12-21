import {api} from "../http";
import {AuthResponse} from "../types/Auth/AuthResponse";
import {UserRegisterCredential} from "../types/Auth/UserRegisterCredential";
import {RegisterUserError} from "../types/Auth/RegisterUserError";
import {AccountActivationData} from "../types/Auth/AccountActivationData";
import {ResetPasswordConfirmError, ResetPasswordError} from "../types/Auth/ResetPasswordError";
import {PasswordResetData} from "../types/Auth/PasswordResetData";
import {UserLoginDetails} from "../types/Auth/AuthRequest";
import {RefreshTokenResponse} from "../types/Auth/RefreshTokenResponse";


export const login = (data: UserLoginDetails) => {
    return api.post<AuthResponse>('users/login/', data)
}

export const registerUser = (userRegisterCredential: UserRegisterCredential) => {
    return api.post<RegisterUserError>('users/auth/users/', userRegisterCredential)
}

export const accountActivation = (data: AccountActivationData) => {
    return api.post(`users/activate/${data.uid}/${data.token}/`)
}

export const resetPassword = (email: { email: string }) => {
    return api.post<ResetPasswordError>('users/auth/users/reset_password/', email)
}

export const resetPasswordConfirm = (passwordResetData: PasswordResetData) => {
    return api.post<ResetPasswordConfirmError>('users/auth/users/reset_password_confirm/', passwordResetData)
}

export const refreshToken = (refreshToken: string) => {
    return api.post<RefreshTokenResponse>('users/refresh/', {refresh: refreshToken})
}