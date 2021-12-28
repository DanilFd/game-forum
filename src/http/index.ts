import axios from "axios";
import authStore, {ACCESS_TOKEN, isDeprecated} from "../store/authStore";
import jwtDecode from "jwt-decode";
import {DecodedToken} from "../types/Auth/DecodedToken";

const API_URL = 'http://127.0.0.1:8000/api/'

export const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});
let isRetry = false
api.interceptors.request.use(async (config) => {
    let token = localStorage.getItem(ACCESS_TOKEN)
    if (token) {
        const {exp} = jwtDecode<DecodedToken>(token)
        if (isDeprecated(exp) && !isRetry) {
            isRetry = true
            await authStore.refresh()
            isRetry = false
        }
        token = localStorage.getItem(ACCESS_TOKEN)
        if (token)
            config.headers.Authorization = `Bearer ${token}`
    }
    return config
})


