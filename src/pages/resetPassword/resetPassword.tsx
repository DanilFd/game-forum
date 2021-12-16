import styles from "./resetPassword.module.scss"
import {SubmitHandler, useForm} from "react-hook-form";
import {useHistory, useParams} from "react-router-dom";
import {PasswordResetData} from "../../types/Users/PasswordResetData";
import {observer} from "mobx-react-lite";
import {toast} from "react-toastify";
import {HandleResetPasswordError} from "../../utils/handleResetPasswordError";
import Loader from "../../components/loader/loader";
import authStore from "../../store/authStore";

type ResetPasswordConfirm = {
    password: string,
    passwordConfirm: string
}


export const ResetPassword = observer(() => {
    const params = useParams<{ uid: string, token: string }>()
    const history = useHistory()
    const {register, formState: {errors}, handleSubmit, setError} = useForm<ResetPasswordConfirm>({
        mode: "onChange"
    });
    const onSubmit: SubmitHandler<ResetPasswordConfirm> = data => {
        const resetPasswordData: PasswordResetData = {
            uid: params.uid,
            token: params.token,
            new_password: data.password,
            re_new_password: data.passwordConfirm
        }
        if (data.password !== data.passwordConfirm) {
            return setError('passwordConfirm', {message: 'Пароли не совпадают'})
        }
        authStore.resetPasswordConfirm(resetPasswordData)
            .then(() => {
                toast.success('Ваш пароль изменен.')
                setTimeout(() => history.replace('/'), 1500)
            })
            .catch(HandleResetPasswordError)
    }
    return (
        <div className={styles.wrapper}>
            {
                authStore.isLoadingBetweenForms ? <Loader/> :
                    <>
                        <h1>Восстановление пароля</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input style={{borderColor: errors.password && "red"}} {...register('password', {
                                required: 'Заполните это поле.',
                                minLength: {value: 8, message: 'Минимальная длинна пароля 8.'},
                                maxLength: {value: 32, message: 'Максимальная длинна пароля 32.'}
                            })} placeholder="Пароль" name="password" autoComplete="on"
                                   type="password"/>
                            {errors.password && <span>{errors.password.message}</span>}
                            <input
                                style={{borderColor: errors.passwordConfirm && 'red'}} {...register('passwordConfirm')}
                                placeholder="Подтверждение пароля" name="passwordConfirm"
                                autoComplete="on"
                                type="password"/>
                            {errors.passwordConfirm && <span>{errors.passwordConfirm.message}</span>}
                            <button type="submit">
                                <span>сохранить</span>
                            </button>
                        </form>
                    </>
            }
        </div>
    )
})
