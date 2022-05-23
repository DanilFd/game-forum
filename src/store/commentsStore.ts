import {makeAutoObservable, runInAction} from "mobx";
import {
    createCommentComplaint,
    deleteComment,
    getComments,
    rateComment,
    sendComment
} from "../api/CommentsService";
import {PaginatedCommentTree} from "../types/Comments/PaginatedComments";
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

    paginatedComments = null as null | PaginatedCommentTree
    isLoading = true
    isSendingComment = false
    error = ''
    totalPages = null as null | number

    mergeTreeWithComment = (newComment: NewCommentType) => {
        if (!this.paginatedComments) {
            return
        }
        const comment = {...newComment, children: []}
        if (newComment.parent === null) {
            return this.paginatedComments.results.push(comment)
        }
        const parent = findComment(this.paginatedComments!.results, newComment.parent)!
        parent.children.push(comment)
    }

    getComments = (itemId: number, page: number, isNews: boolean) => {
        this.isLoading = true
        getComments(itemId, page, isNews)
            .then(res => runInAction(() => {
                if (page === 1) {
                    this.paginatedComments = {
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
    sendComment = (data: SendingCommentRequest, isNews: boolean) => {
        this.isSendingComment = true
        return sendComment(data, isNews)
            .then(res => runInAction(() => {
                this.mergeTreeWithComment(res.data)
                this.paginatedComments!.comments_count++
            }))
            .finally(() => runInAction(() => this.isSendingComment = false))
    }

    deleteComment = (commentId: number, isNews: boolean) => {
        return deleteComment(commentId, isNews)
            .then(() => runInAction(() => {
                const foundComment = findComment(this.paginatedComments!.results, commentId)!
                this.deleteChild(foundComment)
            }))
    }

    deleteChild = (commentBeingDeleted: CommentType) => {
        const comments = this.paginatedComments!.results
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
        this.paginatedComments!.comments_count--
        parent.children.splice(foundIndex, 1)
    }
    createCommentComplaint = (data: CreateComplaintComment, isNews: boolean) => {
        return createCommentComplaint(data, isNews)
    }
    clearComments = () => {
        this.paginatedComments = null
    }
    rateNewsComment = (data: RateCommentData, isNews: boolean) => {
        return rateComment(data, isNews)
    }

}


export default new CommentsStore()