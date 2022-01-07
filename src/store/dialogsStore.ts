import {makeAutoObservable, runInAction} from "mobx";
import {createDialog, getDialogs} from "../api/DialogsService";
import {Dialog} from "../types/Dialogs/Dialog";
import {CreateDialogData} from "../types/Dialogs/CreateDialogData";

class DialogsStore {

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    isLoading = false
    dialogs = [] as Dialog[]
    error = ''

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
}

export default new DialogsStore()