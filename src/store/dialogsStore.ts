import {makeAutoObservable, runInAction} from "mobx";
import {createDialog, dialogDelete, getDialogMessages, getDialogs, sendMessage} from "../api/DialogsService";
import {Dialog} from "../types/Dialogs/Dialog";
import {CreateDialogData} from "../types/Dialogs/CreateDialogData";
import {DialogDetail} from "../types/Dialogs/DialogDetail";

class DialogsStore {

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    isLoading = false
    dialogs = [] as Dialog[]
    error = ''
    dialogDetail = null as null | DialogDetail
    isLoadingDialogDetail = true
    isSendingMessage = false
    fetchDialogs = () => {
        this.isLoading = true
        getDialogs()
            .then(res => {
                runInAction(() => {
                    this.dialogs = res.data
                })
            })
            .catch(e => runInAction(() => this.error = e.message))
            .finally(() => runInAction(() => this.isLoading = false))

    }
    createDialog = (data: CreateDialogData) => {
        this.isLoading = true
        return createDialog(data)
            .finally(() => runInAction(() => this.isLoading = false))
    }
    getDialogMessages = (id: number) => {
        this.isLoadingDialogDetail = true
        getDialogMessages(id)
            .then(res => runInAction(() => {
                this.dialogDetail = res.data
            }))
            .catch(e => runInAction(() => {
                this.error = e.message
            }))
            .finally(() => runInAction(() => this.isLoadingDialogDetail = false))
    }
    sendMessage = (data: { dialog: number, content: string }) => {
        this.isSendingMessage = true
        return sendMessage(data)
            .then(res => runInAction(() => {
                this.dialogDetail?.messages.push(res.data)
            }))
            .finally(() => runInAction(() => this.isSendingMessage = false))

    }
    dialogDelete = (dialogId: number) => {
        return dialogDelete(dialogId)
    }
}

export default new DialogsStore()