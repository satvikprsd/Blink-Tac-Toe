import React, { useEffect, useState } from 'react'
import Player1 from './Player1';
import Player2 from './Player2';
import { useCategory } from './CategoryContext';
import { usePlayerMoves } from './PlayerMovesContext';
import { emojiCategories, winCombinations } from './utils/gameConstants';
import { toast } from 'sonner';
import WiningAnimation from './WiningAnimation';
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence } from 'framer-motion';
import { moveSound } from './utils/sounds';
import TopBar from './TopBar';

const MainGame = () => {

const [MainBoard, setMainBoard] = useState(["", "", "", "", "", "", "", "", ""])
const [turn, setTurn] = useState(0);
const {playersCategory, setPlayersCategory} = useCategory();
const [WinningMoves, setwinningMoves] = useState('');
const { PlayerMoves, setPlayerMoves, Player1Moves, setPlayer1Moves, Player2Moves, setPlayer2Moves, setPlayersReady, setScore, Score, isWin, setIsWin, isLucky, setIsLucky  } = usePlayerMoves();
  
const MoveHandler = (cellClicked) => { 
    if (!turn) {
      toast.error('Please Select the Categories');
    }
    else if (!!MainBoard[cellClicked]){
      toast.error("Oops! There’s already a piece there.")
    }
    else{
      moveSound.play();
      const move = PlayerMoves[turn]
      let newboard = MainBoard.map((cell,idx)=>idx == cellClicked ? move : cell)
      let newmoves = turn == 1 ? Player1Moves : Player2Moves
      if (newmoves.length == 3) {
        const index = newmoves.shift()[1];
        newboard = newboard.map((cell,idx)=>idx!=index ? cell : '')
      }
      newmoves.push([PlayerMoves[turn], cellClicked])
      if (turn == 1) setPlayer1Moves(newmoves);
      if (turn == 2) setPlayer2Moves(newmoves);
      const moveIndexes = newmoves.map((moves)=>moves[1]).sort((a,b)=>a-b).join(',');
      const isWin = winCombinations.includes(moveIndexes)
      const isLucky = new Set(newmoves.map((moves)=>moves[0])).size === 1; 
      if (isWin) setIsLucky(isLucky);
      if (isWin) setwinningMoves(moveIndexes);
      if (isWin) setScore({...Score, [turn]:Score[turn]+(isLucky ? 5 : 1)})
      setIsWin(isWin);
      setPlayerMoves({...PlayerMoves, [turn]: ''})
      setMainBoard(newboard);
      if (!isWin) setTurn(3 - turn);
    }
  } 

  const Restart = (catCheck) => {
    setIsWin(false);
    setIsLucky(false);
    setPlayerMoves({});
    setPlayer1Moves([]);
    setPlayer2Moves([]);
    if (catCheck) setTurn(0);
    else setTurn(3-turn);   
    if (catCheck) setPlayersCategory({});
    if (catCheck) setPlayersReady({1:false,2:false})
    setMainBoard(["", "", "", "", "", "", "", "", ""]);
  }

  useEffect(()=>{
    const player1move = turn == 1 ? playersCategory[1] ? emojiCategories[playersCategory[1]][Math.floor(Math.random()*4)] : '' : PlayerMoves[1]
    const player2move = turn == 2 ? playersCategory[2] ? emojiCategories[playersCategory[2]][Math.floor(Math.random()*4)] : '' : PlayerMoves[2]
    setPlayerMoves({1:player1move, 2:player2move})
  },[turn])

  useEffect(()=>{
    if(playersCategory[1] && playersCategory[2]){
      setTurn(1);
    }
  },[playersCategory])
  
  return (
    <div className='flex flex-col-reverse sm:flex-row h-full justify-between items-center pb-20 sm:pb-0'>
      <TopBar resest={(set)=>Restart(set)}/>
        <div className=' pl-0 sm:pl-4 mb-0'>
          {useMediaQuery({ query: '(max-width: 1280px)' }) ? (
            turn == 0 ? (
              !playersCategory[1] ? (
                <motion.div className='flex justify-center' key="player1" initial={{opacity: 0, x: -50, scale: 0.8 }} animate={{ opacity: 1,x: 0, scale: 1 }} transition={{duration:0.6, type:'spring', stiffness:100 }}>
                  <Player1 />
                </motion.div>
              ) : (
                <motion.div className='flex justify-center' key="player2" initial={{opacity: 0, x: -50, scale: 0.8}} animate={{opacity:1, x:0, scale:1}} transition={{duration: 0.6, type: 'spring', stiffness: 100}}>
                  <Player2 />
                </motion.div>
              )
            ) : turn == 1 ? (
                <motion.div className='flex justify-center' key="player1" initial={{opacity: 0, x: -50, scale: 0.8 }} animate={{ opacity: 1,x: 0, scale: 1 }} transition={{duration:0.6, type:'spring', stiffness:100 }}>
                  <Player1 />
                </motion.div>
            ) : (
              <motion.div className='flex justify-center' key="player2" initial={{opacity: 0, x: -50, scale: 0.8}} animate={{opacity:1, x:0, scale:1}} transition={{duration: 0.6, type: 'spring', stiffness: 100}}>
                  <Player2 />
              </motion.div>
            )
          ) : (
            <motion.div className='flex justify-center' key="player1" initial={{opacity: 0, x: -50, scale: 0.8 }} animate={{ opacity: 1,x: 0, scale: 1 }} transition={{duration:0.6, type:'spring', stiffness:100 }}>
                  <Player1 />
            </motion.div>
          )}
        </div>
      <div className='h-full flex justify-center items-center px-10'>
        <div className="grid grid-cols-3 grid-rows-3 gap-5 w-[301px] sm:w-[401px] bg-[#bbada0] p-5 rounded-lg">
            <AnimatePresence>
              {MainBoard.map((cell, idx) => (
                <motion.div  onClick={() => MoveHandler(idx)} className={`${isWin ? WinningMoves.split(',').includes(idx.toString()) ? 'bg-[#d6b99e]' : 'bg-[#cdc1b4]' : 'bg-[#cdc1b4]'} flex items-center justify-center text-7xl w-[80px] h-[80px] sm:w-[107px] sm:h-[107px] hover:cursor-pointer rounded-md hover:bg-[#d6b99e]`} key={idx} layout initial={{ opacity: 0, y: 50, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -50, scale: 0.8 }} transition={{ delay: idx*0.05, type: 'spring', stiffness: 100, damping: 20 }} >
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
          <motion.div className='flex justify-center' key="player2" initial={{opacity: 0, x: -50, scale: 0.8}} animate={{opacity:1, x:0, scale:1}} transition={{duration: 0.6, type: 'spring', stiffness: 100}}>
                  <Player2 />
          </motion.div>
      </div>
      {isWin && <WiningAnimation winner={turn} onRestart={(cat)=>Restart(cat)} onBack={()=>Restart(true)} />}
    </div>
  )
}

export default MainGame