import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    getAuth,
    sendPasswordResetEmail,
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

    static async loginWithGoogle(userLoged) {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                // eslint-disable-next-line
                const token = credential.accessToken;
                const user = result.user;
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
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(errorCode);
                console.log(errorMessage);
                console.log(email);
                console.log(credential);
            });
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

    static async resetPassword(email) {
        await sendPasswordResetEmail(auth, email);
    }
}
