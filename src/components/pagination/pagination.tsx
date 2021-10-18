import styles from "./pagination.module.scss"
import {pagination} from "../../utils/paginations";
import {RiArrowLeftSLine, RiArrowRightSLine} from "react-icons/all";
import {useHistory} from "react-router-dom";
import {useEffect} from "react";
import {usePage} from "../../hooks/usePage";

type Props = {
    pagesCount: number
}
export const Pagination = (props: Props) => {
    const changePage = (page: number) => {
        history.push({
            search: `?page=${page}`
        })
    }
    const history = useHistory()
    let currentPage = usePage()
    useEffect(() => {
        changePage(+currentPage)
        // eslint-disable-next-line
    }, [])
    return (
        <div className={styles.pagination}>
            <button onClick={() => {
                currentPage > 1 && changePage(currentPage - 1)
            }}><RiArrowLeftSLine/></button>
            {
                pagination(props.pagesCount, currentPage).map(p => <button
                    className={currentPage === p ? styles.current__page : ''}
                    onClick={() => changePage(p)
                    }
                    key={p}>{p}</button>)
            }
            <button onClick={() => {
                currentPage < props.pagesCount && changePage(currentPage + 1)
            }
            }><RiArrowRightSLine/></button>
        </div>
    );
};


