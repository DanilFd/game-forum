import styles from "./infoBar.module.scss"


type Props = {
    screenshotsCount: number
    newsCount: number
    blogsCount: number
}


export const InfoBar = ({screenshotsCount, blogsCount = 0, newsCount}: Props) => {
    return (
        <div className={styles.items}>
            <div className={styles.item}>
                <span className={styles.title}>новости</span>
                <span className={styles.count}>{newsCount}</span>
            </div>
            <div className={styles.item}>
                <span className={styles.title}>блоги</span>
                <span className={styles.count}>{blogsCount}</span>
            </div>
            <div className={styles.item}>
                <span className={styles.title}>галерея</span>
                <span className={styles.count}>{screenshotsCount}</span>
            </div>
        </div>
    );
};

