import {useEffect} from "react";
import {observer} from "mobx-react-lite";
import usersStore from "../../store/usersStore";
import {useParams} from "react-router-dom";
import {AccountActivationData} from "../../types/Users/AccountActivationData";

export const ActivationEmail = observer(() => {
    const params = useParams<AccountActivationData>()
    useEffect(() => {
        usersStore.accountActivation(params)
            .then(res => {
                console.log('успех', res.data)
            })
            .catch(() => console.log('неудача'))
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <h1 style={{color: "white"}}>работаем</h1>
        </div>
    )
})
