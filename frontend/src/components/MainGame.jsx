import React, { useEffect, useState } from 'react'
import Player1 from './Player1';
import Player2 from './Player2';
import { useCategory } from './CategoryContext';
import { usePlayerMoves } from './PlayerMovesContext';

const MainGame = () => {

const emojiCategories = {
    Animals: ["🐶", "🐱", "🐵", "🐰"],
    Food: ["🍕", "🍟", "🍔", "🍩"],
    Sports: ["⚽", "🏀", "🏈", "🎾"],
    Faces: ["😄", "😎", "😡", "😭"],
    Weather: ["☀️", "🌧️", "🌩️", "❄️"],
};
const [MainBoard, setMainBoard] = useState(["", "", "", "", "", "", "", "", ""])
const [turn, setTurn] = useState(0);
const {playersCategory} = useCategory();
const { PlayerMoves, setPlayerMoves } = usePlayerMoves();
  
const MoveHandler = (cellClicked) => { 
    const move = PlayerMoves[turn]
    const newboard = MainBoard.map((cell,idx)=>idx == cellClicked ? move : cell)
    setPlayerMoves({...PlayerMoves, [turn]: ''})
    setMainBoard(newboard);
    setTurn(3 - turn);
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