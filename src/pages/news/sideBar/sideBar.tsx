import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import styles from "./sideBar.module.scss"
import {CategoryType} from "../../../types/News/CategoryType";
import {TiArrowDownOutline} from "react-icons/all";
import {AnimatePresence, motion} from 'framer-motion';
import {observer} from "mobx-react-lite";
import authStore from "../../../store/authStore";

type Props = {
    categories: CategoryType[]
    url: string,
    showAllNewsLink: boolean
    isNews?: boolean
}

const isMobile = window.innerWidth > 800
export const SideBar = observer(({isNews = true, showAllNewsLink, categories, url}: Props) => {
    const [active, setActive] = useState(isMobile);
    return (
        <aside className={styles.aside}>
            <nav className={styles.navigation}>
                <div onClick={() => !isMobile && setActive(!active)} className={styles.heading}>
                    <h3>{isNews ? 'Новости' : 'Блоги'}</h3>
                    <TiArrowDownOutline className={active ? `${styles.isActive}` : ''}/>
                </div>
                <AnimatePresence>
                    {active &&
                    <motion.ul
                        initial={{height: 0}}
                        animate={{height: "max-content"}}
                        exit={{height: 0}}
                        transition={{duration: 0.4}}
                    >
                        {
                            showAllNewsLink &&
                            <li><NavLink activeClassName={styles.active} to='/news/all?page=1'>Все</NavLink></li>
                        }
                        {categories.map(category => <li key={category.id}><NavLink activeClassName={styles.active}
                                                                                   to={`/${url}/${category.slug}?page=1`}>{category.title}</NavLink>
                        </li>)}
                        {
                            (!isNews && authStore.isAuth) &&
                            <>
                                <li>
                                    <NavLink to="/create-blog" activeClassName={styles.active}>Создать тему</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/blogs/my" activeClassName={styles.active}>Мои темы</NavLink>
                                </li>
                            </>
                        }
                    </motion.ul>
                    }
                </AnimatePresence>
            </nav>
        </aside>
    );
});

