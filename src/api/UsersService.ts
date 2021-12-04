import {api} from "../http";
import {UserRegisterCredential} from "../types/Users/UserRegisterCredential";
import {RegisterUserError} from "../types/Users/RegisterUserError";


export const registerUser = (userRegisterCredential: UserRegisterCredential) => {
    return api.post<RegisterUserError>('users/auth/users/', userRegisterCredential)
}