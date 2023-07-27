import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import AuthAction from './action/AuthAction';
import { useAuth } from './Hooks/AuthHooks';
import AppBody from './components/AppBody/AppBody';
import Home from './components/Home/Home';
import Chat from './components/Chat/Chat';
import Contact from './components/Contact/Contact';
import Notifications from './components/Notifications/Notifications';
import Calendar from './components/Calendar/Calendar';
import Settings from './components/Settings/Settings';
import Login from './components/Entry/Login/Login';
import Registration from './components/Entry/Registartion/Registration';
import Recovery from './components/Entry/Recovery/Recovery';
import NotFound from './components/NotFound/NotFound';

import styles from './App.module.scss';

function App() {
  const [userIsLoged, setUserLogeed] = useState(false);

  const navigate = useNavigate();
  const currentUser = useAuth();

  useEffect(() => {
    if (currentUser && !userIsLoged) {
      AuthAction.updateDbUser(currentUser, userLoged);
    }
  }, [currentUser]);

  useEffect(() => {
    const storedLoginInfo = localStorage.getItem('isLogedIn');
    if (storedLoginInfo === '1') {
      setUserLogeed(true);
    } else {
      navigate('/login');
    }
  }, []);

  const userLoged = () => {
    localStorage.setItem('isLogedIn', '1');
    setUserLogeed(true);
    navigate('/');
  };

  const logoutHandler = async () => {
    await AuthAction.logoutUser(false);
    localStorage.removeItem('isLogedIn');
    setUserLogeed(false);
    navigate('/login');
  };

  return (
    <div
      className={
        userIsLoged ? styles.notice__container : styles.entry__container
      }
    >
      <Routes>
        {userIsLoged ? (
          <Route path="/" element={<AppBody logoutHandler={logoutHandler} />}>
            <Route index element={<Home />} />
            <Route path="chat/*" element={<Chat />} />
            <Route path="contact" element={<Contact />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        ) : (
          <>
            <Route path="/login" element={<Login userLoged={userLoged} />} />
            <Route
              path="/registration"
              element={<Registration userLoged={userLoged} />}
            />
            <Route path="/recovery" element={<Recovery />} />
            <Route path="/*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
