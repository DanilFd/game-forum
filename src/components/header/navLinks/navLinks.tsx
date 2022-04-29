import React from 'react';
import {NavLink} from "react-router-dom";
import styles from "./navLinks.module.scss"
import {AiOutlineSearch} from "react-icons/all";
import {motion} from 'framer-motion';
import {SetState} from "../../../types/utils/utils";

let anim = {} as any
if (window.innerWidth < 900) {
    anim = {
        initial: {height: 0},
        animate: {height: "auto"},
        exit: {height: 0},
        transition: {duration: 0.4}
    }
}

type Props = {
    setIsSearchActive: SetState<boolean>
}
export const NavLinks = ({setIsSearchActive}: Props) => {
    const setIsSearchDisable = () => {
        setIsSearchActive(false)
    }
    return (
        <nav className={styles.nav}>
            <motion.ul
                {...anim}
            >
                <li><NavLink onClick={setIsSearchDisable} to="/news/all?page=1">Новости</NavLink></li>
                <li><NavLink onClick={setIsSearchDisable} to="/games?page=1">Игры</NavLink></li>
                <li><NavLink onClick={setIsSearchDisable} to="">Блоги</NavLink></li>
                <li><NavLink onClick={setIsSearchDisable} to="">Помощь</NavLink></li>
                <li className={styles.search} onClick={() => setIsSearchActive(prev => !prev)}>
                    <div>
                        <AiOutlineSearch/>
                        <span>Поиск</span>
                    </div>
                </li>
            </motion.ul>
        </nav>
    );
};

