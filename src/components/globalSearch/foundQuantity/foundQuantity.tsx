import styles from "./foundQuantity.module.scss"
import {declOfNum} from "../../../utils/declOfNum";

type Props = {
    count: number
    type: 'news' | 'blogs' | 'users' | 'games'
}

export const FoundQuantity = ({count, type}: Props) => {
    const words = (): string[] => {
        if (type === 'blogs')
            return ['блог', 'блога', 'блогов']
        if (type === 'users')
            return ['пользователь', 'пользователя', 'пользователей']
        if (type === 'games')
            return ['игра', 'игры', 'игр']
        return ['новость', 'новости', 'новостей']
    }
    return (
        <div className={styles.result}>
            {
                count === 0 ? <span>Ничего не найдено</span> :
                    <span>{declOfNum(count, ['Найдена', 'Найдено', 'Найдено'])} {count} {declOfNum(count, words())} </span>
            }
        </div>
    );
};

