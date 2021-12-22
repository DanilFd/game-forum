import styles from "./profile.module.scss"
import {Score} from "./score/score";
import {NavLink} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import {AdditionalInfo} from "./additionalInfo/additionalInfo";
import {IoIosArrowDown} from "react-icons/all";
import {useState} from "react";
import {ProfileResponse} from "../../../types/Users/ProfileResponse";

type Props = {
    userProfile: ProfileResponse
}


export const Profile = ({userProfile}: Props) => {
    const [isActive, setIsActive] = useState(false)
    const score = 80

    return (
        <div className={styles.profile}>
            <div className={styles.section}>
                <div className={styles.avatarRating}>
                    <img src={userProfile.profile_img} alt=""/>
                    <Score score={score}/>
                    <NavLink className={styles.edit} to="#">редактировать</NavLink>
                </div>
                <div className={styles.info}>
                    <span className={styles.username}>{userProfile.login}</span>
                    {userProfile.age && <span
                        className={styles.age}>Возраст:
                                 <b>{userProfile.age}</b>
                            </span>}
                    <span
                        className={styles.lastVisit}>Последнее посещение:
                                 <b>{userProfile.last_visit}</b>
                            </span>
                    <div className={styles.writeMessage}>
                        <NavLink to="#">написать сообщение</NavLink>
                    </div>
                </div>
            </div>
            <div className={styles.profileInfo}>
                <AnimatePresence>
                    {
                        isActive && <AdditionalInfo
                            date_joined={userProfile.date_joined}
                            birthday_date={userProfile.birthday_date}
                            discord={userProfile.discord}
                            gender={userProfile.gender}
                        />
                    }
                </AnimatePresence>
                <div onClick={() => setIsActive(prev => !prev)}
                     className={`${styles.showAddInfo} ${isActive ? styles.active : ''}`}>
                    <IoIosArrowDown/>
                </div>
            </div>
        </div>
    )
}
