import React, { useState} from 'react';
import {NavLink} from "react-router-dom";
import styles from "./sideBar.module.scss"
import {CategoryType} from "../../types/CategoryType";
import {TiArrowDownOutline, TiArrowUpOutline} from "react-icons/all";

type Props = {
    categories: CategoryType[]
}
export const SideBar = (props: Props) => {
    const [active, setActive] = useState(false);
    return (
        <div className={styles.aside}>
            <nav className={styles.navigation}>
                <div onClick={() => setActive(!active)} className={styles.heading}>
                    <h3>Новости</h3>
                    {active ? <TiArrowUpOutline/> : <TiArrowDownOutline/>}
                </div>
                <ul className={active ? `${styles.activeMenu}` : ''}>
                    <li><NavLink activeClassName={styles.active} to='/news/all'>Все</NavLink></li>
                    {props.categories.map(category => <li key={category.id}><NavLink activeClassName={styles.active}
                                                                                     to={`/news/${category.slug}`}>{category.title}</NavLink>
                    </li>)}
                </ul>
            </nav>
        </div>
    );
};

