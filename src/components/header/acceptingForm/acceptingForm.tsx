import styles from './acceptingForm.module.scss'
import {AiOutlineLeft, AiOutlineMail} from "react-icons/all";
import {SetState} from "../../../types/utils/utils";
import {SelectedForm} from "../../../types/Users/SelectedForm";


type Props = {
    switchForm: SetState<SelectedForm>
}

export const AcceptingForm = ({switchForm}: Props) => {
    return (
        <div className={styles.wrapper}>
            <button onClick={() => switchForm('login')}>
                <AiOutlineLeft/> Авторизоваться
            </button>
            <h2>Спасибо за регистрацию!</h2>
            <AiOutlineMail/>
            <span>На твой email отправлено письмо со ссылкой для активации аккаунта и данными для входа.</span>
            <span>Если не активировать аккаунт в течение 24 часов, то он будет удалён.</span>
            <span>Можешь закрыть окно и проверить почту.</span>
        </div>
    )
}
