import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../Hooks/AuthHooks';
import ChatAction from '../../../action/ChatAction';

import SvgGenerator from '../../../svgGenerator/SvgGenerator';
import ChatListItem from '../ChatListItem/ChatListItem';
import Loader from '../../Loader/Loader';

import styles from './ChatsMenu.module.scss';

const ChatsMenu = (props) => {
  const [chats, setChats] = useState();
  const [request, setRequest] = useState('');
  const currentUser = useAuth();

  useEffect(() => {
    if (currentUser) {
      ChatAction.getChats(setChats, currentUser.uid);
    }
  }, [currentUser]);

  const chatsItems =
    chats &&
    chats
      .sort(function(a, b) {
        return (
          new Date(
            b.lastMessages[
              b.lastMessages.length === 1 ? 0 : b.lastMessages.length - 1
            ].sendLastTime
          ) -
          new Date(
            a.lastMessages[
              a.lastMessages.length === 1 ? 0 : a.lastMessages.length - 1
            ].sendLastTime
          )
        );
      })
      .filter((i) =>
        i.key
          .split('+')[1]
          .toLowerCase()
          .includes(request)
      )
      .map((item) => (
        <ChatListItem
          key={item.key}
          chatsInfo={item}
          setChatId={props.setChatId}
        />
      ));

  return (
    <div className={styles.chats__container}>
      <div className={styles.chats__wr}>
        {/* <div className={styles["chats-header"]}>
                    <div className={styles["chats-header__info"]}>
                        <h2 className={styles["header-info__title"]}>Chats</h2>
                        <div className={styles["header-info__select"]}>
                            <h2 className={styles["select-title"]}>Recent Chats</h2>
                            <div className={styles["select-img"]}>
                                <SvgGenerator id="arrow-down" stroke="#707C97" />
                            </div>
                        </div>
                    </div>
                    <div className={styles["chats-header__button"]}>
                        <h2 className={styles["chats-header__button-title"]}>Create New Chat</h2>
                    </div>
                </div> */}
        <div className={styles['chats-search']}>
          <div className={styles['chats-search__body']}>
            <div className={styles['search-body__icon']}>
              <SvgGenerator id="search" />
            </div>
            <div className={styles['search-body__input']}>
              <input
                value={request}
                type="text"
                name="serach-input"
                placeholder="Search"
                id="serach-input"
                onChange={(e) => {
                  setRequest(e.target.value.toLowerCase().trim());
                }}
              />
            </div>
            {/* <div className={styles["search-body__select"]}>
                            <div className={styles["search-select__title"]}>Messages</div>
                            <div className={styles["search-select__icon"]}>
                                <SvgGenerator id="arrow-down" stroke="#707c97" />
                            </div>
                        </div> */}
          </div>
        </div>
        <div
          className={!chats ? styles['chatlist-loader'] : styles['chatlist']}
        >
          {chats ? (
            chats.length !== 0 ? (
              chatsItems
            ) : (
              <div className={styles['chatlist-none']}>No chats</div>
            )
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatsMenu;
