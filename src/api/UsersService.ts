import {api} from "../http";
import {UserRegisterCredential} from "../types/Users/UserRegisterCredential";
import {RegisterUserError} from "../types/Users/RegisterUserError";
import {ResetPasswordError} from "../types/Users/ResetPasswordError";


export const registerUser = (userRegisterCredential: UserRegisterCredential) => {
    return api.post<RegisterUserError>('users/auth/users/', userRegisterCredential)
}

export const resetPassword = (email: { email: string }) => {
    return api.post<ResetPasswordError>('users/auth/users/reset_password/', email)
}