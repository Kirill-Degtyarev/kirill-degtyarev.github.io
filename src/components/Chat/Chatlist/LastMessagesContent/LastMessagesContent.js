import React from "react";

import FilesConstr from "../../../../FilesConstr/FilesConstr";
import SvgGenerator from "../../../../svgGenerator/SvgGenerator";
import styles from "./LastMessagesContent.module.css";

const LastMessagesContent = ({
    lastMessage,
    lastMessagesLength,
    senderMessage,
    currentUserUid,
}) => {
    switch (lastMessage[0].type) {
        case "text":
            return (
                <div className={styles["chatlist-chat__messages"]}>
                    <div className={styles.message}>
                        <div className={styles["chat-messages"]}>
                            {lastMessage[0].type === "text" ? (
                                lastMessage[0].value
                            ) : (
                                <div className={styles["chat-messages__voice"]}>
                                    <div className={styles["messages-voice_img"]}>
                                        <SvgGenerator id="recording-voice" />
                                    </div>
                                </div>
                            )}
                        </div>
                        {senderMessage !== currentUserUid && (
                            <div className={styles["messages-count"]}>
                                <span>{lastMessagesLength}</span>
                            </div>
                        )}
                    </div>
                </div>
            );
        case "document":
            return <div>doc</div>;
        case "image":
            return <div>img</div>;
        default:
            break;
    }
};

export default LastMessagesContent;
