import {CommentType} from "../types/Comments/CommentType";

export const findComment = (comments: CommentType[], id: number): CommentType | null => {
    for (const comment of comments) {
        if (comment.id === id) {
            return comment
        }
        const foundComment = findComment(comment.children, id)
        if (foundComment) {
            return foundComment
        }
    }
    return null
}