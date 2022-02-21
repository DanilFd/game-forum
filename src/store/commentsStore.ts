import {makeAutoObservable, runInAction} from "mobx";
import {deleteComment, getNewsComments, sendingComment} from "../api/CommentsService";
import {PaginatedComments} from "../types/Comments/PaginatedComments";
import {SendingCommentRequest} from "../types/Comments/sendingCommentRequest";
import {findParent} from "../utils/findParent";

class CommentsStore {

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    paginatedNewsComments = {} as PaginatedComments
    isLoading = true
    isSendingComment = false
    error = ''
    getNewsComments = (newsId: number) => {
        this.isLoading = true
        getNewsComments(newsId)
            .then(res => runInAction(() => {
                this.paginatedNewsComments = res.data
            }))
            .catch(e => runInAction(() => this.error = e.message))
            .finally(() => runInAction(() => this.isLoading = false))
    }
    sendingComment = (data: SendingCommentRequest) => {
        this.isSendingComment = true
        return sendingComment(data)
            .then(res => runInAction(() => {
                if (res.data.parent) {
                    const foundComment = findParent(this.paginatedNewsComments.results, res.data.parent)!
                    foundComment.children.push(res.data)
                    return
                }
                this.paginatedNewsComments.results.push(res.data)
            }))
            .finally(() => runInAction(() => this.isSendingComment = false))
    }

    deleteComment = (commentId: number) => {
        return deleteComment(commentId)
            .then(() => this.paginatedNewsComments.results = this.paginatedNewsComments.results.filter(comment => comment.id !== commentId))
    }

}


export default new CommentsStore()