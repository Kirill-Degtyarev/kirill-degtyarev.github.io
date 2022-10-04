import React, { useState, useEffect } from "react";

import AuthAction from "./action/AuthAction";

import { Routes, Route, useNavigate } from "react-router-dom";

import AppBody from "./components/AppBody/AppBody";
import Home from "./components/Home/Home";
import Chat from "./components/Chat/Chat";
import Contact from "./components/Contact/Contact";
import Notifications from "./components/Notifications/Notifications";
import Calendar from "./components/Calendar/Calendar";
import Settings from "./components/Settings/Settings";
import LoginBody from "./components/Login/LoginBody";
import Registration from "./components/Login/Registartion/Registration";
import NotFound from "./components/NotFound/NotFound";

// import styles from "./App.module.css";
import "./fonts/fonts.css";

function App() {
    const [userIsLoged, setUserLogeed] = useState(false);
    const path = process.env.REACT_APP_FOR_PATH;
    const navigate = useNavigate();

    useEffect(() => {
        const storedLoginInfo = localStorage.getItem("isLogedIn");

        if (storedLoginInfo === "1") {
            setUserLogeed(true);
        } else {
            navigate("/login");
        }
    }, []);

    const userLoged = () => {
        localStorage.setItem("isLogedIn", "1");
        setUserLogeed(true);
        navigate("/home");
        // AuthAction.setOnline(true);
    };

    const logoutHandler = async () => {
        await AuthAction.logoutUser(false);
        localStorage.removeItem("isLogedIn");
        setUserLogeed(false);
        navigate("/login");
    };

    return (
        <Routes>
            {userIsLoged ? (
                <Route path={path + "/"} element={<AppBody logoutHandler={logoutHandler} />}>
                    <Route index path={path + "home"} element={<Home />} />
                    <Route path={path + "chat/*"} element={<Chat />} />
                    <Route path={path + "contact"} element={<Contact />} />
                    <Route path={path + "notifications"} element={<Notifications />} />
                    <Route path={path + "calendar"} element={<Calendar />} />
                    <Route path={path + "settings"} element={<Settings />} />
                    <Route path={path + "*"} element={<NotFound />} />
                </Route>
            ) : (
                <>
                    <Route path={path + "/login"} element={<LoginBody userLoged={userLoged} />} />
                    <Route
                        path={path + "/registration"}
                        element={<Registration userLoged={userLoged} />}
                    />
                    <Route path={path + "*"} element={<NotFound />} />
                </>
            )}
            {/* {userIsLoged ? (
                <Route path="/" element={<AppBody logoutHandler={logoutHandler} />}>
                    <Route index path="home" element={<Home />} />
                    <Route path="chat/*" element={<Chat />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="notifications" element={<Notifications />} />
                    <Route path="calendar" element={<Calendar />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            ) : (
                <>
                    <Route path="/login" element={<LoginBody userLoged={userLoged} />} />
                    <Route path="/registration" element={<Registration userLoged={userLoged} />} />
                    <Route path="*" element={<NotFound />} />
                </>
            )} */}
        </Routes>
    );
}

export default App;
