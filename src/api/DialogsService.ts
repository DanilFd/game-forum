import {api} from "../http";
import {Dialog} from "../types/Dialogs/Dialog";

export const getDialogs = () => {
    return api.get<Dialog[]>('dialogs/get/')
}