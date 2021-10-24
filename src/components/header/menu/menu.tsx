import React from 'react';
import styles from "./menu.module.scss"
import {NavLinks} from "../navLinks/navLinks";

type Props = {
    active: boolean,
    setActive: (active: boolean) => void
}
export const Menu = ({active, setActive}: Props) => {
    return (
        <nav className={active ? `${styles.menu} ${styles.active}` : styles.menu} >
            <div className={styles.blur}  onClick={() => setActive(false)}>
                <NavLinks/>
            </div>
        </nav>
    );
};
