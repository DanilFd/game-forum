import styles from "./tabs.module.scss"
import {IsActiveType} from "../mainUserInfo";
import {SetState} from "../../../../types/utils/utils";
import {GamesCount} from "../../../../types/Users/ProfileResponse";

type Props = {
    isActive: IsActiveType
    setIsActive: SetState<IsActiveType>
    comments_count: number
    games_count: GamesCount
    blogs_count: number

}
export const Tabs = ({setIsActive, isActive, blogs_count, comments_count, games_count}: Props) => {
        const isGames = isActive === 'favorite_games' || isActive === 'rated_games'
        return (
            <>
                <nav className={styles.tabs}>
                    <div onClick={() => setIsActive("comments")}
                         className={`${styles.tabWrapper} ${isActive === 'comments' ? styles.isActiveTab : ''}`}>
                        <span className={styles.tabTitle}>комменатрии</span>
                        <span className={styles.tabValue}>{comments_count}</span>
                    </div>
                    <div onClick={() => setIsActive("favorite_games")}
                         className={`${styles.tabWrapper} ${isGames ? styles.isActiveTab : ''}`}>
                        <span className={styles.tabTitle}>игры</span>
                        <span
                            className={styles.tabValue}>{games_count.rated_games_count + games_count.favorite_games_count}</span>
                    </div>
                    <div onClick={() => setIsActive("blogs")}
                         className={`${styles.tabWrapper} ${isActive === 'blogs' ? styles.isActiveTab : ''}`}>
                        <span className={styles.tabTitle}>блоги</span>
                        <span className={styles.tabValue}>{blogs_count}</span>
                    </div>
                </nav>
                {
                    isGames &&
                    <div className={styles.nestedTabs}>
                        <div onClick={() => setIsActive('favorite_games')} className={styles.nestedTabWrapper}>
                            <span
                                className={`${styles.nestedTabTitle} ${isActive === 'favorite_games' ? styles.nestedTabActive : ''}`}>в избранном</span>
                            <span className={styles.nestedTabValue}>{games_count.favorite_games_count}</span>
                        </div>
                        <div onClick={() => setIsActive('rated_games')} className={styles.nestedTabWrapper}>
                            <span
                                className={`${styles.nestedTabTitle} ${isActive === 'rated_games' ? styles.nestedTabActive : ''}`}>оцененные</span>
                            <span className={styles.nestedTabValue}>{games_count.rated_games_count}</span>
                        </div>
                    </div>
                }
            </>
        );
    }
;

