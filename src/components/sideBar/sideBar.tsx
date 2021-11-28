import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import styles from "./sideBar.module.scss"
import {CategoryType} from "../../types/News/CategoryType";
import {TiArrowDownOutline} from "react-icons/all";
import {AnimatePresence, motion} from 'framer-motion';

type Props = {
    categories: CategoryType[]
}
export const SideBar = (props: Props) => {
    const [active, setActive] = useState(false);
    return (
        <aside className={styles.aside}>
            <nav className={styles.navigation}>
                <div onClick={() => setActive(!active)} className={styles.heading}>
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
                        <li><NavLink activeClassName={styles.active} to='/news/all?page=1'>Все</NavLink></li>
                        {props.categories.map(category => <li key={category.id}><NavLink activeClassName={styles.active}
                                                                                         to={`/news/${category.slug}?page=1`}>{category.title}</NavLink>
                        </li>)}
                    </motion.ul>
                    }
                </AnimatePresence>
            </nav>
        </aside>
    );
};

