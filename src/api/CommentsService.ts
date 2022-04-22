import {api} from "../http";
import {PaginatedComments} from "../types/Comments/PaginatedComments";
import {SendingCommentRequest} from "../types/Comments/sendingCommentRequest";
import {CommentType} from "../types/Comments/CommentType";
import {CreateComplaintComment} from "../types/Comments/CreateComplaintComment";
import {RateCommentData} from "../types/Comments/RateCommentData";

export const getNewsComments = (newsId: number, page: number) => {
    return api.get<PaginatedComments>(`comments/list/${newsId}/`, {
        params: {page: page}
    })
}

export const sendingComment = (data: SendingCommentRequest) => {
    return api.post<CommentType>('comments/create/', data)
}

export const deleteComment = (commentId: number) => {
    return api.delete(`comments/delete/${commentId}/`)
}

export const createCommentComplaint = (data: CreateComplaintComment) => {
    return api.post('comments/complaint/create/', data)
}

export const rateComment = (data: RateCommentData) => {
    return api.put<{ rating: number, rate: 'Like' | 'Dislike' | null, available_rate_count: number }>(`comments/rate/${data.comment}/`, {rate: data.rate})
}