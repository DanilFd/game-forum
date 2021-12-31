import styles from "./switch.module.scss"

type Props = {
    isChecked: boolean,
    toggle: () => void
}

export const Switch = (props: Props) => {
    return (
        <div onClick={() => {
            props.toggle()
        }}>
            <input type="checkbox" className={`${props.isChecked && styles.checked}`} style={{display: "none"}}/>
            <label htmlFor="cbx" className={styles.toggle}><span/></label>
        </div>
    );
};

