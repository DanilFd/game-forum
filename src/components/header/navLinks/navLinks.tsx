import React from 'react';
import {NavLink} from "react-router-dom";
import styles from "./navLinks.module.scss"
import {AiOutlineSearch} from "react-icons/all";
import {motion} from 'framer-motion';

let anim = {} as any
if (window.innerWidth < 900) {
    anim = {
        initial: {height: 0},
        animate: {height: "auto"},
        exit: {height: 0},
        transition: {duration: 0.4}
    }
}
export const NavLinks = () => {
    return (
        <nav className={styles.nav}>
            <motion.ul
                {...anim}
            >
                <li><NavLink to="/news/all?page=1">Новости</NavLink></li>
                <li><NavLink to="/games?page=1">Игры</NavLink></li>
                <li><NavLink to="">Блоги</NavLink></li>
                <li><NavLink to="">Помощь</NavLink></li>
                <li className={styles.search}>
                    <div>
                        <AiOutlineSearch/>
                        <span>Поиск</span>
                    </div>
                </li>
            </motion.ul>
        </nav>
    );
};

