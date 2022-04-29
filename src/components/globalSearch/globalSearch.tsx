import styles from "./globalSearch.module.scss"
import {AiOutlineClose, AiOutlineSearch} from "react-icons/all";
import {FoundQuantity} from "./foundQuantity/foundQuantity";
import {observer} from "mobx-react-lite";
import {SetState} from "../../types/utils/utils";
import searchStore from "../../store/searchStore";
import {SubmitHandler, useForm} from "react-hook-form";
import {useCallback, useEffect, useRef, useState} from "react";
import {FormLoader} from "../header/formLoader/formLoader";
import {ModestNewsItem} from "./cardsForFoundItems/modestNewsItem/modestNewsItem";
import {ModestGameItem} from "./cardsForFoundItems/modestGameItem/modestGameItem";
import {debounce} from "../../utils/debounce";
import {useObserver} from "../../hooks/useObserver";
import {useError} from "../../hooks/useError";
import {AdaptiveSearchType} from "./adaptiveSearchType/adaptiveSearchType";
import React from "react";
import {ModestUserItem} from "./cardsForFoundItems/modestUserItem/modestUserItem";

type Props = {
    setIsSearchActive: SetState<boolean>
}
export type SearchType = 'news' | 'games' | 'blogs' | 'users'
type SearchForm = {
    title: string
    type: SearchType
}
const windowWidth = window.innerWidth
const isMobile = windowWidth < 800
type FoundItemType = ({item, setIsSearchActive}: any) => JSX.Element
export const GlobalSearch = observer(({setIsSearchActive}: Props) => {
    const {
        paginatedFoundItems,
        isSearching,
        totalPages,
        error,
        currentPage,
        setCurrentPage,
        clearSearchItems,
        searchNews,
        searchGame,
        searchUsers
    } = searchStore
    const {register, handleSubmit, watch, getValues} = useForm<SearchForm>({
        mode: "onChange",
        defaultValues: {type: 'news'}
    });
    const lastElement = useRef(null)
    useObserver(lastElement, currentPage < totalPages, isSearching, () => {
        setCurrentPage(currentPage + 1)
    })
    useError(error)
    const searchType = watch('type')
    const [isTypeChanging, setIsTypeChanging] = useState(false)
    // eslint-disable-next-line
    const debounced = useCallback(debounce(data => {
        const type = getValues('type')
        type === 'news' && searchNews(data)
            .then(() => setIsTypeChanging(false))
        type === 'games' && searchGame(data)
            .then(() => setIsTypeChanging(false))
        type === 'users' && searchUsers(data)
            .then(() => setIsTypeChanging(false))
    }, 300), [])
    const onSubmit: SubmitHandler<SearchForm> = data => {
        setIsTypeChanging(true)
        debounced(data.title)
    }
    useEffect(() => {
        const subscription = watch(() => {
            setCurrentPage(1)
            clearSearchItems()
            handleSubmit(onSubmit)()
        })
        return () => subscription.unsubscribe()
        // eslint-disable-next-line
    }, [watch])
    useEffect(() => {
        if (currentPage !== 1)
            handleSubmit(onSubmit)()
        // eslint-disable-next-line
    }, [currentPage])
    // @ts-ignore
    const FoundItem: FoundItemType = {
        news: ModestNewsItem,
        games: ModestGameItem,
        users: ModestUserItem
    }[watch('type')]
    return (
        <div className={styles.overlay}>
            <div className={styles.panel}>
                <>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.container}>
                            <AiOutlineSearch className={styles.searchIcon}/>
                            <input  {...register('title')} placeholder="ПОИСК" className={styles.input} type="text"/>
                            {!isMobile &&
                            <select {...register('type')} className={styles.select}>
                                <option value="news">Новости</option>
                                <option value="blogs">Блоги</option>
                                <option value="games">Игры</option>
                                <option value="users">Пользователи</option>
                            </select>
                            }
                            <AiOutlineClose onClick={() => setIsSearchActive(false)} className={styles.closeIcon}/>
                        </div>
                        {isMobile && <AdaptiveSearchType searchType={searchType} selectProps={register('type')}/>}
                    </form>
                </>
                {
                    watch('title', '').length !== 0 &&
                    <>
                        <div className={styles.foundQuantityContainer}>
                            {!isTypeChanging &&
                            <FoundQuantity count={paginatedFoundItems?.count || 0} type={watch('type')}/>
                            }
                        </div>
                        {
                            <div className={styles.foundItemsContainer}
                                 style={{
                                     flexWrap: searchType === 'news' || searchType === 'blogs' ? 'nowrap' : 'wrap',
                                     flexDirection: searchType === 'news' || searchType === 'blogs' ? 'column' : 'row'
                                 }}>
                                {
                                    paginatedFoundItems?.results.map((i: any, index: number) => {
                                        return (
                                            <React.Fragment key={i.id}>
                                                <FoundItem item={i}
                                                           setIsSearchActive={setIsSearchActive}/>
                                                {index === paginatedFoundItems.results.length - 1 &&
                                                <div ref={lastElement} style={{minHeight: 1}}/>}
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </div>
                        }
                        {isSearching && <FormLoader/>}
                    </>
                }

            </div>

        </div>
    );
});

