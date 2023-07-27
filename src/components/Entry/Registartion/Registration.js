import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import AuthAction from '../../../action/AuthAction';

import styles from './Registration.module.scss';

const Registration = (props) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');

  const createUserHandler = async (e) => {
    e.preventDefault();
    let password, email;

    if (userEmail.trim().length > 0 && userEmail.includes('@')) {
      email = userEmail;
    } else {
      alert('Email incorrect');
    }

    if (
      userPassword.length >= 6 &&
      userConfirmPassword.length >= 6 &&
      userPassword === userConfirmPassword
    ) {
      password = userPassword;
    } else {
      alert('Password is incorrect or does not match');
    }

    await AuthAction.registeration(email, password, props.userLoged, userName);
    setUserName('');
    setUserEmail('');
    setUserPassword('');
    setUserConfirmPassword('');
  };

  return (
    <section className={styles['page-registration']}>
      <div className={styles.body__registration}>
        <div className={styles.registration__title}>
          <h2>Региcтрация</h2>
        </div>
        <div
          className={styles.registration__google}
          onClick={() => {
            AuthAction.loginWithGoogle(props.userLoged);
          }}
        >
          <span className={styles['registration__google-btn']}>
            Войти через Google
          </span>
        </div>
        <div className={styles.registration__email}>
          <div className={styles['registration__email-line']}></div>
          <h2>Или через электроную почту</h2>
          <div className={styles['registration__email-line']}></div>
        </div>
        <form
          className={styles.registration__form}
          onSubmit={createUserHandler}
        >
          <div className={styles['registration__form-fio']}>
            <h2 className={styles.form__subtitle}>ФИО</h2>
            <input
              type="text"
              className={styles['form-fio__input']}
              placeholder="Regina Cooper"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className={styles['registration__form-email']}>
            <h2 className={styles.form__subtitle}>Email</h2>
            <input
              type="text"
              className={styles['form-email__input']}
              placeholder="cooper@example.com"
              required
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <h2 className={styles.form__subtitle}>Пароль</h2>
          <div className={styles['registration__form-password']}>
            <input
              type="password"
              className={styles['form-password__input']}
              required
              placeholder="········"
              autoComplete="off"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>
          <h2 className={styles.form__subtitle}>Подтверждение пароля</h2>
          <div className={styles['registration__form-password-confirm']}>
            <input
              type="password"
              className={styles['form-password__input-confirm']}
              required
              placeholder="········"
              autoComplete="off"
              value={userConfirmPassword}
              onChange={(e) => setUserConfirmPassword(e.target.value)}
            />
          </div>
          {/* <div className={styles["registration__form-remeber"]}>
                            <label>
                                <input type="checkbox" required value="yes" />
                                Принимаю условия
                            </label>
                            <div className={styles["form__remeber-link"]}>
                                Политики <h2>конфиденциальности</h2>
                            </div>
                        </div> */}
          <div className={styles['registration__form-log']}>
            <input type="submit" value="Зарегистрироваться" />
          </div>
        </form>
        <div className={styles.registration__footer}>
          <h2>
            Уже есть аккаунт?<Link to="/login">Войти</Link>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Registration;
