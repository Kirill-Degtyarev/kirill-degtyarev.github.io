import { updateProfile } from "firebase/auth";
import { doc, getDocs, query, where, collection, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { db } from "../config/configFirebase";

export default class AvatarAction {
    static getAvatarByUserName(userName) {
        if (userName) {
            let nameArr = userName.split("");
            let nameArr2 = nameArr.slice(nameArr.indexOf(" ") + 1);
            nameArr = nameArr.slice(0, nameArr.indexOf(" "));
            let userNameReplace = nameArr[0] + nameArr2[0];
            return userNameReplace;
        }
    }

    static async updateUserAvatarDb(newPhoto, user) {
        const users = await getDocs(
            query(collection(db, "users"), where("userId", "==", user.uid))
        );
        updateDoc(doc(collection(db, "users"), users.docs[0].id), {
            userAvatar: newPhoto,
        });
    }

    static async uploadProfileImage(file, user) {
        const storage = getStorage();
        const fileRef = ref(storage, `users/avatar/${user.displayName}/` + user.uid);

        if (file) {
            await uploadBytes(fileRef, file, { contentType: file.type });
            const photoURL = await getDownloadURL(fileRef);

            const users = await getDocs(
                query(collection(db, "users"), where("userId", "==", user.uid))
            );

            updateDoc(doc(collection(db, "users"), users.docs[0].id), {
                userAvatar: photoURL,
            });

            updateProfile(user, {
                photoURL,
            });
        }
    }

    // static async saveProfileImg(user) {
    //     const storage = getStorage();
    //     const fileRef = ref(storage, `users/avatar/${user.displayName}/` + user.uid);

    //     const photoURL = await getDownloadURL(fileRef);

    //     const users = await getDocs(
    //         query(collection(db, "users"), where("userId", "==", user.uid))
    //     );

    //     updateDoc(doc(collection(db, "users"), users.docs[0].id), {
    //         userAvatar: photoURL,
    //     });

    //     updateProfile(user, {
    //         photoURL,
    //     });
    // }
}
