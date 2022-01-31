import {NavLink, useHistory} from "react-router-dom"
import styles from "./dropDownProfile.module.scss"
import authStore from "../../../../store/authStore";


type Props = {
    login: string
}

export const DropDownProfile = ({login}: Props) => {
    const history = useHistory()
    return (
        <div className={styles.dropdown}>
            <ul>
                <li>
                    <NavLink to={`/user/${login}`}>Профиль</NavLink>
                </li>
                <li>
                    <NavLink to="/pm">Сообщения</NavLink>
                </li>
                <li>
                    <NavLink to="/feed">Лента</NavLink>
                </li>
                <li>
                    <span onClick={() => {
                        authStore.logout()
                        history.replace('/')
                    }}>Выйти</span>
                </li>
            </ul>
        </div>
    )
}
