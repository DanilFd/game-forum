import {RegisterUserError} from "../types/Users/RegisterUserError";
import {toast} from "react-toastify";
import {AxiosError} from "axios";

export const handleRegistrationErrors = (errors: AxiosError<RegisterUserError>) => {
    toast.error(errors.response?.data.email ?
        errors.response.data.email[0].replace('email', 'почтой')
            .replace('таким', 'такой') :
        (errors.response?.data.login?.[0].replace('Логин', 'логином') || ""), {autoClose: 3000})
}