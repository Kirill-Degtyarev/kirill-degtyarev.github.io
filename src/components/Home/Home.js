import React from 'react';

import styles from './Home.module.scss';

const Home = (props) => {
  return (
    <div className={styles.title__body}>
      <h2 className={styles.title}>
        This is the HOME page, new functionality will be coming soon.
      </h2>
    </div>
  );
};

export default Home;
