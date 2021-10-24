import React from 'react';
import {NavLink} from "react-router-dom";
import styles from "./navLinks.module.scss"
import {AiOutlineSearch} from "react-icons/all";

export const NavLinks = () => {
    return (
        <nav className={styles.nav}>
            <ul>
                <li><NavLink to="/news/all?page=1">Новости</NavLink></li>
                <li><NavLink to="/games/?page=1">Игры</NavLink></li>
                <li><NavLink to="">Статьи</NavLink></li>
                <li><NavLink to="">Блоги</NavLink></li>
                <li><NavLink to="">Помощь</NavLink></li>
                <li className={styles.search}>
                    <div>
                        <AiOutlineSearch/>
                        <span>Поиск</span>
                    </div>
                </li>
            </ul>
        </nav>
    );
};

