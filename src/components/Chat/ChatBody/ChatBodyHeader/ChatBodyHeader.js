import React from 'react';
import { Link } from 'react-router-dom';
import LastOnlineAction from '../../../../action/LastOnlineAction.js';
import AvatarAction from '../../../../action/AvatarAction.js';
import SvgGenerator from '../../../../svgGenerator/SvgGenerator.js';

import styles from './ChatBodyHeader.module.scss';
function ChatBodyHeader({ userCompanion }) {
  return (
    <div className={styles['chat-header']}>
      <div className={styles['chat-header__userinfo']}>
        <Link to="/chat" className={styles['chat-header__back']}>
          <SvgGenerator id="arrow-back" />
        </Link>
        <div className={styles['header-userinfo__avatar']}>
          {userCompanion.online && (
            <span className={`${styles['user-avatar__online']}`}></span>
          )}
          {userCompanion.userAvatar ? (
            <img src={userCompanion.userAvatar} alt="avatar" />
          ) : (
            <div className={styles['header-userinfo__avatarName']}>
              {AvatarAction.getAvatarByUserName(userCompanion.userDisplayName)}
            </div>
          )}
        </div>
        <div className={styles['header-userinfo__info']}>
          <div className={styles['info-username']}>
            {userCompanion.userDisplayName}
          </div>
          <div className={styles['info-actions']}>
            {userCompanion.online
              ? 'online'
              : LastOnlineAction.getLastOnline(userCompanion.lastOnline)}
          </div>
        </div>
      </div>
      <div className={styles['chat-header__additions']}>
        <div className={styles['addition-attachments']}>
          <SvgGenerator id="clip" />
        </div>
        <div className={styles['addition-menu']}>
          <SvgGenerator id="dots" />
        </div>
      </div>
    </div>
  );
}
export default ChatBodyHeader;
