import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSocketGame } from './SocketGameContext';
import { useCategory } from './CategoryContext';
import { usePlayerMoves } from './PlayerMovesContext';
import { emojiCategories, winCombinations } from './utils/gameConstants';
import { toast } from 'sonner';
import WiningAnimation from './WiningAnimation';
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence } from 'framer-motion';
import { moveSound } from './utils/sounds';
import TopBar from './TopBar';
import OnlinePlayer1 from './OnlinePlayer1';
import OnlinePlayer2 from './OnlinePlayer2';
import { Button } from './ui/button';

const GameLobby = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { gameState, joinRoom, makeMove, selectEmoji, resetGame, socket } = useSocketGame();
  const [MainBoard, setMainBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [turn, setTurn] = useState(0);
  const { playersCategory, setPlayersCategory } = useCategory();
  const [isWin, setIsWin] = useState(false);
  const [WinningMoves, setWinningMoves] = useState('');
  const [playersPresence, setPlayersPresence] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { PlayerMoves, setPlayerMoves, Player1Moves, setPlayer1Moves,Player2Moves,setPlayer2Moves, setPlayersReady } = usePlayerMoves();

  useEffect(() => {
    if (roomId) {
      joinRoom(roomId);
      setIsLoading(true);
      toast.info(`Joining room: ${roomId}`);
    } else {
      const newRoomId = Math.random().toString(36).substring(2, 8);
      navigate(`/game/${newRoomId}`);
    }
  }, [roomId]);

  useEffect(() => {
    const handlePlayersUpdate = (players) => {
      setPlayersPresence(players);
      setIsLoading(false);
    };

    socket.on('players-update', handlePlayersUpdate);
    
    return () => {
      socket.off('players-update', handlePlayersUpdate);
    };
  }, [socket]);

  useEffect(() => {
    const handleGameStateUpdate = (updatedGameState) => {
      console.log(updatedGameState,'updated')
      setMainBoard(updatedGameState.board);
      setTurn(updatedGameState.turn);
      
      if (updatedGameState.categories) {
        setPlayersCategory(updatedGameState.categories);
      }
      
      if (updatedGameState.playersReady) {
        setPlayersReady(updatedGameState.playersReady);
      }
      
      if (updatedGameState.playerMoves) {
        setPlayerMoves(updatedGameState.playerMoves);
      }

      if (updatedGameState.player1Moves) {
        setPlayer1Moves(updatedGameState.player1Moves);
      }
      
      if (updatedGameState.player2Moves) {
        setPlayer2Moves(updatedGameState.player2Moves);
      }
      setIsLoading(false);
    };
    handleGameStateUpdate(gameState);
  }, [gameState]);


  useEffect(()=>{
    if (gameState.playerNumber == turn){
      const playermove = playersCategory[turn] ? emojiCategories[playersCategory[turn]][Math.floor(Math.random()*4)] : PlayerMoves[turn]
      selectEmoji(playermove);
    }
  },[turn])


  useEffect(() => {
    let newmoves = turn == 1 ? Player1Moves : Player2Moves
    const moveIndexes = newmoves.map((moves)=>moves[1]).sort((a,b)=>a-b).join(',');
    const isWin = winCombinations.includes(moveIndexes)
    if (isWin) setWinningMoves(moveIndexes);
    if (isWin) setIsWin(isWin);

  }, [Player1Moves, Player2Moves]);

  const MoveHandler = (cellClicked) => {
    if (gameState.role !== 'player' || turn !== gameState.playerNumber || !PlayerMoves[turn] || !!MainBoard[cellClicked]) {
      if (!turn) {
        toast.error('Please Select the Categories');
      } else if (!!MainBoard[cellClicked]) {
        toast.error("Oops! There's already a piece there.");
      }else if (gameState.role !== 'player') {
        toast.error("You are a spectator");
      } else if (turn !== gameState.playerNumber) {
        toast.error("Not your turn");
      }
      return;
    }

    moveSound.play();
    const move = PlayerMoves[turn];
    let newMoves = turn === 1 ? [...Player1Moves] : [...Player2Moves];
    let newBoard = [...MainBoard]
    newBoard[cellClicked] = move
    if (newMoves.length === 3) {
      const oldIndex = newMoves.shift()[1];
      newBoard[oldIndex] = '';
    }
    newMoves.push([move, cellClicked]);
    
    makeMove({
      turn: 3 - turn,
      move,
      newBoard,
      playerNumber: turn,
      playerMoves: newMoves
    });
  };

  const Restart = (catCheck) => {
    setIsWin(false);
    setWinningMoves('');
    resetGame(catCheck);
  };

  const copyRoomLink = () => {
    const roomLink = window.location.href;
    navigator.clipboard.writeText(roomLink);
    toast.success('Room link copied to clipboard!');
  };

  return (
    <div className='flex flex-col h-full w-full'>
      <div className='fixed bottom-5 right-5'>
        <h2 className='text-xl font-bold'>Room: {roomId}</h2>
        <div className='flex items-center gap-2'>
          <span className={`w-3 h-3 rounded-full ${gameState.isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span>{gameState.isConnected ? 'Connected' : 'Disconnected'}</span>
          {gameState.role && <span className='ml-2'>({gameState.role})</span>}
        </div>
      </div>
      <div className='w-30 fixed bottom-5 left-5 flex gap-2'>
        <Button className="hover:cursor-pointer" size="sm" onClick={copyRoomLink}>Copy Room Link</Button>
        <Button size="sm" onClick={() => Restart(true)} variant="outline">Reset Game</Button>
      </div>

      <div className='p-2 text-center'>
        <p>
          Players: {playersPresence.length}/2
          {playersPresence.length < 2 && 
            <span className='text-yellow-600 ml-2'>Waiting for players...</span>
          }
        </p>
      </div>

      {isLoading && (
        <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4'></div>
            <p className='text-lg'>Connecting to game room...</p>
            <p className='text-sm text-gray-500 mt-2'>Share the link with I dont know who</p>
          </div>
        </div>
      )}
      
      <div className='flex h-full justify-between items-center'>
            <TopBar resest={(set)=>Restart(set)}/>
            <div>
              <div className='pl-4'>
                {useMediaQuery({ query: '(max-width: 1280px)' }) ? (
                  turn == 0 ? (
                    !playersCategory[1] ? (
                      <motion.div key="player1" initial={{opacity: 0, x: -50, scale: 0.8 }} animate={{ opacity: 1,x: 0, scale: 1 }} transition={{duration:0.6, type:'spring', stiffness:100 }}>
                        <OnlinePlayer1 />
                      </motion.div>
                    ) : (
                      <motion.div key="player2" initial={{opacity: 0, x: -50, scale: 0.8}} animate={{opacity:1, x:0, scale:1}} transition={{duration: 0.6, type: 'spring', stiffness: 100}}>
                        <OnlinePlayer2 />
                      </motion.div>
                    )
                  ) : turn == 1 ? (
                      <motion.div key="player1" initial={{opacity: 0, x: -50, scale: 0.8 }} animate={{ opacity: 1,x: 0, scale: 1 }} transition={{duration:0.6, type:'spring', stiffness:100 }}>
                        <OnlinePlayer1 />
                      </motion.div>
                  ) : (
                    <motion.div key="player2" initial={{opacity: 0, x: -50, scale: 0.8}} animate={{opacity:1, x:0, scale:1}} transition={{duration: 0.6, type: 'spring', stiffness: 100}}>
                        <OnlinePlayer2 />
                    </motion.div>
                  )
                ) : (
                  <motion.div key="player1" initial={{opacity: 0, x: -50, scale: 0.8 }} animate={{ opacity: 1,x: 0, scale: 1 }} transition={{duration:0.6, type:'spring', stiffness:100 }}>
                        <OnlinePlayer1 />
                  </motion.div>
                )}
              </div>  
            </div>
            <div className='h-full flex justify-center items-center px-10'>
              <div className="grid grid-cols-3 grid-rows-3 gap-5 w-[401px] bg-[#bbada0] p-5 rounded-lg">
                  <AnimatePresence>
                    {MainBoard.map((cell, idx) => (
                      <motion.div  onClick={() => MoveHandler(idx)} className={`${isWin ? WinningMoves.split(',').includes(idx.toString()) ? 'bg-[#d6b99e]' : 'bg-[#cdc1b4]' : 'bg-[#cdc1b4]'} flex items-center justify-center text-7xl w-[107px] h-[107px] hover:cursor-pointer rounded-md hover:bg-[#d6b99e]`} key={idx} layout initial={{ opacity: 0, y: 50, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -50, scale: 0.8 }} transition={{ delay: idx*0.05, type: 'spring', stiffness: 100, damping: 20 }} >
                        <AnimatePresence mode="wait">
                          {cell && (
                            <motion.div key={cell+'-'+idx} initial={{ scale: 0.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.3, opacity: 0 }} transition={{ duration: 0.2, ease: 'easeOut' }}>
                              {cell}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </AnimatePresence>
              </div>
            </div>
            <div className='hidden xl:block pr-4'>
                <motion.div key="player2" initial={{opacity: 0, x: -50, scale: 0.8}} animate={{opacity:1, x:0, scale:1}} transition={{duration: 0.6, type: 'spring', stiffness: 100}}>
                        <OnlinePlayer2 />
                </motion.div>
            </div>
            {isWin && <WiningAnimation winner={turn} onRestart={(cat)=>Restart(cat)} onBack={()=>Restart(true)} />}
          </div>
    </div>
  );
};

export default GameLobby;
