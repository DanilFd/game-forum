import React, { useState} from 'react';
import {NavLink} from "react-router-dom";
import styles from "./sideBar.module.scss"
import {CategoryType} from "../../types/News/CategoryType";
import {TiArrowDownOutline, TiArrowUpOutline} from "react-icons/all";

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
                    {active ? <TiArrowUpOutline/> : <TiArrowDownOutline/>}
                </div>
                <ul className={active ? `${styles.activeMenu}` : ''}>
                    <li><NavLink activeClassName={styles.active} to='/news/all?page=1'>Все</NavLink></li>
                    {props.categories.map(category => <li key={category.id}><NavLink activeClassName={styles.active}
                                                                                     to={`/news/${category.slug}?page=1`}>{category.title}</NavLink>
                    </li>)}
                </ul>
            </nav>
        </aside>
    );
};

