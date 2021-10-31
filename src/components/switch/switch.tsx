import React, {useState} from 'react';
import styles from "./switch.module.scss"

type Props = {
    onCheck?: () => void
    onUnCheck?: () => void
}

export const Switch = (props: Props) => {
    const [isActive, setIsActive] = useState(false)
    return (
        <div onClick={() => {
            isActive ? props.onUnCheck?.() : props.onCheck?.()
            setIsActive(!isActive)
        }} className={styles.centre}>
            <input type="checkbox" className={`${isActive && styles.checked}`} style={{display: "none"}}/>
            <label htmlFor="cbx" className={styles.toggle}><span/></label>
        </div>
    );
};

