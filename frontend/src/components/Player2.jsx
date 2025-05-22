import { useCategory } from './CategoryContext';
import { usePlayerMoves } from './PlayerMovesContext';
import { Button } from './ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import React, { useEffect, useState } from 'react'
import { emojiCategories } from './utils/gameConstants';
import { moveSound } from './utils/sounds';

const Player2 = () => {
  const [selectedcategory, setSelectedCategory] = useState("");
  const { playersCategory, setPlayersCategory } = useCategory();
  const {PlayerMoves, setPlayerMoves, PlayersReady, setPlayersReady} = usePlayerMoves();

  return (
    <div className='flex flex-col bg-[#bbada0] w-[300px] h-[500px] mx-15 items-center gap-10 rounded-lg'>
      <p className='text-white text-5xl mt-5'>Player 2</p>
      {
        PlayersReady[2] ? 
          <div className='flex flex-col items-center gap-5'>
            <div className='bg-[#cdc1b4] flex items-center justify-center text-7xl w-[107px] h-[107px] hover:cursor-pointer rounded-md'>{PlayerMoves[2]}</div>
            <div className='grid grid-cols-2 grid-rows-2 gap-5 w-[90%] aspect-[1/1] p-5 mx-5 rounded-lg'>
              {emojiCategories[playersCategory[2]].map((cell,idx)=>
                  (<div key={idx} className='bg-[#cdc1b4] flex items-center justify-center text-6xl w-full aspect-[1/1 rounded-md'>{cell}</div>))}
            </div>
          </div>
        : 
        <div className='flex flex-col gap-10 items-center w-full'>
          <Select disabled={!playersCategory[1]} onValueChange={(cat)=>{moveSound.play();setSelectedCategory(cat)}}>
            <SelectTrigger className="w-[180px] bg-transparent text-sm px-3 py-2 rounded-md focus-visible:ring-2 focus-visible:ring-rin">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent className=" bg-[#f8f4ec]">
              <SelectGroup >
                <SelectLabel >Categories</SelectLabel>
                {Object.keys(emojiCategories).filter((cat)=>cat!=playersCategory[1]).map((cat)=>(<SelectItem value={cat}>{cat}</SelectItem>))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className='grid grid-cols-2 grid-rows-2 gap-5 w-[70%] aspect-[1/1] p-5 mx-5 rounded-lg'>
              {selectedcategory ? emojiCategories[selectedcategory].map((cell,idx)=>
                (<div key={idx} className='bg-[#cdc1b4] flex items-center justify-center text-6xl w-full aspect-[1/1] hover:cursor-pointer rounded-md'>{cell}</div>)
              )  : ["","","",""].map((cell,idx)=>
                (<div key={idx} className='bg-[#cdc1b4] flex items-center justify-center text-7xl w-full aspect-[1/1] hover:cursor-pointer rounded-md'>{cell}</div>)
              )}
          </div>
          <Button disabled={!playersCategory[1]} onClick={()=>{setPlayersCategory({...playersCategory, 2:selectedcategory});setPlayersReady({...PlayersReady, 2:true});setSelectedCategory('');moveSound.play();}}>Ready</Button>
        </div>
      }
    </div>
  )
}

export default Player2