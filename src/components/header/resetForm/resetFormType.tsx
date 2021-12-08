import styles from "./resetForm.module.scss"
import {SubmitHandler, useForm} from "react-hook-form";
import {AiOutlineLeft} from "react-icons/all";
import {SetState} from "../../../types/utils/utils";
import {SelectedForm} from "../../../types/Users/SelectedForm";
import {AxiosError, AxiosResponse} from "axios";
import {ResetPasswordError} from "../../../types/Users/ResetPasswordError";
import {toast} from "react-toastify";
import {useState} from "react";

type ResetFormType = {
    email: string
}
type Props = {
    switchForm: SetState<SelectedForm>
    resetPassword: (email: { email: string }) => Promise<AxiosResponse<ResetPasswordError>>
}

export const ResetForm = ({switchForm, resetPassword}: Props) => {
    const [isVisible, setIsVisible] = useState(false)
    const {register, formState: {errors}, handleSubmit, getValues} = useForm<ResetFormType>({
        mode: "onChange"
    });
    const onSubmit: SubmitHandler<ResetFormType> = data => {
        resetPassword(data)
            .then(() => {
                setIsVisible(true)
            })
            .catch((errors: AxiosError<ResetPasswordError>) => toast.error(errors.response?.data[0]))
            .finally()
    }
    return (
        <div className={styles.wrapper}>
            <button onClick={() => switchForm('login')}>
                <AiOutlineLeft/> Наазад
            </button>
            {isVisible &&
            <p>На почту <b>{getValues('email')}</b> было отправленно письмо с логином и ссылкой для
                сброса пароля.</p>}
            <h2>Восстановление логина и пароля</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input style={{borderColor: errors.email && "red"}} {...register('email', {
                    required: 'Заполните это поле.',
                    pattern: {
                        value: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
                        message: "Введите правильный адрес электронной почты."
                    }
                })} placeholder="Почта при регистрации"
                       type="text"/>
                {errors.email && <span style={{color: "red", fontSize: 12}}>{errors.email.message}</span>}
                <button type="submit">
                    <span>восстановить</span>
                </button>
            </form>
        </div>
    )
}
