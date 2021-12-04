import {api} from "../http";
import {UserRegisterCredential} from "../types/Users/UserRegisterCredential";


export const registerUser = (userRegisterCredential: UserRegisterCredential) => {
    return api.post<UserRegisterCredential>('users/auth/users/', userRegisterCredential)
}