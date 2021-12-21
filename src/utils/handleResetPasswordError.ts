import {AxiosError} from "axios";
import {ResetPasswordConfirmError} from "../types/Auth/ResetPasswordError";
import {toast} from "react-toastify";


export const HandleResetPasswordError = (errors: AxiosError<ResetPasswordConfirmError>) => {
    toast.error(
        errors.response?.data.new_password?.[0] || 'При сбросе пароля произошла ошибка, попробуйте позже.'
    )
}