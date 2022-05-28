import {useEffect} from "react";
import {useHistory} from "react-router-dom";

export const useErrorRedirect = (error: string, clearError: () => void) => {
    const history = useHistory()
    useEffect(() => {
        if (error)
            history.replace('/not-found')
        return clearError
        // eslint-disable-next-line
    }, [error])
}