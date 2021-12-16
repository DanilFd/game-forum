import {AuthenticatedUser} from "../../../types/Auth/AuthenticatedUser";
import styles from './profile.module.scss'


type Props = {
    user: AuthenticatedUser
}

export const Profile = ({user}: Props) => {
    return (
        <div className={styles.container}>
            <img className={styles.img} src={user.profile_img} alt=''/>
            <span className={styles.login}>{user.login}</span>
        </div>
    )
}
