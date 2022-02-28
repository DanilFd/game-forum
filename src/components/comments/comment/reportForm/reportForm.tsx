import styles from "./reportForm.module.scss"
import {DropDownList} from "../../../dropDownList/dropDownList";
import {SubmitHandler, useForm} from "react-hook-form";
import commentsStore from "../../../../store/commentsStore";
import {toast} from "react-toastify";
import {SetState} from "../../../../types/utils/utils";


type CreateReportForm = {
    reason: string
    description: string | null
}
type Props = {
    commentId: number
    setIsShow: SetState<boolean>
}

export const ReportForm = ({commentId, setIsShow}: Props) => {
    const {register, handleSubmit, formState: {errors}} = useForm<CreateReportForm>({
        defaultValues: {reason: 'Спам'}
    });

    const reasons = [
        {id: 1, title: 'Спам'},
        {id: 2, title: 'Мультиаккаунт'},
        {id: 3, title: 'Оскорбление'},
        {id: 4, title: 'Реклама'},
        {id: 5, title: 'Контент для взрослых'},
        {id: 6, title: 'Другое'},

    ]
    const onSubmit: SubmitHandler<CreateReportForm> = data => {
        const payload = {comment: commentId, reason: data.reason, description: data.description}
        commentsStore.createCommentComplaint(payload)
            .then(() => {
                toast.success('Спасибо, ваша жалоба отправлена модераторам.')
                setIsShow(false)
            })
            .catch(() => toast.error('При отправке жалобы произошла ошибка.'))
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <span className={styles.heading}>Пожаловаться на комментарий</span>
            <span className={styles.info}>Укажите причину жалобы:</span>
            <DropDownList items={reasons} selectProps={{...register('reason')}}/>
            <div className={styles.additionalInfo}>
                <span className={styles.info}>Дополнительная информация:</span>
                <textarea {...register('description', {
                    maxLength: {
                        value: 70,
                        message: 'Максимальная длина 70 символов.'
                    }
                })}/>
                {errors.description && <span style={{color: "red", fontSize: 12}}>{errors.description.message}</span>}
            </div>
            <button className={styles.actionBtn} type="submit"><span>Пожаловаться</span></button>
        </form>
    );
};

