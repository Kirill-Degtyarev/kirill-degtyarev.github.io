import { useState, useEffect } from "react";
import { auth } from "../config/configFirebase";
import { onAuthStateChanged } from "firebase/auth";

export function useAuth() {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        try {
            const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
            return unsub;
        } catch (error) {
            console.log(error);
        }
    }, []);

    return currentUser;
}
