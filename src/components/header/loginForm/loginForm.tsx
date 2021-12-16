import styles from "./loginForm.module.scss"
import {useState} from "react";
import {FcGoogle} from "react-icons/all";
import {motion} from "framer-motion";
import {SetState} from "../../../types/utils/utils";
import {SelectedForm} from "../../../types/Users/SelectedForm";
import {SubmitHandler, useForm} from "react-hook-form";
import {UserLoginDetails} from "../../../types/Auth/AuthRequest";


type Props = {
    switchForm: SetState<SelectedForm>
    login: (data: UserLoginDetails) => void
}

type LoginFormType = {
    login: string,
    password: string
}
export const LoginForm = ({switchForm, login}: Props) => {
    const [isShow, setIsShow] = useState(false)
    const {register, formState: {errors}, handleSubmit} = useForm<LoginFormType>({
        mode: "onChange"
    });
    const onSubmit: SubmitHandler<LoginFormType> = data => {
        login(data)
    }
    return (
        <motion.div
            initial={{translateX: -300}}
            animate={{translateX: 0}}
        >
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h1>Войти</h1>
                    <div>
                        или <span onClick={() => switchForm('register')}>зарегистрироваться</span>
                    </div>
                </div>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <input style={{borderColor: errors.login && "red"}} {...register('login', {
                        required: 'Заполните это поле.',
                        pattern: {
                            value: /^[a-zA-Z\d]+$/,
                            message: 'Логин должен содержать только буквы латинского алфавита и цифры.'
                        }
                    })} placeholder="Логин"
                           type="text"/>
                    {errors.login && <span style={{color: "red"}}>{errors.login.message}</span>}
                    <input style={{borderColor: errors.password && "red"}} {...register('password', {
                        required: 'Заполните это поле.',
                    })} placeholder="Пароль" name="password" autoComplete="on"
                           type="password"/>
                    {errors.password && <span style={{color: "red"}}>{errors.password.message}</span>}
                    <div className={styles.row}>
                        <button type="submit"><span>войти</span></button>
                        <span onClick={() => switchForm('reset')}>Я не помню логин/пароль</span>
                    </div>
                </form>
                <div className={styles.additional}>
                    <span className={isShow ? `${styles.active}` : ``} onClick={() => setIsShow(true)}>
                        Другие способы войти</span>
                    <div className={isShow ? `${styles.social}` : ``}>
                        <button><FcGoogle/></button>
                    </div>
                </div>
                -
            </div>
            <p className={styles.subtitle}>Авторизуясь, ты соглашаешься с правилами сайта и пользовательским
                соглашением.</p>
        </motion.div>
    )
}
