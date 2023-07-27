import React from 'react';

import styles from './Loader.module.scss';

const Loader = (props) => {
  return (
    <div className={styles['spinner-box']}>
      <div className={styles['circle-border']}>
        <div className={styles['circle-core']}></div>
      </div>
    </div>
  );
};

export default Loader;
