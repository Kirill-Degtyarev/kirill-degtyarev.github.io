import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";

import { doc, getDocs, where, query, collection, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/configFirebase";
import UserAction from "./UserAction";

export default class AuthAction {
    static async registeration(userEmail, password, userLoged, displayName) {
        try {
            const userReg = await createUserWithEmailAndPassword(auth, userEmail, password);
            await updateProfile(userReg.user, {
                displayName: displayName,
            });
            UserAction.addUserDb(userEmail, displayName, userReg.user.uid, null);
            localStorage.setItem("isLogedIn", "1");
            userLoged();
        } catch (error) {
            console.log(error);
        }
    }

    static async login(userEmail, password, userLoged, online) {
        try {
            await signInWithEmailAndPassword(auth, userEmail, password);
            const userDocs = await getDocs(
                query(collection(db, "users"), where("userId", "==", auth.currentUser.uid))
            );
            updateDoc(doc(collection(db, "users"), userDocs.docs[0].id), {
                online,
                lastOnline: null,
            });
            userLoged();
        } catch (error) {
            console.log(error);
        }
    }

    static async logoutUser(online) {
        try {
            const lastOnlineDate = new Date().toISOString();
            const user = [];
            await auth.onAuthStateChanged((data) => {
                user.push(data);
            });

            if (user.length !== 0) {
                const userDocs = await getDocs(
                    query(collection(db, "users"), where("userId", "==", user[0].uid))
                );

                updateDoc(doc(collection(db, "users"), userDocs.docs[0].id), {
                    online,
                    lastOnline: lastOnlineDate,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    static async setLastOnline() {}
}
