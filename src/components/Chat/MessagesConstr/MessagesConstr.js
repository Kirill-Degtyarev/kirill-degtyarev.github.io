import React from "react";
import AvatarAction from "../../../action/AvatarAction";

import styles from "./MessagesConstr.module.css";

const MessagesConstr = ({ userCompanion, item, id }) => {
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
            {!id ? (
                <div className={styles.message}>
                    <div className={styles["message-content"]}>
                        {userCompanion.userAvatar ? (
                            <div className={styles["message-avatar"]}>
                                <img src={userCompanion.userAvatar} alt="avatar" />
                            </div>
                        ) : (
                            <div className={styles["message-avatar__text"]}>
                                {AvatarAction.getAvatarByUserName(userCompanion.userDisplayName)}
                            </div>
                        )}
                        <div className={styles["message-body"]}>
                            <div className={styles["message-body__content"]}>
                                <div className={styles["body-content__text"]}>
                                    {item.messageText}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles["message-time"]}>{getTime(item.sendTime)}</div>
                </div>
            ) : (
                <div className={styles["message-cu"]}>
                    <div className={styles["message-cu__content"]}>
                        <div className={styles["contetn-cu__text"]}>{item.messageText}</div>
                    </div>
                    <div className={styles["message-time"]}>{getTime(item.sendTime)}</div>
                </div>
            )}
        </>
    );
};

export default MessagesConstr;
