import React, { useState } from 'react'
import Player1 from './Player1';
import Player2 from './Player2';
import { useCategory } from './CategoryContext';

const MainGame = () => {


const MainBoard = ["😄", "😎", "😡", "😭", "", "😎", "😡", "😭", "🐶"]
const [turn, setTurn] = useState(0);
const {playersCategory} = useCategory();

  return (
    <div className='flex h-full justify-between items-center'>
      <Player1 />
      <div className='h-full flex justify-center items-center'>
        <div className="grid grid-cols-3 grid-rows-3 gap-5 w-[401px] bg-[#bbada0] p-5 rounded-lg">
          {MainBoard.map((cell, idx) => (<div key={idx} className='bg-[#cdc1b4] flex items-center justify-center text-7xl w-[107px] h-[107px] hover:cursor-pointer'>{cell}</div>))}
        </div>
      </div>
      <Player2 />
    </div>
  )
}

export default MainGame