import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthAction from '../../../action/AuthAction';

import SvgGenerator from '../../../svgGenerator/SvgGenerator';

import styles from './Recovery.module.scss';
const Recovery = (props) => {
  const [email, setEmail] = useState('');
  return (
    <section className={styles['page-recovery']}>
      <div className={styles.body__recovery}>
        <div className={styles.recovery__img}>
          <SvgGenerator id="lock" />
        </div>
        <form className={styles.recovery__form}>
          <h2 className={styles.recovery__title}>Восстановление пароля</h2>
          <h2 className={styles.form__subtitle}>Email</h2>
          <div className={styles['recovery__form-email']}>
            <input
              type="email"
              className={styles['form-email__input']}
              required
              aria-required="true"
              placeholder="cooper@example.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className={styles['recovery__form-log']}>
            <input
              type="button"
              value="Восстановить пароль"
              onClick={() => {
                AuthAction.resetPassword(email);
              }}
            />
          </div>
        </form>
        <div className={styles.recovery__footer}>
          <h2>
            Обратно к<Link to="/login">Авторизации</Link>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Recovery;
