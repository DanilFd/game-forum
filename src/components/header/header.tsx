import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import styles from "./header.module.scss"
import logo from "./images/logo.svg"
import loginIcon from "./images/loginIcon.svg"
import logoIcon from "./images/logoIcon.svg"
import menuIcon from "./images/menuIcon.svg"
import closeIcon from "./images/close.svg"
import {NavLinks} from "./navLinks/navLinks";
import {Menu} from "./menu/menu";


export const Header = () => {
    const [active, setActive] = useState(false)
    return (
        <header className={styles.header}>
            <nav className={`container ${styles.content}`}>
                <div className={styles.menu}>
                    {
                        active ?
                            <img onClick={() => setActive(!active)} src={closeIcon} alt=""/> :
                            <img onClick={() => setActive(!active)} src={menuIcon} alt=""/>
                    }
                </div>
                <NavLink className={styles.logo} to="/">
                    <img src={logo} alt=""/>
                    <img className={styles.logoIcon} src={logoIcon} alt=""/>
                </NavLink>
                <NavLinks/>
                <div className={styles.login}>
                    <img src={loginIcon} alt=""/>
                    <span>Войти</span>
                </div>
            </nav>
            <Menu active={active} setActive={setActive}/>
        </header>
    );
};

