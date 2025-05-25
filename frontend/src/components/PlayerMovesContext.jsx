import React, { createContext, useContext, useState } from "react";

const PlayerMoveContext = createContext();

export const PlayerMoveProvider = ({ children }) => {
    const [PlayerMoves, setPlayerMoves] = useState({});
    const [Player1Moves, setPlayer1Moves] = useState([]);
    const [Player2Moves, setPlayer2Moves] = useState([]);
    const [PlayersReady, setPlayersReady] = useState({1:false, 2: false});
    const [isWin, setIsWin] = useState(false);
    const [Score, setScore] = useState({1:0, 2:0});
    const [isLucky, setIsLucky] = useState(false);

    return (
        <PlayerMoveContext.Provider value={{ PlayerMoves, setPlayerMoves, Player1Moves, setPlayer1Moves, Player2Moves, setPlayer2Moves, PlayersReady, setPlayersReady, Score, setScore, isWin, setIsWin, isLucky, setIsLucky }}>
            {children}
        </PlayerMoveContext.Provider>
    );
};

export const usePlayerMoves = () => useContext(PlayerMoveContext);
