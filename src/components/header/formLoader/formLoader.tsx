import styles from "./formLoader.module.scss"

export const FormLoader = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.ellipsis}>
                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        </div>
    )
}
