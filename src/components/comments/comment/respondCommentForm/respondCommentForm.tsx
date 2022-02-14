import React, {useRef} from 'react';
import styles from "./respondCommentForm.module.scss";
import {SubmitHandler, useForm} from "react-hook-form";
import commentsStore from "../../../../store/commentsStore";
import {useSubmitByEnterClick} from "../../../../hooks/useSubmitByEnterClick";
import {SetState} from "../../../../types/utils/utils";
import {toast} from "react-toastify";
import {FormLoader} from "../../../header/formLoader/formLoader";

type CommentsForm = {
    comment: string
}
type Props = {
    itemId: number
    setIsShowForm: SetState<number | null>
    isSendingComment: boolean
    selectedCommentId: number
    setSelectedCommentId: SetState<null | number>
}

export const RespondCommentForm = ({
                                       itemId,
                                       setIsShowForm,
                                       isSendingComment,
                                       selectedCommentId,
                                       setSelectedCommentId
                                   }: Props) => {
        const {register, handleSubmit, formState: {errors}, setValue} = useForm<CommentsForm>();
        const buttonRef = useRef(null)
        const onSubmit: SubmitHandler<CommentsForm> = data => {
            const payload = {content: data.comment, news_item: itemId, parent: selectedCommentId}
            commentsStore.sendingComment(payload)
                .then(() => {
                    setValue('comment', '')
                    setSelectedCommentId(null)
                })
                .catch(() => toast.error('При отправке комментария произошла ошибка.'))
        }
        useSubmitByEnterClick(buttonRef)

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
    }
;

