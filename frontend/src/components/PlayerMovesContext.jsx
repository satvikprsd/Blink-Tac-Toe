import React, { createContext, useContext, useState } from "react";

const PlayerMoveContext = createContext();

export const PlayerMoveProvider = ({ children }) => {
    const [PlayerMoves, setPlayerMoves] = useState({});
    const [Player1Moves, setPlayer1Moves] = useState([]);
    const [Player2Moves, setPlayer2Moves] = useState([]);
    const [PlayersReady, setPlayersReady] = useState({1:false, 2: false});

    return (
        <PlayerMoveContext.Provider value={{ PlayerMoves, setPlayerMoves, Player1Moves, setPlayer1Moves, Player2Moves, setPlayer2Moves, PlayersReady, setPlayersReady }}>
            {children}
        </PlayerMoveContext.Provider>
    );
};

export const usePlayerMoves = () => useContext(PlayerMoveContext);
