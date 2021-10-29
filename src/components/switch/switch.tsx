import React, {useState} from 'react';
import styles from "./switch.module.scss"

export const Switch = () => {
    const [isActive, setIsActive] = useState(false)
    return (
        <div onClick={() => setIsActive(!isActive)} className={styles.centre}>
            <input type="checkbox" className={`${isActive && styles.checked}`} style={{display:"none"}}/>
            <label htmlFor="cbx" className={styles.toggle}><span/></label>
        </div>
    );
};

