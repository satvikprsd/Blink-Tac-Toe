import { useCategory } from './CategoryContext';
import { usePlayerMoves } from './PlayerMovesContext';
import { Button } from './ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import React, { useEffect, useState } from 'react'

const Player1 = () => {
  const [selectedcategory, setSelectedCategory] = useState("");
  const [ready, setReady] = useState(false);
  const { playersCategory, setPlayersCategory } = useCategory();
  const emojiCategories = {
      Animals: ["🐶", "🐱", "🐵", "🐰"],
      Food: ["🍕", "🍟", "🍔", "🍩"],
      Sports: ["⚽", "🏀", "🏈", "🎾"],
      Faces: ["😄", "😎", "😡", "😭"],
      Weather: ["☀️", "🌧️", "🌩️", "❄️"],
  };
  const {PlayerMoves, setPlayerMoves} = usePlayerMoves();

  return (
    <div className='flex flex-col bg-[#bbada0] w-[300px] h-[500px] mx-15 items-center gap-10 rounded-lg'>
      <p className='text-white text-5xl mt-5'>Player 1</p>
      {
        ready ? 
          <div className='bg-[#cdc1b4] flex items-center justify-center text-7xl w-[107px] h-[107px] hover:cursor-pointer rounded-md'>{PlayerMoves[1]}</div>
        : 
        <div className='flex flex-col gap-10 items-center w-full'>
          <Select onValueChange={(cat)=>setSelectedCategory(cat)}>
            <SelectTrigger className="w-[180px] bg-transparent text-sm px-3 py-2 rounded-md focus-visible:ring-2 focus-visible:ring-rin">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent className=" bg-[#f8f4ec]">
              <SelectGroup >
                <SelectLabel >Categories</SelectLabel>
                {Object.keys(emojiCategories).map((cat)=>(<SelectItem value={cat}>{cat}</SelectItem>))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className='grid grid-cols-2 grid-rows-2 gap-5 w-[70%] aspect-[1/1] bg-[#f8f4ec] p-5 mx-5 rounded-lg'>
              {selectedcategory ? emojiCategories[selectedcategory].map((cell,idx)=>
                (<div key={idx} className='bg-[#cdc1b4] flex items-center justify-center text-6xl w-full aspect-[1/1] hover:cursor-pointer rounded-md'>{cell}</div>)
              )  : ["","","",""].map((cell,idx)=>
                (<div key={idx} className='bg-[#cdc1b4] flex items-center justify-center text-7xl w-full aspect-[1/1] hover:cursor-pointer rounded-md'>{cell}</div>)
              )}
          </div>
          <Button onClick={()=>{setPlayersCategory({...playersCategory, 1:selectedcategory});setReady(true)}}>Ready</Button>
        </div>
      }
    </div>
  )
}

export default Player1