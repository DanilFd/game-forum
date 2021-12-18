import {useHistory} from "react-router-dom";

export const usePushQuery = () => {
    const history = useHistory()
    return (query: string, value: string) => {
        history.push({
            search: `${query}=${value}&page=1`
        })
    }
}