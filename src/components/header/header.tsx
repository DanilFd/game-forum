import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import styles from "./header.module.scss"
import logo from "./images/logo.svg"
import logoIcon from "./images/logoIcon.svg"
import {NavLinks} from "./navLinks/navLinks";
import {Menu} from "./menu/menu";
import {AiOutlineClose, GiHamburgerMenu, IoMdLogIn} from "react-icons/all";
import {Modal} from "../modal/modal";
import {LoginForm} from "./loginForm/loginForm";
import {observer} from "mobx-react-lite";
import {SelectedForm} from "../../types/Auth/SelectedForm";
import {RegistrationForm} from "./registrationForm/registrationForm";
import {AcceptingForm} from "./acceptingForm/acceptingForm";
import {ResetPasswordForm} from "./resetPasswordForm/resetPasswordForm";
import authStore from "../../store/authStore";
import {Profile} from "./profile/profile";
import {GlobalSearch} from "../globalSearch/globalSearch";


export const Header = observer(() => {
    const [active, setActive] = useState(false)
    const [selectedForm, setSelectedForm] = useState<SelectedForm>('login')
    const [isSearchActive, setIsSearchActive] = useState(false)
    useEffect(() => {
        isSearchActive ? document.body.style.overflow = "hidden" :
            document.body.style.overflow = "auto"
    }, [isSearchActive])
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
                <NavLinks setIsSearchActive={setIsSearchActive}/>
                {
                    !authStore.isLoading &&
                    authStore.isAuth ?
                        <Profile user={authStore.user!}/> :
                        <div className={styles.login}>
                            <span onClick={() => authStore.setIsActiveAuthForm(true)}>
                            <IoMdLogIn/>
                            <span>Войти</span>
                            </span>
                        </div>
                }
            </nav>
            {isSearchActive && <GlobalSearch setIsSearchActive={setIsSearchActive}/>}
            <Menu active={active} setActive={setActive}
                  setIsSearchActive={setIsSearchActive}/>
            <Modal active={authStore.isActiveAuthForm} setActive={authStore.setIsActiveAuthForm}>
                {selectedForm === 'login' &&
                <LoginForm isLoading={authStore.isLoading} setActiveModal={authStore.setIsActiveAuthForm}
                           login={authStore.login} switchForm={setSelectedForm}/>}
                {selectedForm === 'register' &&
                <RegistrationForm isLoading={authStore.isLoadingBetweenForms} registerUser={authStore.registerUser}
                                  switchForm={setSelectedForm}/>}
                {selectedForm === 'accepting' &&
                <AcceptingForm switchForm={setSelectedForm}/>}
                {selectedForm === 'reset' &&
                <ResetPasswordForm isLoading={authStore.isLoadingBetweenForms} switchForm={setSelectedForm}
                                   resetPassword={authStore.resetPassword}/>}
            </Modal>
        </header>
    );
});

