import React from 'react';
import SvgGenerator from '../../../../svgGenerator/SvgGenerator';

import styles from './AddFileButton.module.scss';
const AddFileButton = (props) => {
  return (
    <label htmlFor={props.id}>
      <div className={styles[props.styles]}>
        <SvgGenerator id={props.iconId} />
        <input
          type="file"
          name={props.name}
          id={props.id}
          accept={props.accept ? props.accept : ''}
          style={{ display: 'none' }}
          onChange={props.saveAddFile}
        />
      </div>
    </label>
  );
};

export default AddFileButton;
