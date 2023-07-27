import React from 'react';

import FilesConstr from '../FilesConstr/FilesConstr';
import SvgGenerator from '../../../../svgGenerator/SvgGenerator';
import styles from './LastMessagesContent.module.scss';

const LastMessagesContent = ({
  lastMessage,
  lastMessagesLength,
  senderMessage,
  currentUserUid,
}) => {
  switch (lastMessage[0].type) {
    case 'text':
      return (
        <div className={styles['chatlist-chat__messages']}>
          <div className={styles.message}>
            <div className={styles['chat-messages']}>
              {lastMessage[0].type === 'text' ? (
                lastMessage[0].value
              ) : (
                <div className={styles['chat-messages__voice']}>
                  <div className={styles['messages-voice_img']}>
                    <SvgGenerator id="recording-voice" />
                  </div>
                </div>
              )}
            </div>
            {senderMessage !== currentUserUid && (
              <div className={styles['messages-count']}>
                <span>{lastMessagesLength}</span>
              </div>
            )}
          </div>
        </div>
      );
    case 'document':
      return (
        <div className={styles['chatlist-chat__messages']}>
          <div className={styles.message}>
            <FilesConstr
              type={lastMessage[0].type}
              name={'files'}
              lastMessage={lastMessage}
            />
            {senderMessage !== currentUserUid && (
              <div className={styles['messages-count']}>
                <span>{lastMessagesLength}</span>
              </div>
            )}
          </div>
        </div>
      );
    case 'image':
      return (
        <div className={styles['chatlist-chat__messages']}>
          <div className={styles.message}>
            <FilesConstr
              type={lastMessage[0].type}
              name={'photo'}
              lastMessage={lastMessage}
            />
            {senderMessage !== currentUserUid && (
              <div className={styles['messages-count']}>
                <span>{lastMessagesLength}</span>
              </div>
            )}
          </div>
        </div>
      );
    case 'video':
      return (
        <div className={styles['chatlist-chat__messages']}>
          <div className={styles.message}>
            <FilesConstr
              type={'image'}
              name={'video'}
              lastMessage={lastMessage}
            />
            {senderMessage !== currentUserUid && (
              <div className={styles['messages-count']}>
                <span>{lastMessagesLength}</span>
              </div>
            )}
          </div>
        </div>
      );
    default:
      break;
  }
};

export default LastMessagesContent;
