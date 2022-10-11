import {
    setDoc,
    doc,
    collection,
    onSnapshot,
    query,
    updateDoc,
    getDocs,
    arrayUnion,
} from "firebase/firestore";
import { db } from "../config/configFirebase";

export default class ChatAction {
    static async createChat(user1, user2) {
        try {
            const chatsData = await getDocs(collection(db, "chat"));
            const chats = [];

            chatsData.forEach((doc) => {
                chats.push(doc.data());
            });

            const chatIsCreated = (element) => {
                return (
                    (element.userID_1 === user1.uid && element.userID_2 === user2.userId) ||
                    (element.userID_1 === user2.userId && element.userID_2 === user1.uid)
                );
            };

            if (!chats.some(chatIsCreated)) {
                const date = new Date(3600 * 24 * 1000).toISOString();
                (async () => {
                    await setDoc(doc(db, "chat", `${user1.displayName}+${user2.userDisplayName}`), {
                        userID_1: user1.uid,
                        userID_2: user2.userId,
                        key: user1.displayName + "+" + user2.userDisplayName,
                        lastMessages: {
                            content: null,
                            sendLastTime: date,
                        },
                        messages: [],
                    });
                })();
                alert("chat created");
            } else {
                alert("this chat already exists");
            }
        } catch (error) {
            console.log(error);
        }
    }

    static async getChats(setChats, currentUserUID) {
        onSnapshot(query(collection(db, "chat")), (docs) => {
            const chats = [];
            docs.forEach((doc) => {
                if (
                    doc.data().userID_1 === currentUserUID ||
                    doc.data().userID_2 === currentUserUID
                ) {
                    chats.push(doc.data());
                }
            });
            setChats(chats);
        });
    }

    static async getChat(currentUserName, userCompanionName, setChat) {
        onSnapshot(doc(db, "chat", currentUserName + "+" + userCompanionName), (doc) => {
            if (doc.data() !== undefined) {
                setChat(doc.data());
            } else {
                getAnotherChat();
            }
        });

        const getAnotherChat = () => {
            onSnapshot(doc(db, "chat", userCompanionName + "+" + currentUserName), (doc) => {
                setChat(doc.data());
            });
        };
    }

    static async sendMessage(message, setMessageValue, chatID, senderMessageUid) {
        const date = new Date().toISOString();
        const messages = message;
        setMessageValue("");
        await updateDoc(doc(collection(db, "chat"), chatID), {
            messages: arrayUnion({
                key: Math.random(),
                messageText: messages,
                senderMessage: senderMessageUid,
                sendTime: date,
            }),
        });

        await updateDoc(doc(collection(db, "chat"), chatID), {
            lastMessages: {
                content: messages,
                sendLastTime: date,
            },
        });
    }
}
