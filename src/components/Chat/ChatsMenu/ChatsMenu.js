import React, { useState, useEffect } from "react";
import { useAuth } from "../../../Hooks/AuthHooks";
// import UserAction from "../../../action/UserAction";

import SvgGenerator from "../../../svgGenerator/SvgGenerator";
import ChatlistChat from "../Chatlist/ChatlistChat";
import ChatAction from "../../../action/ChatAction";
import Loader from "../../Loader/Loader";

import styles from "./ChatsMenu.module.css";

const ChatsMenu = (props) => {
    const [chats, setChats] = useState();
    const currentUser = useAuth();

    useEffect(() => {
        if (currentUser) {
            ChatAction.getChats(setChats, currentUser.uid);
        }
    }, [currentUser]);

    if (chats) {
        chats.sort(function(a, b) {
            return new Date(b.lastMessages.sendLastTime) - new Date(a.lastMessages.sendLastTime);
        });
    }

    return (
        <div className={styles.chats__container}>
            <div className={styles.chats__wr}>
                {/* <div className={styles["chats-header"]}>
                    <div className={styles["chats-header__info"]}>
                        <h2 className={styles["header-info__title"]}>Chats</h2>
                        <div className={styles["header-info__select"]}>
                            <h2 className={styles["select-title"]}>Recent Chats</h2>
                            <div className={styles["select-img"]}>
                                <SvgGenerator id="arrow-down" stroke="#707C97" />
                            </div>
                        </div>
                    </div>
                    <div className={styles["chats-header__button"]}>
                        <h2 className={styles["chats-header__button-title"]}>Create New Chat</h2>
                    </div>
                </div> */}
                <div className={styles["chats-search"]}>
                    <div className={styles["chats-search__body"]}>
                        <div className={styles["search-body__icon"]}>
                            <SvgGenerator id="search" />
                        </div>
                        <div className={styles["search-body__input"]}>
                            <input
                                type="text"
                                name="serach-input"
                                placeholder="Search"
                                id="serach-input"
                            />
                        </div>
                        <div className={styles["search-body__select"]}>
                            <div className={styles["search-select__title"]}>Messages</div>
                            <div className={styles["search-select__icon"]}>
                                <SvgGenerator id="arrow-down" stroke="#707c97" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={!chats ? styles["chatlist-loader"] : styles["chatlist"]}>
                    {chats ? (
                        chats.length !== 0 ? (
                            chats.map((item) => (
                                <ChatlistChat
                                    key={item.key}
                                    chatsInfo={item}
                                    setChatId={props.setChatId}
                                />
                            ))
                        ) : (
                            <div className={styles["chatlist-none"]}>No chats</div>
                        )
                    ) : (
                        <Loader />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatsMenu;
