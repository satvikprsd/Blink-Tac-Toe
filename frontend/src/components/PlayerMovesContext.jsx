import React, { createContext, useContext, useState } from "react";

const PlayerMoveContext = createContext();

export const PlayerMoveProvider = ({ children }) => {
    const [PlayerMoves, setPlayerMoves] = useState({});

    return (
        <PlayerMoveContext.Provider value={{ PlayerMoves, setPlayerMoves }}>
            {children}
        </PlayerMoveContext.Provider>
    );
};

export const usePlayerMoves = () => useContext(PlayerMoveContext);
