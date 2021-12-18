import axios from "axios";
import {ACCESS_TOKEN} from "../store/authStore";

const API_URL = 'http://127.0.0.1:8000/api/'

export const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (token)
        config.headers.Authorization = `Bearer ${token}`
    return config
})



