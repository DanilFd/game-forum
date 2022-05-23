import React, {useRef} from 'react';
import styles from "./respondCommentForm.module.scss";
import {SubmitHandler, useForm} from "react-hook-form";
import commentsStore from "../../../../store/commentsStore";
import {useSubmitByEnterClick} from "../../../../hooks/useSubmitByEnterClick";
import {SetState} from "../../../../types/utils/utils";
import {toast} from "react-toastify";
import {FormLoader} from "../../../header/formLoader/formLoader";
import authStore from "../../../../store/authStore";
import {observer} from "mobx-react-lite";

type CommentsForm = {
    comment: string
}
type Props = {
    itemId: number
    setIsShowForm: SetState<number | null>
    isSendingComment: boolean
    selectedCommentId: number
    setSelectedCommentId: SetState<null | number>
    isNews: boolean
}

export const RespondCommentForm = observer(({
                                                itemId,
                                                setIsShowForm,
                                                isSendingComment,
                                                selectedCommentId,
                                                setSelectedCommentId,
                                                isNews
                                            }: Props) => {
    const {register, handleSubmit, formState: {errors}, setValue} = useForm<CommentsForm>();
    const buttonRef = useRef(null)
    const onSubmit: SubmitHandler<CommentsForm> = data => {
        const item = isNews ?
            {news_item: itemId} :
            {blog_item: itemId}
        const payload = {content: data.comment, ...item, parent: selectedCommentId}
        commentsStore.sendComment(payload, isNews)
            .then(() => {
                toast.success('Комментарий успешно добавлен.')
                setValue('comment', '')
                setSelectedCommentId(null)
            })
            .catch(() => toast.error('При отправке комментария произошла ошибка.'))
    }
    useSubmitByEnterClick(buttonRef, authStore.isAuth)
    return (
        <>
            {
                isSendingComment ?
                    <FormLoader/> :
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                          <textarea {...register('comment', {required: "Комментарий не может быть пустым."})}
                                    className={styles.textarea}/>
                        {errors.comment && <span className={styles.errorMessage}>{errors.comment.message}</span>}
                            <div className={styles.formAction}>
                                <button ref={buttonRef} type="submit" className={styles.actionBtn}><span>опубликовать</span>
                                </button>
                                <button onClick={() => setIsShowForm(null)} className={styles.cancelBtn}>
                                    <span>отменить</span></button>
                            </div>
                        </form>
                }
            </>
        );
    })
;

