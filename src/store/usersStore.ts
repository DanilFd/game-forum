import {makeAutoObservable} from "mobx";
class UsersStore {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }
    isLoading = false

}

export default new UsersStore()