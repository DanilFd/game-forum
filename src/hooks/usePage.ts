import {useQuery} from "./useQuery";

export const usePage = () => {
    const page = useQuery().get('page')
    return  page ? +page : 1
}