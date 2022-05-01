import styles from "./infoBar.module.scss"
import {SetState} from "../../../types/utils/utils";


type Props = {
    screenshotsCount: number
    newsCount: number
    setIsActive: SetState<'news' | 'gallery' | 'blogs'>
}


export const InfoBar = ({screenshotsCount, newsCount, setIsActive}: Props) => {
    return (
        <div className={styles.items}>
            <div className={styles.item} onClick={() => newsCount > 0 && setIsActive('news')}>
                <span className={styles.title}>новости</span>
                <span className={styles.count}>{newsCount}</span>
            </div>
            <div className={styles.item} onClick={() => screenshotsCount > 0 && setIsActive('gallery')}>
                <span className={styles.title}>галерея</span>
                <span className={styles.count}>{screenshotsCount}</span>
            </div>
        </div>
    );
};

