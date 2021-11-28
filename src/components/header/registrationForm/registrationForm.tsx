import styles from "./registrationForm.module.scss"
import {useForm} from "react-hook-form";
import {SetState} from "../../../types/utils/utils";

type Props = {
    switchForm: SetState<boolean>
}

export const RegistrationForm = ({switchForm}: Props) => {
    const {register} = useForm();

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h1>Регистрация</h1>
                    <div>
                        или <span onClick={() => switchForm(prev => !prev)}>войти через почтку/логин</span>
                    </div>
                </div>
                <form className={styles.form}>
                    <input {...register('Login')} placeholder="Логин" type="text"/>
                    <input {...register('Email')} placeholder="Email" type="text"/>
                    <input {...register('Password')} placeholder="Пароль" name="password" autoComplete="on"
                           type="password"/>
                    <button type="submit"><span>зарегистрироваться</span></button>
                </form>
            </div>
            <p className={styles.subtitle}>Авторизуясь, ты соглашаешься с правилами сайта и пользовательским
                соглашением.</p>
        </>
    )
}
