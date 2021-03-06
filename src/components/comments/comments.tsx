import {useEffect, useRef, useState} from "react";
import commentsStore from "../../store/commentsStore";
import {Comment} from "./comment/comment";
import styles from "./comments.module.scss"
import {PaginatedCommentTree} from "../../types/Comments/PaginatedComments";
import {FormLoader} from "../header/formLoader/formLoader";
import {SubmitHandler, useForm} from "react-hook-form";
import {useSubmitByEnterClick} from "../../hooks/useSubmitByEnterClick";
import {observer} from "mobx-react-lite";
import {toast} from "react-toastify";
import {useObserver} from "../../hooks/useObserver";
import authStore from "../../store/authStore";

type Props = {
    paginatedComments: PaginatedCommentTree
    itemId: number
    isLoading: boolean
    isSendingComment: boolean
    totalPages: null | number
    isNews: boolean
}
type CommentsForm = {
    comment: string
}

export const Comments = observer(({
                                      paginatedComments,
                                      itemId,
                                      isLoading,
                                      isSendingComment,
                                      totalPages,
                                      isNews
                                  }: Props) => {
    const [selectedCommentId, setSelectedCommentId] = useState<null | number>(null)
    const [page, setPage] = useState(1)
    const [isShowTop, setIsShowTop] = useState(false)
    useEffect(() => {
        commentsStore.clearComments()
    }, [])
    useEffect(() => {
        commentsStore.getComments(itemId, page, isNews)
        // eslint-disable-next-line
    }, [page])
    const buttonRef = useRef(null)
    const {register, handleSubmit, formState: {errors}, setValue} = useForm<CommentsForm>();
    const onSubmit: SubmitHandler<CommentsForm> = data => {
        const item = isNews ?
            {news_item: itemId} :
            {blog_item: itemId}
        const request = {content: data.comment, ...item}
        commentsStore.sendComment(request, isNews)
            .then(() => {
                toast.success('?????????????????????? ?????????????? ????????????????.')
                setValue('comment', '')
            })
            .catch(() => toast.error('?????? ???????????????? ?????????????????????? ?????????????????? ????????????.'))
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
                        <span>???????????????? ??????????????????????</span></button>
                </div>
                <h2 className={styles.heading}>?????????????????????? ({paginatedComments?.comments_count || 0})</h2>
                {
                    isShowTop && !selectedCommentId &&
                    <>
                        {
                            isSendingComment ?
                                <FormLoader/> :
                                <form id="sending_comment_form" onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <textarea {...register('comment', {
                        required: "?????????????????????? ???? ?????????? ???????? ????????????.",
                        maxLength: {value: 100, message: '???????????????????????? ?????????? ?????????????????????? 100 ????????????????.'}
                    })}
                              className={styles.textarea}/>,
                                    {errors.comment &&
                                    <span className={styles.errorMessage}>{errors.comment.message}</span>}
                                    <div className={styles.formAction}>
                                        <button ref={buttonRef} type="submit" className={styles.actionBtn}>
                                            <span>????????????????????????</span>
                                        </button>
                                        <button onClick={() => setIsShowTop(false)} className={styles.cancelBtn}>????????????????
                                        </button>
                                    </div>
                                </form>
                        }
                    </>

                }
                <div id="comments" className={styles.wrapper}>
                    {paginatedComments?.results.map(comment => <Comment
                        isSendingComment={isSendingComment}
                        setSelectedCommentId={setSelectedCommentId}
                        selectedCommentId={selectedCommentId}
                        newsId={itemId}
                        key={comment.id}
                        isChildren={false}
                        comment={comment}
                        isNews={isNews}/>)}
                    {isLoading ? <FormLoader/> : <div ref={lastElement} style={{height: 1}}/>}
                </div>
                {
                    !selectedCommentId && !isShowTop && authStore.isAuth &&
                    <>
                        {
                            isSendingComment ?
                                <FormLoader/> :
                                <form id="sending_comment_form" onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <textarea {...register('comment', {required: "?????????????????????? ???? ?????????? ???????? ????????????."})}
                              className={styles.textarea}/>
                                    {errors.comment &&
                                    <span className={styles.errorMessage}>{errors.comment.message}</span>}
                                    <div className={styles.formAction}>
                                        <button ref={buttonRef} type="submit" className={styles.actionBtn}>
                                            <span>????????????????????????</span>
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


