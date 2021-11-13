import {DropDownList} from "../../../components/dropDownList/dropDownList";
import {observer} from "mobx-react-lite";
import gamesStore from "../../../store/gamesStore";
import {useHistory, useParams} from "react-router-dom";
import {useEffect, useLayoutEffect, useState} from "react";

export const Filters = observer(() => {
    const [genre, setGenre] = useState('')
    const history = useHistory()
    const params = useParams<{ genre: string }>()
    const changeGenre = () => {
        if (params.genre !== gamesStore.selectedGenre) {
            gamesStore.selectedGenre === ''
                ? history.push(`/games?page=1`)
                : history.push(`/games/${gamesStore.selectedGenre}?page=1`)
        }
     }
    useLayoutEffect(() => {
        setGenre(gamesStore.selectedGenre)
    }, [])
    useEffect(() => {
        gamesStore.setGenre(params.genre)
        setGenre(params.genre)
    }, [params.genre])
    return (
        <form onSubmit={e => e.preventDefault()}>
            <DropDownList defaultItemText="Все жанры" items={gamesStore.genres} setGenre={setGenre}
                          genre={genre}/>

            <button onClick={() => {
                gamesStore.setGenre(genre)
                changeGenre()
            }}>Показать
            </button>
        </form>
    )
})
