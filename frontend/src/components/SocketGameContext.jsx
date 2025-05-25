import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { socket } from './utils/socket';
import { useCategory } from './CategoryContext';
import { usePlayerMoves } from './PlayerMovesContext';
import { toast } from 'sonner';

const SocketGameContext = createContext();

export const SocketGameProvider = ({ children }) => {
    const { setPlayersCategory } = useCategory();
    const { setPlayerMoves, setPlayer1Moves, setPlayer2Moves,setPlayersReady, Score, setIsWin } = usePlayerMoves();

    const [gameState, setGameState] = useState(
    {
        role: '',
        playerNumber: null,
        isConnected: false,
        roomId: null,
        userId: null,
        board: ["", "", "", "", "", "", "", "", ""],
        turn: 0,
        categories: {},
        playerMoves: {1: '', 2: ''},
        player1Moves: [],
        player2Moves: [],
        playersReady: {1: false, 2: false},
        Score: {1:0, 2:0}
    });

        const updateGameState = useCallback((newState) => {
            setGameState(prev => {return { ...prev, ...newState}});
            
            if (newState.categories) {
                setPlayersCategory(newState.categories);
            }
            
            if (newState.playerMoves) {
                setPlayerMoves(newState.playerMoves);
            }
            
            if (newState.player1Moves) {
                setPlayer1Moves(newState.player1Moves);
            }
            
            if (newState.player2Moves) {
                setPlayer2Moves(newState.player2Moves);
            }
            
            if (newState.playersReady) {
                setPlayersReady(newState.playersReady);
            }

            if(newState.isWin==false){
                setIsWin(false)
            }
        }, [setPlayersCategory, setPlayerMoves, setPlayer1Moves, setPlayer2Moves, setPlayersReady, setIsWin]);

    useEffect(() => {
        socket.on('connect', () => {
            setGameState(prev => ({ ...prev, isConnected: true }));
            toast.success('Connected to server');
        });

        socket.on('disconnect', () => {
            setGameState(prev => ({ ...prev, isConnected: false }));
            toast.error('Disconnected from server. Attempting to reconnect...');
        });

        socket.on('role', ({ role, playerNumber }) => {
            setGameState(prev => ({ ...prev, role, playerNumber }));
            toast.success(`Joined as ${role}${playerNumber ? ` (Player ${playerNumber})` : ''}`);
        });
        
        socket.on('game-state-update', (updatedGameState) => {
            // console.log(updatedGameState)
            updateGameState(updatedGameState);
        });
        
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('connect_error');
            socket.off('role');
            socket.off('game-state-update');
            socket.off('error');
        };
    }, [gameState.roomId, gameState.userId, updateGameState]);

    const joinRoom = useCallback((roomId) => {
        const userId = Math.random().toString(36).substring(7);
        setGameState(prev => ({ ...prev, roomId, userId }));
        socket.emit('join-room', { roomId, userId });
    }, []);

    const makeMove = useCallback((moveData) => {
        // console.log(moveData,'movedata')
        if (!gameState.roomId) return false;

        const updatedBoard = moveData.newBoard;
        
        setGameState(prev => ({...prev,board: updatedBoard}));
        
        return socket.emit('player-move', { roomId: gameState.roomId, moveData });
    }, [gameState.roomId, gameState.board]);

    const selectCategory = useCallback((category) => {
        const updatedCategories = { ...gameState.categories };
        updatedCategories[gameState.playerNumber] = category;
        
        setGameState(prev => ({ ...prev, categories: updatedCategories}));
        
        return socket.emit('category-select', { roomId:gameState.roomId, playerNumber:gameState.playerNumber,category});

    }, [gameState.roomId, gameState.playerNumber, gameState.categories]);

    const selectEmoji = useCallback((emoji) => {
        if (!gameState.roomId || !gameState.playerNumber) return false;
        
        const updatedPlayerMoves = { ...gameState.playerMoves };
        updatedPlayerMoves[gameState.playerNumber] = emoji;
        
        setGameState(prev => ({...prev, playerMoves:updatedPlayerMoves}));
        
        return socket.emit('emoji-select', {roomId: gameState.roomId,playerNumber: gameState.playerNumber,emoji});
    }, [gameState.roomId, gameState.playerNumber, gameState.playerMoves]);

    const onWin = useCallback((()=>{
        return socket.emit('on-win', {roomId: gameState.roomId});
    }))

    const resetGame = useCallback((fullReset) => {
        if (!gameState.roomId) return false;
        
        return socket.emit('game-reset', {roomId: gameState.roomId, playerNumber: gameState.playerNumber, Score, fullReset});
    }, [gameState.roomId]);
    
    return (
        <SocketGameContext.Provider value={{ socket,gameState,joinRoom,makeMove,selectCategory,selectEmoji, onWin,resetGame,isConnected: gameState.isConnected,}}>
            {children}
        </SocketGameContext.Provider>
    );
};

export const useSocketGame = () => useContext(SocketGameContext);

export default SocketGameProvider;

