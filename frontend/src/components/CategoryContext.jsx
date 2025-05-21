import React, { createContext, useContext, useState } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [playersCategory, setPlayersCategory] = useState({});

    return (
        <CategoryContext.Provider value={{ playersCategory, setPlayersCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategory = () => useContext(CategoryContext);
