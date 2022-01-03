import React, {useMemo, useState} from 'react';
import {NavLink} from "react-router-dom";
import styles from "./sideBar.module.scss"
import {CategoryType} from "../../../types/News/CategoryType";
import {TiArrowDownOutline} from "react-icons/all";
import {AnimatePresence, motion} from 'framer-motion';

type Props = {
    categories: CategoryType[]
    url: string,
    showAllNewsLink: boolean
}
const windowWidth = window.innerWidth

export const SideBar = (props: Props) => {
    const isMobile = useMemo(() => windowWidth > 800, [])
    const [active, setActive] = useState(isMobile);
    return (
        <aside className={styles.aside}>
            <nav className={styles.navigation}>
                <div onClick={() => !isMobile && setActive(!active)} className={styles.heading}>
                    <h3>Новости</h3>
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
                            props.showAllNewsLink &&
                            <li><NavLink activeClassName={styles.active} to='/news/all?page=1'>Все</NavLink></li>
                        }
                        {props.categories.map(category => <li key={category.id}><NavLink activeClassName={styles.active}
                                                                                         to={`/${props.url}/${category.slug}?page=1`}>{category.title}</NavLink>
                        </li>)}
                    </motion.ul>
                    }
                </AnimatePresence>
            </nav>
        </aside>
    );
};

