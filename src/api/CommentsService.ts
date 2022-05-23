import {api} from "../http";
import {PaginatedComments} from "../types/Comments/PaginatedComments";
import {SendingCommentRequest} from "../types/Comments/sendingCommentRequest";
import {CommentType} from "../types/Comments/CommentType";
import {CreateComplaintComment} from "../types/Comments/CreateComplaintComment";
import {RateCommentData} from "../types/Comments/RateCommentData";

export const getComments = (itemId: number, page: number, isNews: boolean) => {
    return api.get<PaginatedComments>(`comments/${isNews ? 'news' : 'blog'}/list/${itemId}/`, {
        params: {page: page}
    })
}

export const sendComment = (data: SendingCommentRequest, isNews: boolean) => {
    return api.post<CommentType>(`comments/${isNews ? 'news' : 'blog'}/create/`, data)
}

export const deleteComment = (commentId: number, isNews: boolean) => {
    return api.delete(`comments/${isNews ? 'news' : 'blog'}/delete/${commentId}/`)
}

export const createCommentComplaint = (data: CreateComplaintComment, isNews: boolean) => {
    return api.post(`comments/${isNews ? 'news' : 'blog'}/complaint/create/`, data)
}

export const rateComment = (data: RateCommentData, isNews: boolean) => {
    return api.put<{ rating: number, rate: 'Like' | 'Dislike' | null, available_rate_count: number }>
    (`comments/${isNews ? 'news' : 'blog'}/rate/${data.comment}/`, {rate: data.rate})
}