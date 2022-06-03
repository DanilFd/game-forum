import styles from "./unexpectedError.module.scss"
import {NavLink} from "react-router-dom";
import logo from "../../components/header/images/logo.svg";
import backgroundLogo from "../../components/header/images/logoIcon.svg";


export const UnexpectedError = ({resetErrorBoundary}: any) => {
    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <NavLink className={styles.logo} to='/'><img src={logo} alt=""/></NavLink>
                <span className={styles.errorMessage}>
                Что-то пошло не так! <br/>
                Непредвиденная ошибка.
            </span>
                <NavLink to='/' onClick={resetErrorBoundary} className={styles.redirect}>
                    <span>вернуться на главную</span>
                </NavLink>
            </div>
            <div className={styles.backgroundLogo}>
                <img src={backgroundLogo} alt=""/>
            </div>
        </div>
    );
};


