import {CommentType} from "../types/Comments/CommentType";

export const findParent = (comments: CommentType[], id: number): CommentType | null => {
    for (const comment of comments) {
        if (comment.id === id) {
            return comment
        }
        const foundComment = findParent(comment.children, id)
        if (foundComment) {
            return foundComment
        }
    }
    return null
}