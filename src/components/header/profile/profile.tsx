import {AuthenticatedUser} from "../../../types/Auth/AuthenticatedUser";
import styles from './profile.module.scss'
import {useState} from "react";
import {DropDownProfile} from "./dropDownProfile/dropDownProfile";


type Props = {
    user: AuthenticatedUser
}

export const Profile = ({user}: Props) => {
    const [isActive, setIsActive] = useState(false)
    return (
        <div onMouseEnter={() => setIsActive(true)} onMouseLeave={() => setIsActive(false)}
             className={styles.account}>
            <div className={styles.container}>
                <img className={styles.img} src={user.profile_img} alt=''/>
                <span className={`${styles.login} ${isActive ? styles.active : ''}`}>{user.login}</span>
            </div>
            {isActive && <DropDownProfile login={user.login}/>}
        </div>
    )
}
