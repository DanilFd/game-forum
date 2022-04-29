import styles from "./adaptiveSearchType.module.scss"
import {SearchType} from "../globalSearch";

type Props = {
    selectProps?: object
    searchType: SearchType
}
export const AdaptiveSearchType = ({selectProps, searchType}: Props) => {
    return (
        <div className={styles.container}>
            <label className={`${styles.searchType} ${searchType === 'news' ? styles.active : ''}`}>
                Новости
                <input
                    {...selectProps}
                    hidden
                    type="radio"
                    value="news"
                />
            </label>
            <label className={`${styles.searchType} ${searchType === 'blogs' ? styles.active : ''}`}>
                Блоги
                <input
                    {...selectProps}
                    hidden
                    type="radio"
                    value="blogs"
                />
            </label>
            <label className={`${styles.searchType} ${searchType === 'games' ? styles.active : ''}`}>
                Игры
                <input
                    {...selectProps}
                    hidden
                    type="radio"
                    value="games"
                />
            </label>
            <label className={`${styles.searchType} ${searchType === 'users' ? styles.active : ''}`}>
                Пользователь
                <input
                    {...selectProps}
                    hidden
                    type="radio"
                    value="users"
                />
            </label>
        </div>
    );
};

