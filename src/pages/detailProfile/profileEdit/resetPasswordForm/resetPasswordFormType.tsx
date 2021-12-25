import styles from "./resetPasswordForm.module.scss";
import {SubmitHandler, useForm} from "react-hook-form";
import usersStore from "../../../../store/usersStore";
import {toast} from "react-toastify";
import {SetState} from "../../../../types/utils/utils";
import {handleSetPasswordErrors} from "./handleSetPasswordErrors";

type ResetPasswordFormType = {
    new_password: string,
    re_new_password: string,
    current_password: string
}
type Props = {
    setIsPasswordEdit: SetState<boolean>
}

export const ResetPasswordForm = ({setIsPasswordEdit}: Props) => {
    const {register, formState: {errors}, handleSubmit, setError, reset} = useForm<ResetPasswordFormType>({
        mode: "onChange"
    });
    const onSubmit: SubmitHandler<ResetPasswordFormType> = data => {
        if (data.new_password !== data.re_new_password) {
            return setError('re_new_password', {message: 'Пароли не совпадают'})
        }
        usersStore.setUserPassword(data)
            .then(() => {
                toast.success('Пароль успешно изменен.')
                setIsPasswordEdit(false)
                reset()
            })
            .catch(handleSetPasswordErrors)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <input {...register('new_password', {
                required: 'Заполните это поле.',
                minLength: {value: 8, message: 'Минимальная длинна пароля 8.'},
                maxLength: {value: 32, message: 'Максимальная длинна пароля 32.'}
            })} placeholder="Новый пароль" type="password"/>
            {errors.new_password && <span className={styles.error}>{errors.new_password.message}</span>}
            <input {...register('re_new_password', {
                required: 'Заполните это поле.'
            })} placeholder="Повторите пароль" type="password"/>
            {errors.re_new_password && <span className={styles.error}>{errors.re_new_password.message}</span>}
            <span className={styles.title}>В целях безопастности введите текущий пароль.</span>
            <input {...register('current_password', {
                required: 'Заполните это поле.',
            })} placeholder="Текущий пароль" type="password"/>
            {errors.current_password && <span className={styles.error}>{errors.current_password.message}</span>}
            <button type="submit"><span>отправить</span></button>
        </form>
    )
}
