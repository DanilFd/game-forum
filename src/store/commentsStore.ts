import {makeAutoObservable, runInAction} from "mobx";
import {createCommentComplaint, deleteComment, getNewsComments, sendingComment} from "../api/CommentsService";
import {PaginatedComments} from "../types/Comments/PaginatedComments";
import {SendingCommentRequest} from "../types/Comments/sendingCommentRequest";
import {findComment} from "../utils/findComment";
import {CommentType, NewCommentType} from "../types/Comments/CommentType";
import {CreateComplaintComment} from "../types/Comments/CreateComplaintComment";
import {calcNumberPages} from "../utils/calcNumberPages";
import {RateCommentData} from "../types/Comments/RateCommentData";

class CommentsStore {

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    paginatedNewsComments = null as null | PaginatedCommentTree
    isLoading = true
    isSendingComment = false
    error = ''
    totalPages = null as null | number

    mergeTreeWithComment = (newComment: NewCommentType) => {
        if (!this.paginatedNewsComments) {
            return
        }

        const comment = {...newComment, children: []}

        if (newComment.parent === null) {
            return this.paginatedNewsComments.results.push(comment)
        }

        const parent = findComment(this.paginatedNewsComments!.results, newComment.parent)!
        parent.children.push(comment)
    }

    getNewsComments = (newsId: number, page: number) => {
        this.isLoading = true
        getNewsComments(newsId, page)
            .then(res => runInAction(() => {
                if (page === 1) {
                    this.paginatedNewsComments = {
                        comments_count: res.data.comments_count,
                        results: []
                    }
                }
                this.totalPages = calcNumberPages(res.data.comments_count)
                res.data.results = res.data.results.map(comment => ({...comment, children: []}))
                res.data.results.forEach(this.mergeTreeWithComment)
            }))
            .catch(e => runInAction(() => this.error = e.message))
            .finally(() => runInAction(() => this.isLoading = false))
    }
    sendingComment = (data: SendingCommentRequest) => {
        this.isSendingComment = true
        return sendingComment(data)
            .then(res => runInAction(() => {
                this.mergeTreeWithComment(res.data)
                this.paginatedNewsComments!.comments_count++
            }))
            .finally(() => runInAction(() => this.isSendingComment = false))
    }

    deleteComment = (commentId: number) => {
        return deleteComment(commentId)
            .then(() => runInAction(() => {
                const foundComment = findComment(this.paginatedNewsComments!.results, commentId)!
                this.deleteChild(foundComment)
            }))
    }

    deleteChild = (commentBeingDeleted: CommentType) => {
        const comments = this.paginatedNewsComments!.results
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
        this.paginatedNewsComments!.comments_count--
        parent.children.splice(foundIndex, 1)
    }
    createCommentComplaint = (data: CreateComplaintComment) => {
        return createCommentComplaint(data)
    }
    clearComments = () => {
        this.paginatedNewsComments = null
    }
    rateComment = (data: RateCommentData) => {
        return rateComment(data)
    }

}


export default new CommentsStore()