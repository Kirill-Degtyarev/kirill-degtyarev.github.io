import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ChatsMenu from './ChatsMenu/ChatsMenu';
import ChatBody from './ChatBody/ChatBody';

import styles from './Chat.module.scss';

const Chat = (props) => {
  return (
    <div className={styles['chat-body']}>
      <ChatsMenu />
      <Routes>
        <Route path=":id" element={<ChatBody />} />
      </Routes>
    </div>
  );
};

export default Chat;
