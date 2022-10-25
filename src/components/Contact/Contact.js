import React, { useState, useEffect } from "react";
import UserAction from "action/UserAction";
import { useAuth } from "Hooks/AuthHooks";

import UserContact from "./UserContact/UserContact";
import Loader from "../Loader/Loader";

import styles from "./Contact.module.css";

const Contact = (props) => {
    const currentUser = useAuth();
    const [users, setUsers] = useState();

    useEffect(() => {
        UserAction.getUsers(setUsers);
    }, []);

    return (
        <div className={styles.contact}>
            <div className={users ? styles["contact-body"] : styles["contact-body__loader"]}>
                {users ? (
                    users.length !== 0 ? (
                        <div className={styles["user-list"]}>
                            <UserContact currentUser={currentUser} users={users} />
                        </div>
                    ) : (
                        <h1 className={styles["none-user"]}>Users do not exist yet.</h1>
                    )
                ) : (
                    <Loader />
                )}
            </div>
        </div>
    );
};
export default Contact;
