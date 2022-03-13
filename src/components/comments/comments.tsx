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
import {useObserver} from "../../hooks/useObserver";
import authStore from "../../store/authStore";

type Props = {
    paginatedNewsComments: PaginatedCommentTree
    itemId: number
    isLoading: boolean
    isSendingComment: boolean
    totalPages: null | number
}
type CommentsForm = {
    comment: string
}

export const Comments = observer(({paginatedNewsComments, itemId, isLoading, isSendingComment, totalPages}: Props) => {
        const [selectedCommentId, setSelectedCommentId] = useState<null | number>(null)
        const [page, setPage] = useState(1)
        const [isShowTop, setIsShowTop] = useState(false)
        useEffect(() => {
            commentsStore.clearComments()
        }, [])
        useEffect(() => {
            commentsStore.getNewsComments(itemId, page)
            // eslint-disable-next-line
        }, [page])
        const buttonRef = useRef(null)
        const {register, handleSubmit, formState: {errors}, setValue} = useForm<CommentsForm>();
        const onSubmit: SubmitHandler<CommentsForm> = data => {
            const request = {content: data.comment, news_item: itemId}
            commentsStore.sendingComment(request)
                .then(() => {
                    toast.success('Комментарий успешно добавлен.')
                    setValue('comment', '')
                })
                .catch(() => toast.error('При отправке комментария произошла ошибка.'))
        }

        const lastElement = useRef(null)
        useObserver(lastElement, page < totalPages!, isLoading, () => {
            setPage(page + 1)
        })
        useSubmitByEnterClick(buttonRef, authStore.isAuth)
        return (
            <>
                <div className={styles.summary}>
                    <button onClick={() => {
                        authStore.isAuth ? setIsShowTop(true) : authStore.setIsActiveAuthForm(true)
                        setSelectedCommentId(null)
                    }}
                            className={styles.actionBtn}>
                        <span>написать комментарий</span></button>
                </div>
                <h2 className={styles.heading}>Комментарии ({paginatedNewsComments?.comments_count || 0})</h2>
                {
                    isShowTop && !selectedCommentId &&
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
                                        <button onClick={() => setIsShowTop(false)} className={styles.cancelBtn}>отменить
                                        </button>
                                    </div>
                                </form>
                        }
                    </>

                }
                <div id="comments" className={styles.wrapper}>
                    {paginatedNewsComments?.results.map(comment => <Comment
                        isSendingComment={isSendingComment}
                        setSelectedCommentId={setSelectedCommentId}
                        selectedCommentId={selectedCommentId}
                        newsId={itemId}
                        key={comment.id}
                        isChildren={false}
                        comment={comment}/>)}
                    {isLoading ? <FormLoader/> : <div ref={lastElement} style={{height: 1}}/>}
                </div>
                {
                    !selectedCommentId && !isShowTop && authStore.isAuth &&
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


