import {makeAutoObservable, runInAction} from "mobx";
import {createCommentComplaint, deleteComment, getNewsComments, sendingComment} from "../api/CommentsService";
import {PaginatedComments} from "../types/Comments/PaginatedComments";
import {SendingCommentRequest} from "../types/Comments/sendingCommentRequest";
import {findComment} from "../utils/findComment";
import {CommentType} from "../types/Comments/CommentType";

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
                    const foundComment = findComment(this.paginatedNewsComments.results, res.data.parent)!
                    foundComment.children.push(res.data)
                    return
                }
                this.paginatedNewsComments.results.push(res.data)
            }))
            .finally(() => runInAction(() => this.isSendingComment = false))
    }

    deleteComment = (commentId: number) => {
        return deleteComment(commentId)
            .then(() => runInAction(() => {
                const foundComment = findComment(this.paginatedNewsComments.results, commentId)!
                this.deleteChild(foundComment)
            }))
    }

    deleteChild = (commentBeingDeleted: CommentType) => {
        const comments = this.paginatedNewsComments.results
        const parent = !!commentBeingDeleted.parent && findComment(comments, commentBeingDeleted.parent)!
        if (!parent) {
            if (commentBeingDeleted.children.length)
                return commentBeingDeleted.is_deleted = true
            const foundIndex = comments.findIndex(comment => comment.id === commentBeingDeleted.id)
            comments.splice(foundIndex, 1)
            return
        }
        if (commentBeingDeleted.children.length)
            return commentBeingDeleted.is_deleted = true
        const foundIndex = parent.children.findIndex(comment => comment.id === commentBeingDeleted.id)
        parent.children.splice(foundIndex, 1)
    }
    createCommentComplaint = (data: { reason: string, comment: number }) => {
        return createCommentComplaint(data)
    }
}


export default new CommentsStore()