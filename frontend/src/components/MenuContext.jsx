import React, { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [Menu, setMenu] = useState("menu");
    const [Mute, setMute] = useState(false);
    return (
        <MenuContext.Provider value={{ Menu, setMenu, Mute, setMute }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => useContext(MenuContext);
