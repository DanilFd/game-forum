import styles from './detailProfile.module.scss'
import {observer} from "mobx-react-lite";
import {NavLink, useHistory, useParams} from 'react-router-dom';
import {Score} from "./score/score";
import {IoIosArrowDown} from "react-icons/all";
import {useEffect, useState} from "react";
import {AnimatePresence} from 'framer-motion';
import {AdditionalInfo} from "./additionalInfo/additionalInfo";
import usersStore from "../../store/usersStore";
import Loader from "../../components/loader/loader";
import {useError} from "../../hooks/useError";
import {AxiosError} from "axios";
import {toast} from "react-toastify";

export const DetailProfile = observer(() => {
    const [isActive, setIsActive] = useState(false)
    const history = useHistory()
    const params = useParams<{ login: string }>()
    const score = 80
    useEffect(() => {
        usersStore.getProfile(params.login)
            .catch((err: AxiosError<{ detail: string }>) => {
                toast.error(err.response?.data.detail)
                history.replace('/not_found')
            })
        // eslint-disable-next-line
    }, [params.login])
    useError(usersStore.error)
    return (
        <div className={styles.page}>
            {usersStore.isLoadingProfile ? <Loader/> :
                <div className={styles.profile}>
                    <div className={styles.section}>
                        <div className={styles.avatarRating}>
                            <img src={usersStore.userProfile.profile_img} alt=""/>
                            <Score score={score}/>
                            <NavLink className={styles.edit} to="#">редактировать</NavLink>
                        </div>
                        <div className={styles.info}>
                            <span className={styles.username}>{usersStore.userProfile.login}</span>
                            {usersStore.userProfile.age && <span
                                className={styles.age}>Возраст:
                                 <b>{usersStore.userProfile.age}</b>
                            </span>}
                            <span
                                className={styles.lastVisit}>Последнее посещение:
                                 <b>{usersStore.userProfile.last_visit}</b>
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
                                    date_joined={usersStore.userProfile.date_joined}
                                    birthday_date={usersStore.userProfile.birthday_date}
                                    discord={usersStore.userProfile.discord}
                                    gender={usersStore.userProfile.gender}
                                />
                            }
                        </AnimatePresence>
                        <div onClick={() => setIsActive(prev => !prev)}
                             className={`${styles.showAddInfo} ${isActive ? styles.active : ''}`}>
                            <IoIosArrowDown/>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
})
