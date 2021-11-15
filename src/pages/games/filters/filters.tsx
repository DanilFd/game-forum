import {observer} from "mobx-react-lite";
import gamesStore from "../../../store/gamesStore";
import {SubmitHandler, useForm} from "react-hook-form";
import {ManyFieldsFilter} from "./manyFieldsFilter/manyFieldsFilter";
import {selectUniqueItems} from "../../../utils/selectUniqueItems";
import {useHistory} from "react-router-dom";
import querystring from 'querystring'
import {useEffect} from "react";
import {useQuery} from "../../../hooks/useQuery";

type FiltersForm = {
    items: { genre: string }[]
}

export const Filters = observer(() => {
    const history = useHistory()
    const genres = useQuery()
    const {register, handleSubmit, control, setValue} = useForm<FiltersForm>({});
    useEffect(() => {
        gamesStore.setGenres(genres.getAll('genre'))
        // eslint-disable-next-line
    }, [genres.getAll('genre').toString()])
    useEffect(() => {
        gamesStore.selectedGenres.length === 0 ?
            setValue('items', [{genre: ''}]):
            setValue('items', gamesStore.selectedGenres.map(genre => ({genre})))
    }, [])
    const onSubmit: SubmitHandler<FiltersForm> = data => {
        const genres = selectUniqueItems(data.items.map(item => item.genre))
        history.push(`/games?${querystring.stringify({genre: genres})}&page=1`)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ManyFieldsFilter register={register} control={control} items={gamesStore.genres}/>
            <button type="submit">Показать</button>
            <button onClick={() => setValue('items', gamesStore.selectedGenres.map(genre => ({genre})))}>test</button>
        </form>
    )
})
