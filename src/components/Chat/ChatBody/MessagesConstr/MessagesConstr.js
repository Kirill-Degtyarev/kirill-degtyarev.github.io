import React from 'react';
import AvatarAction from '../../../../action/AvatarAction';
import FileAction from '../../../../action/FileAction';

import VideoComponent from './VideoComponent/VideoComponent';

import SvgGenerator from '../../../../svgGenerator/SvgGenerator';

import styles from './MessagesConstr.module.scss';

const MessagesConstr = ({ userCompanion, item, id }) => {
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

  const getTime = (time) => {
    let hours = new Date(time).getHours();
    let minute = new Date(time).getMinutes();

    if (minute < 10) {
      minute = '0' + minute;
    }

    return hours + ':' + minute;
  };

  switch (item.content[0].type) {
    case 'text':
      return (
        <>
          {!id ? (
            <div className={styles.message}>
              <div className={styles['message-content']}>
                {userCompanion.userAvatar ? (
                  <div className={styles['message-avatar']}>
                    <img src={userCompanion.userAvatar} alt="avatar" />
                  </div>
                ) : (
                  <div className={styles['message-avatar__text']}>
                    {AvatarAction.getAvatarByUserName(
                      userCompanion.userDisplayName
                    )}
                  </div>
                )}
                <div className={styles['message-body']}>
                  <div className={styles['message-body__content']}>
                    <div className={styles['body-content__text']}>
                      {item.content[0].value}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles['message-time']}>
                {getTime(item.sendTime)}
              </div>
            </div>
          ) : (
            <div className={styles['message-cu']}>
              <div className={styles['message-cu__content']}>
                <div className={styles['contetn-cu__text']}>
                  {item.content[0].value}
                </div>
              </div>
              <div className={styles['message-time']}>
                {getTime(item.sendTime)}
              </div>
            </div>
          )}
        </>
      );
    case 'image':
      return (
        <>
          {!id ? (
            <div className={styles.message}>
              <div className={styles['message-content']}>
                {userCompanion.userAvatar ? (
                  <div className={styles['message-avatar']}>
                    <img src={userCompanion.userAvatar} alt="avatar" />
                  </div>
                ) : (
                  <div className={styles['message-avatar__text']}>
                    {AvatarAction.getAvatarByUserName(
                      userCompanion.userDisplayName
                    )}
                  </div>
                )}
                {item.content.length === 1 ? (
                  <div className={styles['message-body__img']}>
                    <img
                      src={item.content[0].value.fileUrl}
                      alt={item.content[0].value.fileName}
                    />
                  </div>
                ) : (
                  <div className={styles['message-body__many']}>
                    {item.content.map((items) => (
                      <div
                        className={styles['message-body__img']}
                        key={items.value.fileName}
                      >
                        <img
                          src={items.value.fileUrl}
                          alt={items.value.fileName}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className={styles['message-time']}>
                {getTime(item.sendTime)}
              </div>
            </div>
          ) : (
            <div className={styles['message-cu']}>
              {item.content.length === 1 ? (
                <div className={styles['message-body__img']}>
                  <img
                    src={item.content[0].value.fileUrl}
                    alt={item.content[0].value.fileName}
                  />
                </div>
              ) : (
                item.content.map((items) => (
                  <div
                    className={styles['message-body__img']}
                    key={items.value.fileName}
                  >
                    <img src={items.value.fileUrl} alt={items.value.fileName} />
                  </div>
                ))
              )}
              <div className={styles['message-time']}>
                {getTime(item.sendTime)}
              </div>
            </div>
          )}
        </>
      );
    case 'document':
      return (
        <>
          {!id ? (
            <div className={styles.message}>
              <div className={styles['message-content']}>
                {userCompanion.userAvatar ? (
                  <div className={styles['message-avatar']}>
                    <img src={userCompanion.userAvatar} alt="avatar" />
                  </div>
                ) : (
                  <div className={styles['message-avatar__text']}>
                    {AvatarAction.getAvatarByUserName(
                      userCompanion.userDisplayName
                    )}
                  </div>
                )}
                {item.content.length === 1 ? (
                  <div className={styles.document}>
                    <div
                      className={styles.document__body}
                      onClick={() => {
                        FileAction.downloadFileFromStorage(
                          item.content[0].value.fileUrl
                        );
                      }}
                    >
                      <div className={styles['document__body-img']}>
                        <SvgGenerator id="file_dock" />
                      </div>
                      <div
                        className={`${styles['document__body-info']} ${styles['document-info']}`}
                      >
                        <div className={styles['document-info__file-name']}>
                          {item.content[0].value.fileName}
                        </div>
                        <div className={styles['document-info__file-size']}>
                          {getSize(item.content[0].value.fileSize)}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.document}>
                    <div className={styles.document__many}>
                      {item.content.map((docs) => (
                        <div
                          className={styles.document__body}
                          onClick={() => {
                            FileAction.downloadFileFromStorage(
                              docs.value.fileUrl
                            );
                          }}
                          key={docs.value.fileName}
                        >
                          <div className={styles['document__body-img']}>
                            <SvgGenerator id="file_dock" />
                          </div>
                          <div
                            className={`${styles['document__body-info']} ${styles['document-info']}`}
                          >
                            <div className={styles['document-info__file-name']}>
                              {docs.value.fileName}
                            </div>
                            <div className={styles['document-info__file-size']}>
                              {getSize(docs.value.fileSize)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className={styles['message-time']}>
                {getTime(item.sendTime)}
              </div>
            </div>
          ) : (
            <div className={styles['message-cu']}>
              {item.content.length === 1 ? (
                <div className={styles.document}>
                  <div
                    className={styles.document__body}
                    onClick={() => {
                      FileAction.downloadFileFromStorage(
                        item.content[0].value.fileUrl
                      );
                    }}
                  >
                    <div className={styles['document__body-img']}>
                      <SvgGenerator id="file_dock" />
                    </div>
                    <div
                      className={`${styles['document__body-info']} ${styles['document-info']}`}
                    >
                      <div className={styles['document-info__file-name']}>
                        {item.content[0].value.fileName}
                      </div>
                      <div className={styles['document-info__file-size']}>
                        {getSize(item.content[0].value.fileSize)}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.document}>
                  <div className={styles.document__many}>
                    {item.content.map((docs) => (
                      <div
                        className={styles.document__body}
                        onClick={() => {
                          FileAction.downloadFileFromStorage(
                            docs.value.fileUrl
                          );
                        }}
                        key={docs.value.fileName}
                      >
                        <div className={styles['document__body-img']}>
                          <SvgGenerator id="file_dock" />
                        </div>
                        <div
                          className={`${styles['document__body-info']} ${styles['document-info']}`}
                        >
                          <div className={styles['document-info__file-name']}>
                            {docs.value.fileName}
                          </div>
                          <div className={styles['document-info__file-size']}>
                            {getSize(docs.value.fileSize)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className={styles['message-time']}>
                {getTime(item.sendTime)}
              </div>
            </div>
          )}
        </>
      );
    case 'video':
      return (
        <>
          {!id ? (
            <div className={styles.message}>
              <div className={styles['message-content']}>
                {userCompanion.userAvatar ? (
                  <div className={styles['message-avatar']}>
                    <img src={userCompanion.userAvatar} alt="avatar" />
                  </div>
                ) : (
                  <div className={styles['message-avatar__text']}>
                    {AvatarAction.getAvatarByUserName(
                      userCompanion.userDisplayName
                    )}
                  </div>
                )}
                {item.content.length === 1 ? (
                  <VideoComponent
                    src={item.content[0].value.fileUrl}
                    id={item.content[0].value.fileUrl}
                  />
                ) : (
                  <div className={styles['message-body__many']}>
                    {item.content.map((items) => (
                      <VideoComponent
                        src={items.value.fileUrl}
                        id={items.value.fileUrl}
                        key={items.value.fileName}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className={styles['message-time']}>
                {getTime(item.sendTime)}
              </div>
            </div>
          ) : (
            <div className={styles['message-cu']}>
              {item.content.length === 1 ? (
                <VideoComponent
                  src={item.content[0].value.fileUrl}
                  id={item.content[0].value.fileUrl}
                />
              ) : (
                item.content.map((items) => (
                  <VideoComponent
                    src={items.value.fileUrl}
                    id={items.value.fileUrl}
                    key={items.value.fileName}
                  />
                ))
              )}
              <div className={styles['message-time']}>
                {getTime(item.sendTime)}
              </div>
            </div>
          )}
        </>
      );
    default:
      break;
  }
};

export default MessagesConstr;
