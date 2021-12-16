import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {AccountActivationData} from "../../types/Users/AccountActivationData";
import authStore from "../../store/authStore";


export const ActivationEmail = () => {
    const params = useParams<AccountActivationData>()
    useEffect(() => {
        authStore.accountActivation(params)
            .then(res => {
                authStore.loginAfterRegistration(res.data)
            })
            .catch(() => console.log('неудача'))
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <h1 style={{color: "white"}}>работаем</h1>
        </div>
    )
}
