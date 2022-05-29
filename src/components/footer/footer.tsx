import styles from "./footer.module.scss"
import logo from "../header/images/logo.svg"
import {AiFillTrademarkCircle, AiFillYoutube, ImTelegram, IoLogoSteam, SiDiscord} from "react-icons/all";
import {ReactComponent as VkIcon} from './icons/vk_icon.svg'
import {NavLink} from "react-router-dom";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.raw}>
                <div className={styles.logoWrapper}>
                    <img className={styles.logoImg} src={logo} alt=""/>
                    <span className={styles.logoTitle}>Все о видеоиграх</span>
                </div>
                <div className={styles.socialLinksWrapper}>
                    <a rel="noopener noreferrer" target="_blank" href="https://discordapp.com/users/zzzz#8527/">
                        <SiDiscord/>
                    </a>
                    <a rel="noopener noreferrer" target="_blank" href="https://vk.com/id315337137">
                        <VkIcon/>
                    </a>
                    <a rel="noopener noreferrer" target="_blank" href="https://steamcommunity.com/id/Shkolnik_vrode">
                        <IoLogoSteam/>
                    </a>
                    <a rel="noopener noreferrer" target="_blank"
                       href="https://www.youtube.com/channel/UClsO0x0ul0dIo0Ph7q8VDvw/featured">
                        <AiFillYoutube/>
                    </a>
                    <a rel="noopener noreferrer" target="_blank" href="https://t.me/zszszszsaas">
                        <ImTelegram/>
                    </a>
                </div>
            </div>
            <div className={styles.raw}>
                <div className={styles.navLinksWrapper}>
                    <NavLink className={styles.navLink} to="/news/all">
                        Новости
                    </NavLink>
                    <NavLink className={styles.navLink} to="/games">
                        Игры
                    </NavLink>
                    <NavLink className={styles.navLink} to="/blogs/new">
                        Блоги
                    </NavLink>
                </div>
                <div className={styles.contactsWrapper}>
                    <span className={styles.contactTitle}>
                        <AiFillTrademarkCircle/>
                        2022 React
                    </span>
                    <span className={styles.contactDescription}>
                        Использование любых материалов сайта <br/> без согласования с администрацией запрещено.
                    </span>
                </div>
            </div>
        </footer>
    );
};
