import styles from './detailProfile.module.scss'
import {observer} from "mobx-react-lite";
import {useHistory, useParams} from 'react-router-dom';
import {useEffect} from "react";
import usersStore from "../../store/usersStore";
import Loader from "../../components/loader/loader";
import {useError} from "../../hooks/useError";
import {AxiosError} from "axios";
import {toast} from "react-toastify";
import {Profile} from "./profile/profile";
import authStore from "../../store/authStore";

export const DetailProfile = observer(() => {
        const history = useHistory()
        const params = useParams<{ login: string }>()

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
                    <Profile userProfile={usersStore.userProfile} authenticatedUser={authStore.user!}/>
                }
            </div>
        )
    }
)
