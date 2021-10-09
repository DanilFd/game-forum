import axios from "axios";

export const api = axios.create({
    baseURL: 'https://game-forum-backend.herokuapp.com/api/'
});