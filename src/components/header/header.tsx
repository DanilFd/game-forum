import React, {useState} from 'react';
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
import {SelectedForm} from "../../types/Users/SelectedForm";
import {RegistrationForm} from "./registrationForm/registrationForm";
import usersStore from "../../store/usersStore";
import {AcceptingForm} from "./acceptingForm/acceptingForm";
import {ResetForm} from "./resetForm/resetForm";


export const Header = observer(() => {
    const [active, setActive] = useState(false)
    const [activeModal, setActiveModal] = useState(false)
    const [selectedForm, setSelectedForm] = useState<SelectedForm>('login')
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
                    <span onClick={() => setActiveModal(true)}>
                    <IoMdLogIn/>
                    <span>Войти</span>
                    </span>
                </div>
            </nav>
            <Menu active={active} setActive={setActive}/>
            <Modal active={activeModal} setActive={setActiveModal}>
                {selectedForm === 'login' &&
                <LoginForm switchForm={setSelectedForm}/>}
                {selectedForm === 'register' &&
                <RegistrationForm isLoading={usersStore.isLoading} registerUser={usersStore.registerUser}
                                  switchForm={setSelectedForm}/>}
                {selectedForm === 'accepting' &&
                <AcceptingForm switchForm={setSelectedForm}/>}
                {selectedForm === 'reset' &&
                <ResetForm isLoading={usersStore.isLoading} switchForm={setSelectedForm} resetPassword={usersStore.resetPassword}/>}
            </Modal>
        </header>
    );
});

