import React from 'react';
import {NavLink} from "react-router-dom";
import styles from "./sideBar.module.scss"
import {CategoryType} from "../../types/CategoryType";

type Props = {
    categories: CategoryType[]
}

export const SideBar = (props: Props) => {
    return (
        <div className={styles.aside}>
            <nav className={styles.navigation}>
                <h3 className={styles.heading}>Новости</h3>
                <ul>
                    <li><NavLink activeClassName={styles.active} exact to='/news'>Все</NavLink></li>
                    {props.categories.map(category => <li key={category.id}><NavLink activeClassName={styles.active}
                        to={`/news/${category.slug}`}>{category.title}</NavLink></li>)}
                </ul>
            </nav>
        </div>
    );
};

