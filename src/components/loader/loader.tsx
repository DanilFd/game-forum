import React from 'react';
import styles from "./loader.module.scss"

export const Loader = () => {
    return (
        <section className={styles.lds_ring}>
            <div/>
            <div/>
            <div/>
            <div/>
        </section>
    );
};

