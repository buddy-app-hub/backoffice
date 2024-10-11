import React from 'react';
import styles from './FullScreenLoader.module.css';

const FullScreenLoader = () => {
    return (
        <div className={styles.loaderOverlay}>
            <div className={styles.loader}></div>
        </div>
    );
};


export default FullScreenLoader;