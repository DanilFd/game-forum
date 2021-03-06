import styles from "./profile.module.scss"
import {NavLink} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import {AdditionalInfo} from "./additionalInfo/additionalInfo";
import {IoIosArrowDown} from "react-icons/all";
import {useState} from "react";
import {ProfileResponse} from "../../../types/Users/ProfileResponse";
import {AuthenticatedUser} from "../../../types/Auth/AuthenticatedUser";
import {ProfileEdit} from "../profileEdit/profileEdit";
import {UserRating} from "./userRating/userRating";
import {observer} from "mobx-react-lite";
import {toast} from "react-toastify";
import usersStore from "../../../store/usersStore";

type Props = {
    userProfile: ProfileResponse
    authenticatedUser: AuthenticatedUser
}


export const Profile = observer(({userProfile, authenticatedUser}: Props) => {
    const [isActive, setIsActive] = useState(false)
    const [isEditProfile, setIsEditProfile] = useState(false)
    return (
        <div className={styles.profile}>
            <div className={styles.section}>
                <div className={styles.avatarRating}>
                    <img src={userProfile.profile_img} alt=""/>
                    <UserRating initialRate={userProfile.rate} score={userProfile.rating}/>
                    {authenticatedUser?.login === userProfile.login &&
                    <span onClick={() => setIsEditProfile(prev => !prev)}
                          className={styles.edit}>{isEditProfile ? "назад" : "редактировать"}</span>}
                </div>
                <div className={styles.info}>
                    <span className={styles.username}>{userProfile.login}</span>
                    {
                        +userProfile.age! > 0 &&
                        <span className={styles.age}>Возраст:
                                 <b>{userProfile.age}</b>
                         </span>
                    }
                    <span
                        className={styles.lastVisit}>Последнее посещение:
                                 <b>{userProfile.last_visit}</b>
                            </span>
                    {
                        authenticatedUser?.login !== userProfile.login &&
                        <div className={styles.writeMessage}>
                            <NavLink
                                onClick={e => {
                                    if (!authenticatedUser) {
                                        toast.info("Для этого необходимо авторизоваться.")
                                        return e.preventDefault()
                                    }
                                    usersStore.setUserLoginFromProfile(userProfile.login)
                                }}
                                to="/pm/new">написать сообщение</NavLink>
                        </div>
                    }
                </div>
            </div>
            {
                isEditProfile ?
                    <div>
                        <AnimatePresence>
                            <ProfileEdit/>
                        </AnimatePresence>
                    </div> :
                    <div className={styles.profileInfo}>
                        <AnimatePresence>
                            {
                                isActive && <AdditionalInfo
                                    date_joined={userProfile.date_joined}
                                    birthday_date={userProfile.birthday_date}
                                    discord={userProfile.discord}
                                    gender={userProfile.gender}
                                    about_user={userProfile.about_custom_user}
                                />
                            }
                        </AnimatePresence>
                        <div onClick={() => setIsActive(prev => !prev)}
                             className={`${styles.showAddInfo} ${isActive ? styles.active : ''}`}>
                            <IoIosArrowDown/>
                        </div>
                    </div>
            }
        </div>
    )
})
