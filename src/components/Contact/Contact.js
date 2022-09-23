import React, { useState, useEffect } from "react";
import UserAction from "../../action/UserAction";
import { useAuth } from "../../Hooks/AuthHooks";

import UserContact from "./UserContact/UserContact";
import Loader from "../Loader/Loader";

import styles from "./Contact.module.css";

const Contact = (props) => {
    const currentUser = useAuth();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        UserAction.getUsers(setUsers);
    }, []);

    return (
        <div className={users.length > 0 ? styles["contact-body"] : styles["contact-body__loader"]}>
            {users.length > 0 ? (
                users.map((item) => {
                    return currentUser.uid !== item.userId ? (
                        <UserContact currentUser={currentUser} key={item.userId} user={item} />
                    ) : (
                        ""
                    );
                })
            ) : (
                <Loader />
            )}
        </div>
    );
};
export default Contact;
