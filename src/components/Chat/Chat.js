import React from "react";
// import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
// import { useAuth } from "Hooks/AuthHooks";

// import ChatAction from "action/ChatAction";

import ChatsMenu from "./ChatsMenu/ChatsMenu";
import ChatBody from "./ChatBody/ChatBody";

import styles from "./Chat.module.css";

const Chat = (props) => {
    // const [chatLink, setChatLink] = useState("");
    // const currentUser = useAuth();

    // useEffect(() => {
    //     if (currentUser) {
    //         ChatAction.getChatLinks(currentUser.uid);
    //     }
    // }, [currentUser]);

    return (
        <div className={styles["chat-body"]}>
            <ChatsMenu />
            {/* <ChatsMenu setChatLink={setChatLink} /> */}
            <Routes>
                <Route path=":id" element={<ChatBody />} />
            </Routes>
        </div>
    );
};

export default Chat;
