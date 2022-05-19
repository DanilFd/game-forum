import React, {useMemo, useState} from 'react';
import {NavLink} from "react-router-dom";
import styles from "../../pages/news/sideBar/sideBar.module.scss"
import {TiArrowDownOutline} from "react-icons/all";
import {AnimatePresence, motion} from 'framer-motion';
import authStore from "../../store/authStore";


const windowWidth = window.innerWidth


export const SideBar = () => {
    const isMobile = useMemo(() => windowWidth > 800, [])
    const [active, setActive] = useState(isMobile);
    return (
        <aside className={styles.aside}>
            <nav className={styles.navigation}>
                <div onClick={() => !isMobile && setActive(!active)} className={styles.heading}>
                    <h3>Профиль</h3>
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
                        <li><NavLink activeClassName={styles.active} to={`/user/${authStore.user?.login}`}>Обо
                            мне</NavLink></li>
                        <li><NavLink activeClassName={styles.active} to="/pm">Сообщения</NavLink></li>
                        <li><NavLink activeClassName={styles.active} to="/feed">Лента</NavLink></li>
                    </motion.ul>
                    }
                </AnimatePresence>
            </nav>
        </aside>
    );
};

