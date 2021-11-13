import styles from "./pagination.module.scss"
import {pagination} from "../../utils/paginations";
import {RiArrowLeftSLine, RiArrowRightSLine} from "react-icons/all";
import {useHistory} from "react-router-dom";
import {useEffect, useMemo} from "react";
import {usePage} from "../../hooks/usePage";
import {scrollToTop} from "../../utils/scrollToTop";

type Props = {
    pagesCount: number | null
}
export const Pagination = (props: Props) => {
    const history = useHistory()
    const currentPage = usePage()
    const changePage = (page: number) => {
        currentPage !== page && history.push({
            search: `?page=${page}`
        })
    }
    useEffect(() => {
        changePage(+currentPage)
        // eslint-disable-next-line
    }, [])
    const pages = useMemo(() => {
        return pagination(props.pagesCount || 0, currentPage)
    }, [props.pagesCount, currentPage])
    if (props.pagesCount === null)
        return <></>
    return (
        <div>
            {
                currentPage > props.pagesCount ? "Ничего не найдено" :
                    <div className={styles.pagination}>
                        {
                            currentPage === 1 ? <div/> :
                                <button onClick={() => {
                                    changePage(currentPage - 1)
                                    scrollToTop()
                                }}><RiArrowLeftSLine/></button>
                        }
                        {
                            pages.map(p => <button
                                className={currentPage === p ? styles.current__page : ''}
                                onClick={() => {
                                    changePage(p)
                                    scrollToTop()
                                }
                                }
                                key={p}>{p}</button>)
                        }
                        {
                            currentPage !== props.pagesCount &&
                            <button onClick={() => {
                                changePage(currentPage + 1)
                                scrollToTop()
                            }
                            }><RiArrowRightSLine/></button>
                        }
                    </div>
            }
        </div>
    );
};


