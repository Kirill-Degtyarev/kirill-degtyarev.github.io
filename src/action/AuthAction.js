import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    updateProfile,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";

import { doc, getDocs, where, query, collection, updateDoc } from "firebase/firestore";
import { auth, db } from "config/configFirebase";
import UserAction from "./UserAction";

export default class AuthAction {
    static async registeration(userEmail, password, userLoged, displayName) {
        try {
            const userReg = await createUserWithEmailAndPassword(auth, userEmail, password);
            await updateProfile(userReg.user, {
                displayName: displayName,
            });
            UserAction.addUserDb(userEmail, displayName, userReg.user.uid, null);
            userLoged();
        } catch (error) {
            console.log(error);
        }
    }

    static async login(userEmail, password) {
        try {
            await signInWithEmailAndPassword(auth, userEmail, password);
        } catch (error) {
            console.log(error);
        }
    }

    static async loginWithGoogle(userLoged) {
        const provider = new GoogleAuthProvider();

        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            signInWithRedirect(auth, provider);
        } else {
            alert("pc");
            signInWithPopup(auth, provider)
                .then(async (result) => {
                    const user = result.user;
                    this.updateDbUser(user, userLoged);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    alert(errorCode);
                });
        }
    }

    static async updateDbUser(user, userLoged) {
        const userDocs = await getDocs(
            query(collection(db, "users"), where("userId", "==", user.uid))
        );
        if (userDocs.docs.length === 0) {
            UserAction.addUserDb(user.email, user.displayName, user.uid, user.photoURL);
            userLoged();
        } else {
            updateDoc(doc(collection(db, "users"), userDocs.docs[0].id), {
                online: true,
                lastOnline: null,
            });
            userLoged();
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
                signOut(auth)
                    .then(() => {})
                    .catch((error) => {});
            }
        } catch (error) {
            console.log(error);
        }
    }

    static async resetPassword(email) {
        await sendPasswordResetEmail(auth, email);
    }
}
