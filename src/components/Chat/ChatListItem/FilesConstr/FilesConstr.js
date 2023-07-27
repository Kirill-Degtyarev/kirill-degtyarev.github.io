import React from 'react';

import SvgGenerator from '../../../../svgGenerator/SvgGenerator';

import styles from './FilesConstr.module.scss';

const FilesConstr = ({ type, lastMessage, name }) => {
  return (
    <div className={`${styles['messages-files']} ${styles[`${type}`]}`}>
      <div className={styles['files-docs']}>
        <div className={styles['files-docs__img']}>
          <SvgGenerator id={name} />
        </div>
        <h2 className={styles['files-docs__title']}>{name}</h2>
        {lastMessage.length > 1 && (
          <span className={styles['files-docs__count']}>
            (x{lastMessage.length})
          </span>
        )}
      </div>
    </div>
  );
};

export default FilesConstr;
