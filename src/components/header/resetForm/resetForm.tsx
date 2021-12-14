import styles from "./resetForm.module.scss"
import {SubmitHandler, useForm} from "react-hook-form";
import {AiOutlineLeft} from "react-icons/all";
import {SetState} from "../../../types/utils/utils";
import {SelectedForm} from "../../../types/Users/SelectedForm";
import {AxiosError, AxiosResponse} from "axios";
import {ResetPasswordError} from "../../../types/Users/ResetPasswordError";
import {toast} from "react-toastify";
import {useState} from "react";
import {FormLoader} from "../formLoader/formLoader";

type ResetFormType = {
    email: string
}
type Props = {
    switchForm: SetState<SelectedForm>
    resetPassword: (email: { email: string }) => Promise<AxiosResponse<ResetPasswordError>>
    isLoading: boolean
}

export const ResetForm = ({switchForm, resetPassword, isLoading}: Props) => {
    const [isVisible, setIsVisible] = useState(false)
    const [isDisableBtn, setIsDisableBtn] = useState(false)
    const [seconds, setSeconds] = useState(60)
    const {register, formState: {errors}, handleSubmit, getValues} = useForm<ResetFormType>({
        mode: "onChange"
    });
    const onSubmit: SubmitHandler<ResetFormType> = data => {
        resetPassword(data)
            .then(() => {
                setIsVisible(true)
            })
            .catch((errors: AxiosError<ResetPasswordError>) => toast.error(errors.response?.data[0]))
            .finally(() => buttonLock())
    }
    const buttonLock = () => {
        setIsDisableBtn(true)
        const interval = setInterval(() => {
            setSeconds(prev => prev - 1)
        }, 1000)
        setTimeout(() => {
            clearInterval(interval)
            setSeconds(60)
            setIsDisableBtn(false)
        }, 60000)
    }
    return (
        <div className={styles.wrapper}>
            {isLoading ? <FormLoader/> :

                <>
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
                        <button disabled={isDisableBtn} type="submit">
                            <span>{isDisableBtn ? seconds : 'восстановить'}</span>
                        </button>
                    </form>
                </>
            }
        </div>
    )
}
