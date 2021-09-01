import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import styles from "./header.module.scss"
import logo from "./images/logo.svg"
import logoIcon from "./images/logoIcon.svg"
import {NavLinks} from "./navLinks/navLinks";
import {Menu} from "./menu/menu";
import {AiOutlineClose, GiHamburgerMenu, IoMdLogIn} from "react-icons/all";


export const Header = () => {
    const [active, setActive] = useState(false)
    return (
        <header className={styles.header}>
            <nav className={`container ${styles.content}`}>

                <div className={styles.menu}>
                    {
                        active ?
                            <AiOutlineClose onClick={() => setActive(!active)}/> :
                            <GiHamburgerMenu onClick={() => setActive(!active)}/>
                    }
                </div>
                <NavLink className={styles.logo} to="/">
                    <img src={logo} alt=""/>
                    <img className={styles.logoIcon} src={logoIcon} alt=""/>
                </NavLink>
                <NavLinks/>
                <div className={styles.login}>
                    <span>
                    <IoMdLogIn/>
                    <span>Войти</span>
                    </span>
                </div>
            </nav>
            <Menu active={active} setActive={setActive}/>
        </header>
    );
};

