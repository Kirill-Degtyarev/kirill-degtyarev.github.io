import React, { useState, useEffect } from "react";
import UserAction from "../../action/UserAction";
import { useAuth } from "../../Hooks/AuthHooks";

import SvgGenerator from "../../svgGenerator/SvgGenerator";
import UserContact from "./UserContact/UserContact";
import Loader from "../Loader/Loader";

import styles from "./Contact.module.css";

const Contact = (props) => {
    const currentUser = useAuth();
    const [users, setUsers] = useState();

    useEffect(() => {
        UserAction.getUsers(setUsers);
    }, []);

    const searchContact = (e) => {
        const request = e.target.value.toLowerCase().trim();
        const newContact = users.filter((i) => i.userDisplayName.toLowerCase().includes(request));
        setUsers(newContact);
        if (request === "") {
            UserAction.getUsers(setUsers);
        }
    };

    return (
        <div className={styles.contact}>
            <div className={users ? styles["contact-body"] : styles["contact-body__loader"]}>
                {users ? (
                    <>
                        <div className={styles["contact-search"]}>
                            <div className={styles["contact-search__body"]}>
                                <div className={styles["search-body__icon"]}>
                                    <SvgGenerator id="search" />
                                </div>
                                <div className={styles["search-body__input"]}>
                                    <input
                                        type="text"
                                        name="contact-input"
                                        placeholder="Search"
                                        id="contact-input"
                                        onInput={searchContact}
                                    />
                                </div>
                            </div>
                        </div>
                        {users.length !== 0 ? (
                            <div className={styles["user-list"]}>
                                <UserContact currentUser={currentUser} users={users} />
                            </div>
                        ) : (
                            <h1 className={styles["none-user"]}>Users do not exist yet.</h1>
                        )}
                    </>
                ) : (
                    <Loader />
                )}
            </div>
        </div>
    );
};
export default Contact;
