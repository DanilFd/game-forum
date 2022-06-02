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
import styles from './filters.module.scss'
import {RangeSlider} from "./rangeSlider/rangeSlider";

export type FiltersForm = {
    genres: { item: string }[]
    platforms: { item: string }[]
    ordering: { title: string | null }
    slider1: { value: number }
    slider2: { value: number }
}

const DEFAULT_MIN_YEAR = 2021
const DEFAULT_MAX_YEAR = 2022
export const Filters = observer(() => {
    const history = useHistory()
    const query = useQuery()
    const {register, handleSubmit, control, setValue, watch, getValues} = useForm<FiltersForm>({
        defaultValues: {slider1: {value: DEFAULT_MIN_YEAR}, slider2: {value: DEFAULT_MAX_YEAR}}
    });
    const syncFiltersWithQuery = () => {
        gamesStore.setGenres(query.getAll('genre'))
        gamesStore.setPlatforms(query.getAll('platform'))
        gamesStore.setOrdering(query.get('ordering'))
        gamesStore.setDate(query.get('year_start'), query.get('year_end'))
        gamesStore.selectedGenres.length === 0 ?
            setValue('genres', [{item: ''}]) :
            setValue('genres', gamesStore.selectedGenres.map(item => ({item})))
        gamesStore.selectedPlatforms.length === 0 ?
            setValue('platforms', [{item: ''}]) :
            setValue('platforms', gamesStore.selectedPlatforms.map(item => ({item})))
        const orderingTitle = gamesStore.orderings.find(o => o.value === query.get('ordering'))?.title
        orderingTitle ?
            setValue('ordering', {title: orderingTitle}) :
            setValue('ordering', {title: 'По дате добавления'})
        gamesStore.selectedYearFilter.min ?
            setValue('slider1', {value: +gamesStore.selectedYearFilter.min}) :
            setValue('slider1', {value: getValues('slider1.value')})
        gamesStore.selectedYearFilter.max ?
            setValue('slider2', {value: +gamesStore.selectedYearFilter.max}) :
            setValue('slider2', {value: getValues('slider2.value')})
    }
    useEffect(() => {
        syncFiltersWithQuery()
        // eslint-disable-next-line
    }, [query.getAll('genre').toString(), query.getAll('platform').toString(), query.get('ordering'), query.get('year_start'), query.get('year_end')])
    const onSubmit: SubmitHandler<FiltersForm> = data => {
        const genres = selectUniqueItems(data.genres.map(g => g.item)).filter(item => item !== '')
        const platforms = selectUniqueItems(data.platforms.map(p => p.item)).filter(item => item !== '')
        let ordering = gamesStore.orderings.find(o => o.title === data.ordering.title && o.title)?.value
        const minDateValue = data.slider1.value
        const maxDateValue = data.slider2.value
        if (query.getAll('genre').toString() === genres.toString() ||
            query.getAll('platform').toString() === platforms.toString() ||
            query.get('ordering') === ordering) {
            syncFiltersWithQuery()
        }
        const allParams: any = {
            genre: genres,
            platform: platforms,
        }
        if (ordering !== '') {
            allParams.ordering = ordering
        }
        if (minDateValue !== DEFAULT_MIN_YEAR) {
            allParams.year_start = minDateValue
        }
        if (maxDateValue !== DEFAULT_MAX_YEAR) {
            allParams.year_end = maxDateValue
        }
        genres.length !== 0 || platforms.length !== 0 || ordering || minDateValue || maxDateValue ?
            history.push(`/games?${querystring.stringify(allParams)}&page=1`
                .replaceAll('&&', '&')
                .replaceAll('?&', '?')
            ) :
            history.push(`/games?page=1`)
    }
    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <RangeSlider dateValue={gamesStore.yearValue} watch={watch} control={control}/>
            </div>
            <div className={styles.list}>
                <ManyFieldsFilter collectionName='genres' defaultItemText="Все жанры" register={register}
                                  control={control}
                                  items={gamesStore.genres}/>
                <ManyFieldsFilter collectionName='platforms' defaultItemText="Все платформы" register={register}
                                  control={control}
                                  items={gamesStore.platforms}/>
                <div className={styles.ordering}>
                    <DropDownList items={gamesStore.orderings}
                                  selectProps={{...register('ordering.title')}}/>
                </div>
            </div>
            <button className={styles.submit} type="submit"><span>показать</span></button>
        </form>
    )
})
