import React from 'react';
import { useNavigate } from 'react-router-dom';

import AvatarAction from '../../../action/AvatarAction';
import ChatAction from '../../../action/ChatAction';

import CreateChat from '../../../assest/img/Contact/create-chat.png';

import styles from './UserContact.module.scss';

const UserContact = ({ currentUser, users, request }) => {
  const nav = useNavigate();
  const navigateLink = (link) => {
    nav(encodeURI(`/chat/${link}`));
  };
  return users
    .filter((item) => item.userDisplayName.toLowerCase().includes(request))
    .map((item) => {
      return currentUser.uid !== item.userId ? (
        <div
          className={`${styles['user-list__item']} ${styles['user-item']}`}
          key={item.userId}
        >
          <div
            className={`${styles['user-item__body']} ${styles['item-body']}`}
          >
            <div
              className={`${styles['item-body__info']} ${styles['item-info']}`}
            >
              <div className={styles.user__avatar}>
                {item.online && (
                  <span className={`${styles['user-avatar__online']} `}></span>
                )}
                {item.userAvatar !== null ? (
                  <img
                    src={item.userAvatar}
                    alt="avatar"
                    className={styles['avatar-img']}
                  />
                ) : (
                  <div className={styles['avatar-name']}>
                    {AvatarAction.getAvatarByUserName(item.userDisplayName)}
                  </div>
                )}
              </div>
              <div className={styles['user-info']}>
                <div className={styles.user__userName}>
                  {item.userDisplayName}
                </div>
                <div
                  onClick={() => {
                    window.location = `mailto:${item.userEmail} `;
                  }}
                  className={styles.user__userEmail}
                  data-title="Write to mail"
                >
                  {item.userEmail}
                </div>
              </div>
            </div>
            <div
              className={`${styles['item-body__btn']} ${styles['item-btn']}`}
            >
              <div
                className={styles['item-btn__button']}
                onClick={() => {
                  ChatAction.createChat(currentUser, item, navigateLink);
                }}
              >
                <img src={CreateChat} alt="create-chat" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      );
    });
};

export default UserContact;
