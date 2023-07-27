import React, { useEffect } from 'react';
import MessagesConstr from '../MessagesConstr/MessagesConstr';
import styles from './ChatBodyMessages.module.scss';
function ChatBodyMessages({ messages, currentUserUid, userCompanion }) {
  useEffect(() => {
    const anchorChat = document.getElementById('anchor-scroll');
    anchorChat.scrollIntoView({ behavior: 'auto', block: 'end' });
  }, [messages]);
  return (
    <div className={styles['chat-body']} id="chat-body">
      <div className={styles['chat-body__content']}>
        {messages.length !== 0 ? (
          messages.map((item) => (
            <div
              key={item.key}
              className={
                item.senderMessage === currentUserUid
                  ? styles['message-currentUser']
                  : styles['message-senderUser']
              }
            >
              <MessagesConstr
                userCompanion={userCompanion}
                item={item}
                id={item.senderMessage === currentUserUid}
              />
            </div>
          ))
        ) : (
          <h2 className={styles['no-messages']}>
            No messages yet. Send your first message
          </h2>
        )}
        <div id="anchor-scroll" className={styles['anchor-scroll']}></div>
      </div>
    </div>
  );
}
export default ChatBodyMessages;
