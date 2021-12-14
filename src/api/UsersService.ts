import {api} from "../http";
import {UserRegisterCredential} from "../types/Users/UserRegisterCredential";
import {RegisterUserError} from "../types/Users/RegisterUserError";
import {ResetPasswordConfirmError, ResetPasswordError} from "../types/Users/ResetPasswordError";
import {PasswordResetData} from "../types/Users/PasswordResetData";
import {AccountActivationData} from "../types/Users/AccountActivationData";


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