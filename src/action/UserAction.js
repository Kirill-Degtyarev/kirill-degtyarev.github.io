import { collection, addDoc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../config/configFirebase";

export default class UserAction {
    static async addUserDb(email, displayName, uid, photoUrl) {
        try {
            await addDoc(collection(db, "users"), {
                lastOnline: null,
                online: true,
                userEmail: email,
                userDisplayName: displayName,
                userId: uid,
                userAvatar: photoUrl,
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async getUsers(setUsers) {
        onSnapshot(query(collection(db, "users")), (docs) => {
            let users = [];

            docs.forEach((doc) => {
                users.push(doc.data());
            });

            if (users.length !== 0) {
                users.sort((x, y) => x.userEmail.localeCompare(y.userEmail));
            }

            setUsers(users);
        });
    }

    static async getUserById(userId, setUserCompanion) {
        onSnapshot(query(collection(db, "users"), where("userId", "==", `${userId}`)), (docs) => {
            let user = [];
            docs.forEach((doc) => {
                user.push(doc.data());
            });
            setUserCompanion(user);
        });
    }
    static async getUserByName(userName, setUserCompanion) {
        onSnapshot(
            query(collection(db, "users"), where("userDisplayName", "==", `${userName}`)),
            (docs) => {
                let user = [];
                docs.forEach((doc) => {
                    user.push(doc.data());
                });
                setUserCompanion(user);
            }
        );
    }
}
