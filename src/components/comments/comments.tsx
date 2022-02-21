import {useEffect, useRef, useState} from "react";
import commentsStore from "../../store/commentsStore";
import {Comment} from "./comment/comment";
import styles from "./comments.module.scss"
import {NavLink} from "react-router-dom";
import {PaginatedComments} from "../../types/Comments/PaginatedComments";
import {FormLoader} from "../header/formLoader/formLoader";
import {SubmitHandler, useForm} from "react-hook-form";
import {useSubmitByEnterClick} from "../../hooks/useSubmitByEnterClick";
import {observer} from "mobx-react-lite";
import {toast} from "react-toastify";

type Props = {
    paginatedNewsComments: PaginatedComments
    newsId: number
    isLoading: boolean
    isSendingComment: boolean
}
type CommentsForm = {
    comment: string
}

export const Comments = observer(({paginatedNewsComments, newsId, isLoading, isSendingComment}: Props) => {
        const [selectedCommentId, setSelectedCommentId] = useState<null | number>(null)
        useEffect(() => {
            commentsStore.getNewsComments(newsId)
        }, [newsId])
        const buttonRef = useRef(null)
        const {register, handleSubmit, formState: {errors}, setValue} = useForm<CommentsForm>();
        const onSubmit: SubmitHandler<CommentsForm> = data => {
            const request = {content: data.comment, news_item: newsId}
            commentsStore.sendingComment(request)
                .then(() => setValue('comment', ''))
                .catch(() => toast.error('При отправке комментария произошла ошибка.'))
        }
        useSubmitByEnterClick(buttonRef)

        return (
            <>
                <div className={styles.summary}>
                    <button onClick={() => document.getElementById('sending_comment_form')!.scrollIntoView()}
                            className={styles.actionBtn}>
                        <span>написать комментарий</span></button>
                    <NavLink className={styles.count} to="#">Всего
                        комментариев: {paginatedNewsComments.comments_count}</NavLink>
                </div>
                <h2 className={styles.heading}>Комментарии ({paginatedNewsComments.comments_count})</h2>
                {
                    isLoading ? <FormLoader/> :
                        <div id="comments" className={styles.wrapper}>
                            {paginatedNewsComments.results.map(comment => <Comment
                                isSendingComment={isSendingComment}
                                setSelectedCommentId={setSelectedCommentId}
                                selectedCommentId={selectedCommentId}
                                newsId={newsId}
                                key={comment.id}
                                isChildren={false}
                                comment={comment}/>)}
                        </div>
                }
                {

                    !selectedCommentId &&
                    <>
                        {
                            isSendingComment ?
                                <FormLoader/> :
                                <form id="sending_comment_form" onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <textarea {...register('comment', {required: "Комментарий не может быть пустым."})}
                              className={styles.textarea}/>
                                    {errors.comment &&
                                    <span className={styles.errorMessage}>{errors.comment.message}</span>}
                                    <div className={styles.formAction}>
                                        <button ref={buttonRef} type="submit" className={styles.actionBtn}>
                                            <span>опубликовать</span>
                                        </button>
                                    </div>
                                </form>
                        }
                    </>
                }
            </>
        )

    }
)


