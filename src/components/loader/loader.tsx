import styles from "./loader.module.scss"
const Loader = () => {
    return (
        <div className={styles.content}>
            <div className={styles.loading}>
                <p>loading</p>
                <span/>
            </div>
        </div>
    );
};

export default Loader;