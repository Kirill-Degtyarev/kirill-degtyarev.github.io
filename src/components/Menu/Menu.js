import React, { useState } from "react";
import { useAuth } from "../../Hooks/AuthHooks";

import "./menu.css";

import SvgGenerator from "../../svgGenerator/SvgGenerator";
import MenuItem from "./MenuItem";
import AvatarAction from "../../action/AvatarAction";

const MENU_ITEM = [
    {
        id: "item_1",
        title: "home",
        path: "/home",
        img_id: "home",
        img_class: "img-home",
    },
    {
        id: "item_2",
        title: "chat",
        path: "/chat",
        img_id: "chat",
        img_class: "img-chat",
    },
    {
        id: "item_3",
        title: "contact",
        path: "/contact",
        img_id: "contact",
        img_class: "img-contact",
    },
    {
        id: "item_4",
        title: "notifications",
        path: "/notifications",
        img_id: "notifications",
        img_class: "img-notifications",
    },
    {
        id: "item_5",
        title: "calendar",
        path: "/calendar",
        img_id: "calendar",
        img_class: "img-calendar",
    },
    {
        id: "item_6",
        title: "settings",
        path: "/settings",
        img_id: "settings",
        img_class: "img-settings",
    },
];

const Menu = (props) => {
    const [changeAvatar, setChangeAvatar] = useState(false);
    const [newAvatarUrl, setNewAvatarUrl] = useState(null);
    const [newAvatar, setNewAvatar] = useState(null);
    const currentUser = useAuth();

    const uploadNewAvatar = (e) => {
        const fileImg = e.target.files;
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setNewAvatarUrl(fileReader.result);
        };
        fileReader.readAsDataURL(fileImg[0]);
        setNewAvatar(fileImg[0]);
    };

    const saveNewAvatar = async (e) => {
        if (newAvatar) {
            await AvatarAction.uploadProfileImage(newAvatar, currentUser);
            setNewAvatar(null);
        }
    };

    const cancelNewAvatar = () => {
        setNewAvatarUrl(null);
        setNewAvatar(null);
    };

    const menuList = MENU_ITEM.map((item) => (
        <MenuItem
            id={item.id}
            key={item.id}
            text={item.title}
            path={item.path}
            img_id={item.img_id}
            img_class={item.img_class}
        />
    ));

    return (
        <div className="menu">
            <div className="menu-body">
                <div className="menu-body__profile profile">
                    {currentUser ? (
                        <>
                            <div className="profile-avatar">
                                {newAvatarUrl ? (
                                    <img src={newAvatarUrl} alt="avatar" />
                                ) : currentUser.photoURL ? (
                                    <img src={currentUser.photoURL} alt="avatar" />
                                ) : (
                                    <div className="text-avatar">
                                        {AvatarAction.getAvatarByUserName(currentUser.displayName)}
                                    </div>
                                )}
                            </div>
                            <div className="profile-info">
                                <div
                                    className="profile-info__body"
                                    onClick={() => {
                                        setChangeAvatar(!changeAvatar);
                                    }}
                                >
                                    <div className="profile-info__username">
                                        {currentUser.displayName}
                                    </div>
                                    <div className="profile-info__svg">
                                        <SvgGenerator
                                            id="arrow-down"
                                            class={changeAvatar ? "active-item" : ""}
                                            stroke="#0D1C2E"
                                        />
                                    </div>
                                </div>
                                {changeAvatar ? (
                                    <div className="profile-info__action action">
                                        <div className="action-avatar">
                                            <input
                                                id="change-avatar"
                                                type="file"
                                                accept="image/*"
                                                style={{ display: "none" }}
                                                onChange={uploadNewAvatar}
                                            />
                                            <label htmlFor="change-avatar">
                                                Change Avatar <SvgGenerator id="camera_light" />
                                            </label>
                                        </div>

                                        {newAvatar ? (
                                            <div className="action-btn">
                                                <input
                                                    type="button"
                                                    onClick={saveNewAvatar}
                                                    value="Save"
                                                    className="action-btn__save"
                                                />
                                                <input
                                                    type="button"
                                                    onClick={cancelNewAvatar}
                                                    value="Cancel"
                                                    className="action-btn__cancel"
                                                />
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </>
                    ) : (
                        ""
                    )}
                </div>
                <ul className="menu-body__list">{menuList}</ul>
            </div>
            <div className="menu-footer">
                <div className="menu-footer__btn footer-btn" onClick={() => props.logoutHandler()}>
                    <div className="footer-btn__icon">
                        <SvgGenerator id="logout" />
                    </div>
                    <div className="footer-btn__text">logout</div>
                </div>
            </div>
        </div>
    );
};

export default Menu;
