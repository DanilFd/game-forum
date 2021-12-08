import styles from "./loginForm.module.scss"
import {useState} from "react";
import {FcGoogle} from "react-icons/all";
import {motion} from "framer-motion";
import {SetState} from "../../../types/utils/utils";
import {SelectedForm} from "../../../types/Users/SelectedForm";


type Props = {
    switchForm: SetState<SelectedForm>
}

export const LoginForm = ({switchForm}: Props) => {
    const [isShow, setIsShow] = useState(false)
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
                <form className={styles.form}>
                    <input placeholder="Почта/логин" type="text"/>
                    <input id="test" placeholder="Пароль" name="password" autoComplete="on" type="password"/>
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
