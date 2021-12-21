import {NavLink} from "react-router-dom"
import styles from "./pageNotFound.module.scss"
import logo from "../../components/header/images/logo.svg"
import backgroundLogo from "../../components/header/images/logoIcon.svg"


export const PageNotFound = () => {
    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <NavLink className={styles.logo} to='/'><img src={logo} alt=""/></NavLink>
                <span className={styles.errorCode}>
                404
            </span>
                <span className={styles.errorMessage}>
                Что-то пошло не так! <br/>
                Страница не найдена.
            </span>
                <NavLink to='/' className={styles.redirect}>
                    <span>вернуться на главную</span>
                </NavLink>
            </div>
            <div className={styles.backgroundLogo}>
                <img src={backgroundLogo} alt=""/>
            </div>
        </div>
    )
}
