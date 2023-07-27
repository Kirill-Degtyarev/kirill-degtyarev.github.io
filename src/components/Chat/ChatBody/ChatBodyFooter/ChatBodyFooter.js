import React, { useState, useEffect } from 'react';
import Picker from 'emoji-picker-react';
import FileAction from '../../../../action/FileAction';
import ChatAction from '../../../../action/ChatAction';
import AddFileButton from '../AddFileButton/AddFileButton';
import SvgGenerator from '../../../../svgGenerator/SvgGenerator';
import FileItem from '../FileItem/FileItem';
import { ADD_BUTTON } from '../../../../const/Chat/action_button';

import styles from './ChatBodyFooter.module.scss';

function ChatBodyFooter({ currentUser, chatKey }) {
  // eslint-disable-next-line
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showAddFile, setShowAddFile] = useState(false);
  const [messageValue, setMessageValue] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [addButton, setAddButton] = useState(ADD_BUTTON);
  const [addFile, setAddFile] = useState([]);
  const messageInput = document.getElementById('message-input');

  useEffect(() => {
    const messageInput = document.getElementById('message-input');

    setShowAddFile(false);
    messageInput.innerText = '';
  }, [chatKey]);

  const saveAddFile = async (e) => {
    const newButton = addButton.filter((n) => n.id === e.target.id);

    setAddButton(newButton);

    if (addFile.length < 10) {
      const newFile = e.target.files;

      FileAction.addNewFile(newFile, addFile, setAddFile);
    } else {
      return alert("Can't add more than 10 files");
    }
  };

  const deleteAddFile = (item) => {
    const newAddFile = addFile.filter((n) => n.fileName !== item.fileName);

    setAddFile(newAddFile);

    if (newAddFile.length === 0) {
      setAddButton(ADD_BUTTON);
    }
  };

  const sendMessage = async () => {
    const anchorChat = document.getElementById('anchor-scroll');
    let content = [];

    if (addFile.length === 0) {
      if (messageValue !== '') {
        content = [
          {
            type: 'text',
            value: messageValue,
          },
        ];
        messageInput.dataset.placeholder = 'Type a message here';
        messageInput.innerText = '';

        await ChatAction.sendMessage(
          content,
          setMessageValue,
          chatKey,
          currentUser.uid
        );

        anchorChat.scrollIntoView({ behavior: 'smooth', block: 'end' });
      } else {
        messageInput.innerText = '';
        messageInput.dataset.placeholder = "Сan't send empty message";
      }
    } else {
      const newFiles = await FileAction.sendingFiles(
        chatKey,
        addFile,
        setAddFile
      );

      newFiles.forEach((item) => {
        content.push({
          type: item.fileType,
          value: item,
        });
      });

      await ChatAction.sendMessage(
        content,
        setMessageValue,
        chatKey,
        currentUser.uid
      );

      setShowAddFile(false);
      setAddButton(ADD_BUTTON);
      anchorChat.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  const onEmojiClick = (emojiObject) => {
    setChosenEmoji(emojiObject);
    messageInput.textContent = messageInput.textContent + emojiObject.emoji;
  };

  return (
    <div className={styles['chat-footer']}>
      <div className={styles['chat-footer__body']}>
        <div className={styles['footer-add']}>
          <div
            className={styles['footer-add__plus']}
            onClick={() => {
              setShowAddFile(!showAddFile);
            }}
          >
            <SvgGenerator id="plus" class="footer-plus" />
          </div>
          {showAddFile && (
            <div
              className={
                showAddFile
                  ? `${styles['footer-add__menu']} ${styles['open__add-menu']}`
                  : `${styles['footer-add__menu']} `
              }
              id={'label-body'}
            >
              {addButton.map((item) => (
                <AddFileButton
                  key={item.id}
                  id={item.id}
                  iconId={item.iconId}
                  name={item.name}
                  accept={item.accept}
                  styles={item.styles}
                  saveAddFile={saveAddFile}
                />
              ))}
            </div>
          )}
        </div>
        <div className={styles['footer-input']}>
          <div
            className={styles['message-input']}
            id="message-input"
            onInput={(e) => {
              setMessageValue(e.target.innerText.trim());
            }}
            onKeyDown={(e) => {
              if (
                !/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
                  navigator.userAgent
                )
              ) {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }
            }}
            tabIndex={0}
            contentEditable="true"
            data-placeholder="Type a message here"
          ></div>
        </div>
        <div className={styles['footer-attach']}>
          {showEmoji && (
            <div className={styles['footer-attach__picker']}>
              <Picker onEmojiClick={onEmojiClick} />
            </div>
          )}
          <div
            className={styles['footer-attach__smile']}
            onClick={() => setShowEmoji(!showEmoji)}
          >
            <SvgGenerator id="smile" />
          </div>
          <div className={styles['footer-attach__send']}>
            <button className={styles['send-message']} onClick={sendMessage}>
              <SvgGenerator id="send" />
            </button>
          </div>
        </div>
      </div>
      {addFile.length !== 0 && (
        <div className={styles['chat-footer__addFile']}>
          {addFile.map((item) => (
            <FileItem
              item={item}
              key={item.fileName}
              deleteAddFile={deleteAddFile}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default ChatBodyFooter;
