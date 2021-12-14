import styles from "./registrationForm.module.scss"
import {SubmitHandler, useForm} from "react-hook-form";
import {SetState} from "../../../types/utils/utils";
import {motion} from "framer-motion";
import {UserRegisterCredential} from "../../../types/Users/UserRegisterCredential";
import {AxiosResponse} from "axios";
import {RegisterUserError} from "../../../types/Users/RegisterUserError";
import {handleRegistrationErrors} from "../../../utils/handleRegistrationErrors";
import {SelectedForm} from "../../../types/Users/SelectedForm";
import {FormLoader} from "../formLoader/formLoader";


type Props = {
    switchForm: SetState<SelectedForm>
    registerUser: (data: UserRegisterCredential) => Promise<AxiosResponse<RegisterUserError>>
    isLoading: boolean
}
type RegisterForm = {
    login: string
    email: string
    password: string
}
export const RegistrationForm = ({switchForm, registerUser, isLoading}: Props) => {
    const {register, formState: {errors}, handleSubmit, reset} = useForm<RegisterForm>({
        mode: "onChange"
    });
    const onSubmit: SubmitHandler<RegisterForm> = data => {
        registerUser(data)
            .then(() => {
                reset()
                switchForm('accepting')
            })
            .catch(handleRegistrationErrors)
    }
    return (
        <motion.div
            initial={{translateX: 300}}
            animate={{translateX: 0}}
        >
            {isLoading ? <FormLoader/> :
                <>
                    <div className={styles.wrapper}>
                        <div className={styles.header}>
                            <h1>Регистрация</h1>
                            <div>
                                или <span onClick={() => switchForm("login")}>войти в аккаунт</span>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}
                              className={styles.form}>
                            <input style={{borderColor: errors.login && "red"}} {...register('login', {
                                required: 'Заполните это поле.',
                                maxLength: {value: 20, message: 'Длина логина слишком большая.'},
                                minLength: {value: 6, message: 'Минимальная длина логина 6.'},
                                pattern: {
                                    value: /^[a-zA-Z\d]+$/,
                                    message: 'Логин должен содержать только буквы латинского алфавита и цифры.'
                                }
                            })} placeholder="Логин"
                                   type="text"/>
                            {errors.login && <span style={{color: "red"}}>{errors.login.message}</span>}

                            <input style={{borderColor: errors.email && "red"}} {...register('email', {
                                required: 'Заполните это поле.',
                                pattern: {
                                    value: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
                                    message: "Введите правильный адрес электронной почты."
                                }
                            })} placeholder="Email"
                                   type="text"/>
                            {errors.email && <span style={{color: "red"}}>{errors.email.message}</span>}

                            <input style={{borderColor: errors.password && "red"}} {...register('password', {
                                required: 'Заполните это поле.',
                                minLength: {value: 8, message: 'Минимальная длинна пароля 8.'},
                                maxLength: {value: 32, message: 'Максимальная длинна пароля 32.'}
                            })} placeholder="Пароль" name="password" autoComplete="on"
                                   type="password"/>
                            {errors.password && <span style={{color: "red"}}>{errors.password.message}</span>}

                            <button type="submit">
                                <span>зарегистрироваться</span>
                            </button>
                        </form>
                    </div>
                    <p className={styles.subtitle}>Авторизуясь, ты соглашаешься с правилами сайта и пользовательским
                        соглашением.</p>
                </>
            }
        </motion.div>

    )
}
