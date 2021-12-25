import {AxiosError} from "axios";
import {toast} from "react-toastify";
import {SetUserPasswordErrors} from "../../../../types/Users/setUserPasswordErrors";

export const handleSetPasswordErrors = (errors: AxiosError<SetUserPasswordErrors>) => {
    toast.error(errors.response?.data.new_password ?
        errors.response.data.new_password[0] :
        (errors.response?.data.current_password?.[0].replace('Неправильный пароль.', 'Текущий пароль неправильный.') ||
            "При сбросе пароля произошла ошибка"),
        {autoClose: 3000})
}