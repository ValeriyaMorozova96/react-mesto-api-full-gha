import React from "react";
import avatar from "../images/profile-image.png";
export const CurrentUserContext = React.createContext();
export const currentUserInfo = {
    name: 'Жак-Ив Кусто',
    about: 'Исследователь океана',
    avatar: avatar
};