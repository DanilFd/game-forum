import styles from "./profile.module.scss"
import {Score} from "./score/score";
import {NavLink} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import {AdditionalInfo} from "./additionalInfo/additionalInfo";
import {IoIosArrowDown} from "react-icons/all";
import {useState} from "react";
import {ProfileResponse} from "../../../types/Users/ProfileResponse";
import {AuthenticatedUser} from "../../../types/Auth/AuthenticatedUser";
import {ProfileEdit} from "../profileEdit/profileEdit";

type Props = {
    userProfile: ProfileResponse
    authenticatedUser: AuthenticatedUser
}


export const Profile = ({userProfile, authenticatedUser}: Props) => {
    const [isActive, setIsActive] = useState(false)
    const [isEditProfile, setIsEditProfile] = useState(false)
    const score = 80
    return (
        <div className={styles.profile}>
            <div className={styles.section}>
                <div className={styles.avatarRating}>
                    <img src={userProfile.profile_img} alt=""/>
                    <Score score={score}/>
                    {authenticatedUser.login === userProfile.login &&
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
                    <div className={styles.writeMessage}>
                        <NavLink to="#">написать сообщение</NavLink>
                    </div>
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
}
