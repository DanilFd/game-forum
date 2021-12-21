import styles from './detailProfile.module.scss'
import {observer} from "mobx-react-lite";
import authStore from "../../store/authStore";
import {NavLink} from 'react-router-dom';
import {Score} from "./score/score";
import {IoIosArrowDown} from "react-icons/all";
import {useState} from "react";
import {AnimatePresence} from 'framer-motion';
import {AdditionalInfo} from "./additionalInfo/additionalInfo";

export const DetailProfile = observer(() => {
    const [isActive, setIsActive] = useState(false)
    const score = 80
    return (
        <div className={styles.page}>
            <div className={styles.profile}>
                <div className={styles.section}>
                    <div className={styles.avatarRating}>
                        <img src={authStore.user?.profile_img} alt=""/>
                        <Score score={score}/>
                        <NavLink className={styles.edit} to="#">редактировать</NavLink>
                    </div>
                    <div className={styles.info}>
                        <span className={styles.username}>{authStore.user?.login}</span>
                        <span className={styles.lastVisit}>Последнее посещение: <b>Вчера</b></span>
                        <div className={styles.writeMessage}>
                            <NavLink to="#">написать сообщение</NavLink>
                        </div>
                    </div>
                </div>
                <div className={styles.profileInfo}>
                    <AnimatePresence>
                        {
                            isActive && <AdditionalInfo/>
                        }
                    </AnimatePresence>
                    <div onClick={() => setIsActive(prev => !prev)}
                         className={`${styles.showAddInfo} ${isActive ? styles.active : ''}`}>
                        <IoIosArrowDown/>
                    </div>
                </div>
            </div>
        </div>
    )
})
