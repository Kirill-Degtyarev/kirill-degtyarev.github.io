import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserAction from "../../../action/UserAction";
import AvatarAction from "../../../action/AvatarAction";
import { useAuth } from "../../../Hooks/AuthHooks";

import SvgGenerator from "../../../svgGenerator/SvgGenerator";
import FilesConstr from "../../../FilesConstr/FilesConstr";

import styles from "./ChatlistChat.module.css";

const ChatlistChat = (props) => {
    const [userCompanion, setUserCompanion] = useState();
    const currentUser = useAuth();

    useEffect(() => {
        if (currentUser) {
            if (props.chatsInfo.userID_1 !== currentUser.uid) {
                UserAction.getUserById(props.chatsInfo.userID_1, setUserCompanion);
            } else {
                UserAction.getUserById(props.chatsInfo.userID_2, setUserCompanion);
            }
        }
    }, [currentUser]);

    const getTime = (time) => {
        let hours = new Date(time).getHours();
        let minute = new Date(time).getMinutes();

        if (minute < 10) {
            minute = "0" + minute;
        }

        return hours + ":" + minute;
    };
    return (
        <>
            {userCompanion ? (
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? `${styles["chatlist-chat"]} ${styles["chatlist-active"]}`
                            : styles["chatlist-chat"]
                    }
                    to={encodeURI(`/chat/${userCompanion[0].userDisplayName}`)}
                >
                    <div className={styles["chatlist-chat__header"]}>
                        <div className={styles["chat-userinfo"]}>
                            <div className={styles["chat-avatar"]}>
                                {userCompanion[0].online ? (
                                    <span className={`${styles["chat-avatar__online"]} `}></span>
                                ) : (
                                    ""
                                )}
                                {userCompanion[0].userAvatar ? (
                                    <div className={styles["chat-avatar__img"]}>
                                        <img src={userCompanion[0].userAvatar} alt="avatar" />
                                    </div>
                                ) : (
                                    <div className={styles["chat-avatarName"]}>
                                        {AvatarAction.getAvatarByUserName(
                                            userCompanion[0].userDisplayName
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className={styles["chat-info"]}>
                                <div className={styles["chat-info__username"]}>
                                    {userCompanion[0].userDisplayName}
                                </div>
                                <span
                                    className={`${styles["chat-info__actions"]} ${styles.action}`}
                                >
                                    {userCompanion[0].action ? (
                                        <div className={styles["action-img"]}>
                                            <SvgGenerator id={userCompanion[0].action} />
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                    <div className={styles["action-title"]}>
                                        {userCompanion[0].action === "writes"
                                            ? "writes"
                                            : userCompanion[0].action === "recording-voice"
                                            ? "records voice message"
                                            : userCompanion[0].action === "last"
                                            ? `last online ${props.lastTime} ago`
                                            : ""}
                                    </div>
                                </span>
                            </div>
                        </div>
                        {props.chatsInfo.lastMessages.content ? (
                            <span className={styles["last-messages"]}>
                                {getTime(props.chatsInfo.lastMessages.sendLastTime)}
                            </span>
                        ) : (
                            ""
                        )}
                    </div>
                    {props.chatsInfo.lastMessages.content ? (
                        <div className={styles["chatlist-chat__messages"]}>
                            <div className={styles.message}>
                                <div className={styles["chat-messages"]}>
                                    {props.typeMessage === "voice" ? (
                                        <div className={styles["chat-messages__voice"]}>
                                            <div className={styles["messages-voice_img"]}>
                                                <SvgGenerator id={props.action} />
                                            </div>
                                            {props.message}
                                        </div>
                                    ) : (
                                        props.chatsInfo.lastMessages.content
                                    )}
                                </div>
                                {/* {+props.messagesCount !== 0 ? (
                                <div className={styles["messages-count"]}>
                                    <span>{props.messagesCount}</span>
                                </div>
                            ) : (
                                ""
                            )} */}
                            </div>
                            {props.files ? (
                                <div className={styles["message-file"]}>
                                    {props.files.map((file) => (
                                        <FilesConstr
                                            key={file.name}
                                            type={file.type}
                                            name={file.name}
                                            count={file.count}
                                        />
                                    ))}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    ) : (
                        ""
                    )}
                </NavLink>
            ) : (
                ""
            )}
        </>
    );
};

export default ChatlistChat;
