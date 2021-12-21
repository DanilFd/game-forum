import {motion} from "framer-motion"
import styles from "./additionalInfo.module.scss";

export const AdditionalInfo = () => {
    return (
        <motion.div className={styles.additionalInfo}
                    initial={{height: 0}}
                    animate={{height: "max-content"}}
                    exit={{height: 0}}
                    transition={{duration: 0.3}}
        >
            <h3 className={styles.heading}>Персональные данные</h3>
            <span>Дата регистрации: <b>30.11.2021</b></span>
            <span>Дата рождения: <b>15.03.2002</b></span>
            <span>Пол: <b>мужской</b></span>
            <span>Discord: <b>zzzz#9999</b></span>
        </motion.div>
    )
}
