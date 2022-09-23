import React from "react";

import AvatarAction from "../../../action/AvatarAction";
import ChatAction from "../../../action/ChatAction";

import CreateChat from "../../../assest/img/Contact/create-chat.png";

import styles from "./UserContact.module.css";

const UserContact = (props) => {
    const currentUser = props.currentUser;
    const createContact = props.user;

    return (
        <div className={styles["user-container"]}>
            <div className={styles["user-container__info"]}>
                <div className={styles.user__avatar}>
                    {createContact.online ? (
                        <span className={`${styles["user-avatar__online"]} `}></span>
                    ) : (
                        ""
                    )}
                    {createContact.userAvatar !== null ? (
                        <img
                            src={createContact.userAvatar}
                            alt="avatar"
                            className={styles["user-avatar"]}
                        />
                    ) : (
                        <div className={styles["user-avatarName"]}>
                            {AvatarAction.getAvatarByUserName(createContact.userDisplayName)}
                        </div>
                    )}
                </div>
                <div className={styles.user__userName}>{createContact.userDisplayName}</div>
                <div
                    onClick={() => {
                        window.location = `mailto:${createContact.userEmail} `;
                    }}
                    className={styles.user__userEmail}
                >
                    {createContact.userEmail}
                </div>
            </div>
            <div
                className={styles["user-container__button"]}
                onClick={() => {
                    ChatAction.createChat(currentUser, createContact);
                }}
            >
                <img src={CreateChat} alt="create-chat" />
            </div>
        </div>
    );
};

export default UserContact;
