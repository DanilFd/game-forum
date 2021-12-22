import {motion} from "framer-motion"
import styles from "./additionalInfo.module.scss";


type Props = {
    date_joined: string
    birthday_date: null | string
    gender: string
    discord: null | string
}

export const AdditionalInfo = ({date_joined, birthday_date, gender, discord}: Props) => {
    return (
        <motion.div className={styles.additionalInfo}
                    initial={{height: 0}}
                    animate={{height: "max-content"}}
                    exit={{height: 0}}
                    transition={{duration: 0.3}}
        >
            <h3 className={styles.heading}>Персональные данные</h3>
            <span>Дата регистрации:<b>{date_joined}</b></span>
            {birthday_date && <span>Дата рождения:<b>{birthday_date}</b></span>}
            {gender !== 'Не указан' && <span>Пол:<b>{gender}</b></span>}
            {discord && <span>Discord:<b>{discord}</b></span>}
        </motion.div>
    )
}
