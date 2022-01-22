import {FoundUser} from "../../../types/Users/FoundUser";
import {observer} from "mobx-react-lite";
import styles from "./listOfFoundUsers.module.scss"
import usersStore from "../../../store/usersStore";

type Props = {
    foundUsers: FoundUser[]
    setUser: (login: string) => void
    active: boolean
}

export const ListOfFoundUsers = observer(({foundUsers, setUser, active}: Props) => {

    return (
        <div className={`${styles.list} ${active ? styles.active : ''}`}>
            {
                foundUsers.map(user => <div onClick={() => {
                    setUser(user.login)
                    usersStore.clearUserList()
                }} className={styles.user} key={user.id}><img className={styles.avatar} src={user.profile_img}
                                                              alt=""/><span>{user.login}</span>
                </div>)
            }
        </div>
    );
});

