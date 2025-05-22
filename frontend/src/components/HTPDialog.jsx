import React from 'react'
import { Dialog,DialogContent, DialogTitle } from './ui/dialog'
import { XIcon } from 'lucide-react'
import { buttonSound } from './utils/sounds'

const HTPDialog = ({openHTP, setOpenHTP}) => {
  return (
    <Dialog open={openHTP}>
        <DialogContent className='flex flex-col pt-3 px-0 w-md focus:outline-none focus:ring-0' onInteractOutside={()=> setOpenHTP(false)}>
            <div className='w-full flex items-center gap-3'>
                <div className='w-full flex-1 text-center font-bold'>
                    <DialogTitle><h2 className="text-xl font-bold">🎮 How to Play Blink Tac Toe</h2></DialogTitle>
                </div>
                <XIcon onClick={()=>{buttonSound.play();setOpenHTP(false)}} className="absolute right-4 hover:cursor-pointer"/>  
            </div>
            <hr className="border-t-2 p-0"/>
            <div className="text-center px-4 space-y-4">
                <div>
                    <strong>Pick Emoji Categories</strong>
                    <p>Each player chooses a category (like 🐶 Animals or 🍕 Food). You'll get random emojis from your category.</p>
                </div>
                <div>
                    <strong>🔁 Take Turns</strong>
                    <p>Player 1 starts. Players alternate placing their emoji in any empty cell on the 3x3 grid.</p>
                </div>
                <div>
                    <strong>✨ Vanishing Rule</strong>
                    <p>You can only have 3 emojis on the board.<br />Placing a 4th? Your oldest one vanishes (but you can’t place on the vanished spot).</p>
                </div>
                <div>
                    <strong>🏆 Win the Game</strong>
                    <p>Line up 3 of your emojis (same category) horizontally, vertically, or diagonally.</p>
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default HTPDialog