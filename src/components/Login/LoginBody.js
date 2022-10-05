import React, { useState } from "react";

import { Link } from "react-router-dom";
import AuthAction from "../../action/AuthAction";

import styles from "./LoginBody.module.css";

const LoginBody = (props) => {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const loginUserHandler = async (e) => {
        e.preventDefault();

        let password, email;

        if (userEmail.trim().length > 0 && userEmail.includes("@")) {
            email = userEmail;
        } else {
            alert("Email is incorrect");
        }

        if (userPassword.length >= 6) {
            password = userPassword;
        } else {
            alert("Password is incorrect");
        }

        await AuthAction.login(email, password, props.userLoged, true);
    };

    return (
        <div className={styles.wrapper}>
            <div className={`${styles["autorization-container"]} ${styles["container"]}`}>
                <div className={styles.body__autorization}>
                    <div className={styles.autorization__title}>
                        <h2>Авторизация</h2>
                    </div>
                    <div
                        className={styles.autorization__google}
                        onClick={() => {
                            AuthAction.loginWithGoogle(props.userLoged);
                        }}
                    >
                        <span className={styles["autorization__google-btn"]}>
                            Войти через Google
                        </span>
                    </div>
                    <div className={styles.autorization__email}>
                        <div className={styles["autorization__email-line"]}></div>
                        <h2>Или через электроную почту</h2>
                        <div className={styles["autorization__email-line"]}></div>
                    </div>
                    <form className={styles.autorization__form} onSubmit={loginUserHandler}>
                        <div className={styles["autorization__form-email"]}>
                            <h2 className={styles.form__subtitle}>Email</h2>
                            <input
                                type="email"
                                autoComplete="username"
                                className={styles["form-email__input"]}
                                required
                                placeholder="cooper@example.com"
                                onChange={(e) => setUserEmail(e.target.value)}
                            />
                        </div>
                        <h2 className={styles["form__subtitle"]}>Пароль</h2>
                        <div className={styles["autorization__form-password"]}>
                            <input
                                type="password"
                                className={styles["form-password__input"]}
                                maxLength="30"
                                minLength="3"
                                required
                                placeholder="········"
                                autoComplete="current-password"
                                onChange={(e) => setUserPassword(e.target.value)}
                            />
                            {/* <span className={styles["password__input-icon"]}></span> */}
                        </div>
                        <div className={styles["autorization__form-remeber"]}>
                            {/* <label>
                                <input type="checkbox" value="yes" required />
                                Запомнить меня
                            </label> */}
                            <Link to="/recovery" className={styles["form__remeber-link"]}>
                                Забыли пароль?
                            </Link>
                        </div>
                        <div className={styles["autorization__form-log"]}>
                            <input tabIndex="4" type="submit" value="Войти" />
                        </div>
                        <Link to="/recovery" className={styles["form__remeber-link-phone"]}>
                            Забыли пароль?
                        </Link>
                        <div className={styles.autorization__footer}>
                            <h2>
                                Ещё нет аккаунта? <Link to="/registration">Зарегистрироваться</Link>
                            </h2>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginBody;
