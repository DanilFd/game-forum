import {observer} from "mobx-react-lite";
import gamesStore from "../../../store/gamesStore";
import {SubmitHandler, useForm} from "react-hook-form";
import {ManyFieldsFilter} from "./manyFieldsFilter/manyFieldsFilter";
import {selectUniqueItems} from "../../../utils/selectUniqueItems";
import {useHistory} from "react-router-dom";
import querystring from 'querystring'
import {useEffect} from "react";
import {useQuery} from "../../../hooks/useQuery";
import {DropDownList} from "../../../components/dropDownList/dropDownList";

type FiltersForm = {
    genres: { item: string }[]
    platforms: { item: string }[]
    ordering: { title: string | null }
}

export const Filters = observer(() => {
    const history = useHistory()
    const query = useQuery()
    const {register, handleSubmit, control, setValue, getValues} = useForm<FiltersForm>();
    console.log(gamesStore.selectedOrdering)
    console.log(getValues().ordering)
    console.log(query.get('ordering'))
    const syncFiltersWithQuery = () => {
        gamesStore.setGenres(query.getAll('genre'))
        gamesStore.setPlatforms(query.getAll('platform'))
        gamesStore.setOrdering(query.get('ordering'))
        gamesStore.selectedGenres.length === 0 ?
            setValue('genres', [{item: ''}]) :
            setValue('genres', gamesStore.selectedGenres.map(item => ({item})))
        gamesStore.selectedPlatforms.length === 0 ?
            setValue('platforms', [{item: ''}]) :
            setValue('platforms', gamesStore.selectedPlatforms.map(item => ({item})))
        const orderingTitle = gamesStore.orderings.find(o => o.value === query.get('ordering'))?.title
        orderingTitle ?
            setValue('ordering', {title: orderingTitle}):
            setValue('ordering', {title:'По дате добавления'})
    }
    useEffect(() => {
        syncFiltersWithQuery()
        // eslint-disable-next-line
    }, [query.getAll('genre').toString(), query.getAll('platform').toString(), query.get('ordering')])
    const onSubmit: SubmitHandler<FiltersForm> = data => {
        const genres = selectUniqueItems(data.genres.map(g => g.item)).filter(item => item !== '')
        const platforms = selectUniqueItems(data.platforms.map(p => p.item)).filter(item => item !== '')
        const ordering = gamesStore.orderings.find(o => o.title === data.ordering.title)?.value
        if (query.getAll('genre').toString() === genres.toString() ||
            query.getAll('platform').toString() === platforms.toString() ||
            query.get('ordering') === ordering) {
            syncFiltersWithQuery()
        }
        genres.length !== 0 || platforms.length !== 0 || ordering ?
            history.push(`/games?${querystring.stringify({genre: genres, platform: platforms, ordering})}&page=1`
                .replaceAll('&&', '&')
                .replace('?&', '?')
            ) :
            history.push(`/games?page=1`)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ManyFieldsFilter collectionName='genres' defaultItemText="Все жанры" register={register} control={control}
                              items={gamesStore.genres}/>
            <ManyFieldsFilter collectionName='platforms' defaultItemText="Все платформы" register={register}
                              control={control}
                              items={gamesStore.platforms}/>
            <DropDownList items={gamesStore.orderings}
                          selectProps={{...register('ordering.title')}}/>
            <button type="submit">Показать</button>
        </form>
    )
})
