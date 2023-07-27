import React, { useState, useEffect } from 'react';
import UserAction from '../../action/UserAction';
import { useAuth } from '../../Hooks/AuthHooks';

import SvgGenerator from '../../svgGenerator/SvgGenerator';
import UserContact from './UserContact/UserContact';
import Loader from '../Loader/Loader';

import styles from './Contact.module.scss';

const Contact = (props) => {
  const currentUser = useAuth();
  const [users, setUsers] = useState();
  const [request, setRequest] = useState('');

  useEffect(() => {
    UserAction.getUsers(setUsers);
  }, []);

  return (
    <div className={styles.contact}>
      <div
        className={
          users ? styles['contact-body'] : styles['contact-body__loader']
        }
      >
        {users ? (
          <>
            <div className={styles['contact-search']}>
              <div className={styles['contact-search__body']}>
                <div className={styles['search-body__icon']}>
                  <SvgGenerator id="search" />
                </div>
                <div className={styles['search-body__input']}>
                  <input
                    value={request}
                    type="text"
                    name="contact-input"
                    placeholder="Search"
                    id="contact-input"
                    onInput={(e) => {
                      setRequest(e.target.value.toLowerCase().trim());
                    }}
                  />
                </div>
              </div>
            </div>
            {users.length !== 0 ? (
              <div className={styles['user-list']}>
                <UserContact
                  currentUser={currentUser}
                  users={users}
                  request={request}
                />
              </div>
            ) : (
              <h1 className={styles['none-user']}>Users do not exist yet.</h1>
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
