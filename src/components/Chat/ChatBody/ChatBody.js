import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Hooks/AuthHooks";

import AvatarAction from "../../../action/AvatarAction";
import ChatAction from "../../../action/ChatAction";
import UserAction from "../../../action/UserAction";
import LastOnlineAction from "../../../action/LastOnlineAction";
import FileAction from "../../../action/FileAction";

import Picker from "emoji-picker-react";

import SvgGenerator from "../../../svgGenerator/SvgGenerator";
import MessagesConstr from "../MessagesConstr/MessagesConstr";
import styles from "./ChatBody.module.css";

const ChatBody = (props) => {
    // const [chosenEmoji, setChosenEmoji] = useState(null);
    const [messageValue, setMessageValue] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);
    const [showAddFile, setShowAddFile] = useState(false);
    const [userCompanion, setUserCompanion] = useState([]);
    const [chat, setChat] = useState(null);
    const [addFile, setAddFile] = useState([]);
    const params = useParams();
    const currentUser = useAuth();

    useEffect(() => {
        if (params.id) {
            UserAction.getUserByName(params.id, setUserCompanion);
        }
    }, [params]);

    useEffect(() => {
        const anchorChat = document.getElementById("anchor-scroll");
        anchorChat.scrollIntoView({ behavior: "auto", block: "end" });
    }, [chat]);

    useEffect(() => {
        const messageInput = document.getElementById("message-input");

        if (currentUser && userCompanion.length !== 0) {
            ChatAction.getChat(currentUser.displayName, userCompanion[0].userDisplayName, setChat);
        }
        setShowAddFile(false);
        messageInput.innerText = "";
    }, [currentUser, userCompanion]);

    // const onEmojiClick = (event, emojiObject) => {
    //     const messageInput = document.getElementById("message-input");
    //     setChosenEmoji(chosenEmoji);
    //     messageInput.innerText =
    //         messageValue.substr(0, messageInput.selectionStart) +
    //         emojiObject.emoji +
    //         messageValue.substr(messageInput.selectionEnd);
    //     setMessageValue(messageInput.innerHTML);
    // };

    const saveAddFile = async (e) => {
        const newFile = e.target.files;
    };

    const sendMessage = async () => {
        const messageInput = document.getElementById("message-input");
        const anchorChat = document.getElementById("anchor-scroll");

        if (messageValue !== "") {
            messageInput.dataset.placeholder = "Type a message here";
            messageInput.innerText = "";
            await ChatAction.sendMessage(messageValue, setMessageValue, chat.key, currentUser.uid);
            anchorChat.scrollIntoView({ behavior: "smooth", block: "end" });
        } else {
            messageInput.innerText = "";
            messageInput.dataset.placeholder = "Сan't send empty message";
        }
    };

    return (
        <div className={styles["chat__container"]} id="chat">
            {userCompanion.length !== 0 ? (
                <div className={styles["chat-header"]}>
                    <div className={styles["chat-header__userinfo"]}>
                        <Link to="/chat" className={styles["chat-header__back"]}>
                            <SvgGenerator id="arrow-back" />
                        </Link>
                        <div className={styles["header-userinfo__avatar"]}>
                            {userCompanion[0].online ? (
                                <span className={`${styles["user-avatar__online"]}`}></span>
                            ) : (
                                ""
                            )}
                            {userCompanion[0].userAvatar ? (
                                <img src={userCompanion[0].userAvatar} alt="avatar" />
                            ) : (
                                <div className={styles["header-userinfo__avatarName"]}>
                                    {AvatarAction.getAvatarByUserName(
                                        userCompanion[0].userDisplayName
                                    )}
                                </div>
                            )}
                        </div>
                        <div className={styles["header-userinfo__info"]}>
                            <div className={styles["info-username"]}>
                                {userCompanion[0].userDisplayName}
                            </div>
                            <div className={styles["info-actions"]}>
                                {userCompanion[0].online
                                    ? "online"
                                    : LastOnlineAction.getLastOnline(userCompanion[0].lastOnline)}
                            </div>
                        </div>
                    </div>
                    <div className={styles["chat-header__additions"]}>
                        <div className={styles["addition-attachments"]}>
                            <SvgGenerator id="clip" />
                        </div>
                        <div className={styles["addition-menu"]}>
                            <SvgGenerator id="dots" />
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
            <div className={styles["chat-body"]} id="chat-body">
                <div className={styles["chat-body__content"]}>
                    {chat ? (
                        chat.messages.length !== 0 ? (
                            chat.messages.map((item) => (
                                <div
                                    key={item.key}
                                    className={
                                        item.senderMessage === currentUser.uid
                                            ? styles["message-currentUser"]
                                            : styles["message-senderUser"]
                                    }
                                >
                                    <MessagesConstr
                                        userCompanion={userCompanion[0]}
                                        item={item}
                                        id={item.senderMessage === currentUser.uid}
                                    />
                                </div>
                            ))
                        ) : (
                            <h2 className={styles["no-messages"]}>
                                No messages yet. Send your first message
                            </h2>
                        )
                    ) : (
                        ""
                    )}
                    <div id="anchor-scroll" className={styles["anchor-scroll"]}></div>
                </div>
            </div>
            <div className={styles["chat-footer"]}>
                <div className={styles["chat-footer__body"]}>
                    <div className={styles["footer-add"]}>
                        <div
                            className={styles["footer-add__plus"]}
                            onClick={() => {
                                setShowAddFile(!showAddFile);
                            }}
                        >
                            <SvgGenerator id="plus" class="footer-plus" />
                        </div>
                        {showAddFile ? (
                            <div
                                className={
                                    showAddFile
                                        ? `${styles["footer-add__menu"]} ${styles["open__add-menu"]}`
                                        : `${styles["footer-add__menu"]} `
                                }
                            >
                                <label htmlFor="video-file">
                                    <div className={styles["add-menu-video"]}>
                                        <SvgGenerator id="video-add" />
                                        <input
                                            type="file"
                                            name="video"
                                            id="video-file"
                                            accept="video/*"
                                            style={{ display: "none" }}
                                            onChange={saveAddFile}
                                        />
                                    </div>
                                </label>
                                <label htmlFor="photo-file">
                                    <div className={styles["add-menu-photo"]}>
                                        <input
                                            type="file"
                                            name="phote"
                                            id="photo-file"
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            onChange={saveAddFile}
                                        />
                                        <SvgGenerator id="photo-add" />
                                    </div>
                                </label>
                                <label htmlFor="docs-file">
                                    <div className={styles["add-menu-file"]}>
                                        <input
                                            type="file"
                                            name="docs"
                                            id="docs-file"
                                            style={{ display: "none" }}
                                            onChange={saveAddFile}
                                        />
                                        <SvgGenerator id="file-add" />
                                    </div>
                                </label>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className={styles["footer-input"]}>
                        <div
                            className={styles["message-input"]}
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
                                    if (e.key === "Enter" && !e.shiftKey) {
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
                    <div className={styles["footer-attach"]}>
                        {showEmoji ? (
                            <div className={styles["footer-attach__picker"]}>
                                {/* <Picker onEmojiClick={onEmojiClick} /> */}
                                <Picker />
                            </div>
                        ) : (
                            ""
                        )}
                        <div
                            className={styles["footer-attach__smile"]}
                            onClick={() => setShowEmoji(!showEmoji)}
                        >
                            <SvgGenerator id="smile" />
                        </div>
                        <div className={styles["footer-attach__send"]}>
                            <button className={styles["send-message"]} onClick={sendMessage}>
                                <SvgGenerator id="send" />
                            </button>
                        </div>
                    </div>
                </div>
                {userCompanion.length !== 0 && false ? (
                    <div className={styles["chat-footer__addFile"]}>
                        <img
                            src={userCompanion[0].userAvatar}
                            style={{ width: 50 + "px" }}
                            alt="avatr"
                        />
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export { ChatBody };
