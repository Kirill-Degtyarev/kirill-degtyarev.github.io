import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Hooks/AuthHooks';
import { NavLink } from 'react-router-dom';

import UserAction from '../../../action/UserAction';
import AvatarAction from '../../../action/AvatarAction';
import LastOnlineAction from '../../../action/LastOnlineAction';

import LastMessagesContent from './LastMessagesContent/LastMessagesContent';

import styles from './ChatListItem.module.scss';

const ChatListItem = ({ chatsInfo }) => {
  const [userCompanion, setUserCompanion] = useState();
  const currentUser = useAuth();

  useEffect(() => {
    if (currentUser) {
      if (chatsInfo.userID_1 !== currentUser.uid) {
        UserAction.getUserById(chatsInfo.userID_1, setUserCompanion);
      } else {
        UserAction.getUserById(chatsInfo.userID_2, setUserCompanion);
      }
    }
  }, [currentUser]);

  const getTime = (time) => {
    let hours = new Date(time).getHours();
    let minute = new Date(time).getMinutes();

    if (minute < 10) {
      minute = '0' + minute;
    }

    return hours + ':' + minute;
  };

  return (
    <>
      {userCompanion && (
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles['chatlist-chat']} ${styles['chatlist-active']}`
              : styles['chatlist-chat']
          }
          id="chatlist-chat"
          to={encodeURI(`/chat/${userCompanion[0].userDisplayName}`)}
        >
          <div className={styles['chatlist-chat__body']}>
            <div className={styles['chatlist-chat__header']}>
              <div className={styles['chat-userinfo']}>
                <div className={styles['chat-avatar']}>
                  {userCompanion[0].online && (
                    <span
                      className={`${styles['chat-avatar__online']} `}
                    ></span>
                  )}
                  {userCompanion[0].userAvatar ? (
                    <div className={styles['chat-avatar__img']}>
                      <img src={userCompanion[0].userAvatar} alt="avatar" />
                    </div>
                  ) : (
                    <div className={styles['chat-avatarName']}>
                      {AvatarAction.getAvatarByUserName(
                        userCompanion[0].userDisplayName
                      )}
                    </div>
                  )}
                </div>
                <div className={styles['chat-info']}>
                  <div className={styles['chat-info__username']}>
                    {userCompanion[0].userDisplayName}
                  </div>
                  <span
                    className={`${styles['chat-info__actions']} ${styles.action}`}
                  >
                    {userCompanion[0].online
                      ? 'online'
                      : LastOnlineAction.getLastOnline(
                          userCompanion[0].lastOnline
                        )}
                    {/* <div className={styles["action-title"]}>
                                            {userCompanion[0].action === "writes"
                                                ? "writes"
                                                : userCompanion[0].action === "recording-voice"
                                                ? "records voice message"
                                                : userCompanion[0].action === "last"
                                                ? `last online ${props.lastTime} ago`
                                                : ""}
                                        </div> */}
                  </span>
                </div>
              </div>
              {chatsInfo.lastMessages.at(-1).content && (
                <span className={styles['last-messages']}>
                  {getTime(chatsInfo.lastMessages.at(-1).sendLastTime)}
                </span>
              )}
            </div>
            {chatsInfo.lastMessages.at(-1).content && (
              <div className={styles['chats-info__content']}>
                <LastMessagesContent
                  lastMessage={chatsInfo.lastMessages.at(-1).content}
                  lastMessagesLength={chatsInfo.lastMessages.length}
                  senderMessage={chatsInfo.lastMessages.at(-1).senderMessage}
                  currentUserUid={currentUser.uid}
                />
              </div>
            )}
          </div>
        </NavLink>
      )}
    </>
  );
};

export default ChatListItem;
