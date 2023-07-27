import React from 'react';

import SvgGenerator from '../../../../svgGenerator/SvgGenerator';
import styles from './FileItem.module.scss';

const FileItem = ({ item, deleteAddFile }) => {
  const getSize = (size) => {
    const sizeB = size;
    const sizeKb = (size / 1024).toFixed(0);
    const sizeMb = (size / 1024 / 1024).toFixed(0);
    const sizeGb = (size / 1024 / 1024 / 1024).toFixed(0);
    const sizeTb = (size / 1024 / 1024 / 1024 / 1024).toFixed(0);
    if (sizeB < 1024) {
      return sizeB + 'B';
    }
    if (sizeKb < 1024) {
      return sizeKb + 'Kb';
    }
    if (sizeMb < 1024) {
      return sizeMb + 'Mb';
    }
    if (sizeGb < 1024) {
      return sizeGb + 'Gb';
    }
    if (sizeTb < 1024) {
      return sizeTb + 'Gb';
    }
  };
  switch (item.fileType) {
    case 'image':
      return (
        <div className={styles.img}>
          <div className={styles.img__body}>
            <img src={item.fileUrl} alt="images" />
          </div>
          <div
            className={styles.delete}
            onClick={() => {
              deleteAddFile(item);
            }}
          >
            <SvgGenerator id="delete-mini" />
          </div>
        </div>
      );

    case 'video':
      return (
        <div className={styles.video}>
          <div className={styles.video__info}>
            <div className={styles['video__info-size']}>
              {getSize(item.fileSize)}
            </div>
            <h2 className={styles['video__info-title']}>video</h2>
          </div>
          <div className={styles.video__body}>
            <video src={item.fileUrl} height={100 + 'px'}></video>
          </div>
          <div
            className={styles.delete}
            onClick={() => {
              deleteAddFile(item);
            }}
          >
            <SvgGenerator id="delete-mini" />
          </div>
        </div>
      );

    // case "audio":
    //     return <div className={styles.audio__body}></div>;

    case 'document':
      return (
        <div className={styles.document}>
          <div className={styles.document__body}>
            <div className={styles['document__body-img']}>
              <SvgGenerator id="file_dock" />
            </div>
            <div
              className={`${styles['document__body-info']} ${styles['document-info']}`}
            >
              <div className={styles['document-info__file-name']}>
                {item.fileName}
              </div>
              <div className={styles['document-info__file-size']}>
                {getSize(item.fileSize)}
              </div>
            </div>
          </div>
          <div
            className={styles.document__delete}
            onClick={() => {
              deleteAddFile(item);
            }}
          >
            <SvgGenerator id="delete" />
          </div>
        </div>
      );

    default:
      break;
  }
};

export default FileItem;
