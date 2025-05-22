import React, { useEffect, useState } from 'react'
import Player1 from './Player1';
import Player2 from './Player2';
import { useCategory } from './CategoryContext';
import { usePlayerMoves } from './PlayerMovesContext';
import { emojiCategories, winCombinations } from './utils/gameConstants';
import { toast } from 'sonner';
import WiningAnimation from './WiningAnimation';

const MainGame = () => {

const [MainBoard, setMainBoard] = useState(["", "", "", "", "", "", "", "", ""])
const [turn, setTurn] = useState(0);
const {playersCategory, setPlayersCategory} = useCategory();
const [isWin, setisWin] = useState(false);
const { PlayerMoves, setPlayerMoves, Player1Moves, setPlayer1Moves, Player2Moves, setPlayer2Moves, setPlayersReady } = usePlayerMoves();
  
const MoveHandler = (cellClicked) => { 
    if (!!MainBoard[cellClicked]){
      toast.error("Oops! There’s already a piece there.")
    }
    else{
      const move = PlayerMoves[turn]
      let newboard = MainBoard.map((cell,idx)=>idx == cellClicked ? move : cell)
      let newmoves = turn == 1 ? Player1Moves : Player2Moves
      newmoves.push([PlayerMoves[turn], cellClicked])
      if (newmoves.length == 4) {
        const index = newmoves.shift()[1];
        newboard = newboard.map((cell,idx)=>idx!=index ? cell : '')
      }
      if (turn == 1) setPlayer1Moves(newmoves);
      if (turn == 2) setPlayer2Moves(newmoves);
      const moveIndexes = newmoves.map((moves)=>moves[1]).sort((a,b)=>a-b).join(',');
      const isWin = winCombinations.includes(moveIndexes)
      setisWin(winCombinations.includes(moveIndexes));
      setPlayerMoves({...PlayerMoves, [turn]: ''})
      setMainBoard(newboard);
      setTurn(3 - turn);
    }
  } 

  const Restart = () => {
    setTurn(0);
    setisWin(false);
    setPlayerMoves({});
    setPlayer1Moves([]);
    setPlayer2Moves([]);
    setPlayersCategory({});
    setMainBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayersReady({1:false,2:false})
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
    <div className='flex h-full justify-between items-center'>
      {isWin && <WiningAnimation onRestart={()=>Restart()} winner={3-turn} />}
      <Player1 />
      <div className='h-full flex justify-center items-center'>
        <div className="grid grid-cols-3 grid-rows-3 gap-5 w-[401px] bg-[#bbada0] p-5 rounded-lg">
          {MainBoard.map((cell, idx) => (<div onClick={()=>MoveHandler(idx)} key={idx} className='bg-[#cdc1b4] flex items-center justify-center text-7xl w-[107px] h-[107px] hover:cursor-pointer rounded-md'>{cell}</div>))}
        </div>
      </div>
      <Player2 />
    </div>
  )
}

export default MainGame