import React from "react";
import AvatarAction from "../../../action/AvatarAction";

import SvgGenerator from "../../../svgGenerator/SvgGenerator";
import styles from "./MessagesConstr.module.css";

const MessagesConstr = ({ userCompanion, item, id }) => {
    const getSize = (size) => {
        return (size / 1024).toFixed(2) + "Mb";
    };
    const getTime = (time) => {
        let hours = new Date(time).getHours();
        let minute = new Date(time).getMinutes();

        if (minute < 10) {
            minute = "0" + minute;
        }

        return hours + ":" + minute;
    };
    switch (item.content.type) {
        case "text":
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
                                        {AvatarAction.getAvatarByUserName(
                                            userCompanion.userDisplayName
                                        )}
                                    </div>
                                )}
                                <div className={styles["message-body"]}>
                                    <div className={styles["message-body__content"]}>
                                        <div className={styles["body-content__text"]}>
                                            {item.content.value}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles["message-time"]}>{getTime(item.sendTime)}</div>
                        </div>
                    ) : (
                        <div className={styles["message-cu"]}>
                            <div className={styles["message-cu__content"]}>
                                <div className={styles["contetn-cu__text"]}>
                                    {item.content.value}
                                </div>
                            </div>
                            <div className={styles["message-time"]}>{getTime(item.sendTime)}</div>
                        </div>
                    )}
                </>
            );
        case "image":
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
                                        {AvatarAction.getAvatarByUserName(
                                            userCompanion.userDisplayName
                                        )}
                                    </div>
                                )}
                                <div className={styles["message-body__img"]}>
                                    <img src={item.content.value.fileUrl} alt="img" />
                                </div>
                            </div>
                            <div className={styles["message-time"]}>{getTime(item.sendTime)}</div>
                        </div>
                    ) : (
                        <div className={styles["message-cu"]}>
                            <div className={styles["message-body__img"]}>
                                <img src={item.content.value.fileUrl} alt="img" />
                            </div>
                            <div className={styles["message-time"]}>{getTime(item.sendTime)}</div>
                        </div>
                    )}
                </>
            );
        case "document":
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
                                        {AvatarAction.getAvatarByUserName(
                                            userCompanion.userDisplayName
                                        )}
                                    </div>
                                )}
                                <div className={styles.document}>
                                    <div className={styles.document__body}>
                                        <div className={styles["document__body-img"]}>
                                            <SvgGenerator id="file_dock" />
                                        </div>
                                        <div
                                            className={`${styles["document__body-info"]} ${styles["document-info"]}`}
                                        >
                                            <div className={styles["document-info__file-name"]}>
                                                {item.content.value.fileName}
                                            </div>
                                            <div className={styles["document-info__file-size"]}>
                                                {getSize(item.content.value.fileSize)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles["message-time"]}>{getTime(item.sendTime)}</div>
                        </div>
                    ) : (
                        <div className={styles["message-cu"]}>
                            <div className={styles.document}>
                                <div className={styles.document__body}>
                                    <div className={styles["document__body-img"]}>
                                        <SvgGenerator id="file_dock" />
                                    </div>
                                    <div
                                        className={`${styles["document__body-info"]} ${styles["document-info"]}`}
                                    >
                                        <div className={styles["document-info__file-name"]}>
                                            {item.content.value.fileName}
                                        </div>
                                        <div className={styles["document-info__file-size"]}>
                                            {getSize(item.content.value.fileSize)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles["message-time"]}>{getTime(item.sendTime)}</div>
                        </div>
                    )}
                </>
            );
        default:
            break;
    }
};

export default MessagesConstr;
