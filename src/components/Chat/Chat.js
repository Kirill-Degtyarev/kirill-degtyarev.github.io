import React from "react";
import { Route, Routes } from "react-router-dom";
import ChatsMenu from "./ChatsMenu/ChatsMenu";
import { ChatBody } from "./ChatBody/ChatBody";

import styles from "./Chat.module.css";

const Chat = (props) => {
    // const path = process.env.REACT_APP_FOR_PATH;

    return (
        <div className={styles["chat-body"]}>
            <ChatsMenu />
            <Routes>
                {/* <Route path={path + ":id"} element={<ChatBody />} /> */}
                <Route path=":id" element={<ChatBody />} />
            </Routes>
        </div>
    );
};

export default Chat;
