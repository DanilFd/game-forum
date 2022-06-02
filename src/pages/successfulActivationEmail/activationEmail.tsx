import {useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import {AccountActivationData} from "../../types/Auth/AccountActivationData";
import authStore from "../../store/authStore";


export const ActivationEmail = () => {
    const params = useParams<AccountActivationData>()
    const history = useHistory()
    useEffect(() => {
        authStore.accountActivation(params)
            .then(res => {
                authStore.loginAfterRegistration(res.data)
                setTimeout(() => history.replace('/'), 100)
            })
            .catch()
        // eslint-disable-next-line
    }, [])
    return (
        <div>
        </div>
    )
}
