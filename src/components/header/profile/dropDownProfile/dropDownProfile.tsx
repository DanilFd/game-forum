import {NavLink} from "react-router-dom"
import styles from "./dropDownProfile.module.scss"
import authStore from "../../../../store/authStore";

export const DropDownProfile = () => {
    return (
        <div className={styles.dropdown}>
            <ul>
                <li>
                    <NavLink to="#">Профиль</NavLink>
                </li>
                <li>
                    <NavLink to="#">Сообщения</NavLink>
                </li>
                <li>
                    <NavLink to="#">Лента</NavLink>
                </li>
                <li>
                    <span onClick={() => authStore.logout()}>Выйти</span>
                </li>
            </ul>
        </div>
    )
}
