import styles from './detailProfile.module.scss'
import {observer} from "mobx-react-lite";
import {useParams} from 'react-router-dom';
import {useEffect} from "react";
import usersStore from "../../store/usersStore";
import Loader from "../../components/loader/loader";
import {Profile} from "./profile/profile";
import authStore from "../../store/authStore";
import {MainUserInfo} from "./mainUserInfo/mainUserInfo";
import {useErrorRedirect} from "../../hooks/useErrorRedirect";

export const DetailProfile = observer(() => {
    const params = useParams<{ login: string }>()
    useEffect(() => {
        usersStore.getProfile(params.login)
        // eslint-disable-next-line
    }, [params.login])
    useErrorRedirect(usersStore.error, usersStore.clearError)
    return (
        <div className={styles.page}>
            {
                usersStore.isLoadingProfile ? <Loader/> :
                    usersStore.userProfile &&
                    <>
                        <Profile userProfile={usersStore.userProfile} authenticatedUser={authStore.user!}/>
                        <MainUserInfo/>
                    </>
            }
        </div>
        )
    }
)
