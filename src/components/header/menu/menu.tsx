import React from 'react';
import styles from "./menu.module.scss"
import {NavLinks} from "../navLinks/navLinks";
import {AnimatePresence} from 'framer-motion';
import {SetState} from "../../../types/utils/utils";

type Props = {
    active: boolean,
    setActive: SetState<boolean>
    setIsSearchActive: SetState<boolean>
}
export const Menu = ({active, setActive, setIsSearchActive}: Props) => {
    return (
        <AnimatePresence exitBeforeEnter={true}>
            {
                active && <nav className={active ? `${styles.menu} ${styles.active}` : styles.menu}>
                    <div className={styles.blur} onClick={() => setActive(prev => !prev)}>
                        <NavLinks  setIsSearchActive={setIsSearchActive}/>
                    </div>
                </nav>
            }
        </AnimatePresence>

    );
};
