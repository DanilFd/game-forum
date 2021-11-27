import styles from "./loginForm.module.scss"
import {useState} from "react";
import {FcGoogle} from "react-icons/all";

export const LoginForm = () => {
    const [isShow, setIsShow] = useState(false)
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h1>Войти</h1>
                    <div>
                        или <span>зарегистрироваться</span>
                    </div>
                </div>
                <form className={styles.form}>
                    <input placeholder="Почта/логин" type="text"/>
                    <input placeholder="Пароль" name="password" autoComplete="on" type="password"/>
                    <div className={styles.row}>
                        <button type="submit"><span>войти</span></button>
                        <span>Я не помню пароль</span>
                    </div>
                </form>
                <div className={styles.additional}>
                    <span className={isShow ? `${styles.active}` : ``} onClick={() => setIsShow(true)}>
                        Другие способы войти</span>
                    <div className={isShow ? `${styles.social}` : ``}>
                        <button><FcGoogle/></button>
                    </div>
                </div>
            </div>
            <p className={styles.subtitle}>Авторизуясь, ты соглашаешься с правилами сайта и пользовательским
                соглашением.</p>
        </>

    )
}
