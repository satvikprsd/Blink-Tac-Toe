import { useCategory } from './CategoryContext';
import { usePlayerMoves } from './PlayerMovesContext';
import { Button } from './ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import React, { useEffect, useState } from 'react'
import { emojiCategories } from './utils/gameConstants';
import { moveSound } from './utils/sounds';
import { useSocketGame } from './SocketGameContext';

const OnlinePlayer1 = () => {
  const [selectedcategory, setSelectedCategory] = useState("");
  const { gameState, isConnected, selectCategory } = useSocketGame();
  const { playersCategory, setPlayersCategory } = useCategory();
  const {PlayerMoves, PlayersReady, setPlayersReady, Score} = usePlayerMoves();

  return (
    <div className='flex sm:flex-col bg-[#bbada0] w-[300px] h-[250px] sm:w-[300px] sm:h-[500px] mx-0 sm:mx-15 items-center gap-10 rounded-lg'>
      {
        PlayersReady[1] ? 
          <div className='flex sm:flex-col items-center w-full gap-5 mr-4 sm:mr-0'>
            <div className='flex flex-col items-center gap-0 sm:gap-10 ml-5 sm:ml-0'>
              <p className='text-white text-2xl sm:text-4xl mt-5'>{playersCategory[1] ? `Team ${playersCategory[1]} - ${Score[1]}` : 'Player 1'}</p>
              <div className='bg-[#cdc1b4] flex items-center justify-center text-7xl w-[107px] h-[107px] hover:cursor-pointer rounded-md'>{PlayerMoves[1]}</div>
            </div>
              <div className='grid grid-cols-2 grid-rows-2 gap-17 sm:gap-5 w-[90%] aspect-[1/1] p-5 mx-5 rounded-lg'>
                {emojiCategories[playersCategory[1]].map((cell,idx)=>
                    (<div key={idx} className='bg-[#cdc1b4] flex items-center justify-center text-6xl w-full aspect-[1/1 rounded-md'>{cell}</div>))}
              </div>
          </div>
        : 
        <div className='flex sm:flex-col sm:gap-10 items-center w-full mr-4 sm:mr-0'>
          <div className='flex flex-col gap-10 items-center w-[50%] mx-4 sm:w-[100%] sm:mx-0'>
            <p className='text-white text-2xl sm:text-4xl mt-5'>{playersCategory[1] ? `Team ${playersCategory[1]} - ${Score[1]}` : 'Player 1'}</p>
            <Select disabled={!isConnected || gameState.playerNumber != 1} onValueChange={(cat)=>{moveSound.play();setSelectedCategory(cat)}}>
              <SelectTrigger className="w-[100px] sm:w-[180px] bg-transparent text-sm px-3 py-2 rounded-md focus-visible:ring-2 focus-visible:ring-rin">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent className=" bg-[#f8f4ec]">
                <SelectGroup >
                  <SelectLabel >Categories</SelectLabel>
                  {Object.keys(emojiCategories).map((cat)=>(<SelectItem value={cat}>{cat}</SelectItem>))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-col sm:gap-10 items-center w-full '>
          <div className='grid grid-cols-2 grid-rows-2 gap-5 w-[120%] sm:w-[70%] aspect-[1/1] p-5 mx-5 rounded-lg'>
                {selectedcategory ? emojiCategories[selectedcategory].map((cell,idx)=>
                  (<div key={idx} className='bg-[#cdc1b4] flex items-center justify-center text-5xl sm:text-6xl w-full aspect-[1/1 rounded-md'>{cell}</div>)
                )  : ["","","",""].map((cell,idx)=>
                  (<div key={idx} className='bg-[#cdc1b4] flex items-center justify-center text-7xl w-full aspect-[1/1] rounded-md'>{cell}</div>)
                )}
          </div>
          <Button disabled={!isConnected || gameState.playerNumber != 1} className='w-20 sm:w-auto' onClick={()=>{selectCategory(selectedcategory);setPlayersCategory({...playersCategory, 1:selectedcategory});setPlayersReady({...PlayersReady, 1:true});setSelectedCategory('');moveSound.play();}}>Ready</Button>
          </div>
        </div>
      }
    </div>
  )
}

export default OnlinePlayer1