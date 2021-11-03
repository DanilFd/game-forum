import {useEffect} from "react";
import {toast} from "react-hot-toast";

export const useError = (error: string | null) => {
    useEffect(() => {
        error && toast.error("При загрузке данных произошла ошибка")
    }, [error])
};
