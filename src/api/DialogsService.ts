import {api} from "../http";
import {Dialog} from "../types/Dialogs/Dialog";
import {CreateDialogData} from "../types/Dialogs/CreateDialogData";

export const getDialogs = () => {
    return api.get<Dialog[]>('dialogs/get/')
}

export const createDialog = (data: CreateDialogData) => {
    return api.post<void>('dialogs/create/', data)
}