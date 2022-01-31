import {api} from "../http";
import {Dialog} from "../types/Dialogs/Dialog";
import {CreateDialogData} from "../types/Dialogs/CreateDialogData";
import {DialogDetail} from "../types/Dialogs/DialogDetail";
import {Message} from "../types/Dialogs/Message";

export const getDialogs = () => {
    return api.get<Dialog[]>('dialogs/get/')
}

export const createDialog = (data: CreateDialogData) => {
    return api.post<void>('dialogs/create/', data)
}

export const getDialogMessages = (id: number) => {
    return api.get<DialogDetail>(`dialogs/${id}/`)
}

export const sendMessage = (data: { dialog: number, content: string }) => {
    return api.post<Message>('dialogs/send/', data)
}

export const dialogDelete = (dialogId: number) => {
    return api.delete<void>(`dialogs/delete/${dialogId}/`)
}