import {makeAutoObservable, runInAction} from "mobx";
import {getDialogs} from "../api/DialogsService";
import {Dialog} from "../types/Dialogs/Dialog";

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
}

export default new DialogsStore()