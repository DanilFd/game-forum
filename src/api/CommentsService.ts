import {api} from "../http";
import {PaginatedComments} from "../types/Comments/PaginatedComments";
import {SendingCommentRequest} from "../types/Comments/sendingCommentRequest";
import {CommentType} from "../types/Comments/CommentType";

export const getNewsComments = (newsId: number) => {
    return api.get<PaginatedComments>(`comments/list/${newsId}/`)
}

export const sendingComment = (data: SendingCommentRequest) => {
    return api.post<CommentType>('comments/create/', data)
}

export const deleteComment = (commentId: number) => {
    return api.delete(`comments/delete/${commentId}/`)
}

export const createCommentComplaint = (data: { reason: string, comment: number }) => {
    return api.post('comments/complaint/create/', data)
}