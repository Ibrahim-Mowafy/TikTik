import React from 'react';
import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <>
      <div className={styles['fingerprint-spinner']}>
        <div className={styles['spinner-ring']}></div>
        <div className={styles['spinner-ring']}></div>
        <div className={styles['spinner-ring']}></div>
        <div className={styles['spinner-ring']}></div>
        <div className={styles['spinner-ring']}></div>
        <div className={styles['spinner-ring']}></div>
        <div className={styles['spinner-ring']}></div>
        <div className={styles['spinner-ring']}></div>
        <div className={styles['spinner-ring']}></div>
      </div>
    </>
  );
};

export default Spinner;
