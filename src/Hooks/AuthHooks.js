import { useState, useEffect } from "react";
import { auth } from "../config/configFirebase";
import { onAuthStateChanged } from "firebase/auth";

export function useAuth() {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
        return unsub;
    }, []);

    return currentUser;
}
